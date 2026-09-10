import React, { useState } from 'react';
import { Room, DateValidationResult, BookingCalculation } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import {
  Receipt,
  Moon,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface BookingSummaryProps {
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  validation: DateValidationResult;
  calculation: BookingCalculation;
  isRoomAvailable: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedRoom,
  checkIn,
  checkOut,
  guests,
  validation,
  calculation,
  isRoomAvailable,
}) => {
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return 'Not selected';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isFormComplete =
    selectedRoom &&
    checkIn &&
    checkOut &&
    validation.isValid &&
    calculation.nights > 0 &&
    isRoomAvailable &&
    guests <= selectedRoom.maxGuests;

  const handleConfirmClick = () => {
    if (isFormComplete) {
      setIsBookedSuccess(true);
    }
  };

  return (
    <aside className="summary-sticky-card">
      <div className="summary-card-header">
        <Receipt className="summary-icon" size={22} />
        <h2>Reservation Summary</h2>
      </div>

      {isBookedSuccess ? (
        <div className="booking-success-box">
          <div className="success-icon-badge">
            <CheckCircle2 size={36} />
          </div>
          <h3>Reservation Confirmed!</h3>
          <p className="success-subtitle">
            Your stay for <strong>{selectedRoom?.code} ({selectedRoom?.type})</strong> has been successfully held.
          </p>
          <div className="receipt-details font-mono">
            <div className="receipt-row">
              <span>Nights:</span>
              <strong>{calculation.nights} night(s)</strong>
            </div>
            <div className="receipt-row">
              <span>Total Paid:</span>
              <strong>{formatCurrency(calculation.totalPrice)}</strong>
            </div>
          </div>
          <button
            className="btn-secondary full-width"
            onClick={() => setIsBookedSuccess(false)}
          >
            Modify Selection
          </button>
        </div>
      ) : (
        <div className="summary-content">
          {/* Selected Room Details */}
          <div className="summary-section">
            <div className="section-label">Selected Room</div>
            {selectedRoom ? (
              <div className="selected-room-info">
                <div className="room-code-tag">{selectedRoom.code}</div>
                <div>
                  <h4 className="room-name">{selectedRoom.type}</h4>
                  <div className="room-rate-text">
                    {formatCurrency(selectedRoom.pricePerNight)} / night
                  </div>
                </div>
              </div>
            ) : (
              <div className="placeholder-box">
                <Info size={16} />
                <span>Please select a room from the list</span>
              </div>
            )}
          </div>

          {/* Dates & Nights Breakdown */}
          <div className="summary-section">
            <div className="section-label">Stay Interval</div>
            <div className="dates-preview-grid">
              <div className="date-block">
                <span className="date-caption">Check-in</span>
                <span className="date-val">{formatDateLabel(checkIn)}</span>
              </div>
              <ChevronRight size={16} className="date-sep-icon" />
              <div className="date-block">
                <span className="date-caption">Check-out</span>
                <span className="date-val">{formatDateLabel(checkOut)}</span>
              </div>
            </div>

            {calculation.nights > 0 && validation.isValid && (
              <div className="nights-badge">
                <Moon size={14} />
                <span>Duration: <strong>{calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'}</strong></span>
              </div>
            )}
          </div>

          {/* Validation Warnings (If Any) */}
          {!validation.isValid && validation.message && (
            <div className="summary-alert error">
              <AlertTriangle size={16} />
              <span>{validation.message}</span>
            </div>
          )}

          {selectedRoom && !isRoomAvailable && (
            <div className="summary-alert error">
              <AlertTriangle size={16} />
              <span>Room {selectedRoom.code} is unavailable for these dates.</span>
            </div>
          )}

          {selectedRoom && guests > selectedRoom.maxGuests && (
            <div className="summary-alert error">
              <AlertTriangle size={16} />
              <span>{guests} guests exceed room capacity ({selectedRoom.maxGuests} max).</span>
            </div>
          )}

          {/* Pricing Math Breakdown */}
          <div className="price-breakdown-card">
            <div className="breakdown-title">Pricing Breakdown</div>
            {selectedRoom && calculation.nights > 0 && validation.isValid ? (
              <div className="math-rows">
                <div className="math-row">
                  <span>Room Rate ({calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'})</span>
                  <span>{formatCurrency(selectedRoom.pricePerNight)} × {calculation.nights}</span>
                </div>
                <div className="math-row divider"></div>
                <div className="math-row total-row">
                  <span className="total-label">Total Price</span>
                  <span className="total-amount">{formatCurrency(calculation.totalPrice)}</span>
                </div>
              </div>
            ) : (
              <div className="calculation-placeholder">
                <span>Select valid dates and a room to calculate total price</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="btn-primary full-width"
            disabled={!isFormComplete}
            onClick={handleConfirmClick}
          >
            <Sparkles size={16} />
            <span>Confirm & Reserve Room</span>
          </button>
        </div>
      )}
    </aside>
  );
};
