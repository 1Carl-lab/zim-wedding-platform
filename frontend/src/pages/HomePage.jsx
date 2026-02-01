import React from 'react';
import AdBanner from '../components/AdBanner';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Zimbabwe Wedding Platform</h1>
        <p>Your complete guide to planning the perfect wedding</p>
      </header>

      {/* Homepage Banner Ad */}
      <section className="ad-section">
        <AdBanner placement="homepage" adType="banner" />
      </section>

      <section className="content-section">
        <h2>Featured Vendors</h2>
        <div className="vendor-grid">
          <div className="vendor-card">
            <h3>Elegant Venues</h3>
            <p>Find the perfect location for your special day</p>
          </div>
          <div className="vendor-card">
            <h3>Photography Services</h3>
            <p>Capture memories that last forever</p>
          </div>
          <div className="vendor-card">
            <h3>Catering Excellence</h3>
            <p>Delicious meals for your guests</p>
          </div>
        </div>
      </section>

      {/* Sidebar Ad */}
      <aside className="sidebar">
        <AdBanner placement="sidebar" adType="sidebar" />
      </aside>
    </div>
  );
};

export default HomePage;
