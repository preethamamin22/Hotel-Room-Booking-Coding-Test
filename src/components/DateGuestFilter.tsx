import React from 'react';
import { Calendar, Users, AlertCircle, RotateCcw } from 'lucide-react';
import { DateValidationResult } from '../types/booking';

interface Props {
  checkIn: string;
  checkOut: string;
  guests: number;
  onCheckInChange: (v: string) => void;
  onCheckOutChange: (v: string) => void;
  onGuestsChange: (v: number) => void;
  validation: DateValidationResult;
  minDate: string;
}

export const DateGuestFilter: React.FC<Props> = ({
  checkIn, checkOut, guests,
  onCheckInChange, onCheckOutChange, onGuestsChange,
  validation, minDate,
}) => {
  const applyPreset = (nights: number) => {
    const base = checkIn ? new Date(checkIn + 'T00:00:00') : new Date(minDate + 'T00:00:00');
    const end  = new Date(base);
    end.setDate(end.getDate() + nights);
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    if (!checkIn) onCheckInChange(fmt(base));
    onCheckOutChange(fmt(end));
  };

  const reset = () => { onCheckInChange(''); onCheckOutChange(''); };

  return (
    <div className="search-zone">
      <div className="search-lift">
        <div className="search-box">
          <div className="search-box__head">
            <span className="search-box__dot" />
            <span className="search-box__title">Plan Your Stay</span>
          </div>

          <div className="search-row">
            {/* Check-in */}
            <div className="sf">
              <label htmlFor="checkin" className="sf__label">Check-in Date</label>
              <div className="sf__wrap">
                <Calendar size={16} className="sf__icon" />
                <input
                  id="checkin"
                  type="date"
                  className={`sf__control${validation.errorType === 'PAST_DATE' ? ' sf__control--err' : ''}`}
                  value={checkIn}
                  min={minDate}
                  onChange={e => onCheckInChange(e.target.value)}
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="sf">
              <label htmlFor="checkout" className="sf__label">Check-out Date</label>
              <div className="sf__wrap">
                <Calendar size={16} className="sf__icon" />
                <input
                  id="checkout"
                  type="date"
                  className={`sf__control${validation.errorType === 'INVALID_RANGE' ? ' sf__control--err' : ''}`}
                  value={checkOut}
                  min={checkIn || minDate}
                  onChange={e => onCheckOutChange(e.target.value)}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="sf">
              <label htmlFor="guests" className="sf__label">Guests</label>
              <div className="sf__wrap">
                <Users size={16} className="sf__icon" />
                <select
                  id="guests"
                  className="sf__control"
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

          {/* Quick presets */}
          <div className="search-foot">
            <span className="sf-label">Quick Stay:</span>
            {[1, 2, 3, 5, 7].map(n => (
              <button key={n} type="button" className="quick-btn" onClick={() => applyPreset(n)}>
                {n} {n === 1 ? 'Night' : 'Nights'}
              </button>
            ))}
            {(checkIn || checkOut) && (
              <button type="button" className="quick-btn quick-btn--clear" onClick={reset}>
                <RotateCcw size={11} /> Clear
              </button>
            )}
          </div>

          {!validation.isValid && validation.message && (
            <div className="search-error" role="alert">
              <AlertCircle size={16} /> {validation.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
