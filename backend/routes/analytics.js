const express = require('express');
const router = express.Router();
const {
  getCampaignAnalytics,
  getOverallAnalytics,
  getPerformanceOverTime
} = require('../controllers/analyticsController');

// Analytics routes
router.get('/campaign/:id', getCampaignAnalytics);
router.get('/overall', getOverallAnalytics);
router.get('/performance', getPerformanceOverTime);

module.exports = router;
