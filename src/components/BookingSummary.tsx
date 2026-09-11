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

  const fmtDate = (s: string) => {
    if (!s) return 'Not selected';
    return new Date(s + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  const canBook =
    !!selectedRoom && !!checkIn && !!checkOut &&
    validation.isValid && calculation.nights > 0 &&
    isRoomAvailable && guests <= selectedRoom.maxGuests;

  return (
    <aside className="folio" aria-label="Reservation summary">
      <div className="folio__head">
        <Receipt size={19} className="folio__head-icon" />
        <span className="folio__head-title">Reservation Summary</span>
      </div>

      <div className="folio__body">
        {confirmed ? (
          /* ── Confirmed ── */
          <div className="folio__confirmed">
            <CheckCircle2 size={52} className="folio__conf-icon" />
            <div className="folio__conf-title">Booking Confirmed!</div>
            <p className="folio__conf-sub">
              Room <strong>{selectedRoom?.code}</strong> ({selectedRoom?.type}) has been
              reserved for{' '}
              <strong>{calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</strong>.
            </p>
            <div className="folio__receipt">
              <div className="receipt-row">
                <span style={{ color: 'var(--text-muted)' }}>Duration</span>
                <strong>{calculation.nights} night(s)</strong>
              </div>
              <div className="receipt-row" style={{ marginTop: 7 }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Charged</span>
                <strong style={{ color: 'var(--ink-800)', fontSize: '1rem' }}>
                  {formatCurrency(calculation.totalPrice)}
                </strong>
              </div>
            </div>
            <button className="folio__modify-btn" onClick={() => setConfirmed(false)}>
              Modify Reservation
            </button>
          </div>
        ) : (
          /* ── Booking form state ── */
          <>
            {/* Room */}
            <div className="folio__section">
              <div className="folio__label">Accommodation</div>
              <div className="folio__panel">
                {selectedRoom ? (
                  <>
                    <div className="folio__room-name">{selectedRoom.code} — {selectedRoom.type}</div>
                    <div className="folio__room-rate">{formatCurrency(selectedRoom.pricePerNight)} / night</div>
                  </>
                ) : (
                  <span className="folio__placeholder">Select a room from the list →</span>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="folio__section">
              <div className="folio__label">Stay Dates</div>
              <div className="folio__dates">
                <div className="folio__date-col">
                  <div className="folio__date-cap">Check-in</div>
                  <div className="folio__date-val">{fmtDate(checkIn)}</div>
                </div>
                <ArrowRight size={14} className="folio__date-arrow" />
                <div className="folio__date-col folio__date-col--right">
                  <div className="folio__date-cap">Check-out</div>
                  <div className="folio__date-val">{fmtDate(checkOut)}</div>
                </div>
              </div>
              {calculation.nights > 0 && validation.isValid && (
                <div className="folio__nights-chip">
                  <Moon size={13} />
                  {calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'} Stay
                </div>
              )}
            </div>

            {/* Validation Alerts */}
            {!validation.isValid && validation.message && (
              <div className="folio__alert folio__alert--err">
                <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                {validation.message}
              </div>
            )}
            {selectedRoom && !isRoomAvailable && (
              <div className="folio__alert folio__alert--err">
                <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                Room {selectedRoom.code} is sold out for these dates.
              </div>
            )}
            {selectedRoom && guests > selectedRoom.maxGuests && (
              <div className="folio__alert folio__alert--err">
                <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                {guests} guests exceeds this room's max capacity of {selectedRoom.maxGuests}.
              </div>
            )}

            {/* Pricing */}
            <div className="folio__price-panel">
              <div className="folio__price-head">Price Breakdown</div>
              {selectedRoom && calculation.nights > 0 && validation.isValid ? (
                <>
                  <div className="price-row">
                    <span>Room Rate</span>
                    <span>{formatCurrency(selectedRoom.pricePerNight)} / night</span>
                  </div>
                  <div className="price-row">
                    <span>Duration</span>
                    <span>× {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                  <div className="price-div" />
                  <div className="price-row price-row--total">
                    <span>Total</span>
                    <span className="price-big">{formatCurrency(calculation.totalPrice)}</span>
                  </div>
                </>
              ) : (
                <div className="price-placeholder">Select a room and valid dates to see pricing</div>
              )}
            </div>

            {/* CTA */}
            <button
              className="folio__cta"
              disabled={!canBook}
              onClick={() => canBook && setConfirmed(true)}
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
