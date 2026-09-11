import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Utility bar */}
      <div className="tb">
        <div className="tb-inner">
          <div className="tb-left">
            <div className="tb-item"><span className="tb-stars">★ ★ ★ ★ ★</span></div>
            <div className="tb-sep" />
            <div className="tb-item">📞 Reservations: +91 1800-RAINTECH</div>
            <div className="tb-item">📍 Bengaluru, Karnataka, India</div>
          </div>
          <div className="tb-right">
            <div className="tb-item">✓ Best Rate Guarantee</div>
            <div className="tb-sep" />
            <div className="tb-item" style={{ color: '#c9943a', fontWeight: 700 }}>INR ₹</div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand" onClick={close}>
            <div className="nav-logo">🏨</div>
            <div>
              <div className="nav-name">Raintech Hotels</div>
              <div className="nav-sub">Hotels & Luxury Resorts</div>
            </div>
          </a>

          <div className="nav-links">
            <a href="#" className="nav-link active" onClick={close}>Accommodations</a>
            <a href="#" className="nav-link" onClick={close}>Dining & Spa</a>
            <a href="#" className="nav-link" onClick={close}>Amenities</a>
            <a href="#" className="nav-link" onClick={close}>Location</a>
            <a href="#" className="nav-link" onClick={close}>Offers</a>
          </div>

          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          <button className="nav-cta">Member Login</button>
        </div>

        {/* Mobile panel */}
        <div className={`nav-panel${open ? ' open' : ''}`}>
          <a href="#" className="nav-link active" onClick={close}>Accommodations</a>
          <a href="#" className="nav-link" onClick={close}>Dining & Spa</a>
          <a href="#" className="nav-link" onClick={close}>Amenities</a>
          <a href="#" className="nav-link" onClick={close}>Location</a>
          <a href="#" className="nav-link" onClick={close}>Offers</a>
        </div>
      </nav>

      {open && <div className="nav-overlay" onClick={close} />}
    </>
  );
};
