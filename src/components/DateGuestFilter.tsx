import React from 'react';
import { DateValidationResult } from '../types/booking';
import { addDays, calculateNights } from '../utils/bookingLogic';

interface Props {
  checkIn: string;
  checkOut: string;
  guests: number;
  onCheckIn: (v: string) => void;
  onCheckOut: (v: string) => void;
  onGuestsChange: (v: number) => void;
  validation: DateValidationResult;
  minDate: string;
}

export const DateGuestFilter: React.FC<Props> = ({
  checkIn,
  checkOut,
  guests,
  onCheckIn,
  onCheckOut,
  onGuestsChange,
  validation,
  minDate,
}) => {
  const nights = checkIn && checkOut && validation.isValid ? calculateNights(checkIn, checkOut) : 0;

  const handleCheckInChange = (val: string) => {
    onCheckIn(val);
    if (!val) return;
    // Auto-advance check-out if empty or if checkout <= checkin
    if (!checkOut || checkOut <= val) {
      onCheckOut(addDays(val, 1));
    }
  };

  const handleCheckOutChange = (val: string) => {
    onCheckOut(val);
    if (!val) return;
    if (!checkIn) {
      const prev = addDays(val, -1);
      onCheckIn(prev >= minDate ? prev : minDate);
    } else if (val <= checkIn) {
      const prev = addDays(val, -1);
      if (prev >= minDate) {
        onCheckIn(prev);
      }
    }
  };

  const preset = (n: number) => {
    const start = checkIn && checkIn >= minDate ? checkIn : minDate;
    const end = addDays(start, n);
    onCheckIn(start);
    onCheckOut(end);
  };

  // Check-out must be at least 1 day after check-in (or tomorrow)
  const minCheckOut = checkIn ? addDays(checkIn, 1) : addDays(minDate, 1);

  return (
    <div className="sw-wrap">
      <div className="sw-card">
        <div className="sw-head">
          <div className="sw-head-left">
            <span className="sw-dot" />
            <span className="sw-head-title">Select Dates & Guests</span>
            {nights > 0 && (
              <span className="sw-nights-pill">
                🌙 {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
            )}
          </div>
          <span className="sw-direct-perk">✓ Best Rate Guarantee · Free Cancellation</span>
        </div>

        <div className="sw-grid-simple">
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
                onChange={e => handleCheckInChange(e.target.value)}
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
                min={minCheckOut}
                onChange={e => handleCheckOutChange(e.target.value)}
              />
            </div>
          </div>

          {/* Clean, Simple Guests Selector */}
          <div className="sw-field">
            <label htmlFor="gs" className="sw-label">Number of Guests</label>
            <div className="sw-inp-wrap">
              <svg className="sw-inp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <select
                id="gs"
                className="sw-inp sw-select"
                value={guests}
                onChange={e => onGuestsChange(Number(e.target.value))}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stay Presets & Reset */}
        <div className="sw-foot">
          <span className="sw-ql">Quick Stay:</span>
          <div className="sw-preset-group">
            {[1, 2, 3, 5, 7].map(n => (
              <button key={n} type="button" className="sw-btn" onClick={() => preset(n)}>
                {n} {n === 1 ? 'Night' : 'Nights'}
              </button>
            ))}
          </div>
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

        {/* Validation error message ONLY when dates are invalid (never by default) */}
        {!validation.isValid && validation.message && validation.errorType !== 'MISSING_DATE' && (
          <div className="sw-err" role="alert">⚠ {validation.message}</div>
        )}
      </div>
    </div>
  );
};
