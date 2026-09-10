import React from 'react';
import { Hotel, Phone, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <div className="top-info-item">
              <span className="gold-star-badge">★ ★ ★ ★ ★</span>
              <span>FIVE-STAR LUXURY RESORT</span>
            </div>
            <div className="top-info-item">
              <Phone size={13} />
              <span>Reservations: +91 1800-RAINTECH</span>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="top-info-item">
              <ShieldCheck size={13} />
              <span>Best Rate Guarantee</span>
            </div>
            <div className="top-info-item">
              <span>INR (₹)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-nav-bar">
        <div className="header-nav-inner">
          <a href="#" className="brand-container">
            <div className="brand-logo-crest">
              <Hotel size={24} />
            </div>
            <div>
              <div className="brand-title-text">Raintech Stays</div>
              <div className="brand-subtitle-text">Hotels & Resorts</div>
            </div>
          </a>

          <nav className="nav-links-group">
            <a href="#" className="nav-item-link active">Accommodations</a>
            <a href="#" className="nav-item-link">Dining & Spa</a>
            <a href="#" className="nav-item-link">Special Offers</a>
            <a href="#" className="nav-item-link">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};
