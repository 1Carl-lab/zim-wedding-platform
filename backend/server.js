const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Zimbabwe Wedding Platform API',
    version: '0.1.0',
    endpoints: {
      auth: '/api/auth',
      vendors: '/api/vendors',
      reviews: '/api/reviews',
      bookings: '/api/bookings'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Placeholder routes
app.get('/api/vendors', (req, res) => {
  res.json({
    message: 'Get all vendors endpoint',
    data: []
  });
});

app.get('/api/vendors/:id', (req, res) => {
  res.json({
    message: `Get vendor ${req.params.id} endpoint`,
    data: null
  });
});

app.get('/api/auth/status', (req, res) => {
  res.json({
    message: 'Authentication status endpoint',
    authenticated: false
// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zim-wedding-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process in production, just log the error
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Connect to database
connectDB();

// Import routes
const adsRoutes = require('./routes/ads');
const analyticsRoutes = require('./routes/analytics');
const paymentRoutes = require('./routes/payment');

// API Routes
app.use('/api/ads', adsRoutes);
app.use('/api/ads/analytics', analyticsRoutes);
app.use('/api/payment', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Zimbabwe Wedding Platform API',
    version: '1.0.0',
    endpoints: {
      ads: '/api/ads',
      analytics: '/api/ads/analytics',
      payment: '/api/payment',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Zimbabwe Wedding Platform API running on port ${PORT}`);
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
