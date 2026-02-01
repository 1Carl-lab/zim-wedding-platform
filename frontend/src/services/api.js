import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Ad Campaign API calls
export const adService = {
  // Get all campaigns
  getAllCampaigns: async (params = {}) => {
    const response = await api.get('/ads', { params });
    return response.data;
  },

  // Get single campaign
  getCampaign: async (id) => {
    const response = await api.get(`/ads/${id}`);
    return response.data;
  },

  // Create new campaign
  createCampaign: async (campaignData) => {
    const response = await api.post('/ads', campaignData);
    return response.data;
  },

  // Update campaign
  updateCampaign: async (id, campaignData) => {
    const response = await api.put(`/ads/${id}`, campaignData);
    return response.data;
  },

  // Delete campaign
  deleteCampaign: async (id) => {
    const response = await api.delete(`/ads/${id}`);
    return response.data;
  },

  // Record impression
  recordImpression: async (id) => {
    const response = await api.post(`/ads/${id}/impression`);
    return response.data;
  },

  // Record click
  recordClick: async (id) => {
    const response = await api.post(`/ads/${id}/click`);
    return response.data;
  }
};

// Analytics API calls
export const analyticsService = {
  // Get campaign analytics
  getCampaignAnalytics: async (id) => {
    const response = await api.get(`/ads/analytics/campaign/${id}`);
    return response.data;
  },

  // Get overall analytics
  getOverallAnalytics: async (params = {}) => {
    const response = await api.get('/ads/analytics/overall', { params });
    return response.data;
  },

  // Get performance over time
  getPerformanceOverTime: async (params = {}) => {
    const response = await api.get('/ads/analytics/performance', { params });
    return response.data;
  }
};

// Payment API calls
export const paymentService = {
  // Process Stripe payment
  processStripePayment: async (paymentData) => {
    const response = await api.post('/payment/stripe', paymentData);
    return response.data;
  },

  // Process Paynow payment
  processPaynowPayment: async (paymentData) => {
    const response = await api.post('/payment/paynow', paymentData);
    return response.data;
  },

  // Get payment status
  getPaymentStatus: async (campaignId) => {
    const response = await api.get(`/payment/status/${campaignId}`);
    return response.data;
  }
};

export default api;
