import React, { useState } from 'react';
import { Room, DateValidationResult, BookingCalculation } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { Receipt, CheckCircle2, AlertTriangle, ArrowRight, Moon } from 'lucide-react';

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
    return date.toLocaleDateString('en-IN', {
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

  const handleConfirm = () => {
    if (isFormComplete) {
      setIsBookedSuccess(true);
    }
  };

  return (
    <aside className="summary-folio-card">
      <div className="folio-header-title">
        <Receipt size={22} className="folio-title-icon" />
        <h2>Reservation Summary</h2>
      </div>

      {isBookedSuccess ? (
        <div className="confirmation-success-wrap">
          <CheckCircle2 size={44} className="success-icon-crest" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--navy-dark)', marginBottom: '6px' }}>
            Reservation Confirmed!
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Your room <strong>{selectedRoom?.code} ({selectedRoom?.type})</strong> is successfully reserved for {calculation.nights} night(s).
          </p>
          <div className="calculation-card-breakdown">
            <div className="breakdown-row">
              <span>Total Paid:</span>
              <strong style={{ color: 'var(--navy-dark)', fontSize: '1.1rem' }}>
                {formatCurrency(calculation.totalPrice)}
              </strong>
            </div>
          </div>
          <button
            type="button"
            className="action-select-btn"
            style={{ width: '100%', marginTop: '12px' }}
            onClick={() => setIsBookedSuccess(false)}
          >
            Modify Selection
          </button>
        </div>
      ) : (
        <div>
          {/* Selected Room Block */}
          <div className="folio-field-group">
            <div className="folio-field-label">Selected Accommodation</div>
            {selectedRoom ? (
              <div className="folio-value-box">
                <div className="selected-room-mini-title">
                  {selectedRoom.code} — {selectedRoom.type}
                </div>
                <div className="selected-room-mini-rate">
                  {formatCurrency(selectedRoom.pricePerNight)} / night
                </div>
              </div>
            ) : (
              <div className="folio-value-box" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Please select a room from the list
              </div>
            )}
          </div>

          {/* Stay Dates Block */}
          <div className="folio-field-group">
            <div className="folio-field-label">Stay Interval</div>
            <div className="stay-dates-box">
              <div className="date-column-info">
                <span className="date-column-caption">Check-in</span>
                <span className="date-column-value">{formatDateLabel(checkIn)}</span>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} />
              <div className="date-column-info">
                <span className="date-column-caption">Check-out</span>
                <span className="date-column-value">{formatDateLabel(checkOut)}</span>
              </div>
            </div>

            {calculation.nights > 0 && validation.isValid && (
              <div className="stay-duration-tag">
                <Moon size={14} />
                <span>Duration: <strong>{calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'}</strong></span>
              </div>
            )}
          </div>

          {/* Validation Alerts */}
          {!validation.isValid && validation.message && (
            <div className="alert-banner error" style={{ marginBottom: '18px' }}>
              <AlertTriangle size={16} />
              <span>{validation.message}</span>
            </div>
          )}

          {selectedRoom && !isRoomAvailable && (
            <div className="alert-banner error" style={{ marginBottom: '18px' }}>
              <AlertTriangle size={16} />
              <span>Room {selectedRoom.code} is unavailable for selected dates.</span>
            </div>
          )}

          {selectedRoom && guests > selectedRoom.maxGuests && (
            <div className="alert-banner error" style={{ marginBottom: '18px' }}>
              <AlertTriangle size={16} />
              <span>{guests} guests exceed room limit ({selectedRoom.maxGuests} max).</span>
            </div>
          )}

          {/* Math Breakdown Table */}
          <div className="calculation-card-breakdown">
            <div className="folio-field-label" style={{ marginBottom: '10px' }}>Pricing Breakdown</div>
            {selectedRoom && calculation.nights > 0 && validation.isValid ? (
              <div>
                <div className="breakdown-row">
                  <span>Room Rate ({calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'})</span>
                  <span>{formatCurrency(selectedRoom.pricePerNight)} × {calculation.nights}</span>
                </div>
                <div className="breakdown-divider-line"></div>
                <div className="breakdown-row total-row">
                  <span>Total Price</span>
                  <span className="total-price-gold">{formatCurrency(calculation.totalPrice)}</span>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '6px 0' }}>
                Select valid dates and a room to view calculated rate
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="btn-confirm-reserve"
            disabled={!isFormComplete}
            onClick={handleConfirm}
          >
            Confirm & Reserve Room
          </button>
        </div>
      )}
    </aside>
  );
};
