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

## 🚀 Netlify Deployment (Frontend)

This repository contains a React frontend in `frontend/` that can be deployed to Netlify as a static site.

### Build Settings

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/build`

### Required Environment Variables

Set the API base URL for the backend in Netlify:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Single Page App Routing

This repo includes `frontend/public/_redirects` so Netlify can serve client-side routes:

```
/*    /index.html   200
```

### Backend Hosting

Netlify hosts the frontend only. Deploy the backend separately (Docker/Render/Railway/etc.) and update `REACT_APP_API_URL` to match.

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
# Zimbabwe Wedding Platform - Advertising System

A review and discovery platform tailored to Zimbabwe's wedding market with integrated advertising capabilities.

## Overview

This platform includes a complete advertising system that allows businesses to create, manage, and track advertising campaigns across the wedding platform.

## Project Structure

```
zim-wedding-platform/
├── backend/               # Node.js/Express backend
│   ├── controllers/       # Business logic
│   │   ├── adController.js
│   │   ├── analyticsController.js
│   │   └── paymentController.js
│   ├── models/           # Database schemas
│   │   └── AdCampaign.js
│   ├── routes/           # API routes
│   │   ├── ads.js
│   │   ├── analytics.js
│   │   └── payment.js
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env.example
│
└── frontend/             # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/   # Reusable components
    │   │   ├── AdBanner.jsx
    │   │   ├── CampaignList.jsx
    │   │   ├── CampaignForm.jsx
    │   │   └── AnalyticsView.jsx
    │   ├── pages/        # Page components
    │   │   ├── HomePage.jsx
    │   │   └── AdvertiserDashboard.jsx
    │   ├── services/     # API integration
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env.example
```

## Features

### Backend Features

#### 1. Database Models
- **AdCampaign Model** with fields:
  - `advertiserID`: Links to advertiser user
  - `adType`: Type of advertisement (banner, sponsored listing, etc.)
  - `adContent`: URL to image/video or HTML content
  - `adPlacement`: Placement location (homepage, category page, etc.)
  - `startDate` and `endDate`: Campaign duration
  - `budget` and `spend`: Financial tracking
  - `impressions` and `clicks`: Performance metrics
  - `status`: Campaign status tracking
  - `paymentStatus`: Payment state management

#### 2. API Routes

**Ad Management (`/api/ads`)**
- `GET /api/ads` - List all campaigns (with filters)
- `GET /api/ads/:id` - Get specific campaign
- `POST /api/ads` - Create new campaign
- `PUT /api/ads/:id` - Update campaign
- `DELETE /api/ads/:id` - Delete campaign
- `POST /api/ads/:id/impression` - Record impression
- `POST /api/ads/:id/click` - Record click

**Analytics (`/api/ads/analytics`)**
- `GET /api/ads/analytics/campaign/:id` - Campaign-specific analytics
- `GET /api/ads/analytics/overall` - Overall analytics
- `GET /api/ads/analytics/performance` - Performance over time

**Payment (`/api/payment`)**
- `POST /api/payment/stripe` - Process Stripe payment
- `POST /api/payment/paynow` - Process Paynow payment
- `POST /api/payment/paynow/webhook` - Paynow webhook handler
- `GET /api/payment/status/:campaignId` - Get payment status

#### 3. Payment Integration
- Placeholder implementations for Stripe and Paynow
- Ready for actual payment processor integration
- Webhook support for payment status updates

### Frontend Features

#### 1. Advertiser Dashboard (`/advertiser`)
- **Campaign List**: Shows all campaigns with filtering by status
- **Add New Campaign**: Comprehensive form for creating campaigns
- **Analytics View**: 
  - Overview metrics (impressions, clicks, CTR, spend)
  - Performance charts over time
  - Campaign status breakdown
  - Top performing campaigns

#### 2. Ad Display Components
- **AdBanner**: Reusable component for displaying ads
  - Automatic impression tracking
  - Click tracking with target URL redirection
  - Responsive design
  - Placement-aware ad fetching

#### 3. Example Pages
- **HomePage**: Demonstrates ad placements
  - Homepage banner ads
  - Sidebar ads
  - Integration with content

## Installation & Setup

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (use `.env.example` as template):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zim-wedding-platform
STRIPE_SECRET_KEY=your_stripe_secret_key_here
PAYNOW_INTEGRATION_ID=your_paynow_integration_id_here
PAYNOW_INTEGRATION_KEY=your_paynow_integration_key_here
```

Start the server:
```bash
npm start          # Production
npm run dev        # Development (with nodemon)
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file (use `.env.example` as template):
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage Guide

### For Advertisers

1. **Access Dashboard**: Navigate to `/advertiser`
2. **Create Campaign**: Click "Add New Campaign"
   - Fill in campaign details
   - Set budget and duration
   - Choose ad type and placement
3. **Monitor Performance**: View analytics dashboard
   - Track impressions and clicks
   - Monitor budget spend
   - View performance trends

### For Developers

#### Adding Ad Placement to a Page

```jsx
import AdBanner from '../components/AdBanner';

function YourPage() {
  return (
    <div>
      {/* Your content */}
      <AdBanner placement="homepage" adType="banner" />
    </div>
  );
}
```

#### Customizing Ad Display

The `AdBanner` component accepts:
- `placement`: Location identifier (homepage, category_page, etc.)
- `adType`: Type of ad (banner, sponsored_listing, etc.)

## API Documentation

### Authentication
> **Note**: Authentication is currently using placeholder advertiser IDs. Implement proper authentication middleware before production deployment.

### Example API Calls

**Create Campaign:**
```bash
curl -X POST http://localhost:5000/api/ads \
  -H "Content-Type: application/json" \
  -d '{
    "advertiserID": "mock-advertiser-id",
    "title": "Summer Wedding Special",
    "adType": "banner",
    "adContent": "https://example.com/banner.jpg",
    "adPlacement": "homepage",
    "targetURL": "https://example.com",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "budget": 1000
  }'
