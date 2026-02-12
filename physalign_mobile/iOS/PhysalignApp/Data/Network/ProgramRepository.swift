//
//  ProgramRepository.swift
//  PhysalignApp
//
//  Created by Physalign Team on 2024.
//

import Foundation
import Alamofire
import Logging

// MARK: - Program Repository Protocol

public protocol ProgramRepositoryProtocol {
    /// Fetch exercise program by access code
    func fetchProgram(by accessCode: String) async throws -> ExerciseProgram
    
    /// Cache program locally
    func cacheProgram(_ program: ExerciseProgram) async throws
    
    /// Get cached program
    func getCachedProgram(by accessCode: String) async throws -> ExerciseProgram?
    
    /// Clear cached programs
    func clearCache() async throws
}

// MARK: - Program Repository Implementation

public class ProgramRepository: ProgramRepositoryProtocol {
    // MARK: - Properties
    
    private let baseURL: String
    private let logger = Logger(label: "com.physalign.program-repository")
    private let jsonDecoder: JSONDecoder
    private let jsonEncoder: JSONEncoder
    private let cache: NSCache<NSString, NSData>
    
    // MARK: - Initialization
    
    public init(baseURL: String = "http://localhost:8000") {
        self.baseURL = baseURL
        self.cache = NSCache<NSString, NSData>()
        self.cache.countLimit = 50 // Limit cache to 50 programs
        
        // Setup JSON decoder
        self.jsonDecoder = JSONDecoder()
        self.jsonDecoder.dateDecodingStrategy = .iso8601
        
        // Setup JSON encoder
        self.jsonEncoder = JSONEncoder()
        self.jsonEncoder.dateEncodingStrategy = .iso8601
        
        logger.info("ProgramRepository initialized with baseURL: \(baseURL)")
    }
    
    // MARK: - Public Methods
    
    public func fetchProgram(by accessCode: String) async throws -> ExerciseProgram {
        logger.info("Fetching program for access code: \(accessCode)")
        
        let endpoint = "\(baseURL)/api/program/\(accessCode)"
        
        do {
            let response = try await AF.request(endpoint, method: .get)
                .validate()
                .serializingDecodable(ExerciseProgramDTO.self, decoder: jsonDecoder)
                .value
            
            let program = response.toDomain()
            
            // Cache the program
            try await cacheProgram(program)
            
            logger.info("Successfully fetched and cached program for \(accessCode)")
            return program
            
        } catch let validationError as AFError {
            logger.error("Validation error fetching program: \(validationError)")
            
            switch validationError {
            case .responseValidationFailed(let reason):
                switch reason {
                case .unacceptableStatusCode(let code) where code == 404:
                    throw ProgramError.invalidAccessCode
                default:
                    throw ProgramError.networkError(validationError)
                }
            default:
                throw ProgramError.networkError(validationError)
            }
        } catch {
            logger.error("Unexpected error fetching program: \(error)")
            throw ProgramError.unknown(error)
        }
    }
    
    public func cacheProgram(_ program: ExerciseProgram) async throws {
        do {
            let data = try jsonEncoder.encode(program)
            let key = NSString(string: program.accessCode)
            cache.setObject(data as NSData, forKey: key)
            
            logger.debug("Cached program for access code: \(program.accessCode)")
        } catch {
            logger.error("Failed to cache program: \(error)")
            throw ProgramError.cachingFailed(error)
        }
    }
    
    public func getCachedProgram(by accessCode: String) async throws -> ExerciseProgram? {
        let key = NSString(string: accessCode)
        guard let cachedData = cache.object(forKey: key) else {
            logger.debug("No cached program found for access code: \(accessCode)")
            return nil
        }
        
        do {
            let program = try jsonDecoder.decode(ExerciseProgram.self, from: cachedData as Data)
            logger.debug("Retrieved cached program for access code: \(accessCode)")
            return program
        } catch {
            logger.error("Failed to decode cached program: \(error)")
            // Remove invalid cache entry
            cache.removeObject(forKey: key)
            throw ProgramError.decodingFailed(error)
        }
    }
    
    public func clearCache() async throws {
        cache.removeAllObjects()
        logger.info("Program cache cleared")
    }
}

// MARK: - Error Definitions

public enum ProgramError: Error, LocalizedError {
    case invalidAccessCode
    case networkError(Error)
    case cachingFailed(Error)
    case decodingFailed(Error)
    case unknown(Error)
    
    public var errorDescription: String? {
        switch self {
        case .invalidAccessCode:
            return "Invalid access code. Please check with your physiotherapist."
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .cachingFailed(let error):
            return "Failed to cache program: \(error.localizedDescription)"
        case .decodingFailed(let error):
            return "Failed to decode program data: \(error.localizedDescription)"
        case .unknown(let error):
            return "An unexpected error occurred: \(error.localizedDescription)"
        }
    }
    
    public var recoverySuggestion: String? {
        switch self {
        case .invalidAccessCode:
            return "Please verify your access code with your physiotherapist."
        case .networkError:
            return "Check your internet connection and try again."
        case .cachingFailed, .decodingFailed:
            return "The app will attempt to fetch fresh data from the server."
        case .unknown:
            return "Please restart the app and try again."
        }
    }
}