import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Zimbabwe Wedding Platform</h1>
          <p>Your go-to resource for wedding vendor discovery and booking</p>
          <div className="features">
            <div className="feature">
              <h3>🎯 Vendor Listings</h3>
              <p>Discover planners, caterers, photographers, venues, and more</p>
            </div>
            <div className="feature">
              <h3>⭐ Verified Reviews</h3>
              <p>Read authentic reviews from real couples</p>
            </div>
            <div className="feature">
              <h3>🔍 Search & Shortlist</h3>
              <p>Find and save your favorite vendors</p>
            </div>
            <div className="feature">
              <h3>📅 Booking System</h3>
              <p>Book and manage your vendor services</p>
            </div>
          </div>
        </header>
      </div>
      <Router>
        <div className="App">
          <nav className="main-nav">
            <div className="nav-container">
              <h1 className="nav-logo">ZIM Wedding Platform</h1>
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/advertiser">Advertiser Dashboard</Link></li>
              </ul>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/advertiser" element={<AdvertiserDashboard />} />
            </Routes>
          </main>

          <footer className="main-footer">
            <p>&copy; 2024 Zimbabwe Wedding Platform. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
