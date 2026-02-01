const express = require('express');
const router = express.Router();
const {
  processStripePayment,
  processPaynowPayment,
  paynowWebhook,
  getPaymentStatus
} = require('../controllers/paymentController');

// Payment routes
router.post('/stripe', processStripePayment);
router.post('/paynow', processPaynowPayment);
router.post('/paynow/webhook', paynowWebhook);
router.get('/status/:campaignId', getPaymentStatus);

module.exports = router;
