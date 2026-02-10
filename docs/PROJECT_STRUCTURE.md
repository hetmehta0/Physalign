# Physalign Project Structure

## Repository Overview
```
Physalign/
├── api/                    # FastAPI backend
│   ├── main.py            # API entry point
│   ├── requirements.txt   # Python dependencies
│   └── supabase_migration.sql  # Database schema
├── patient-app/           # Next.js patient application
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── lib/               # Utility libraries
├── phsyalign-dashboard/   # Next.js physio dashboard
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── lib/               # Utility libraries
├── tracking/              # Pose tracking logic
│   └── PhysalignCameraView.py
└── documentation/
    ├── GIT_BRANCHING_STRATEGY.md
    ├── DEPLOYMENT_GUIDE.md
    └── PROJECT_STRUCTURE.md
```

## Component Responsibilities

### API Layer (`api/`)
- RESTful endpoints for data exchange
- Supabase integration
- Authentication middleware
- Video processing APIs

### Patient Application (`patient-app/`)
- Patient-facing interface
- Exercise tracking
- Pose detection feedback
- Access code validation
- Video recording/upload

### Physio Dashboard (`phsyalign-dashboard/`)
- Patient management
- Exercise program creation
- Video review interface
- Progress analytics
- Rep/set adjustments

### Tracking Module (`tracking/`)
- Computer vision algorithms
- Pose estimation
- Movement analysis
- Feedback generation

## Data Flow

1. **Patient Records Exercise**:
   - Patient app captures video
   - Pose tracking analyzes movement
   - Data sent to API → Supabase

2. **Physio Reviews Data**:
   - Dashboard fetches patient videos
   - Physio adjusts programs
   - Updates sent to API → Supabase

3. **Real-time Sync**:
   - Both apps connect to same Supabase instance
   - Changes propagate automatically

## Development Guidelines

### Branch Strategy
- `production` - Live site
- `develop` - Main development branch
- `feature/*` - Individual feature work
- `hotfix/*` - Emergency fixes

### Code Standards
- TypeScript for frontend applications
- Python for backend services
- Tailwind CSS for styling
- TensorFlow.js for pose tracking

### Deployment
- Vercel for frontend hosting
- Porkbun for domain management
- Supabase for database/backend