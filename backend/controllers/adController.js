const AdCampaign = require('../models/AdCampaign');

// Get all ad campaigns (with optional filtering)
const getAllCampaigns = async (req, res) => {
  try {
    const { status, advertiserID } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (advertiserID) filter.advertiserID = advertiserID;
    
    const campaigns = await AdCampaign.find(filter)
      .sort({ createdAt: -1 })
      .populate('advertiserID', 'name email');
    
    res.json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaigns',
      error: error.message
    });
  }
};

// Get single campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await AdCampaign.findById(req.params.id)
      .populate('advertiserID', 'name email');
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign',
      error: error.message
    });
  }
};

// Create new campaign
const createCampaign = async (req, res) => {
  try {
    const campaign = await AdCampaign.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating campaign',
      error: error.message
    });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await AdCampaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating campaign',
      error: error.message
    });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await AdCampaign.findByIdAndDelete(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting campaign',
      error: error.message
    });
  }
};

// Record impression
const recordImpression = async (req, res) => {
  try {
    const campaign = await AdCampaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    await campaign.recordImpression();
    
    res.json({
      success: true,
      message: 'Impression recorded',
      impressions: campaign.impressions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording impression',
      error: error.message
    });
  }
};

// Record click
const recordClick = async (req, res) => {
  try {
    const campaign = await AdCampaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    await campaign.recordClick();
    
    res.json({
      success: true,
      message: 'Click recorded',
      clicks: campaign.clicks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording click',
      error: error.message
    });
  }
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  recordImpression,
  recordClick
};
