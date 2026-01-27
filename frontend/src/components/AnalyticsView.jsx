import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AnalyticsView.css';

const AnalyticsView = ({ campaigns, analytics, advertiserId }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  useEffect(() => {
    fetchPerformanceData();
  }, [selectedPeriod, selectedCampaign]);

  const fetchPerformanceData = async () => {
    try {
      const params = {
        days: selectedPeriod
      };
      
      if (selectedCampaign !== 'all') {
        params.campaignId = selectedCampaign;
      }

      const response = await analyticsService.getPerformanceOverTime(params);
      if (response.success) {
        setPerformanceData(response.data.metrics);
      }
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  if (!analytics) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-view">
      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
        <div className="analytics-filters">
          <select 
            value={selectedCampaign} 
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Campaigns</option>
            {campaigns.map(campaign => (
              <option key={campaign._id} value={campaign._id}>
                {campaign.title}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
            className="filter-select"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon impressions">📊</div>
          <div className="metric-content">
            <h4>Total Impressions</h4>
            <p className="metric-value">{analytics.totalImpressions.toLocaleString()}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon clicks">👆</div>
          <div className="metric-content">
            <h4>Total Clicks</h4>
            <p className="metric-value">{analytics.totalClicks.toLocaleString()}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon ctr">📈</div>
          <div className="metric-content">
            <h4>Average CTR</h4>
            <p className="metric-value">{analytics.averageCTR}%</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon budget">💰</div>
          <div className="metric-content">
            <h4>Total Spend</h4>
            <p className="metric-value">${analytics.totalSpend.toFixed(2)}</p>
            <small>of ${analytics.totalBudget.toFixed(2)}</small>
          </div>
        </div>
      </div>

      {/* Campaign Status Breakdown */}
      <div className="analytics-section">
        <h3>Campaign Status</h3>
        <div className="status-breakdown">
          <div className="status-item">
            <span className="status-label">Active</span>
            <span className="status-count">{analytics.activeCampaigns}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Pending</span>
            <span className="status-count">{analytics.pendingCampaigns}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Completed</span>
            <span className="status-count">{analytics.completedCampaigns}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Total</span>
            <span className="status-count">{analytics.totalCampaigns}</span>
          </div>
        </div>
      </div>

      {/* Performance Over Time Charts */}
      <div className="analytics-section">
        <h3>Performance Over Time</h3>
        
        <div className="chart-container">
          <h4>Impressions & Clicks</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="#667eea" 
                strokeWidth={2}
                name="Impressions"
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#764ba2" 
                strokeWidth={2}
                name="Clicks"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Daily Clicks</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#667eea" name="Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="analytics-section">
        <h3>Top Performing Campaigns</h3>
        <div className="top-campaigns">
          {campaigns
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 5)
            .map(campaign => (
              <div key={campaign._id} className="campaign-performance">
                <div className="campaign-name">
                  <strong>{campaign.title}</strong>
                  <span className={`status-badge status-${campaign.status}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="campaign-stats">
                  <span>{campaign.impressions.toLocaleString()} impressions</span>
                  <span>{campaign.clicks.toLocaleString()} clicks</span>
                  <span className="ctr-badge">{campaign.ctr || 0}% CTR</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
