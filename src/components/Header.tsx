import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand" onClick={close}>
            <Logo size={38} />
            <div>
              <div className="nav-name">Raintech Hotels</div>
              <div className="nav-sub">Luxury Resorts & Suites</div>
            </div>
          </a>

          <div className="nav-links">
            <a href="#" className="nav-link active" onClick={close}>Accommodations</a>
            <a href="#" className="nav-link" onClick={close}>Dining & Lounge</a>
            <a href="#" className="nav-link" onClick={close}>Amenities</a>
            <a href="#" className="nav-link" onClick={close}>Location</a>
            <a href="#" className="nav-link" onClick={close}>Special Offers</a>
          </div>

          <button
            type="button"
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>

          <button type="button" className="nav-cta">Member Sign In</button>
        </div>

        {/* Mobile menu panel */}
        <div className={`nav-panel${open ? ' open' : ''}`}>
          <a href="#" className="nav-link active" onClick={close}>Accommodations</a>
          <a href="#" className="nav-link" onClick={close}>Dining & Lounge</a>
          <a href="#" className="nav-link" onClick={close}>Amenities</a>
          <a href="#" className="nav-link" onClick={close}>Location</a>
          <a href="#" className="nav-link" onClick={close}>Special Offers</a>
          <button type="button" className="nav-panel-cta" onClick={close}>Member Sign In</button>
        </div>
      </nav>

      {open && <div className="nav-overlay" onClick={close} />}
    </>
  );
};
