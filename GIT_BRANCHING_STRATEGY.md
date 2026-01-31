# Git Branching Strategy for Physalign

## Branch Structure

### Main Branches
- **`production`** - Production-ready code (stable releases)
- **`develop`** - Integration branch for features (default development branch)
- **`main`** - Current working branch (will be aligned with develop)

### Feature Branches
- **`feature/api-endpoints`** - API development and endpoints
- **`feature/dashboard-ui`** - Physio dashboard UI improvements
- **`feature/patient-app`** - Patient application features
- **`feature/pose-tracking`** - Pose tracking and computer vision features

### Hotfix Branches
- **`hotfix/critical-bugs`** - Emergency fixes for production issues

## Workflow

1. **Feature Development**: 
   - Branch from `develop`
   - Work on feature branches
   - Merge back to `develop` via pull requests

2. **Release Process**:
   - Merge `develop` to `production` when ready for release
   - Tag releases appropriately

3. **Hotfixes**:
   - Branch from `production`
   - Fix critical issues
   - Merge back to both `production` and `develop`

## Current Status
All branches created successfully. Currently on `develop` branch.