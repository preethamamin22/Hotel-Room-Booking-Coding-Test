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
    selectedRoom && checkIn && checkOut &&
    validation.isValid && calculation.nights > 0 &&
    isRoomAvailable && guests <= selectedRoom.maxGuests;

  return (
    <div className="folio">
      {/* Dark head */}
      <div className="folio__head">
        <Receipt size={20} className="folio__head-icon" />
        <span className="folio__head-title">Reservation Summary</span>
      </div>

      <div className="folio__body">
        {confirmed ? (
          /* ── Confirmation screen ── */
          <div className="folio__confirm">
            <CheckCircle2 size={52} className="folio__confirm-icon" />
            <div className="folio__confirm-title">Booking Confirmed!</div>
            <p className="folio__confirm-sub">
              Room <strong>{selectedRoom?.code}</strong> ({selectedRoom?.type}) has been
              reserved for <strong>{calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</strong>.
            </p>
            <div className="folio__receipt">
              <div className="rcpt-row">
                <span style={{ color: 'var(--mist)' }}>Duration</span>
                <strong>{calculation.nights} night(s)</strong>
              </div>
              <div className="rcpt-row" style={{ marginTop: 8 }}>
                <span style={{ color: 'var(--mist)' }}>Total Paid</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
                  {formatCurrency(calculation.totalPrice)}
                </strong>
              </div>
            </div>
            <button className="folio__mod-btn" onClick={() => setConfirmed(false)}>
              Modify Reservation
            </button>
          </div>
        ) : (
          <>
            {/* Selected Room */}
            <div className="folio__grp">
              <div className="folio__lbl">Accommodation</div>
              <div className="folio__box">
                {selectedRoom ? (
                  <>
                    <div className="folio__room-name">{selectedRoom.code} — {selectedRoom.type}</div>
                    <div className="folio__room-rate">{formatCurrency(selectedRoom.pricePerNight)} / night</div>
                  </>
                ) : (
                  <span className="folio__hint">Select a room from the list</span>
                )}
              </div>
            </div>

            {/* Stay Dates */}
            <div className="folio__grp">
              <div className="folio__lbl">Stay Dates</div>
              <div className="folio__dates">
                <div className="folio__dc">
                  <span className="folio__dc-lbl">Check-in</span>
                  <span className="folio__dc-val">{fmtDate(checkIn)}</span>
                </div>
                <ArrowRight size={14} className="folio__dc-sep" />
                <div className="folio__dc" style={{ textAlign: 'right' }}>
                  <span className="folio__dc-lbl">Check-out</span>
                  <span className="folio__dc-val">{fmtDate(checkOut)}</span>
                </div>
              </div>
              {calculation.nights > 0 && validation.isValid && (
                <div className="folio__nights">
                  <Moon size={13} />
                  {calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'} Stay
                </div>
              )}
            </div>

            {/* Validation Alerts */}
            {!validation.isValid && validation.message && (
              <div className="folio__alert folio__alert--err">
                <AlertTriangle size={14} /> {validation.message}
              </div>
            )}
            {selectedRoom && !isRoomAvailable && (
              <div className="folio__alert folio__alert--err">
                <AlertTriangle size={14} /> Room {selectedRoom.code} is sold out for these dates.
              </div>
            )}
            {selectedRoom && guests > selectedRoom.maxGuests && (
              <div className="folio__alert folio__alert--err">
                <AlertTriangle size={14} /> {guests} guests exceeds this room's capacity of {selectedRoom.maxGuests}.
              </div>
            )}

            {/* Price Breakdown */}
            <div className="folio__price">
              <div className="folio__price-head">Price Breakdown</div>
              {selectedRoom && calculation.nights > 0 && validation.isValid ? (
                <>
                  <div className="prow">
                    <span>Room Rate</span>
                    <span>{formatCurrency(selectedRoom.pricePerNight)} / night</span>
                  </div>
                  <div className="prow">
                    <span>Duration</span>
                    <span>× {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                  <div className="pdiv" />
                  <div className="prow prow--total">
                    <span>Total</span>
                    <span className="ptotal-price">{formatCurrency(calculation.totalPrice)}</span>
                  </div>
                </>
              ) : (
                <div className="prow--empty">Select a room and valid dates</div>
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
    </div>
  );
};
