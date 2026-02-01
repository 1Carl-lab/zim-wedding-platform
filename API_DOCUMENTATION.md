# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
> **Note**: Currently using placeholder authentication. Implement proper JWT authentication before production.

## Endpoints

### Health Check

#### GET /health
Check server status

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Ad Campaigns

### GET /ads
Get all campaigns with optional filtering

**Query Parameters:**
- `status` (optional): Filter by status (pending, active, paused, completed, rejected)
- `advertiserID` (optional): Filter by advertiser

**Example Request:**
```bash
curl http://localhost:5000/api/ads?status=active
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "campaign_id",
      "advertiserID": "advertiser_id",
      "title": "Summer Wedding Special",
      "adType": "banner",
      "adContent": "https://example.com/banner.jpg",
      "adPlacement": "homepage",
      "targetURL": "https://example.com",
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-12-31T23:59:59.000Z",
      "budget": 1000,
      "spend": 250,
      "impressions": 10000,
      "clicks": 500,
      "status": "active",
      "paymentStatus": "paid",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /ads/:id
Get a specific campaign

**Response:**
```json
{
  "success": true,
  "data": { /* campaign object */ }
}
```

### POST /ads
Create a new campaign

**Request Body:**
```json
{
  "advertiserID": "advertiser_id",
  "title": "Summer Wedding Special",
  "description": "Promote your summer wedding packages",
  "adType": "banner",
  "adContent": "https://example.com/banner.jpg",
  "adPlacement": "homepage",
  "targetURL": "https://example.com",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "budget": 1000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "data": { /* created campaign object */ }
}
```

### PUT /ads/:id
Update an existing campaign

**Request Body:** Same as POST (all fields optional)

**Response:**
```json
{
  "success": true,
  "message": "Campaign updated successfully",
  "data": { /* updated campaign object */ }
}
```

### DELETE /ads/:id
Delete a campaign

**Response:**
```json
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

### POST /ads/:id/impression
Record an impression for a campaign

**Response:**
```json
{
  "success": true,
  "message": "Impression recorded",
  "impressions": 10001
}
```

### POST /ads/:id/click
Record a click for a campaign

**Response:**
```json
{
  "success": true,
  "message": "Click recorded",
  "clicks": 501
}
```

---

## Analytics

### GET /ads/analytics/campaign/:id
Get analytics for a specific campaign

**Response:**
```json
{
  "success": true,
  "data": {
    "campaignId": "campaign_id",
    "title": "Summer Wedding Special",
    "status": "active",
    "impressions": 10000,
    "clicks": 500,
    "ctr": "5.00",
    "budget": 1000,
    "spend": 250,
    "budgetRemaining": 750,
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-12-31T23:59:59.000Z",
    "daysRunning": 180,
    "isActive": true
  }
}
```

### GET /ads/analytics/overall
Get overall analytics across all campaigns

**Query Parameters:**
- `advertiserID` (optional): Filter by specific advertiser

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCampaigns": 10,
    "activeCampaigns": 3,
    "completedCampaigns": 5,
    "pendingCampaigns": 2,
    "totalImpressions": 100000,
    "totalClicks": 5000,
    "totalBudget": 10000,
    "totalSpend": 7500,
    "averageCTR": "5.00"
  }
}
```

### GET /ads/analytics/performance
Get performance data over time

**Query Parameters:**
- `campaignId` (optional): Specific campaign ID
- `days` (optional): Number of days to return (default: 30)

**Response:**
```json
{
  "success": true,
  "data": {
    "campaignId": "campaign_id",
    "period": "30 days",
    "metrics": [
      {
        "date": "2024-01-01",
        "impressions": 350,
        "clicks": 18
      },
      {
        "date": "2024-01-02",
        "impressions": 420,
        "clicks": 22
      }
    ]
  }
}
```

---

## Payment

### POST /payment/stripe
Process payment via Stripe

**Request Body:**
```json
{
  "campaignId": "campaign_id",
  "amount": 1000,
  "paymentMethodId": "pm_card_visa"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "paymentIntent": {
    "id": "pi_placeholder_123456",
    "status": "succeeded"
  }
}
```

### POST /payment/paynow
Process payment via Paynow

**Request Body:**
```json
{
  "campaignId": "campaign_id",
  "amount": 1000,
  "email": "advertiser@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "redirectUrl": "https://example.com/pay/123456",
  "pollUrl": "https://example.com/poll/123456"
}
```

### POST /payment/paynow/webhook
Webhook endpoint for Paynow status updates

**Request Body:**
```json
{
  "reference": "PAYNOW_123456",
  "status": "Paid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed"
}
```

### GET /payment/status/:campaignId
Get payment status for a campaign

**Response:**
```json
{
  "success": true,
  "data": {
    "campaignId": "campaign_id",
    "paymentStatus": "paid",
    "transactionId": "pi_placeholder_123456",
    "budget": 1000
  }
}
```

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development mode only)"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

---

## Data Types and Enums

### Ad Types
- `banner`
- `sponsored_listing`
- `featured_vendor`
- `sidebar`
- `video`

### Ad Placements
- `homepage`
- `category_page`
- `vendor_listing`
- `search_results`
- `sidebar`

### Campaign Status
- `pending`: Awaiting approval or payment
- `active`: Currently running
- `paused`: Temporarily stopped
- `completed`: Ended successfully
- `rejected`: Not approved

### Payment Status
- `pending`: Payment not yet processed
- `paid`: Payment successful
- `failed`: Payment failed
- `refunded`: Payment refunded