```

**Get Analytics:**
```bash
curl http://localhost:5000/api/ads/analytics/overall
```

## Database Schema

### AdCampaign Model

```javascript
{
  advertiserID: ObjectId (ref: User),
  adType: String (enum),
  adContent: String,
  adPlacement: String (enum),
  title: String,
  description: String,
  targetURL: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  spend: Number,
  impressions: Number,
  clicks: Number,
  status: String (enum),
  paymentStatus: String (enum),
  paymentTransactionId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** with Mongoose - Database
- **Stripe** - Payment processing (placeholder)
- **Cors** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **CSS3** - Styling

## Next Steps for Production

### Backend
1. Implement user authentication and authorization
2. Add JWT token-based authentication
3. Integrate actual Stripe and Paynow payment processing
4. Add input validation and sanitization
5. Implement rate limiting
6. Add comprehensive error handling
7. Set up MongoDB indexes for performance
8. Implement file upload for ad images
9. Add email notifications

### Frontend
1. Implement user authentication flow
2. Add protected routes
3. Implement image upload for ads
4. Add form validation improvements
5. Implement loading states and error boundaries
6. Add accessibility improvements
7. Optimize performance (code splitting, lazy loading)
8. Add E2E tests

### DevOps
1. Set up CI/CD pipeline
2. Configure production environment
3. Set up monitoring and logging
4. Implement backup strategies
5. Configure SSL/TLS
6. Set up CDN for static assets

## Deployment Readiness Update (Next Actions)

Before deploying, the following repository-specific actions should be completed to unblock a production release:

1. Fix invalid `package.json` files in `backend/` and `frontend/` (duplicate keys currently prevent `npm install`, `npm test`, and `npm run build`).
2. Decide on the primary database (PostgreSQL vs MongoDB) and align Docker, environment variables, and documentation to one stack.
3. Replace placeholder authentication with JWT-based auth middleware as referenced in API documentation.
4. Replace placeholder Stripe/Paynow handlers with production payment integrations and secure webhook verification.
5. Configure production environment variables (database URL, JWT secret, CORS origin) and secrets management.
6. Produce a frontend production build (`npm run build`) and configure a static hosting path or container for the build output.

## Security Considerations

- Sanitize all user inputs
- Implement CSRF protection
- Use HTTPS in production
- Store sensitive data securely
- Implement proper authentication
- Add rate limiting to prevent abuse
- Validate file uploads
- Use environment variables for secrets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For questions or issues, please open an issue on the GitHub repository.
