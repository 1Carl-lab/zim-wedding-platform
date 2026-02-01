import React, { useState, useEffect } from 'react';
import { adService, analyticsService } from '../services/api';
import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';
import AnalyticsView from '../components/AnalyticsView';
import './AdvertiserDashboard.css';

const AdvertiserDashboard = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Mock advertiser ID - in production, get from authentication context
  const advertiserId = 'mock-advertiser-id-123';

  useEffect(() => {
    fetchCampaigns();
    fetchAnalytics();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await adService.getAllCampaigns({ 
        advertiserID: advertiserId 
      });
      if (response.success) {
        setCampaigns(response.data);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsService.getOverallAnalytics({ 
        advertiserID: advertiserId 
      });
      if (response.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleCreateCampaign = () => {
    setEditingCampaign(null);
    setShowForm(true);
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await adService.deleteCampaign(campaignId);
        await fetchCampaigns();
        await fetchAnalytics();
      } catch (error) {
        console.error('Error deleting campaign:', error);
        alert('Failed to delete campaign');
      }
    }
  };

  const handleFormSubmit = async (campaignData) => {
    try {
      if (editingCampaign) {
        await adService.updateCampaign(editingCampaign._id, campaignData);
      } else {
        await adService.createCampaign({
          ...campaignData,
          advertiserID: advertiserId
        });
      }
      setShowForm(false);
      setEditingCampaign(null);
      await fetchCampaigns();
      await fetchAnalytics();
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Failed to save campaign');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCampaign(null);
  };

  const getStatusCounts = () => {
    return {
      active: campaigns.filter(c => c.status === 'active').length,
      pending: campaigns.filter(c => c.status === 'pending').length,
      completed: campaigns.filter(c => c.status === 'completed').length,
      paused: campaigns.filter(c => c.status === 'paused').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="advertiser-dashboard">
      <header className="dashboard-header">
        <h1>Advertiser Dashboard</h1>
        <p>Manage your advertising campaigns</p>
      </header>

      {/* Summary Cards */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>{campaigns.length}</h3>
          <p>Total Campaigns</p>
        </div>
        <div className="summary-card active">
          <h3>{statusCounts.active}</h3>
          <p>Active</p>
        </div>
        <div className="summary-card pending">
          <h3>{statusCounts.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="summary-card completed">
          <h3>{statusCounts.completed}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'campaigns' ? 'active' : ''}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'campaigns' && (
          <div className="campaigns-tab">
            <div className="campaigns-header">
              <h2>Campaign List</h2>
              <button 
                className="btn-primary" 
                onClick={handleCreateCampaign}
              >
                + Add New Campaign
              </button>
            </div>

            {showForm ? (
              <CampaignForm
                campaign={editingCampaign}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            ) : (
              <CampaignList
                campaigns={campaigns}
                loading={loading}
                onEdit={handleEditCampaign}
                onDelete={handleDeleteCampaign}
              />
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView 
            campaigns={campaigns}
            analytics={analytics}
            advertiserId={advertiserId}
          />
        )}
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
