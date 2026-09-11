import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <div className="footer-logo-row">
          <Logo size={36} />
          <span className="footer-name">Raintech Hotels</span>
        </div>
        <p className="footer-desc">A collection of five-star luxury properties offering unmatched hospitality across premier destinations.</p>
        <div className="footer-stars">★ ★ ★ ★ ★</div>
      </div>

      <div>
        <div className="footer-col-title">Accommodations</div>
        <div className="footer-links">
          {['Deluxe Rooms','Executive Suites','Family Rooms','Presidential Suite'].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
      </div>

      <div>
        <div className="footer-col-title">Hotel Services</div>
        <div className="footer-links">
          {['Fine Dining','Spa & Wellness','Business Centre','Concierge'].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
      </div>

      <div>
        <div className="footer-col-title">Contact Us</div>
        <div className="footer-links">
          <span className="footer-link">reservations@raintech.in</span>
          <span className="footer-link">+91 1800-RAINTECH</span>
          <span className="footer-link">Palace Road, Bengaluru</span>
          <span className="footer-link">Karnataka 560001, India</span>
        </div>
      </div>
    </div>

    <div className="footer-bar">
      <span className="footer-copy">© 2026 Raintech Hotels & Resorts Pvt. Ltd. All rights reserved.</span>
      <div className="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Cookie Preferences</a>
      </div>
    </div>
  </footer>
);
