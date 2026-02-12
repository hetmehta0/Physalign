//
//  ExerciseProgramDTO.swift
//  PhysalignApp
//
//  Created by Physalign Team on 2024.
//

import Foundation

// MARK: - Exercise Program DTOs

/// Data Transfer Object for exercise program from API
public struct ExerciseProgramDTO: Codable {
    public let id: String
    public let physioId: String
    public let accessCode: String
    public let patientName: String?
    public let exercises: [ExerciseDTO]
    public let notes: String?
    public let createdAt: Date
    public let updatedAt: Date
    public let lastAccessed: Date?
    
    enum CodingKeys: String, CodingKey {
        case id, physioId = "physio_id", accessCode = "access_code"
        case patientName = "patient_name", exercises, notes
        case createdAt = "created_at", updatedAt = "updated_at"
        case lastAccessed = "last_accessed"
    }
}

/// Individual exercise DTO
public struct ExerciseDTO: Codable {
    public let name: String
    public let sets: Int
    public let reps: Int
    public let notes: String
    
    public init(name: String, sets: Int, reps: Int, notes: String = "") {
        self.name = name
        self.sets = sets
        self.reps = reps
        self.notes = notes
    }
}

// MARK: - Session DTOs

/// DTO for creating exercise session
public struct CreateSessionDTO: Codable {
    public let accessCode: String
    public let exerciseName: String
    public let repCount: Int
    public let targetReps: Int
    public let durationSeconds: Int
    public let averageQuality: Double
    public let rpe: Int
    public let videoUrl: String?
    public let metrics: SessionMetricsDTO?
    
    enum CodingKeys: String, CodingKey {
        case accessCode = "access_code", exerciseName = "exercise_name"
        case repCount = "rep_count", targetReps = "target_reps"
        case durationSeconds = "duration_seconds", averageQuality = "average_quality"
        case rpe, videoUrl = "video_url", metrics
    }
    
    public init(accessCode: String, exerciseName: String, repCount: Int, targetReps: Int,
                durationSeconds: Int, averageQuality: Double, rpe: Int, 
                videoUrl: String? = nil, metrics: SessionMetricsDTO? = nil) {
        self.accessCode = accessCode
        self.exerciseName = exerciseName
        self.repCount = repCount
        self.targetReps = targetReps
        self.durationSeconds = durationSeconds
        self.averageQuality = averageQuality
        self.rpe = rpe
        self.videoUrl = videoUrl
        self.metrics = metrics
    }
}

/// Metrics for session submission
public struct SessionMetricsDTO: Codable {
    public let averageRom: Double?
    public let maxRom: Double?
    public let stressScore: Double?
    public let averageTempo: Double?
    public let qualityPerRep: [Double]?
    public let tempoPerRep: [Double]?
    
    enum CodingKeys: String, CodingKey {
        case averageRom = "average_rom", maxRom = "max_rom"
        case stressScore = "stress_score", averageTempo = "average_tempo"
        case qualityPerRep = "quality_per_rep", tempoPerRep = "tempo_per_rep"
    }
    
    public init(averageRom: Double? = nil, maxRom: Double? = nil, stressScore: Double? = nil,
                averageTempo: Double? = nil, qualityPerRep: [Double]? = nil, tempoPerRep: [Double]? = nil) {
        self.averageRom = averageRom
        self.maxRom = maxRom
        self.stressScore = stressScore
        self.averageTempo = averageTempo
        self.qualityPerRep = qualityPerRep
        self.tempoPerRep = tempoPerRep
    }
}

// MARK: - Domain Model Conversion

extension ExerciseProgramDTO {
    /// Convert to domain model
    public func toDomain() -> ExerciseProgram {
        ExerciseProgram(
            id: id,
            physioId: physioId,
            accessCode: accessCode,
            patientName: patientName,
            exercises: exercises.map { $0.toDomain() },
            notes: notes,
            createdAt: createdAt,
            updatedAt: updatedAt,
            lastAccessed: lastAccessed
        )
    }
}

extension ExerciseDTO {
    /// Convert to domain model
    public func toDomain() -> Exercise {
        Exercise(
            name: name,
            sets: sets,
            reps: reps,
            notes: notes
        )
    }
}

// MARK: - Domain Models

/// Domain model for exercise program
public struct ExerciseProgram: Equatable {
    public let id: String
    public let physioId: String
    public let accessCode: String
    public let patientName: String?
    public let exercises: [Exercise]
    public let notes: String?
    public let createdAt: Date
    public let updatedAt: Date
    public let lastAccessed: Date?
    
    public init(id: String, physioId: String, accessCode: String, patientName: String?,
                exercises: [Exercise], notes: String?, createdAt: Date, 
                updatedAt: Date, lastAccessed: Date?) {
        self.id = id
        self.physioId = physioId
        self.accessCode = accessCode
        self.patientName = patientName
        self.exercises = exercises
        self.notes = notes
        self.createdAt = createdAt
        self.updatedAt = updatedAt
        self.lastAccessed = lastAccessed
    }
}

/// Domain model for individual exercise
public struct Exercise: Equatable {
    public let name: String
    public let sets: Int
    public let reps: Int
    public let notes: String
    
    public init(name: String, sets: Int, reps: Int, notes: String = "") {
        self.name = name
        self.sets = sets
        self.reps = reps
        self.notes = notes
    }
}