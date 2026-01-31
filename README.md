# Physalign - Intelligent Physiotherapy Platform

A cross-platform mobile application for physiotherapy exercise monitoring with real-time pose tracking and professional review workflows.

## 🏗️ System Architecture
### Backend Services
- **RESTful API**: Session management, data processing, user authentication
- **Cloud Storage**: Secure video storage with signed URLs
- **Database**: PostgreSQL with time-series pose data
- **Web Dashboard**: Physiotherapist review interface with video playback

## 📚 Documentation

### Technical Architecture
- [`TECHNICAL_ARCHITECTURE.md`](./TECHNICAL_ARCHITECTURE.md) - Complete system design specification
- [`FLUTTER_IMPLEMENTATION_GUIDE.md`](./FLUTTER_IMPLEMENTATION_GUIDE.md) - Flutter project structure and implementation details
- [`BASE_API_SPEC.md`](./BASE_API_SPEC.md) - Backend API endpoints and database schema

### Implementation Planning
- [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) - 16-week development roadmap with milestones
- [`FATIGUE_FEATURE.md`](./FATIGUE_FEATURE.md) - Fatigue detection feature specification

## 🚀 Quick Start

### Prerequisites
- Flutter 3.0+
- Xcode 14+ (iOS development)
- Android Studio (Android development)
- Node.js 16+ (backend)
- PostgreSQL 13+

### Mobile App Setup

```bash
# Clone repository
git clone <repository-url>
cd Physalign/patient-app

# Install Flutter dependencies
flutter pub get

# iOS setup
cd ios && pod install && cd ..

# Run development build
flutter run
```

### Backend Setup

```bash
# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

### Web Dashboard Setup

```bash
# Navigate to dashboard directory
cd ../dashboard

# Install dependencies
npm install

# Start development server
npm start
```

## 📱 Key Features

### Patient Mobile App
- **Exercise Recording**: High-quality video capture with real-time pose tracking
- **Form Feedback**: Instant visual and audio cues for proper technique
- **Progress Tracking**: Historical session review and improvement metrics
- **Offline Capability**: Record sessions without internet connectivity

### Physiotherapist Dashboard
- **Session Review**: Video playback with pose overlay visualization
- **Annotation Tools**: Point-and-click feedback marking system
- **Analytics**: Patient progress tracking and trend analysis
- **Communication**: Secure messaging and feedback workflows

### Technical Capabilities
- **Real-time Pose Tracking**: 15 FPS pose estimation using MediaPipe
- **Angle Calculation**: Precise joint angle measurements with thresholds
- **Secure Data Flow**: End-to-end encryption and HIPAA compliance
- **Cross-platform**: Native performance on iOS and Android

## 🔧 Development Guidelines

### Code Structure
Follow the feature-based folder structure outlined in `FLUTTER_IMPLEMENTATION_GUIDE.md`:
```
lib/
├── core/           # Shared utilities and constants
├── features/       # Feature modules (recording, history, auth)
├── shared/         # Reusable UI components
└── di/            # Dependency injection setup
```

### State Management
- Use BLoC pattern for complex state management
- Implement Cubits for platform channel interactions
- Follow clean architecture principles

### Native Integration
- Platform channels for camera and pose tracking
- Event streams for real-time frame data
- Proper error handling and recovery mechanisms

## 🛡️ Security & Compliance

### HIPAA Compliance
- End-to-end encryption for all patient data
- Audit logging for all system access
- Secure authentication with role-based access control
- Regular security assessments and penetration testing

### Data Protection
- Patient data anonymization where possible
- Secure storage with automatic backup
- Retention policies with automated deletion
- Consent management for data collection

## 📊 Performance Targets

### Mobile App
- Camera initialization: < 2 seconds
- Pose tracking latency: < 66ms (15 FPS)
- Battery usage: < 15% per 10-minute session
- Video recording: 720p @ 30fps

### Backend
- API response time: < 200ms (95th percentile)
- Video processing: Asynchronous with progress tracking
- Database queries: < 50ms for typical operations
- Uptime: 99.99% SLA

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch from `develop`
3. Implement changes following established patterns
4. Write comprehensive tests
5. Submit pull request with detailed description

### Code Review Process
- All code changes require peer review
- Automated testing must pass
- Security and performance impacts assessed
- Documentation updated for all changes

## 📞 Support

### Technical Issues
- Check existing documentation in `/docs` directory
- Review implementation guides and specifications
- Submit issues through GitHub with detailed reproduction steps

### Clinical Questions
- Contact clinical team for therapy-related inquiries
- Refer to physiotherapist dashboard for patient management
- Consult implementation specifications for technical workflows

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

Built with:
- Flutter - Google's UI toolkit
- MediaPipe - Google's cross-platform ML framework
- PostgreSQL - Open-source relational database
- React.js - Facebook's JavaScript library

Special thanks to the physiotherapy professionals who contributed to the clinical validation and user experience design.

---

*Last Updated: January 30, 2026*
*Version: 1.0.0*