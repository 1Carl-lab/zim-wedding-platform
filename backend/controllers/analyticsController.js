const AdCampaign = require('../models/AdCampaign');

// Get analytics for a specific campaign
const getCampaignAnalytics = async (req, res) => {
  try {
    const campaign = await AdCampaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    const analytics = {
      campaignId: campaign._id,
      title: campaign.title,
      status: campaign.status,
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      ctr: campaign.ctr,
      budget: campaign.budget,
      spend: campaign.spend,
      budgetRemaining: campaign.budgetRemaining,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      daysRunning: Math.floor((new Date() - campaign.startDate) / (1000 * 60 * 60 * 24)),
      isActive: campaign.isActive()
    };
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching campaign analytics',
      error: error.message
    });
  }
};

// Get overall analytics across all campaigns
const getOverallAnalytics = async (req, res) => {
  try {
    const { advertiserID } = req.query;
    const filter = advertiserID ? { advertiserID } : {};
    
    const campaigns = await AdCampaign.find(filter);
    
    const analytics = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
      pendingCampaigns: campaigns.filter(c => c.status === 'pending').length,
      totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
      totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
      totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
      totalSpend: campaigns.reduce((sum, c) => sum + c.spend, 0),
      averageCTR: campaigns.length > 0 
        ? (campaigns.reduce((sum, c) => sum + parseFloat(c.ctr), 0) / campaigns.length).toFixed(2)
        : 0
    };
    
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching overall analytics',
      error: error.message
    });
  }
};

// Get performance data over time (mock implementation with daily aggregates)
const getPerformanceOverTime = async (req, res) => {
  try {
    const { campaignId, days = 30 } = req.query;
    
    // This is a placeholder implementation
    // In a real system, you would store daily/hourly metrics in a separate collection
    const campaign = campaignId 
      ? await AdCampaign.findById(campaignId)
      : null;
    
    // Generate mock time-series data
    const timeSeriesData = [];
    const daysCount = parseInt(days);
    
    for (let i = daysCount - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Mock data - in production, this would come from actual daily metrics
      timeSeriesData.push({
        date: date.toISOString().split('T')[0],
        impressions: Math.floor(Math.random() * 1000) + 100,
        clicks: Math.floor(Math.random() * 50) + 5
      });
    }
    
    res.json({
      success: true,
      data: {
        campaignId: campaignId || 'all',
        period: `${daysCount} days`,
        metrics: timeSeriesData
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching performance data',
      error: error.message
    });
  }
};

module.exports = {
  getCampaignAnalytics,
  getOverallAnalytics,
  getPerformanceOverTime
};
