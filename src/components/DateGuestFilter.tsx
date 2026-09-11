import React, { useState, useRef, useEffect } from 'react';
import { DateValidationResult } from '../types/booking';

interface Props {
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  onCheckIn: (v: string) => void;
  onCheckOut: (v: string) => void;
  onAdultsChange: (v: number) => void;
  onChildrenChange: (v: number) => void;
  onSearch: () => void;
  validation: DateValidationResult;
  minDate: string;
}

export const DateGuestFilter: React.FC<Props> = ({
  checkIn,
  checkOut,
  adults,
  childrenCount,
  onCheckIn,
  onCheckOut,
  onAdultsChange,
  onChildrenChange,
  onSearch,
  validation,
  minDate,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const guestSummary = `${adults} adult${adults > 1 ? 's' : ''} · ${childrenCount} child${childrenCount !== 1 ? 'ren' : ''} · 1 room`;

  return (
    <div className="b-search-wrap">
      <div className="b-search-box">
        {/* Destination / Hotel (Booking.com style) */}
        <div className="b-search-field">
          <span className="b-field-icon">🛏️</span>
          <div>
            <div className="b-search-text">Raintech Grand Stays & Suites</div>
            <div className="b-search-sub">Palace Road, Bengaluru, India</div>
          </div>
        </div>

        {/* Stay Dates (Combined calendar pill) */}
        <div className="b-search-field">
          <span className="b-field-icon">📅</span>
          <div className="b-date-inputs">
            <input
              id="ci"
              type="date"
              className="b-date-inp"
              value={checkIn}
              min={minDate}
              title="Check-in date"
              onChange={e => onCheckIn(e.target.value)}
            />
            <span className="b-date-sep">—</span>
            <input
              id="co"
              type="date"
              className="b-date-inp"
              value={checkOut}
              min={checkIn || minDate}
              title="Check-out date"
              onChange={e => onCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* Occupancy / Guest Stepper Popover */}
        <div className="b-search-field" ref={popoverRef}>
          <span className="b-field-icon">👤</span>
          <button
            type="button"
            className="b-guest-btn"
            onClick={() => setPopoverOpen(v => !v)}
            aria-expanded={popoverOpen}
          >
            <span className="b-guest-label">{guestSummary}</span>
            <span className="b-guest-arrow">▾</span>
          </button>

          {popoverOpen && (
            <div className="b-popover">
              <div className="b-popover-row">
                <div>
                  <div className="b-popover-title">Adults</div>
                  <div className="b-popover-sub">Ages 13 or above</div>
                </div>
                <div className="b-stepper">
                  <button
                    type="button"
                    className="b-step-btn"
                    disabled={adults <= 1}
                    onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                  >
                    –
                  </button>
                  <span className="b-step-val">{adults}</span>
                  <button
                    type="button"
                    className="b-step-btn"
                    disabled={adults >= 4}
                    onClick={() => onAdultsChange(Math.min(4, adults + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="b-popover-row">
                <div>
                  <div className="b-popover-title">Children</div>
                  <div className="b-popover-sub">Ages 0 to 12</div>
                </div>
                <div className="b-stepper">
                  <button
                    type="button"
                    className="b-step-btn"
                    disabled={childrenCount <= 0}
                    onClick={() => onChildrenChange(Math.max(0, childrenCount - 1))}
                  >
                    –
                  </button>
                  <span className="b-step-val">{childrenCount}</span>
                  <button
                    type="button"
                    className="b-step-btn"
                    disabled={childrenCount >= 3}
                    onClick={() => onChildrenChange(Math.min(3, childrenCount + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="b-popover-row">
                <div>
                  <div className="b-popover-title">Rooms</div>
                  <div className="b-popover-sub">1 private room</div>
                </div>
                <span style={{ fontSize: '.88rem', fontWeight: 600 }}>1</span>
              </div>

              <button
                type="button"
                className="b-popover-done"
                onClick={() => setPopoverOpen(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Big Blue Search Action Button */}
        <button
          type="button"
          className="b-search-btn"
          onClick={onSearch}
        >
          Search
        </button>
      </div>

      {!validation.isValid && validation.message && (
        <div style={{
          marginTop: 10,
          background: 'var(--b-red-bg)',
          color: 'var(--b-red)',
          padding: '10px 14px',
          borderRadius: 6,
          border: '1px solid #f8b4b4',
          fontSize: '.84rem',
          fontWeight: 600,
        }}>
          ⚠ {validation.message}
        </div>
      )}
    </div>
  );
};
