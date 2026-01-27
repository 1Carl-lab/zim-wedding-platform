const express = require('express');
const router = express.Router();
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  recordImpression,
  recordClick
} = require('../controllers/adController');

// CRUD routes for ad campaigns
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

// Tracking routes
router.post('/:id/impression', recordImpression);
router.post('/:id/click', recordClick);

module.exports = router;
