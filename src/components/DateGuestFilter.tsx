import React from 'react';
import { Calendar, Users, AlertCircle, RefreshCw } from 'lucide-react';
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

  const handleResetDates = () => {
    onCheckInChange('');
    onCheckOutChange('');
  };

  return (
    <section className="filter-card">
      <div className="filter-card-header">
        <div className="filter-title-group">
          <Calendar className="title-icon" size={20} />
          <h2>Select Dates & Guests</h2>
        </div>
        {(checkIn || checkOut) && (
          <button className="reset-btn" onClick={handleResetDates} title="Reset dates">
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="filter-grid">
        {/* Check-in Date */}
        <div className="filter-field">
          <label htmlFor="check-in-input" className="field-label">
            <span>Check-in Date</span>
          </label>
          <div className="input-wrapper">
            <Calendar size={18} className="input-icon" />
            <input
              id="check-in-input"
              type="date"
              className={`date-input ${validation.errorType === 'PAST_DATE' ? 'input-error' : ''}`}
              value={checkIn}
              min={minDate}
              onChange={(e) => onCheckInChange(e.target.value)}
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="filter-field">
          <label htmlFor="check-out-input" className="field-label">
            <span>Check-out Date</span>
          </label>
          <div className="input-wrapper">
            <Calendar size={18} className="input-icon" />
            <input
              id="check-out-input"
              type="date"
              className={`date-input ${validation.errorType === 'INVALID_RANGE' ? 'input-error' : ''}`}
              value={checkOut}
              min={checkIn || minDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
            />
          </div>
        </div>

        {/* Guest Filter (Bonus) */}
        <div className="filter-field">
          <label htmlFor="guest-select" className="field-label">
            <span>Guest Count (Filter)</span>
          </label>
          <div className="input-wrapper">
            <Users size={18} className="input-icon" />
            <select
              id="guest-select"
              className="select-input"
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

      {/* Preset Stay Buttons */}
      <div className="quick-presets">
        <span className="preset-label">Quick Stay Duration:</span>
        <div className="preset-chips">
          <button type="button" className="chip-btn" onClick={() => handleQuickPreset(1)}>
            +1 Night
          </button>
          <button type="button" className="chip-btn" onClick={() => handleQuickPreset(2)}>
            +2 Nights
          </button>
          <button type="button" className="chip-btn" onClick={() => handleQuickPreset(3)}>
            +3 Nights
          </button>
          <button type="button" className="chip-btn" onClick={() => handleQuickPreset(5)}>
            +5 Nights
          </button>
        </div>
      </div>

      {/* Inline Validation Alert */}
      {!validation.isValid && validation.message && (
        <div className="validation-alert error-banner" role="alert">
          <AlertCircle size={18} className="alert-icon" />
          <span>{validation.message}</span>
        </div>
      )}
    </section>
  );
};
