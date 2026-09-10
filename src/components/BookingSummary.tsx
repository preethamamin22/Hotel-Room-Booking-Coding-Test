import React, { useState } from 'react';
import { Room, DateValidationResult, BookingCalculation } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

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
  const [isBooked, setIsBooked] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Select date';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isValidBooking =
    selectedRoom &&
    checkIn &&
    checkOut &&
    validation.isValid &&
    calculation.nights > 0 &&
    isRoomAvailable &&
    guests <= selectedRoom.maxGuests;

  return (
    <aside className="folio-card">
      <div className="folio-title">
        <FileText size={18} />
        <span>Reservation Folio</span>
      </div>

      {isBooked ? (
        <div className="confirmation-card">
          <CheckCircle2 size={38} className="confirmation-icon" />
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '4px' }}>Stay Reserved!</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Room {selectedRoom?.code} holds confirmed for {calculation.nights} night(s).
          </p>
          <div className="calculation-table">
            <div className="calc-row">
              <span>Total Paid:</span>
              <strong>{formatCurrency(calculation.totalPrice)}</strong>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => setIsBooked(false)}>
            Change Dates or Room
          </button>
        </div>
      ) : (
        <div>
          {/* Selected Room */}
          <div className="folio-group">
            <div className="folio-label">Room Selected</div>
            {selectedRoom ? (
              <div className="folio-value-box">
                <div><strong>{selectedRoom.code}</strong> — {selectedRoom.type}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {formatCurrency(selectedRoom.pricePerNight)} / night
                </div>
              </div>
            ) : (
              <div className="folio-value-box" style={{ color: 'var(--text-muted)' }}>
                Please choose a room
              </div>
            )}
          </div>

          {/* Stay Dates */}
          <div className="folio-group">
            <div className="folio-label">Stay Interval</div>
            <div className="dates-range-display">
              <div className="date-col">
                <span className="date-lbl">Check-in</span>
                <span className="date-txt">{formatDate(checkIn)}</span>
              </div>
              <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
              <div className="date-col">
                <span className="date-lbl">Check-out</span>
                <span className="date-txt">{formatDate(checkOut)}</span>
              </div>
            </div>
          </div>

          {/* Validation Warnings */}
          {!validation.isValid && validation.message && (
            <div className="alert-box alert-danger">
              <AlertTriangle size={14} />
              <span>{validation.message}</span>
            </div>
          )}

          {selectedRoom && !isRoomAvailable && (
            <div className="alert-box alert-danger">
              <AlertTriangle size={14} />
              <span>Room {selectedRoom.code} is sold out for these dates.</span>
            </div>
          )}

          {selectedRoom && guests > selectedRoom.maxGuests && (
            <div className="alert-box alert-danger">
              <AlertTriangle size={14} />
              <span>Exceeds room capacity ({selectedRoom.maxGuests} max guests).</span>
            </div>
          )}

          {/* Cost Math Calculation */}
          <div className="calculation-table">
            <div className="calc-row">
              <span>Duration</span>
              <span>{calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'}</span>
            </div>
            {selectedRoom && calculation.nights > 0 && (
              <div className="calc-row">
                <span>Room Rate</span>
                <span>{formatCurrency(selectedRoom.pricePerNight)} × {calculation.nights}</span>
              </div>
            )}
            <div className="calc-divider"></div>
            <div className="calc-row total">
              <span>Total Price</span>
              <span className="total-price-highlight">
                {formatCurrency(calculation.totalPrice)}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn-checkout"
            disabled={!isValidBooking}
            onClick={() => setIsBooked(true)}
          >
            Reserve Room
          </button>
        </div>
      )}
    </aside>
  );
};
