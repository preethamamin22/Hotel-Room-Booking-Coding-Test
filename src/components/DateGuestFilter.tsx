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

  const preset = (n: number) => {
    const base = new Date((checkIn || minDate) + 'T00:00:00');
    const end = new Date(base);
    end.setDate(end.getDate() + n);
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    if (!checkIn) onCheckIn(fmt(base));
    onCheckOut(fmt(end));
  };

  const guestLabel = `${adults} Adult${adults > 1 ? 's' : ''}${childrenCount > 0 ? ` · ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}`;

  return (
    <div className="sw-wrap">
      <div className="sw-card">
        <div className="sw-head">
          <div className="sw-head-left">
            <span className="sw-dot" />
            <span className="sw-head-title">Plan Your Luxury Stay</span>
          </div>
          <span className="sw-direct-perk">✓ Best Direct Booking Rates Guaranteed</span>
        </div>

        <div className="sw-grid">
          {/* Check-in Date */}
          <div className="sw-field">
            <label htmlFor="ci" className="sw-label">Check-in Date</label>
            <div className="sw-inp-wrap">
              <svg className="sw-inp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <input
                id="ci"
                type="date"
                className={`sw-inp${validation.errorType === 'PAST_DATE' ? ' err' : ''}`}
                value={checkIn}
                min={minDate}
                onChange={e => onCheckIn(e.target.value)}
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="sw-field">
            <label htmlFor="co" className="sw-label">Check-out Date</label>
            <div className="sw-inp-wrap">
              <svg className="sw-inp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <input
                id="co"
                type="date"
                className={`sw-inp${validation.errorType === 'INVALID_RANGE' ? ' err' : ''}`}
                value={checkOut}
                min={checkIn || minDate}
                onChange={e => onCheckOut(e.target.value)}
              />
            </div>
          </div>

          {/* Occupancy Stepper (Booking.com style) */}
          <div className="sw-field" ref={popoverRef} style={{ position: 'relative' }}>
            <label className="sw-label">Guests</label>
            <div className="sw-inp-wrap">
              <svg className="sw-inp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <button
                type="button"
                className="sw-inp sw-guest-btn"
                onClick={() => setPopoverOpen(v => !v)}
                aria-expanded={popoverOpen}
              >
                <span className="sw-guest-text">{guestLabel}</span>
                <span className="sw-caret">▾</span>
              </button>
            </div>

            {popoverOpen && (
              <div className="sw-popover">
                <div className="sw-popover-row">
                  <div>
                    <div className="sw-popover-lbl">Adults</div>
                    <div className="sw-popover-sub">Age 13 or above</div>
                  </div>
                  <div className="sw-stepper">
                    <button
                      type="button"
                      className="sw-step-btn"
                      disabled={adults <= 1}
                      onClick={() => onAdultsChange(Math.max(1, adults - 1))}
                    >
                      –
                    </button>
                    <span className="sw-step-val">{adults}</span>
                    <button
                      type="button"
                      className="sw-step-btn"
                      disabled={adults >= 4}
                      onClick={() => onAdultsChange(Math.min(4, adults + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="sw-popover-row">
                  <div>
                    <div className="sw-popover-lbl">Children</div>
                    <div className="sw-popover-sub">Age 0 to 12</div>
                  </div>
                  <div className="sw-stepper">
                    <button
                      type="button"
                      className="sw-step-btn"
                      disabled={childrenCount <= 0}
                      onClick={() => onChildrenChange(Math.max(0, childrenCount - 1))}
                    >
                      –
                    </button>
                    <span className="sw-step-val">{childrenCount}</span>
                    <button
                      type="button"
                      className="sw-step-btn"
                      disabled={childrenCount >= 3}
                      onClick={() => onChildrenChange(Math.min(3, childrenCount + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="sw-popover-foot">
                  <button
                    type="button"
                    className="sw-popover-done"
                    onClick={() => setPopoverOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="sw-field">
            <label className="sw-label" style={{ visibility: 'hidden' }}>Search</label>
            <button
              type="button"
              className="sw-search-btn"
              onClick={onSearch}
            >
              <span>Search Rates</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="sw-foot">
          <span className="sw-ql">Quick Select:</span>
          {[1, 2, 3, 5, 7].map(n => (
            <button key={n} type="button" className="sw-btn" onClick={() => preset(n)}>
              {n} {n === 1 ? 'Night' : 'Nights'}
            </button>
          ))}
          {(checkIn || checkOut) && (
            <button
              type="button"
              className="sw-btn clear"
              onClick={() => { onCheckIn(''); onCheckOut(''); }}
            >
              ↺ Reset Dates
            </button>
          )}
        </div>

        {!validation.isValid && validation.message && (
          <div className="sw-err" role="alert">⚠ {validation.message}</div>
        )}
      </div>
    </div>
  );
};
