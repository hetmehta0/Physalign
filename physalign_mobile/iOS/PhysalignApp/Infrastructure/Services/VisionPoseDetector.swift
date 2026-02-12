//
//  PoseDetectionAdapter.swift
//  PhysalignApp
//
//  Created by Physalign Team on 2024.
//

import Foundation
import AVFoundation
import Vision

// MARK: - Pose Detection Protocol

/// Protocol defining the interface for platform-specific pose detection adapters
public protocol PoseDetectionAdapter: AnyObject {
    /// Delegate to receive pose detection updates
    var delegate: PoseDetectionDelegate? { get set }
    
    /// Start pose detection
    func startDetection() async throws
    
    /// Stop pose detection
    func stopDetection()
    
    /// Get current pose frame if available
    func getCurrentPose() -> PoseFrame?
    
    /// Check if detection is currently running
    var isRunning: Bool { get }
}

// MARK: - Pose Detection Delegate

/// Delegate protocol for receiving pose detection events
public protocol PoseDetectionDelegate: AnyObject {
    /// Called when a new pose frame is detected
    func poseDidUpdate(_ poseFrame: PoseFrame)
    
    /// Called when pose detection encounters an error
    func poseDetectionDidFail(with error: Error)
    
    /// Called when detection confidence changes significantly
    func poseDetectionConfidenceDidChange(_ confidence: Float)
}

// MARK: - iOS Vision Implementation

/// iOS-specific implementation using Vision framework for human body pose detection
public class VisionPoseDetector: PoseDetectionAdapter {
    // MARK: - Properties
    
    public weak var delegate: PoseDetectionDelegate?
    public private(set) var isRunning = false
    
    private let session = AVCaptureSession()
    private let videoOutput = AVCaptureVideoDataOutput()
    private let sessionQueue = DispatchQueue(label: "com.physalign.pose-detection")
    private var currentFrameNumber = 0
    private var lastProcessedTime: CFTimeInterval = 0
    
    // MARK: - Lifecycle
    
    public init() {
        setupCaptureSession()
    }
    
    deinit {
        stopDetection()
    }
    
    // MARK: - Public Methods
    
    public func startDetection() async throws {
        guard !isRunning else { return }
        
        try await withCheckedThrowingContinuation { continuation in
            sessionQueue.async {
                do {
                    try self.startCaptureSession()
                    self.isRunning = true
                    continuation.resume()
                } catch {
                    continuation.resume(throwing: error)
                }
            }
        }
    }
    
    public func stopDetection() {
        guard isRunning else { return }
        
        sessionQueue.async {
            self.session.stopRunning()
            self.isRunning = false
        }
    }
    
    public func getCurrentPose() -> PoseFrame? {
        // Implementation would return the most recent pose frame
        // This would be set by the video output delegate
        return nil
    }
    
    // MARK: - Private Methods
    
    private func setupCaptureSession() {
        session.beginConfiguration()
        
        // Configure video input
        guard let videoDevice = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .front),
              let videoInput = try? AVCaptureDeviceInput(device: videoDevice) else {
            print("Failed to create video input")
            return
        }
        
        if session.canAddInput(videoInput) {
            session.addInput(videoInput)
        }
        
        // Configure video output
        videoOutput.alwaysDiscardsLateVideoFrames = true
        videoOutput.videoSettings = [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]
        
        if session.canAddOutput(videoOutput) {
            session.addOutput(videoOutput)
        }
        
        // Set output delegate
        videoOutput.setSampleBufferDelegate(self, queue: sessionQueue)
        
        // Configure session preset
        session.sessionPreset = .hd1280x720
        
