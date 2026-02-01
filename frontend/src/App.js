import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import './App.css';

function App() {
  return (
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
  );
}

export default App;
