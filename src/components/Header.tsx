import React, { useState, useEffect } from 'react';
import { Hotel, Phone, MapPin, ShieldCheck, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize back to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
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
      <nav className={`nav${menuOpen ? ' nav--open' : ''}`}>
        <div className="nav__inner">
          <a href="#" className="nav__brand" onClick={() => setMenuOpen(false)}>
            <div className="nav__crest"><Hotel size={22} /></div>
            <div>
              <div className="nav__name">Raintech Hotels</div>
              <div className="nav__tagline">Hotels & Luxury Resorts</div>
            </div>
          </a>

          {/* Desktop nav + Mobile overlay nav */}
          <div className="nav__links">
            <a href="#" className="nav__link active" onClick={() => setMenuOpen(false)}>Accommodations</a>
            <a href="#" className="nav__link" onClick={() => setMenuOpen(false)}>Dining & Spa</a>
            <a href="#" className="nav__link" onClick={() => setMenuOpen(false)}>Amenities</a>
            <a href="#" className="nav__link" onClick={() => setMenuOpen(false)}>Location</a>
            <a href="#" className="nav__link" onClick={() => setMenuOpen(false)}>Offers</a>
          </div>

          {/* Hamburger toggle */}
          <button
            className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <X size={20} color="var(--text-primary)" />
              : <>
                  <span className="hamburger__line" />
                  <span className="hamburger__line" />
                  <span className="hamburger__line" />
                </>
            }
          </button>

          <button className="nav__cta">Member Login</button>
        </div>
      </nav>

      {/* Overlay backdrop (mobile only) */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15,15,26,.4)',
            zIndex: 98, backdropFilter: 'blur(2px)',
          }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};
