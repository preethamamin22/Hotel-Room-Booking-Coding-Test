import React, { useState } from 'react';
import { Room, DateValidationResult, BookingCalculation, GuestDetails } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  validation: DateValidationResult;
  calculation: BookingCalculation;
  isRoomAvailable: boolean;
  onResetDates?: () => void;
}

export const BookingSummary: React.FC<Props> = ({
  selectedRoom,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  validation,
  calculation,
  isRoomAvailable,
  onResetDates,
}) => {
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    guest: GuestDetails;
    createdAt: string;
  } | null>(null);

  const [step, setStep] = useState<'review' | 'details'>('review');

  // Guest details form state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialReq, setSpecialReq] = useState('');
  const [formError, setFormError] = useState('');

  const totalGuests = adults + childrenCount;

  const fmt = (s: string) => s
    ? new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : 'Not selected';

  const canProceedToDetails = !!selectedRoom && !!checkIn && !!checkOut &&
    validation.isValid && calculation.nights > 0 &&
    isRoomAvailable && totalGuests <= (selectedRoom?.maxGuests ?? 0);

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!guestPhone.trim() || guestPhone.length < 8) {
      setFormError('Please enter a valid phone number');
      return;
    }

    setFormError('');
    const bookingId = `RT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBooking({
      id: bookingId,
      guest: {
        fullName: guestName.trim(),
        email: guestEmail.trim(),
        phone: guestPhone.trim(),
        adults,
        children: childrenCount,
        specialRequests: specialReq.trim(),
      },
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    });
  };

  const handleModify = () => {
    setConfirmedBooking(null);
    setStep('review');
  };

  return (
    <aside className="folio" aria-label="Reservation summary">
      <div className="folio-head">
        <span className="folio-head-icon">🧾</span>
        <span className="folio-head-title">
          {confirmedBooking ? 'Booking Confirmation' : step === 'details' ? 'Guest Information' : 'Reservation Summary'}
        </span>
      </div>

      <div className="folio-body">
        {confirmedBooking ? (
          /* Booking.com Confirmation Voucher */
          <div className="folio-confirmed">
            <div className="folio-ok-badge">
              <span className="folio-ok-check">✓</span>
              <span>Reservation Confirmed</span>
            </div>

            <div className="folio-ref-box">
              <span className="folio-ref-lbl">Booking Reference</span>
              <span className="folio-ref-id">{confirmedBooking.id}</span>
            </div>

            <p className="folio-ok-sub">
              A confirmation email has been sent to <strong>{confirmedBooking.guest.email}</strong>.
            </p>

            <div className="folio-receipt">
              <div className="receipt-row">
                <span className="rc-lbl">Guest Name</span>
                <strong>{confirmedBooking.guest.fullName}</strong>
              </div>
              <div className="receipt-row">
                <span className="rc-lbl">Contact</span>
                <span>{confirmedBooking.guest.phone}</span>
              </div>
              <div className="receipt-row">
                <span className="rc-lbl">Party Size</span>
                <span>{adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}</span>
              </div>
              <div className="receipt-sep" />
              <div className="receipt-row">
                <span className="rc-lbl">Room</span>
                <strong>{selectedRoom?.code} · {selectedRoom?.type}</strong>
              </div>
              <div className="receipt-row">
                <span className="rc-lbl">Dates</span>
                <span>{checkIn} to {checkOut}</span>
              </div>
              <div className="receipt-row">
                <span className="rc-lbl">Duration</span>
                <span>{calculation.nights} Night{calculation.nights > 1 ? 's' : ''}</span>
              </div>
              {confirmedBooking.guest.specialRequests && (
                <div className="receipt-row">
                  <span className="rc-lbl">Special Request</span>
                  <span className="rc-req">{confirmedBooking.guest.specialRequests}</span>
                </div>
              )}
              <div className="receipt-sep" />
              <div className="receipt-row total-row">
                <span>Total Paid</span>
                <strong className="receipt-total-val">{formatCurrency(calculation.totalPrice)}</strong>
              </div>
            </div>

            <div className="folio-actions">
              <button type="button" className="folio-print-btn" onClick={() => window.print()}>
                ⎙ Print Voucher
              </button>
              <button type="button" className="folio-mod" onClick={() => { handleModify(); onResetDates?.(); }}>
                Book Another Stay
              </button>
            </div>
          </div>
        ) : step === 'details' ? (
          /* Step 2: Guest details collection form (Booking.com style) */
          <form className="folio-guest-form" onSubmit={handleConfirmReservation}>
            <div className="folio-step-tag">Step 2 of 2 · Primary Guest Details</div>

            {formError && (
              <div className="folio-alert err" role="alert">⚠ {formError}</div>
            )}

            <div className="folio-field">
              <label htmlFor="g-name" className="folio-lbl">Full Name *</label>
              <input
                id="g-name"
                type="text"
                className="folio-inp"
                placeholder="e.g. Preetham Amin"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                required
              />
            </div>

            <div className="folio-field">
              <label htmlFor="g-email" className="folio-lbl">Email Address *</label>
              <input
                id="g-email"
                type="email"
                className="folio-inp"
                placeholder="e.g. name@example.com"
                value={guestEmail}
                onChange={e => setGuestEmail(e.target.value)}
                required
              />
            </div>

            <div className="folio-field">
              <label htmlFor="g-phone" className="folio-lbl">Mobile Phone *</label>
              <input
                id="g-phone"
                type="tel"
                className="folio-inp"
                placeholder="e.g. +91 98765 43210"
                value={guestPhone}
                onChange={e => setGuestPhone(e.target.value)}
                required
              />
            </div>

            <div className="folio-field">
              <label htmlFor="g-req" className="folio-lbl">Special Requests (Optional)</label>
              <textarea
                id="g-req"
                className="folio-inp folio-txt"
                rows={2}
                placeholder="e.g. Quiet room, High floor, Early check-in..."
                value={specialReq}
                onChange={e => setSpecialReq(e.target.value)}
              />
            </div>

            <div className="folio-stay-summary-mini">
              <div className="mini-row">
                <span>{selectedRoom?.code} · {calculation.nights} Nights</span>
                <strong>{formatCurrency(calculation.totalPrice)}</strong>
              </div>
              <div className="mini-sub">
                {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Children` : ''} · Free Cancellation
              </div>
            </div>

            <div className="folio-form-btns">
              <button
                type="button"
                className="folio-back-btn"
                onClick={() => setStep('review')}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="folio-cta"
              >
                Complete Reservation
              </button>
            </div>
          </form>
        ) : (
          /* Step 1: Review accommodation and price breakdown */
          <>
            {/* Room */}
            <div className="folio-grp">
              <div className="folio-lbl">Selected Accommodation</div>
              <div className="folio-box">
                {selectedRoom ? (
                  <>
                    <div className="folio-room-name">{selectedRoom.code} — {selectedRoom.type}</div>
                    <div className="folio-room-rate">{formatCurrency(selectedRoom.pricePerNight)} / night</div>
                  </>
                ) : (
                  <span className="folio-hint">Select a room from the available options</span>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="folio-grp">
              <div className="folio-lbl">Stay Duration & Party</div>
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
                <div className="folio-nights">
                  🌙 {calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'} · {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}
                </div>
              )}
            </div>

            {/* Alerts */}
            {!validation.isValid && validation.message && (
              <div className="folio-alert err">⚠ {validation.message}</div>
            )}
            {selectedRoom && !isRoomAvailable && (
              <div className="folio-alert err">⚠ Room {selectedRoom.code} is booked for these dates. Please choose different dates or another room.</div>
            )}
            {selectedRoom && totalGuests > selectedRoom.maxGuests && (
              <div className="folio-alert err">⚠ {totalGuests} guests exceeds this room's maximum capacity of {selectedRoom.maxGuests}.</div>
            )}

            {/* Pricing */}
            <div className="folio-price">
              <div className="folio-price-head">Price Breakdown</div>
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
                  <div className="prow">
                    <span>Taxes & Service Fees</span>
                    <span style={{ color: 'var(--green)' }}>Included</span>
                  </div>
                  <div className="pdiv" />
                  <div className="prow total">
                    <span>Total Stay Cost</span>
                    <span className="price-total">{formatCurrency(calculation.totalPrice)}</span>
                  </div>
                </>
              ) : (
                <div className="prow empty">Select dates and an available room to calculate total price</div>
              )}
            </div>

            {/* CTA */}
            <button
              className="folio-cta"
              disabled={!canProceedToDetails}
              onClick={() => canProceedToDetails && setStep('details')}
            >
              Enter Guest Details →
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
