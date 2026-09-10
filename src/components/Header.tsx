import React from 'react';
import { Hotel, Phone, ShieldCheck, MapPin } from 'lucide-react';

export const Header: React.FC = () => (
  <>
    {/* ── Top utility bar ── */}
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__left">
          <div className="topbar__item">
            <span className="topbar__stars">★ ★ ★ ★ ★</span>
            <span style={{ color: 'rgba(255,255,255,.45)', fontSize: '.7rem', marginLeft: 4 }}>LUXURY COLLECTION</span>
          </div>
          <div className="topbar__item">
            <Phone size={12} />
            <span>Reservations: +91 1800-RAINTECH</span>
          </div>
          <div className="topbar__item">
            <MapPin size={12} />
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </div>
        <div className="topbar__right">
          <div className="topbar__item">
            <ShieldCheck size={12} />
            <span>Best Rate Guarantee</span>
          </div>
          <div className="topbar__item" style={{ color: '#e8b52a', fontWeight: 700 }}>
            INR ₹
          </div>
        </div>
      </div>
    </div>

    {/* ── Main navbar ── */}
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__brand">
          <div className="navbar__logo">
            <Hotel size={22} />
          </div>
          <div>
            <div className="navbar__name">Raintech Hotels</div>
            <div className="navbar__tagline">Hotels & Luxury Resorts</div>
          </div>
        </a>

        <div className="navbar__nav">
          <a href="#" className="navbar__link navbar__link--active">Accommodations</a>
          <a href="#" className="navbar__link">Dining & Spa</a>
          <a href="#" className="navbar__link">Amenities</a>
          <a href="#" className="navbar__link">Location</a>
          <a href="#" className="navbar__link">Offers</a>
        </div>

        <button className="navbar__cta">Member Login</button>
      </div>
    </nav>
  </>
);
