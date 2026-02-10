# Branching Strategy for PhysAlign

This document outlines the git branching strategy for the PhysAlign project.

## Main Branches

- `main` - Production-ready code that is deployed to production
- `develop` - Integration branch for features, current active development

## Feature Branches

- `homescreen` - Main landing page, navigation, and core user interface components
- `physio-dashboard` - Dashboard for physiotherapists with patient management and analytics
- `patient-app` - Patient-facing application with exercise tracking and progress monitoring
- `api` - Backend API development and maintenance
- `tracking` - Pose tracking and motion analysis functionality

## Release Process

1. Features are developed on dedicated feature branches
2. Code is reviewed and merged to `develop` for integration testing
3. When ready for release, `develop` is merged to `main` with appropriate versioning

## Naming Convention

Branch names should be descriptive and lowercase with hyphens separating words:
- `feature/user-authentication`
- `bugfix/login-error`
- `hotfix/security-patch`