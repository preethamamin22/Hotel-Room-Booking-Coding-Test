import React from 'react';
import { Hotel, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => (
  <>
    {/* ── Utility bar ── */}
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__group">
          <div className="topbar__item">
            <span className="topbar__stars">★ ★ ★ ★ ★</span>
          </div>
          <div className="topbar__sep" />
          <div className="topbar__item">
            <Phone size={11} />
            <span>Reservations: +91 1800-RAINTECH</span>
          </div>
          <div className="topbar__item">
            <MapPin size={11} />
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </div>
        <div className="topbar__group">
          <div className="topbar__item">
            <ShieldCheck size={11} />
            <span>Best Rate Guarantee</span>
          </div>
          <div className="topbar__sep" />
          <span className="topbar__currency">INR ₹</span>
        </div>
      </div>
    </div>

    {/* ── Navbar ── */}
    <nav className="nav">
      <div className="nav__inner">
        <a href="#" className="nav__brand">
          <div className="nav__crest"><Hotel size={22} /></div>
          <div>
            <div className="nav__name">Raintech Hotels</div>
            <div className="nav__tagline">Hotels & Luxury Resorts</div>
          </div>
        </a>

        <div className="nav__links">
          <a href="#" className="nav__link active">Accommodations</a>
          <a href="#" className="nav__link">Dining & Spa</a>
          <a href="#" className="nav__link">Amenities</a>
          <a href="#" className="nav__link">Location</a>
          <a href="#" className="nav__link">Offers</a>
        </div>

        <button className="nav__cta">Member Login</button>
      </div>
    </nav>
  </>
);
