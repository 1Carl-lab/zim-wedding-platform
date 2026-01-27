import React, { useEffect, useState } from 'react';
import { adService } from '../services/api';
import './AdBanner.css';

const AdBanner = ({ placement = 'homepage', adType = 'banner' }) => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAd();
  }, [placement, adType]);

  const fetchAd = async () => {
    try {
      // Fetch active ads for this placement
      const response = await adService.getAllCampaigns({
        status: 'active',
        adPlacement: placement,
        adType: adType
      });

      if (response.success && response.data.length > 0) {
        // Get a random active ad from the results
        const randomAd = response.data[Math.floor(Math.random() * response.data.length)];
        setAd(randomAd);
        
        // Record impression
        await adService.recordImpression(randomAd._id);
      }
    } catch (error) {
      console.error('Error fetching ad:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdClick = async () => {
    if (ad && ad._id) {
      try {
        // Record click
        await adService.recordClick(ad._id);
        
        // Redirect to target URL
        if (ad.targetURL) {
          window.open(ad.targetURL, '_blank', 'noopener,noreferrer');
        }
      } catch (error) {
        console.error('Error recording click:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="ad-banner-placeholder">
        <p>Loading advertisement...</p>
      </div>
    );
  }

  if (!ad) {
    return null; // Don't show anything if no ad is available
  }

  return (
    <div className="ad-banner-container">
      <div className="ad-banner" onClick={handleAdClick}>
        {ad.adContent.startsWith('http') ? (
          <img 
            src={ad.adContent} 
            alt={ad.title}
            className="ad-banner-image"
          />
        ) : (
          <div 
            className="ad-banner-content"
            dangerouslySetInnerHTML={{ __html: ad.adContent }}
          />
        )}
        <div className="ad-banner-overlay">
          <h3>{ad.title}</h3>
          {ad.description && <p>{ad.description}</p>}
        </div>
      </div>
      <small className="ad-label">Advertisement</small>
    </div>
  );
};

export default AdBanner;
