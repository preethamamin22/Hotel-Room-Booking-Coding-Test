import React, { useState } from 'react';
import { Room, DateValidationResult, BookingCalculation } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  selectedRoom: Room | null; checkIn: string; checkOut: string;
  guests: number; validation: DateValidationResult;
  calculation: BookingCalculation; isRoomAvailable: boolean;
}

export const BookingSummary: React.FC<Props> = ({
  selectedRoom, checkIn, checkOut, guests, validation, calculation, isRoomAvailable,
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const fmt = (s: string) => s
    ? new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : 'Not selected';

  const canBook = !!selectedRoom && !!checkIn && !!checkOut &&
    validation.isValid && calculation.nights > 0 &&
    isRoomAvailable && guests <= (selectedRoom?.maxGuests ?? 0);

  return (
    <aside className="folio" aria-label="Reservation summary">
      <div className="folio-head">
        <span className="folio-head-icon">🧾</span>
        <span className="folio-head-title">Reservation Summary</span>
      </div>

      <div className="folio-body">
        {confirmed ? (
          <div className="folio-confirmed">
            <div className="folio-ok-icon" style={{ fontSize: '3rem' }}>✅</div>
            <div className="folio-ok-title">Booking Confirmed!</div>
            <p className="folio-ok-sub">
              Room <strong>{selectedRoom?.code}</strong> ({selectedRoom?.type}) reserved
              for <strong>{calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</strong>.
            </p>
            <div className="folio-receipt">
              <div className="receipt-row">
                <span style={{ color: 'var(--muted)' }}>Duration</span>
                <strong>{calculation.nights} night(s)</strong>
              </div>
              <div className="receipt-row" style={{ marginTop: 7 }}>
                <span style={{ color: 'var(--muted)' }}>Total Charged</span>
                <strong style={{ color: 'var(--ink)', fontSize: '1.05rem' }}>
                  {formatCurrency(calculation.totalPrice)}
                </strong>
              </div>
            </div>
            <button className="folio-mod" onClick={() => setConfirmed(false)}>Modify Reservation</button>
          </div>
        ) : (
          <>
            {/* Room */}
            <div className="folio-grp">
              <div className="folio-lbl">Accommodation</div>
              <div className="folio-box">
                {selectedRoom
                  ? <><div className="folio-room-name">{selectedRoom.code} — {selectedRoom.type}</div>
                      <div className="folio-room-rate">{formatCurrency(selectedRoom.pricePerNight)} / night</div></>
                  : <span className="folio-hint">← Select a room from the list</span>}
              </div>
            </div>

            {/* Dates */}
            <div className="folio-grp">
              <div className="folio-lbl">Stay Dates</div>
              <div className="folio-dates">
                <div className="folio-dc">
                  <div className="folio-dc-cap">Check-in</div>
                  <div className="folio-dc-val">{fmt(checkIn)}</div>
                </div>
                <div className="folio-arrow">→</div>
                <div className="folio-dc folio-dc-r">
                  <div className="folio-dc-cap">Check-out</div>
                  <div className="folio-dc-val">{fmt(checkOut)}</div>
                </div>
              </div>
              {calculation.nights > 0 && validation.isValid && (
                <div className="folio-nights">🌙 {calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'} Stay</div>
              )}
            </div>

            {/* Alerts */}
            {!validation.isValid && validation.message && (
              <div className="folio-alert err">⚠ {validation.message}</div>
            )}
            {selectedRoom && !isRoomAvailable && (
              <div className="folio-alert err">⚠ Room {selectedRoom.code} is sold out for these dates.</div>
            )}
            {selectedRoom && guests > selectedRoom.maxGuests && (
              <div className="folio-alert err">⚠ {guests} guests exceeds this room's max capacity of {selectedRoom.maxGuests}.</div>
            )}

            {/* Pricing */}
            <div className="folio-price">
              <div className="folio-price-head">Price Breakdown</div>
              {selectedRoom && calculation.nights > 0 && validation.isValid ? (
                <>
                  <div className="prow"><span>Room Rate</span><span>{formatCurrency(selectedRoom.pricePerNight)} / night</span></div>
                  <div className="prow"><span>Duration</span><span>× {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</span></div>
                  <div className="pdiv" />
                  <div className="prow total">
                    <span>Total</span>
                    <span className="price-total">{formatCurrency(calculation.totalPrice)}</span>
                  </div>
                </>
              ) : (
                <div className="prow empty">Select a room and valid dates to see pricing</div>
              )}
            </div>

            {/* CTA */}
            <button className="folio-cta" disabled={!canBook} onClick={() => canBook && setConfirmed(true)}>
              🧾 Confirm Reservation
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
