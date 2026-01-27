const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
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
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
