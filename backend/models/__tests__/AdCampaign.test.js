const AdCampaign = require('../models/AdCampaign');

// Mock test data
const mockCampaignData = {
  advertiserID: '507f1f77bcf86cd799439011',
  title: 'Test Campaign',
  description: 'This is a test campaign',
  adType: 'banner',
  adContent: 'https://example.com/banner.jpg',
  adPlacement: 'homepage',
  targetURL: 'https://example.com',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-12-31'),
  budget: 1000
};

describe('AdCampaign Model', () => {
  test('should create a valid campaign', () => {
    const campaign = new AdCampaign(mockCampaignData);
    expect(campaign.title).toBe('Test Campaign');
    expect(campaign.adType).toBe('banner');
    expect(campaign.budget).toBe(1000);
    expect(campaign.status).toBe('pending'); // Default status
    expect(campaign.impressions).toBe(0); // Default value
    expect(campaign.clicks).toBe(0); // Default value
  });

  test('should validate required fields', () => {
    const campaign = new AdCampaign({});
    const validationError = campaign.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError.errors.advertiserID).toBeDefined();
    expect(validationError.errors.adType).toBeDefined();
    expect(validationError.errors.adContent).toBeDefined();
  });

  test('should calculate CTR correctly', () => {
    const campaign = new AdCampaign({
      ...mockCampaignData,
      impressions: 1000,
      clicks: 50
    });
    expect(campaign.ctr).toBe('5.00');
  });

  test('should check if campaign is active', () => {
    const now = new Date();
    const activeCampaign = new AdCampaign({
      ...mockCampaignData,
      status: 'active',
      startDate: new Date(now.getTime() - 86400000), // Yesterday
      endDate: new Date(now.getTime() + 86400000), // Tomorrow
      spend: 500
    });
    expect(activeCampaign.isActive()).toBe(true);
  });

  test('should not be active if budget is exhausted', () => {
    const now = new Date();
    const exhaustedCampaign = new AdCampaign({
      ...mockCampaignData,
      status: 'active',
      startDate: new Date(now.getTime() - 86400000),
      endDate: new Date(now.getTime() + 86400000),
      budget: 1000,
      spend: 1000
    });
    expect(exhaustedCampaign.isActive()).toBe(false);
  });
});
