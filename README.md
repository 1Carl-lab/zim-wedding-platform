# Zimbabwe Wedding Platform

A comprehensive review and discovery platform tailored to Zimbabwe's wedding market. This platform connects couples with trusted wedding vendors, making vendor discovery, reviews, and bookings easier and more reliable.

## 🎯 Key Features

- **Vendor Listings**: Showcase vendors such as planners, caterers, photographers, venues, decorators, and more with detailed profiles, pricing, and locations
- **Verified Reviews**: Allow couples to leave verified reviews and ratings for vendors they have transacted with
- **Search and Shortlisting**: Enable couples to search vendors by category, location, ratings, and availability, with the ability to create shortlists
- **Booking System**: Facilitate booking inquiries and introduce a secure payment feature to reserve services
- **Vendor Dashboards**: Provide vendors with tools to manage bookings, showcase reviews, and analyze traffic to their profiles

## 🏗️ Technology Stack

### Frontend
- React.js 18
- Modern, responsive UI
- Client-side routing

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT authentication
- Input validation and security

### Database
- PostgreSQL 15
- Relational data model
- UUID-based primary keys
- Full-text search capabilities

### DevOps
- Docker containerization
- Docker Compose for local development
- Environment-based configuration

## 📁 Repository Structure

```
zim-wedding-platform/
├── frontend/                # React.js application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   ├── package.json
│   └── README.md
├── backend/                 # Node.js/Express.js API
│   ├── server.js            # Main server file
│   ├── package.json
│   └── README.md
├── database/                # PostgreSQL schema
│   ├── schema.sql           # Database schema
│   ├── seed.sql             # Sample data
│   └── README.md
├── docker/                  # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── README.md
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js 16+ (for local development without Docker)
- PostgreSQL 13+ (for local development without Docker)

### Running with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/1Carl-lab/zim-wedding-platform.git
cd zim-wedding-platform
```

2. Start all services:
```bash
docker-compose up
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

4. Stop the services:
```bash
docker-compose down
```

### Running Locally (Without Docker)

#### Database Setup
```bash
# Create database
createdb zim_wedding_platform

# Run schema
psql -d zim_wedding_platform -f database/schema.sql
```

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/zim_wedding_platform
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🗄️ Database Schema

The platform uses PostgreSQL with the following main tables:

- **users** - User accounts (couples, vendors, admins)
- **vendors** - Vendor profiles and business information
- **reviews** - Verified reviews and ratings
- **bookings** - Booking requests and confirmations
- **shortlists** - User-saved vendor favorites

For detailed schema information, see [database/README.md](database/README.md).

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Vendors
- `GET /api/vendors` - Get all vendors (with filters)
- `GET /api/vendors/:id` - Get vendor details
- `POST /api/vendors` - Create vendor (authenticated)

### Reviews
- `GET /api/vendors/:id/reviews` - Get vendor reviews
- `POST /api/vendors/:id/reviews` - Create review (authenticated)

### Bookings
- `GET /api/bookings` - Get user bookings (authenticated)
- `POST /api/bookings` - Create booking (authenticated)

For detailed API documentation, see [backend/README.md](backend/README.md).

## 🛠️ Development

### Project Components

Each component has its own README with detailed information:

- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)
- [Database Documentation](database/README.md)
- [Docker Documentation](docker/README.md)

### Development Workflow

1. Make changes to the code
2. Test locally with Docker Compose or standalone services
3. Commit and push changes
4. Deploy to staging/production

## 🌍 Future Enhancements

- Regional expansion across Southern Africa
- Mobile applications (iOS/Android)
- Real-time chat between couples and vendors
- Advanced analytics for vendor dashboards
- Payment gateway integration
- Email notifications and reminders
- Social media integration
- Community forums and discussion boards

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the development team.

---

**Zimbabwe Wedding Platform** - Making wedding planning easier for Zimbabwean couples 💍
