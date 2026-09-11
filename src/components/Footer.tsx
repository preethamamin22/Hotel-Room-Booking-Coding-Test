import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-grid">
      {/* Column 1: Brand and Details */}
      <div className="footer-brand-col">
        <div className="footer-logo-row">
          <Logo size={30} />
          <div>
            <div className="footer-name">Raintech Hotels</div>
            <div className="footer-sub">Luxury Resorts & Suites</div>
          </div>
        </div>
        <p className="footer-desc">
          Five-star luxury properties delivering timeless hospitality and bespoke stays across premier destinations.
        </p>
        <div className="footer-contact">
          <span>reservations@raintech.in</span>
          <span className="footer-dot">•</span>
          <span>+91 1800-RAINTECH</span>
          <span className="footer-dot">•</span>
          <span>Bengaluru, India</span>
        </div>
      </div>

      {/* Column 2: Navigation and Services */}
      <div className="footer-links-col">
        <div className="footer-link-group">
          <div className="footer-col-title">Accommodations</div>
          <div className="footer-links">
            {['Deluxe King', 'Executive Suite', 'Ocean Breeze', 'Presidential Suite'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </div>

        <div className="footer-link-group">
          <div className="footer-col-title">Services & Info</div>
          <div className="footer-links">
            {['Dining & Lounge', 'Spa & Wellness', 'Special Offers', 'Privacy & Terms'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bar">
      <span className="footer-copy">© 2026 Raintech Hotels & Resorts Pvt. Ltd. All rights reserved.</span>
      <div className="footer-legal">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </footer>
);
