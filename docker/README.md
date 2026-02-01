# Docker Configuration

This directory contains Docker configuration files for the Zimbabwe Wedding Platform.

## Files

- `Dockerfile.backend` - Docker configuration for the Node.js backend API
- `Dockerfile.frontend` - Docker configuration for the React frontend app

## Usage

The main `docker-compose.yml` file in the root directory orchestrates all services.

## Services

### Database (PostgreSQL)
- Port: 5432
- Uses official PostgreSQL 15 Alpine image
- Data persisted in Docker volume

### Backend API
- Port: 5000
- Built from `Dockerfile.backend`
- Hot-reload enabled in development

### Frontend App
- Port: 3000
- Built from `Dockerfile.frontend`
- Hot-reload enabled in development

## Development

See the root README.md for instructions on running the platform with Docker Compose.
