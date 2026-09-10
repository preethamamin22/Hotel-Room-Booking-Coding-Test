import React from 'react';
import { Calendar, Users, AlertCircle, RotateCcw } from 'lucide-react';
import { DateValidationResult } from '../types/booking';

interface DateGuestFilterProps {
  checkIn: string;
  checkOut: string;
  guests: number;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onGuestsChange: (val: number) => void;
  validation: DateValidationResult;
  minDate: string;
}

export const DateGuestFilter: React.FC<DateGuestFilterProps> = ({
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  validation,
  minDate,
}) => {
  const handleQuickPreset = (nightsCount: number) => {
    const startDate = checkIn || minDate;
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + nightsCount);

    const format = (d: Date) => d.toISOString().split('T')[0];

    if (!checkIn) {
      onCheckInChange(format(start));
    }
    onCheckOutChange(format(end));
  };

  const handleReset = () => {
    onCheckInChange('');
    onCheckOutChange('');
  };

  return (
    <section className="search-bar-card">
      <div className="search-bar-title">
        <Calendar size={18} />
        <span>Select Dates & Guest Capacity</span>
      </div>

      <div className="search-fields-grid">
        {/* Check-in Field */}
        <div className="field-group">
          <label htmlFor="check-in-input" className="field-label">
            Check-in
          </label>
          <div className="input-container">
            <Calendar size={18} className="field-icon" />
            <input
              id="check-in-input"
              type="date"
              className={`form-input ${validation.errorType === 'PAST_DATE' ? 'has-error' : ''}`}
              value={checkIn}
              min={minDate}
              onChange={(e) => onCheckInChange(e.target.value)}
            />
          </div>
        </div>

        {/* Check-out Field */}
        <div className="field-group">
          <label htmlFor="check-out-input" className="field-label">
            Check-out
          </label>
          <div className="input-container">
            <Calendar size={18} className="field-icon" />
            <input
              id="check-out-input"
              type="date"
              className={`form-input ${validation.errorType === 'INVALID_RANGE' ? 'has-error' : ''}`}
              value={checkOut}
              min={checkIn || minDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
            />
          </div>
        </div>

        {/* Guests Field */}
        <div className="field-group">
          <label htmlFor="guest-select" className="field-label">
            Guests
          </label>
          <div className="input-container">
            <Users size={18} className="field-icon" />
            <select
              id="guest-select"
              className="form-input"
              value={guests}
              onChange={(e) => onGuestsChange(Number(e.target.value))}
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stay Duration Presets */}
      <div className="quick-options-row">
        <span className="quick-label">Popular Stay Durations:</span>
        <div className="duration-pills">
          <button type="button" className="duration-pill-btn" onClick={() => handleQuickPreset(1)}>
            1 Night
          </button>
          <button type="button" className="duration-pill-btn" onClick={() => handleQuickPreset(2)}>
            2 Nights
          </button>
          <button type="button" className="duration-pill-btn" onClick={() => handleQuickPreset(3)}>
            3 Nights
          </button>
          <button type="button" className="duration-pill-btn" onClick={() => handleQuickPreset(5)}>
            5 Nights
          </button>
          {(checkIn || checkOut) && (
            <button type="button" className="duration-pill-btn" onClick={handleReset} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <RotateCcw size={12} /> Clear Dates
            </button>
          )}
        </div>
      </div>

      {/* Validation Message */}
      {!validation.isValid && validation.message && (
        <div className="alert-box alert-danger" role="alert">
          <AlertCircle size={16} />
          <span>{validation.message}</span>
        </div>
      )}
    </section>
  );
};
