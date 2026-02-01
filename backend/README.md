# Zimbabwe Wedding Platform - Backend

This is the Node.js/Express.js backend API for the Zimbabwe Wedding Platform.

## Features
- User Authentication and Authorization
- Vendor Management API
- Review and Rating System
- Booking Management
- Search and Filter APIs
- Vendor Dashboard APIs

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/zim_wedding_platform
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Development

```bash
npm run dev
```

Starts the development server with hot-reload at [http://localhost:5000](http://localhost:5000).

### Production

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Vendors
- `GET /api/vendors` - Get all vendors (with filters)
- `GET /api/vendors/:id` - Get vendor details
- `POST /api/vendors` - Create a new vendor (authenticated)
- `PUT /api/vendors/:id` - Update vendor (authenticated)
- `DELETE /api/vendors/:id` - Delete vendor (authenticated)

### Reviews
- `GET /api/vendors/:id/reviews` - Get vendor reviews
- `POST /api/vendors/:id/reviews` - Create a review (authenticated)
- `PUT /api/reviews/:id` - Update a review (authenticated)
- `DELETE /api/reviews/:id` - Delete a review (authenticated)

### Bookings
- `GET /api/bookings` - Get user bookings (authenticated)
- `POST /api/bookings` - Create a booking (authenticated)
- `PUT /api/bookings/:id` - Update booking status (authenticated)
- `DELETE /api/bookings/:id` - Cancel booking (authenticated)

## Technology Stack
- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

## Project Structure
```
backend/
├── config/              # Configuration files
├── controllers/         # Route controllers
├── middleware/          # Custom middleware
├── models/              # Database models
├── routes/              # API routes
├── utils/               # Utility functions
├── server.js            # Main server file
└── package.json
```
