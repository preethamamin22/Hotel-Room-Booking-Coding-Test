import React from 'react';
import { Hotel, Phone, Globe, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-utility-bar">
        <div className="utility-container">
          <div className="utility-left">
            <div className="utility-item">
              <Phone size={13} />
              <span>+91 (080) 4567-8900</span>
            </div>
            <div className="utility-item">
              <Shield size={13} />
              <span>Official Best Rate Guarantee</span>
            </div>
          </div>
          <div className="utility-right">
            <div className="utility-item">
              <Globe size={13} />
              <span>INR (₹)</span>
            </div>
            <span>Need Help?</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#" className="brand-logo">
            <div className="brand-icon-box">
              <Hotel size={22} />
            </div>
            <div>
              <div className="brand-name">Raintech Hotels</div>
              <div className="brand-tagline">Luxury Stays & Accommodations</div>
            </div>
          </a>

          <nav className="main-nav">
            <a href="#" className="nav-link active">Rooms & Suites</a>
            <a href="#" className="nav-link">Amenities</a>
            <a href="#" className="nav-link">Offers</a>
            <a href="#" className="nav-link">Location</a>
          </nav>
        </div>
      </header>
    </>
  );
};
