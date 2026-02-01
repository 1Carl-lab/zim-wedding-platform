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
