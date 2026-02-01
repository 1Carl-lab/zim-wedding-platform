import React, { useState, useEffect } from 'react';
import './CampaignForm.css';

const CampaignForm = ({ campaign, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    adType: 'banner',
    adContent: '',
    adPlacement: 'homepage',
    targetURL: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title || '',
        description: campaign.description || '',
        adType: campaign.adType || 'banner',
        adContent: campaign.adContent || '',
        adPlacement: campaign.adPlacement || 'homepage',
        targetURL: campaign.targetURL || '',
        startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
        endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
        budget: campaign.budget || ''
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.adContent.trim()) {
      newErrors.adContent = 'Ad content is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate && formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ...formData,
        budget: parseFloat(formData.budget)
      });
    }
  };

  return (
    <div className="campaign-form-container">
      <h3>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</h3>
      
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Campaign Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter campaign title"
              maxLength={100}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget ($) *</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.budget && <span className="error">{errors.budget}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your campaign"
            rows="3"
            maxLength={500}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="adType">Ad Type *</label>
            <select
              id="adType"
              name="adType"
              value={formData.adType}
              onChange={handleChange}
            >
              <option value="banner">Banner</option>
              <option value="sponsored_listing">Sponsored Listing</option>
              <option value="featured_vendor">Featured Vendor</option>
              <option value="sidebar">Sidebar</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="adPlacement">Ad Placement *</label>
            <select
              id="adPlacement"
              name="adPlacement"
              value={formData.adPlacement}
              onChange={handleChange}
            >
              <option value="homepage">Homepage</option>
              <option value="category_page">Category Page</option>
              <option value="vendor_listing">Vendor Listing</option>
              <option value="search_results">Search Results</option>
              <option value="sidebar">Sidebar</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="adContent">Ad Content (Image URL or HTML) *</label>
          <input
            type="text"
            id="adContent"
            name="adContent"
            value={formData.adContent}
            onChange={handleChange}
            placeholder="https://example.com/banner.jpg or HTML content"
          />
          {errors.adContent && <span className="error">{errors.adContent}</span>}
          <small className="help-text">
            Provide a URL to an image/video or enter HTML content for the ad
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="targetURL">Target URL</label>
          <input
            type="url"
            id="targetURL"
            name="targetURL"
            value={formData.targetURL}
            onChange={handleChange}
            placeholder="https://your-website.com"
          />
          <small className="help-text">
            Where users will be directed when clicking the ad
          </small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date *</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <span className="error">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date *</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <span className="error">{errors.endDate}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {campaign ? 'Update Campaign' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
