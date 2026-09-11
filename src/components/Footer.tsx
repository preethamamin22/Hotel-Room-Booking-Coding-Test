import React from 'react';
import { Hotel } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer__inner">
      {/* Brand */}
      <div>
        <div className="footer__logo-row">
          <div className="footer__logo-icon"><Hotel size={18} /></div>
          <span className="footer__logo-name">Raintech Hotels</span>
        </div>
        <p className="footer__desc">
          A collection of five-star luxury properties offering unmatched
          hospitality across India's most premier destinations.
        </p>
        <div className="footer__stars">★ ★ ★ ★ ★</div>
      </div>

      {/* Accommodations */}
      <div>
        <div className="footer__col-title">Accommodations</div>
        <div className="footer__links">
          <a href="#" className="footer__link">Deluxe Rooms</a>
          <a href="#" className="footer__link">Executive Suites</a>
          <a href="#" className="footer__link">Family Rooms</a>
          <a href="#" className="footer__link">Presidential Suite</a>
        </div>
      </div>

      {/* Services */}
      <div>
        <div className="footer__col-title">Hotel Services</div>
        <div className="footer__links">
          <a href="#" className="footer__link">Fine Dining</a>
          <a href="#" className="footer__link">Spa & Wellness</a>
          <a href="#" className="footer__link">Business Centre</a>
          <a href="#" className="footer__link">Concierge</a>
        </div>
      </div>

      {/* Contact */}
      <div>
        <div className="footer__col-title">Contact Us</div>
        <div className="footer__links">
          <span className="footer__link">reservations@raintech.in</span>
          <span className="footer__link">+91 1800-RAINTECH</span>
          <span className="footer__link">Palace Road, Bengaluru</span>
          <span className="footer__link">Karnataka 560001, India</span>
        </div>
      </div>
    </div>

    <div className="footer__bar">
      <span className="footer__copy">
        © 2026 Raintech Hotels & Resorts Pvt. Ltd. · Developer Skills Assessment
      </span>
      <div className="footer__legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Cookie Preferences</a>
      </div>
    </div>
  </footer>
);
