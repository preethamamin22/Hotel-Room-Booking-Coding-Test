import React, { useState } from 'react';
import { Room, BookingCalculation, GuestDetails } from '../types/booking';
import { formatCurrency, formatDisplayDate } from '../utils/bookingLogic';

interface Props {
  room: Room;
  checkIn: string;
  checkOut: string;
  guests?: number;
  adults?: number;
  childrenCount?: number;
  calculation: BookingCalculation;
  onBack: () => void;
}

export const BookingDetailsView: React.FC<Props> = ({
  room,
  checkIn,
  checkOut,
  guests = 2,
  adults = 2,
  childrenCount = 0,
  calculation,
  onBack,
}) => {
  const displayGuests = guests || (adults + childrenCount) || 1;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialReq, setSpecialReq] = useState('');
  const [formError, setFormError] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<{
    id: string;
    guest: GuestDetails;
    createdAt: string;
  } | null>(null);

  const formatDate = (s: string) => formatDisplayDate(s);

  const handleSubmit = (e: React.FormEvent) => {
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
      setFormError('Please enter a valid phone number');
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
        guests: displayGuests,
        adults: displayGuests,
        children: 0,
        specialRequests: specialReq.trim(),
      },
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };

  return (
    <div className="details-page" aria-label="Booking details and confirmation">
      {/* Back Navigation Bar */}
      <div className="details-top-bar">
        <button type="button" className="details-back-btn" onClick={onBack}>
          ← Back to room selection
        </button>
        <div className="details-step-indicator">
          {confirmedBooking ? 'Step 2 of 2 · Booking Confirmed' : 'Step 2 of 2 · Guest Details & Confirmation'}
        </div>
      </div>

      {confirmedBooking ? (
        /* Verified Booking Confirmation Voucher */
        <div className="voucher-card">
          <div className="voucher-header">
            <div className="voucher-check-icon">✓</div>
            <h2 className="voucher-title">Reservation Confirmed!</h2>
            <p className="voucher-subtitle">
              We have sent a booking confirmation receipt to <strong>{confirmedBooking.guest.email}</strong>
            </p>

            <div className="voucher-ref-box">
              <span className="voucher-ref-label">Booking Reference ID</span>
              <span className="voucher-ref-val">{confirmedBooking.id}</span>
            </div>
          </div>

          <div className="voucher-body">
            <div className="voucher-section-title">Reservation Details</div>

            <div className="voucher-grid">
              <div className="voucher-row">
                <span className="v-lbl">Property</span>
                <strong>Raintech Grand Stays & Suites</strong>
              </div>
              <div className="voucher-row">
                <span className="v-lbl">Accommodation</span>
                <strong>{room.type} ({room.code})</strong>
              </div>
              <div className="voucher-row">
                <span className="v-lbl">Primary Guest</span>
                <strong>{confirmedBooking.guest.fullName}</strong>
              </div>
              <div className="voucher-row">
                <span className="v-lbl">Contact</span>
                <span>{confirmedBooking.guest.phone}</span>
              </div>
              <div className="voucher-row">
                <span className="v-lbl">Check-in</span>
                <span>{formatDate(checkIn)} (from 14:00)</span>
              </div>
              <div className="voucher-row">
                <span className="v-lbl">Check-out</span>
                <span>{formatDate(checkOut)} (until 12:00)</span>
              </div>
              <div className="voucher-row">
                <span className="v-lbl">Stay Duration</span>
                <span>{calculation.nights} Night{calculation.nights > 1 ? 's' : ''} · {displayGuests} Guest{displayGuests > 1 ? 's' : ''}</span>
              </div>
              {confirmedBooking.guest.specialRequests && (
                <div className="voucher-row">
                  <span className="v-lbl">Special Requests</span>
                  <span style={{ fontStyle: 'italic', textAlign: 'right' }}>{confirmedBooking.guest.specialRequests}</span>
                </div>
              )}
              <div className="voucher-row total">
                <span>Total Amount Paid</span>
                <span className="voucher-total-price">{formatCurrency(calculation.totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="voucher-footer">
            <button type="button" className="voucher-btn-print" onClick={() => window.print()}>
              ⎙ Print Confirmation
            </button>
            <button type="button" className="voucher-btn-done" onClick={onBack}>
              Book Another Stay
            </button>
          </div>
        </div>
      ) : (
        /* 2-Column Details & Confirmation Form (Booking.com style) */
        <div className="details-grid">
          {/* Left Column: Confirmed Room & Price Breakdown */}
          <div className="details-summary-col">
            <div className="summary-card">
              <div className="summary-card-header">Your Stay Summary</div>

              <div className="summary-room-preview">
                <img src={room.image} alt={room.type} className="summary-room-img" />
                <div>
                  <div className="summary-hotel-name">Raintech Grand Stays & Suites</div>
                  <h3 className="summary-room-title">{room.type} ({room.code})</h3>
                  <div className="summary-room-meta">Max {room.maxGuests} Guests · Palace Road Suite</div>
                </div>
              </div>

              <div className="summary-stay-dates">
                <div className="summary-date-box">
                  <span className="s-date-cap">Check-in</span>
                  <strong className="s-date-val">{formatDate(checkIn)}</strong>
                  <span className="s-time">From 14:00</span>
                </div>
                <div className="summary-date-arrow">→</div>
                <div className="summary-date-box" style={{ textAlign: 'right' }}>
                  <span className="s-date-cap">Check-out</span>
                  <strong className="s-date-val">{formatDate(checkOut)}</strong>
                  <span className="s-time">Until 12:00</span>
                </div>
              </div>

              <div className="summary-duration-pill">
                🌙 {calculation.nights} Night{calculation.nights > 1 ? 's' : ''} · {displayGuests} Guest{displayGuests > 1 ? 's' : ''}
              </div>

              <div className="summary-perks-list">
                <div className="s-perk">✓ Free cancellation up to 24 hours prior to check-in</div>
                <div className="s-perk">✓ Complimentary gourmet breakfast buffet included</div>
                <div className="s-perk">✓ Complimentary on-site valet parking and high-speed Wi-Fi</div>
              </div>

              {/* Price Calculation */}
              <div className="summary-price-box">
                <div className="summary-price-head">Price Calculation</div>
                <div className="sp-row">
                  <span>Room Rate</span>
                  <span>{formatCurrency(room.pricePerNight)} / night</span>
                </div>
                <div className="sp-row">
                  <span>Stay Duration</span>
                  <span>× {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}</span>
                </div>
                <div className="sp-row">
                  <span>Taxes & Service Fees</span>
                  <span style={{ color: 'var(--green)' }}>Included</span>
                </div>
                <div className="sp-div" />
                <div className="sp-row total">
                  <span>Total Stay Price</span>
                  <span className="sp-total-val">{formatCurrency(calculation.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Guest Information Form */}
          <div className="details-form-col">
            <form className="guest-form-card" onSubmit={handleSubmit}>
              <h2 className="guest-form-title">Enter Lead Guest Details</h2>
              <p className="guest-form-sub">
                Almost done! Fill in your contact details to finalize your reservation.
              </p>

              {formError && (
                <div className="guest-form-alert" role="alert">
                  ⚠ {formError}
                </div>
              )}

              <div className="form-field">
                <label htmlFor="guest-name" className="form-label">Full Name *</label>
                <input
                  id="guest-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Preetham Amin"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="guest-email" className="form-label">Email Address *</label>
                <input
                  id="guest-email"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <span className="form-hint">Your booking confirmation voucher will be sent here.</span>
              </div>

              <div className="form-field">
                <label htmlFor="guest-phone" className="form-label">Mobile Phone Number *</label>
                <input
                  id="guest-phone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
                <span className="form-hint">Needed by the concierge for seamless arrival and check-in.</span>
              </div>

              <div className="form-field">
                <label htmlFor="guest-req" className="form-label">Special Requests (Optional)</label>
                <textarea
                  id="guest-req"
                  className="form-input form-textarea"
                  rows={3}
                  placeholder="e.g. High floor room, quiet room, late check-in, feather-free pillows..."
                  value={specialReq}
                  onChange={e => setSpecialReq(e.target.value)}
                />
              </div>

              <div className="form-guarantee-note">
                🔒 Instant confirmation · No booking fees · Best Rate Guarantee
              </div>

              <button type="submit" className="form-submit-btn">
                Confirm & Complete Reservation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
