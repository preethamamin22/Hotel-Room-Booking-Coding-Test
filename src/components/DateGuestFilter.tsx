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
    const start = new Date(checkIn || minDate);
    const end = new Date(start);
    end.setDate(end.getDate() + nights);
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    if (!checkIn) onCheckInChange(fmt(start));
    onCheckOutChange(fmt(end));
  };

  const reset = () => { onCheckInChange(''); onCheckOutChange(''); };

  return (
    <div className="search-wrap">
      <div className="search-float">
        <div className="search-card">
          <div className="search-card__label">
            <span className="search-card__label-dot" />
            Plan Your Stay
          </div>

          <div className="search-grid">
            {/* Check-in */}
            <div className="sfield">
              <label htmlFor="checkin" className="sfield__lbl">Check-in Date</label>
              <div className="sfield__wrap">
                <Calendar size={16} className="sfield__icon" />
                <input
                  id="checkin"
                  type="date"
                  className={`sfield__input${validation.errorType === 'PAST_DATE' ? ' sfield__input--err' : ''}`}
                  value={checkIn}
                  min={minDate}
                  onChange={e => onCheckInChange(e.target.value)}
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="sfield">
              <label htmlFor="checkout" className="sfield__lbl">Check-out Date</label>
              <div className="sfield__wrap">
                <Calendar size={16} className="sfield__icon" />
                <input
                  id="checkout"
                  type="date"
                  className={`sfield__input${validation.errorType === 'INVALID_RANGE' ? ' sfield__input--err' : ''}`}
                  value={checkOut}
                  min={checkIn || minDate}
                  onChange={e => onCheckOutChange(e.target.value)}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="sfield">
              <label htmlFor="guests" className="sfield__lbl">Guests</label>
              <div className="sfield__wrap">
                <Users size={16} className="sfield__icon" />
                <select
                  id="guests"
                  className="sfield__input"
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

          {/* Presets */}
          <div className="search-bottom">
            <div className="presets-row">
              <span className="presets-label">Quick Stay:</span>
              {[1, 2, 3, 5, 7].map(n => (
                <button key={n} type="button" className="preset" onClick={() => applyPreset(n)}>
                  {n} {n === 1 ? 'Night' : 'Nights'}
                </button>
              ))}
              {(checkIn || checkOut) && (
                <button type="button" className="preset preset--clear" onClick={reset}>
                  <RotateCcw size={11} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {!validation.isValid && validation.message && (
            <div className="search-alert search-alert--err" role="alert">
              <AlertCircle size={16} />
              {validation.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
