import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="b-header">
      {/* Top Navbar */}
      <div className="b-header-top">
        <a href="#" className="b-brand">
          <span>Raintech</span>
          <span className="b-brand-dot">.com</span>
        </a>

        <div className="b-header-nav">
          <button type="button" className="b-nav-pill">
            <span>INR</span>
          </button>
          <button type="button" className="b-nav-pill" title="India">
            <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
          </button>
          <button type="button" className="b-nav-pill" title="Customer Service Help">
            <span style={{ fontSize: '1rem' }}>?</span>
          </button>
          <button type="button" className="b-nav-pill border">
            List your property
          </button>
          <button type="button" className="b-btn-white">
            Register
          </button>
          <button type="button" className="b-btn-white">
            Sign in
          </button>
        </div>
      </div>

      {/* Product Categories Tab Bar */}
      <nav className="b-header-cats" aria-label="Product categories">
        <a href="#" className="b-cat-tab active">
          <span>🛏️</span>
          <span>Stays</span>
        </a>
        <a href="#" className="b-cat-tab">
          <span>✈️</span>
          <span>Flights</span>
        </a>
        <a href="#" className="b-cat-tab">
          <span>🏨✈️</span>
          <span>Flight + Hotel</span>
        </a>
        <a href="#" className="b-cat-tab">
          <span>🚗</span>
          <span>Car rentals</span>
        </a>
        <a href="#" className="b-cat-tab">
          <span>🎡</span>
          <span>Attractions</span>
        </a>
        <a href="#" className="b-cat-tab">
          <span>🚕</span>
          <span>Airport taxis</span>
        </a>
      </nav>
    </header>
  );
};
