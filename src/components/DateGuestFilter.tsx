import React from 'react';
import { Calendar, Users, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';
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
    <section className="search-filter-card">
      <div className="search-card-header">
        <div className="search-title-box">
          <Sparkles size={20} className="search-title-icon" />
          <h2>Select Dates & Guest Capacity</h2>
        </div>
      </div>

      <div className="search-grid">
        {/* Check-in Date */}
        <div>
          <label htmlFor="check-in-input" className="field-label-text">
            Check-in Date
          </label>
          <div className="field-input-box">
            <Calendar size={18} className="field-icon-inside" />
            <input
              id="check-in-input"
              type="date"
              className={`custom-input-control ${validation.errorType === 'PAST_DATE' ? 'is-invalid' : ''}`}
              value={checkIn}
              min={minDate}
              onChange={(e) => onCheckInChange(e.target.value)}
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div>
          <label htmlFor="check-out-input" className="field-label-text">
            Check-out Date
          </label>
          <div className="field-input-box">
            <Calendar size={18} className="field-icon-inside" />
            <input
              id="check-out-input"
              type="date"
              className={`custom-input-control ${validation.errorType === 'INVALID_RANGE' ? 'is-invalid' : ''}`}
              value={checkOut}
              min={checkIn || minDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
            />
          </div>
        </div>

        {/* Guests Dropdown */}
        <div>
          <label htmlFor="guest-select" className="field-label-text">
            Guests Filter
          </label>
          <div className="field-input-box">
            <Users size={18} className="field-icon-inside" />
            <select
              id="guest-select"
              className="custom-input-control"
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

      {/* Stay Duration Chips */}
      <div className="presets-row">
        <span className="presets-label">Quick Stay Duration:</span>
        <div className="preset-buttons-group">
          <button type="button" className="preset-chip-btn" onClick={() => handleQuickPreset(1)}>
            1 Night Stay
          </button>
          <button type="button" className="preset-chip-btn" onClick={() => handleQuickPreset(2)}>
            2 Nights Stay
          </button>
          <button type="button" className="preset-chip-btn" onClick={() => handleQuickPreset(3)}>
            3 Nights Stay
          </button>
          <button type="button" className="preset-chip-btn" onClick={() => handleQuickPreset(5)}>
            5 Nights Stay
          </button>
          {(checkIn || checkOut) && (
            <button type="button" className="clear-btn" onClick={handleReset}>
              <RotateCcw size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Validation Message Banner */}
      {!validation.isValid && validation.message && (
        <div className="alert-banner error" role="alert">
          <AlertCircle size={18} />
          <span>{validation.message}</span>
        </div>
      )}
    </section>
  );
};
