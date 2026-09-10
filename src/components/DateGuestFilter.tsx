import React from 'react';
import { Calendar, Users, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';
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

  const handleReset = () => { onCheckInChange(''); onCheckOutChange(''); };

  return (
    <div className="search-card-wrapper">
      <div className="search-card">
        <div className="search-card__inner">
          <div className="search-card__header">
            <div className="search-card__title">
              <Sparkles size={18} className="search-card__title-icon" />
              Plan Your Stay
            </div>
          </div>

          <div className="search-card__grid">
            {/* Check-in */}
            <div className="field">
              <label htmlFor="checkin" className="field__label">Check-in Date</label>
              <div className="field__wrap">
                <Calendar size={16} className="field__icon" />
                <input
                  id="checkin"
                  type="date"
                  className={`field__input ${validation.errorType === 'PAST_DATE' ? 'field__input--error' : ''}`}
                  value={checkIn}
                  min={minDate}
                  onChange={e => onCheckInChange(e.target.value)}
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="field">
              <label htmlFor="checkout" className="field__label">Check-out Date</label>
              <div className="field__wrap">
                <Calendar size={16} className="field__icon" />
                <input
                  id="checkout"
                  type="date"
                  className={`field__input ${validation.errorType === 'INVALID_RANGE' ? 'field__input--error' : ''}`}
                  value={checkOut}
                  min={checkIn || minDate}
                  onChange={e => onCheckOutChange(e.target.value)}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="field">
              <label htmlFor="guests" className="field__label">Guests</label>
              <div className="field__wrap">
                <Users size={16} className="field__icon" />
                <select
                  id="guests"
                  className="field__input"
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
          <div className="search-card__presets">
            <span className="presets__label">Quick Select:</span>
            {[1, 2, 3, 5, 7].map(n => (
              <button key={n} className="preset-btn" type="button" onClick={() => applyPreset(n)}>
                {n} {n === 1 ? 'Night' : 'Nights'}
              </button>
            ))}
            {(checkIn || checkOut) && (
              <button className="preset-btn preset-btn--clear" type="button" onClick={handleReset}>
                <RotateCcw size={11} /> Clear
              </button>
            )}
          </div>

          {/* Error */}
          {!validation.isValid && validation.message && (
            <div className="alert alert--error" role="alert">
              <AlertCircle size={16} />
              {validation.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
