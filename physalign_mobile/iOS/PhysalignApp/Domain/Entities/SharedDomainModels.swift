//
//  SharedDomainModels.swift
//  PhysalignApp
//
//  Created by Physalign Team on 2024.
//

import Foundation
import CoreGraphics

// MARK: - Shared Domain Models

/// Represents a detected joint/landmark in normalized coordinate space
public struct Joint: Equatable, Hashable {
    /// Name of the joint (e.g., "left_knee", "right_shoulder")
    public let name: String
    
    /// Normalized x coordinate (0.0 - 1.0)
    public let x: CGFloat
    
    /// Normalized y coordinate (0.0 - 1.0)
    public let y: CGFloat
    
    /// Depth coordinate (optional, normalized 0.0 - 1.0)
    public let z: CGFloat?
    
    /// Detection confidence (0.0 - 1.0)
    public let confidence: Float
    
    public init(name: String, x: CGFloat, y: CGFloat, z: CGFloat? = nil, confidence: Float) {
        self.name = name
        self.x = x
        self.y = y
        self.z = z
        self.confidence = confidence
    }
    
    /// Convert to CGPoint for 2D operations
    public var point: CGPoint {
        CGPoint(x: x, y: y)
    }
}

/// Represents a complete pose frame with all detected joints
public struct PoseFrame: Equatable {
    /// Dictionary of joints keyed by joint name
    public let joints: [String: Joint]
    
    /// Unix timestamp in milliseconds
    public let timestamp: TimeInterval
    
    /// Sequential frame number
    public let frameNumber: Int
    
    /// Overall pose detection confidence (0.0 - 1.0)
    public let confidence: Float
    
    public init(joints: [String: Joint], timestamp: TimeInterval, frameNumber: Int, confidence: Float) {
        self.joints = joints
        self.timestamp = timestamp
        self.frameNumber = frameNumber
        self.confidence = confidence
    }
    
    /// Get a specific joint by name
    public func joint(named name: String) -> Joint? {
        joints[name]
    }
    
    /// Check if minimum required joints are visible
    public func hasMinimumJoints(minimumCount: Int = 10) -> Bool {
        joints.count >= minimumCount
    }
}

/// Result of exercise analysis
public struct ExerciseAnalysis: Equatable {
    /// Current repetition count
    public let repCount: Int
    
    /// Form quality percentage (0-100)
    public let qualityScore: Float
    
    /// Real-time feedback message
    public let feedback: String
    
    /// Tiredness indicator (0-100)
    public let fatigueLevel: Float
    
    /// Pace feedback
    public let tempo: String
    
    /// Primary measurement value (angle, depth, etc.)
    public let currentMetric: Float
    
    /// Whether currently in bottom position of rep
    public let isInBottomPosition: Bool
    
    /// Timestamp of last completed repetition
    public let lastRepTimestamp: TimeInterval
    
    public init(repCount: Int = 0, 
                qualityScore: Float = 100.0,
                feedback: String = "Stand in frame",
                fatigueLevel: Float = 0.0,
                tempo: String = "Good pace",
                currentMetric: Float = 0.0,
                isInBottomPosition: Bool = false,
                lastRepTimestamp: TimeInterval = 0) {
        self.repCount = repCount
        self.qualityScore = qualityScore
        self.feedback = feedback
        self.fatigueLevel = fatigueLevel
        self.tempo = tempo
        self.currentMetric = currentMetric
        self.isInBottomPosition = isInBottomPosition
        self.lastRepTimestamp = lastRepTimestamp
    }
}

// MARK: - Exercise Types

public enum ExerciseType: String, CaseIterable {
    case squatSide = "squat_side"
    case squatFront = "squat_front"
    case shoulderRaise = "shoulder_raise"
    
    public var displayName: String {
        switch self {
        case .squatSide: return "Squats (Side View)"
        case .squatFront: return "Squats (Front View)"
        case .shoulderRaise: return "Shoulder Raises"
        }
    }
    
    public var primaryJoints: [String] {
        switch self {
        case .squatSide:
            return ["left_hip", "left_knee", "left_ankle"]
        case .squatFront:
            return ["left_knee", "right_knee", "left_hip", "right_hip"]
        case .shoulderRaise:
            return ["left_shoulder", "right_shoulder", "left_elbow", "right_elbow"]
        }
    }
}

// MARK: - Session States

public enum SessionState: String, CaseIterable {
    case idle = "idle"
    case countdown = "countdown"
    case recording = "recording"
    case review = "review"
    case uploading = "uploading"
    case completed = "completed"
    case error = "error"
    
    public var displayName: String {
        switch self {
        case .idle: return "Ready"
        case .countdown: return "Get Ready"
        case .recording: return "Recording"
        case .review: return "Review"
        case .uploading: return "Uploading"
        case .completed: return "Complete"
        case .error: return "Error"
        }
    }
}

// MARK: - Utility Extensions

extension Joint {
    /// Calculate Euclidean distance to another joint
    public func distance(to other: Joint) -> CGFloat {
        let dx = x - other.x
        let dy = y - other.y
        return sqrt(dx * dx + dy * dy)
    }
    
    /// Linear interpolation between two joints
    public func interpolated(to other: Joint, factor: CGFloat) -> Joint {
        let newX = x + (other.x - x) * factor
        let newY = y + (other.y - y) * factor
        let newZ = z.flatMap { zVal in
            other.z.map { otherZ in
                zVal + (otherZ - zVal) * factor
            }
        }
        let newConfidence = confidence + (other.confidence - confidence) * Float(factor)
        
        return Joint(name: name, x: newX, y: newY, z: newZ, confidence: newConfidence)
    }
}

extension PoseFrame {
    /// Calculate average confidence of all joints
    public var averageJointConfidence: Float {
        guard !joints.isEmpty else { return 0.0 }
        let sum = joints.values.reduce(0.0) { $0 + Double($1.confidence) }
        return Float(sum / Double(joints.count))
    }
    
    /// Get bounding box of all joints
    public var boundingBox: CGRect? {
        guard !joints.isEmpty else { return nil }
        
        let points = joints.values.map { $0.point }
        var minX = points[0].x
        var minY = points[0].y
        var maxX = points[0].x
        var maxY = points[0].y
        
        for point in points.dropFirst() {
            minX = min(minX, point.x)
            minY = min(minY, point.y)
            maxX = max(maxX, point.x)
            maxY = max(maxY, point.y)
        }
        
        return CGRect(x: minX, y: minY, width: maxX - minX, height: maxY - minY)
    }
}