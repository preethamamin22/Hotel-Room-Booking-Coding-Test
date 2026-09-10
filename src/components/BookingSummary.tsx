import React, { useState } from 'react';
import { Room, DateValidationResult, BookingCalculation } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { Receipt, CheckCircle2, AlertTriangle, ArrowRight, Moon } from 'lucide-react';

interface Props {
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  validation: DateValidationResult;
  calculation: BookingCalculation;
  isRoomAvailable: boolean;
}

export const BookingSummary: React.FC<Props> = ({
  selectedRoom, checkIn, checkOut, guests,
  validation, calculation, isRoomAvailable,
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const fmt = (s: string) => {
    if (!s) return 'Not selected';
    return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  const canConfirm =
    selectedRoom && checkIn && checkOut &&
    validation.isValid && calculation.nights > 0 &&
    isRoomAvailable && guests <= selectedRoom.maxGuests;

  return (
    <aside className="folio">
      {/* ── Header ── */}
      <div className="folio__head">
        <Receipt size={20} className="folio__head-icon" />
        <span className="folio__head-title">Reservation Summary</span>
      </div>

      <div className="folio__body">
        {confirmed ? (
          <div className="folio__confirm">
            <CheckCircle2 size={48} className="folio__confirm-icon" />
            <div className="folio__confirm-title">Booking Confirmed!</div>
            <p className="folio__confirm-sub">
              Room <strong>{selectedRoom?.code}</strong> ({selectedRoom?.type}) reserved for{' '}
              <strong>{calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</strong>.
            </p>
            <div className="folio__confirm-receipt">
              <div className="receipt-row">
                <span style={{ color: 'var(--slate-600)' }}>Duration</span>
                <strong>{calculation.nights} night(s)</strong>
              </div>
              <div className="receipt-row" style={{ marginTop: 8 }}>
                <span style={{ color: 'var(--slate-600)' }}>Total Paid</span>
                <strong style={{ color: 'var(--slate-900)', fontSize: '1.05rem' }}>
                  {formatCurrency(calculation.totalPrice)}
                </strong>
              </div>
            </div>
            <button className="folio__btn-modify" onClick={() => setConfirmed(false)}>
              Modify Reservation
            </button>
          </div>
        ) : (
          <>
            {/* Selected Room */}
            <div className="folio__group">
              <div className="folio__label">Accommodation</div>
              {selectedRoom ? (
                <div className="folio__value-box">
                  <div className="folio__room-name">{selectedRoom.code} — {selectedRoom.type}</div>
                  <div className="folio__room-rate">{formatCurrency(selectedRoom.pricePerNight)} / night</div>
                </div>
              ) : (
                <div className="folio__value-box">
                  <span className="folio__empty-hint">Select a room from the list</span>
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="folio__group">
              <div className="folio__label">Stay Dates</div>
              <div className="folio__dates">
                <div className="folio__date-col">
                  <span className="folio__date-cap">Check-in</span>
                  <span className="folio__date-val">{fmt(checkIn)}</span>
                </div>
                <ArrowRight size={14} className="folio__date-arrow" />
                <div className="folio__date-col" style={{ textAlign: 'right' }}>
                  <span className="folio__date-cap">Check-out</span>
                  <span className="folio__date-val">{fmt(checkOut)}</span>
                </div>
              </div>
              {calculation.nights > 0 && validation.isValid && (
                <div className="folio__nights-pill">
                  <Moon size={13} />
                  {calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'} Stay
                </div>
              )}
            </div>

            {/* Validation Alerts */}
            {!validation.isValid && validation.message && (
              <div className="folio__alert folio__alert--error">
                <AlertTriangle size={14} /> {validation.message}
              </div>
            )}
            {selectedRoom && !isRoomAvailable && (
              <div className="folio__alert folio__alert--error">
                <AlertTriangle size={14} /> Room {selectedRoom.code} is sold out for these dates.
              </div>
            )}
            {selectedRoom && guests > selectedRoom.maxGuests && (
              <div className="folio__alert folio__alert--error">
                <AlertTriangle size={14} /> {guests} guests exceeds room capacity ({selectedRoom.maxGuests} max).
              </div>
            )}

            {/* Pricing */}
            <div className="folio__calc">
              <div className="folio__calc-label">Price Breakdown</div>
              {selectedRoom && calculation.nights > 0 && validation.isValid ? (
                <>
                  <div className="calc-row">
                    <span>Room Rate</span>
                    <span>{formatCurrency(selectedRoom.pricePerNight)} / night</span>
                  </div>
                  <div className="calc-row">
                    <span>Duration</span>
                    <span>× {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                  <div className="calc-divider" />
                  <div className="calc-row calc-row--total">
                    <span>Total</span>
                    <span className="calc-row__total-price">{formatCurrency(calculation.totalPrice)}</span>
                  </div>
                </>
              ) : (
                <div className="calc-placeholder">
                  Select a room and valid dates to see pricing
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              className="folio__cta"
              disabled={!canConfirm}
              onClick={() => canConfirm && setConfirmed(true)}
            >
              <Receipt size={16} />
              Confirm Reservation
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
