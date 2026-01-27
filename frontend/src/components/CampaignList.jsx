import React from 'react';
import './CampaignList.css';

const CampaignList = ({ campaigns, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div className="loading">Loading campaigns...</div>;
  }

  if (campaigns.length === 0) {
    return (
      <div className="empty-state">
        <h3>No campaigns yet</h3>
        <p>Create your first campaign to get started!</p>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="campaign-list">
      <table className="campaign-table">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Type</th>
            <th>Placement</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Budget</th>
            <th>Spend</th>
            <th>Performance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>
                <div className="campaign-info">
                  <strong>{campaign.title}</strong>
                  {campaign.description && (
                    <small>{campaign.description.substring(0, 50)}...</small>
                  )}
                </div>
              </td>
              <td>
                <span className="type-badge">{campaign.adType}</span>
              </td>
              <td>{campaign.adPlacement}</td>
              <td>
                <span className={getStatusClass(campaign.status)}>
                  {campaign.status}
                </span>
              </td>
              <td>
                <div className="date-range">
                  <small>{formatDate(campaign.startDate)}</small>
                  <small>to {formatDate(campaign.endDate)}</small>
                </div>
              </td>
              <td>{formatCurrency(campaign.budget)}</td>
              <td>
                <div className="spend-info">
                  {formatCurrency(campaign.spend)}
                  <small>
                    {campaign.budget > 0 
                      ? `${((campaign.spend / campaign.budget) * 100).toFixed(1)}%`
                      : '0%'
                    }
                  </small>
                </div>
              </td>
              <td>
                <div className="performance-metrics">
                  <small>{campaign.impressions} impressions</small>
                  <small>{campaign.clicks} clicks</small>
                  <small>CTR: {campaign.ctr || 0}%</small>
                </div>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-edit" 
                    onClick={() => onEdit(campaign)}
                    title="Edit campaign"
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => onDelete(campaign._id)}
                    title="Delete campaign"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignList;
