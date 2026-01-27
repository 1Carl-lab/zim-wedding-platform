import React from 'react';
import './App.css';

function App() {
  return (
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
  );
}

export default App;