        session.commitConfiguration()
    }
    
    private func startCaptureSession() throws {
        guard !session.isRunning else { return }
        
        var authorizationStatus: AVAuthorizationStatus
        if #available(iOS 17.0, *) {
            authorizationStatus = AVCaptureDevice.authorizationStatus(for: .video)
        } else {
            authorizationStatus = AVCaptureDevice.authorizationStatus(for: AVMediaType.video)
        }
        
        switch authorizationStatus {
        case .authorized:
            session.startRunning()
        case .notDetermined:
            session.stopRunning()
            throw PoseDetectionError.cameraAccessNotDetermined
        case .denied, .restricted:
            session.stopRunning()
            throw PoseDetectionError.cameraAccessDenied
        @unknown default:
            session.stopRunning()
            throw PoseDetectionError.unknownCameraError
        }
    }
    
    private func processVideoFrame(_ sampleBuffer: CMSampleBuffer) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        
        // Throttle processing to maintain performance
        let currentTime = CACurrentMediaTime()
        guard currentTime - lastProcessedTime > 1.0/15.0 else { return } // 15 FPS target
        lastProcessedTime = currentTime
        
        let request = VNDetectHumanBodyPoseRequest { [weak self] request, error in
            guard let self = self else { return }
            
            if let error = error {
                self.delegate?.poseDetectionDidFail(with: error)
                return
            }
            
            self.handlePoseDetectionResults(request.results)
        }
        
        request.revision = VNDetectHumanBodyPoseRequestRevision1
        request.maximumObservations = 1
        
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .up)
        try? handler.perform([request])
    }
    
    private func handlePoseDetectionResults(_ results: [Any]?) {
        guard let observations = results as? [VNRecognizedPointGroupObservation],
              let observation = observations.first else {
            // No pose detected
            return
        }
        
        let joints = extractJoints(from: observation)
        let confidence = calculateOverallConfidence(from: observation)
        
        let poseFrame = PoseFrame(
            joints: joints,
            timestamp: CFAbsoluteTimeGetCurrent() * 1000, // Convert to milliseconds
            frameNumber: currentFrameNumber,
            confidence: confidence
        )
        
        currentFrameNumber += 1
        delegate?.poseDidUpdate(poseFrame)
    }
    
    private func extractJoints(from observation: VNRecognizedPointGroupObservation) -> [String: Joint] {
        var joints: [String: Joint] = [:]
        
        // Extract key joints from the observation
        let keyJointNames = [
            "nose", "left_eye", "right_eye", "left_ear", "right_ear",
            "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
            "left_wrist", "right_wrist", "left_hip", "right_hip",
            "left_knee", "right_knee", "left_ankle", "right_ankle"
        ]
        
        for jointName in keyJointNames {
            if let point = observation.recognizedPoints[jointName] {
                let joint = Joint(
                    name: jointName,
                    x: CGFloat(point.location.x),
                    y: CGFloat(point.location.y),
                    z: nil, // Vision doesn't provide depth
                    confidence: Float(point.confidence)
                )
                joints[jointName] = joint
            }
        }
        
        return joints
    }
    
    private func calculateOverallConfidence(from observation: VNRecognizedPointGroupObservation) -> Float {
        let confidences = observation.recognizedPoints.values.map { Float($0.confidence) }
        return confidences.isEmpty ? 0.0 : confidences.reduce(0, +) / Float(confidences.count)
    }
}

// MARK: - AVCaptureVideoDataOutputSampleBufferDelegate

extension VisionPoseDetector: AVCaptureVideoDataOutputSampleBufferDelegate {
    public func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        processVideoFrame(sampleBuffer)
    }
    
    public func captureOutput(_ output: AVCaptureOutput, didDrop sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        // Handle dropped frames if needed
    }
}

// MARK: - Error Definitions

public enum PoseDetectionError: Error, LocalizedError {
    case cameraAccessNotDetermined
    case cameraAccessDenied
    case unknownCameraError
    case poseDetectionFailed
    
    public var errorDescription: String? {
        switch self {
        case .cameraAccessNotDetermined:
            return "Camera access not yet determined"
        case .cameraAccessDenied:
            return "Camera access denied"
        case .unknownCameraError:
            return "Unknown camera error occurred"
        case .poseDetectionFailed:
            return "Pose detection failed"
        }
    }
}