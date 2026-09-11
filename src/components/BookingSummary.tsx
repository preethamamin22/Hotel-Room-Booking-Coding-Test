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
  onClearSelection?: () => void;
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
  onClearSelection,
}) => {
  const [step, setStep] = useState<'review' | 'details'>('review');
  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    guest: GuestDetails;
  } | null>(null);

  // Guest details form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialReq, setSpecialReq] = useState('');
  const [formError, setFormError] = useState('');

  const totalGuests = adults + childrenCount;

  const fmt = (s: string) => s
    ? new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : 'Not selected';

  const canProceed = !!selectedRoom && !!checkIn && !!checkOut &&
    validation.isValid && calculation.nights > 0 &&
    isRoomAvailable && totalGuests <= (selectedRoom?.maxGuests ?? 0);

  const handleSubmitGuestDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setFormError('Please enter a valid mobile phone number');
      return;
    }

    setFormError('');
    const randomId = `RT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBooking({
      id: randomId,
      guest: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        adults,
        children: childrenCount,
        specialRequests: specialReq.trim(),
      },
    });
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setStep('review');
    onClearSelection?.();
  };

  return (
    <aside className="folio" aria-label="Reservation folio">
      <div className="folio-head">
        <span style={{ fontSize: '1rem' }}>🧾</span>
        <span className="folio-head-title">
          {confirmedBooking ? 'Reservation Confirmed' : step === 'details' ? 'Guest Information' : 'Reservation Folio'}
        </span>
      </div>

      <div className="folio-body">
        {confirmedBooking ? (
          /* Booking.com Confirmation Voucher */
          <div className="folio-confirmed">
            <div className="folio-ok-badge">
              <span>✓</span>
              <span>Booking Confirmed</span>
            </div>

            <div className="folio-ref-box">
              <span className="folio-ref-lbl">Booking Reference</span>
              <span className="folio-ref-id">{confirmedBooking.id}</span>
            </div>

            <p style={{ fontSize: '.82rem', color: 'var(--body)', margin: '4px 0' }}>
              Confirmation details sent to <strong>{confirmedBooking.guest.email}</strong>
            </p>

            <div className="folio-receipt">
              <div className="rc-row">
                <span className="rc-lbl">Guest Name</span>
                <strong>{confirmedBooking.guest.fullName}</strong>
              </div>
              <div className="rc-row">
                <span className="rc-lbl">Phone</span>
                <span>{confirmedBooking.guest.phone}</span>
              </div>
              <div className="rc-row">
                <span className="rc-lbl">Party Size</span>
                <span>{adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}</span>
              </div>
              <div className="rc-sep" />
              <div className="rc-row">
                <span className="rc-lbl">Accommodation</span>
                <strong>{selectedRoom?.type} ({selectedRoom?.code})</strong>
              </div>
              <div className="rc-row">
                <span className="rc-lbl">Stay Dates</span>
                <span>{checkIn} to {checkOut}</span>
              </div>
              <div className="rc-row">
                <span className="rc-lbl">Duration</span>
                <span>{calculation.nights} Night{calculation.nights > 1 ? 's' : ''}</span>
              </div>
              {confirmedBooking.guest.specialRequests && (
                <div className="rc-row">
                  <span className="rc-lbl">Special Request</span>
                  <span style={{ fontStyle: 'italic', maxWidth: 160, textAlign: 'right' }}>
                    {confirmedBooking.guest.specialRequests}
                  </span>
                </div>
              )}
              <div className="rc-sep" />
              <div className="rc-row" style={{ fontSize: '.95rem', fontWeight: 700 }}>
                <span>Total Stay Cost</span>
                <span style={{ color: 'var(--ink)' }}>{formatCurrency(calculation.totalPrice)}</span>
              </div>
            </div>

            <div className="folio-actions">
              <button type="button" className="folio-btn-sec" onClick={() => window.print()}>
                ⎙ Print Voucher
              </button>
              <button type="button" className="folio-btn-sec" onClick={handleReset}>
                Modify / New Booking
              </button>
            </div>
          </div>
        ) : step === 'details' ? (
          /* Step 2: Guest Details Form (Booking.com style) */
          <form className="folio-form" onSubmit={handleSubmitGuestDetails}>
            <div style={{
              fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase',
              color: 'var(--gold)', background: 'var(--gold-bg)', padding: '4px 8px',
              borderRadius: 4, alignSelf: 'flex-start'
            }}>
              Step 2 of 2 · Guest Details
            </div>

            {formError && (
              <div style={{ color: 'var(--red)', fontSize: '.78rem', fontWeight: 600 }}>
                ⚠ {formError}
              </div>
            )}

            <div className="folio-field">
              <label htmlFor="fn" className="folio-lbl">Full Name *</label>
              <input
                id="fn"
                type="text"
                className="folio-inp"
                placeholder="e.g. Preetham Amin"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="folio-field">
              <label htmlFor="em" className="folio-lbl">Email Address *</label>
              <input
                id="em"
                type="email"
                className="folio-inp"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="folio-field">
              <label htmlFor="ph" className="folio-lbl">Mobile Phone *</label>
              <input
                id="ph"
                type="tel"
                className="folio-inp"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="folio-field">
              <label htmlFor="sr" className="folio-lbl">Special Requests (Optional)</label>
              <textarea
                id="sr"
                className="folio-inp folio-txt"
                rows={2}
                placeholder="e.g. Quiet room, high floor, feather-free pillows..."
                value={specialReq}
                onChange={e => setSpecialReq(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button
                type="button"
                className="folio-btn-sec"
                onClick={() => setStep('review')}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="folio-cta"
                style={{ flex: 2 }}
              >
                Complete Reservation
              </button>
            </div>
          </form>
        ) : (
          /* Step 1: Accommodation, Dates & Price Review */
          <>
            {/* Selected Room */}
            <div className="folio-grp">
              <div className="folio-lbl">Selected Accommodation</div>
              <div className="folio-box">
                {selectedRoom ? (
                  <>
                    <div className="folio-room-name">{selectedRoom.type} ({selectedRoom.code})</div>
                    <div className="folio-room-rate">{formatCurrency(selectedRoom.pricePerNight)} / night</div>
                  </>
                ) : (
                  <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
                    ← Choose an available room from the list
                  </span>
                )}
              </div>
            </div>

            {/* Stay Dates */}
            <div className="folio-grp">
              <div className="folio-lbl">Stay Duration & Party</div>
              <div className="folio-dates">
                <div className="folio-dc">
                  <span className="folio-dc-cap">Check-in</span>
                  <span className="folio-dc-val">{fmt(checkIn)}</span>
                </div>
                <span className="folio-arrow">→</span>
                <div className="folio-dc" style={{ textAlign: 'right' }}>
                  <span className="folio-dc-cap">Check-out</span>
                  <span className="folio-dc-val">{fmt(checkOut)}</span>
                </div>
              </div>
              {calculation.nights > 0 && validation.isValid && (
                <div className="folio-nights">
                  🌙 {calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'} · {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="folio-price">
              <div className="folio-price-head">Price Calculation</div>
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
                    <span>Taxes & Fees</span>
                    <span style={{ color: 'var(--green)' }}>Included</span>
                  </div>
                  <div className="pdiv" />
                  <div className="prow total">
                    <span>Total Amount</span>
                    <span className="price-total">{formatCurrency(calculation.totalPrice)}</span>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '.8rem', color: 'var(--muted)', textAlign: 'center', padding: '4px 0' }}>
                  Select dates and a room to calculate total rate
                </div>
              )}
            </div>

            {/* Booking action button */}
            <button
              type="button"
              className="folio-cta"
              disabled={!canProceed}
              onClick={() => canProceed && setStep('details')}
            >
              Enter Guest Details →
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
