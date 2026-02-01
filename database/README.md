# Zimbabwe Wedding Platform - Database

This directory contains the PostgreSQL database schema and migration scripts for the Zimbabwe Wedding Platform.

## Database Schema

The database consists of the following main tables:

### Users
- Stores user account information (couples, vendors, admins)
- Handles authentication credentials

### Vendors
- Vendor profile information
- Category, location, pricing, contact details
- Availability status

### Reviews
- User reviews and ratings for vendors
- Verification status for authentic reviews
- Rating scores (1-5 stars)

### Bookings
- Booking requests and confirmations
- Payment status
- Service details

### Categories
- Vendor categories (planner, caterer, photographer, venue, etc.)

### Locations
- Zimbabwe locations for vendor filtering

## Setup

### Prerequisites
- PostgreSQL 13 or higher

### Initialize Database

```bash
# Create database
createdb zim_wedding_platform

# Run schema
psql -d zim_wedding_platform -f schema.sql

# Load initial data (optional)
psql -d zim_wedding_platform -f seed.sql
```

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/zim_wedding_platform
```

## Schema Structure

```
zim_wedding_platform/
├── users
├── vendors
├── vendor_categories
├── reviews
├── bookings
├── shortlists
└── locations
```
