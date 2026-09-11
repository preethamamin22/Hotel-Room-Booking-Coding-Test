import React, { useState } from 'react';
import { Room, BookingCalculation, GuestDetails } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  calculation: BookingCalculation;
  onClearSelection: () => void;
}

export const BookingSummary: React.FC<Props> = ({
  selectedRoom,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  calculation,
  onClearSelection,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{
    bookingNumber: string;
    pin: string;
    guest: GuestDetails;
  } | null>(null);

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isMainGuest, setIsMainGuest] = useState(true);
  const [travelForWork, setTravelForWork] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');

  if (!selectedRoom) return null;

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both your first name and last name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setError('Please enter a valid mobile phone number.');
      return;
    }

    setError('');
    const randomBookingNum = `${Math.floor(1000 + Math.random() * 9000)}.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}`;
    const randomPin = `${Math.floor(1000 + Math.random() * 9000)}`;

    setConfirmedData({
      bookingNumber: randomBookingNum,
      pin: randomPin,
      guest: {
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phone: phone.trim(),
        adults,
        children: childrenCount,
        specialRequests: specialRequests.trim(),
      },
    });
  };

  const handleReset = () => {
    setConfirmedData(null);
    setModalOpen(false);
    onClearSelection();
  };

  return (
    <>
      {/* Sticky Booking Drawer (Booking.com style) */}
      {!confirmedData && (
        <div className="b-drawer">
          <div className="b-drawer-inner">
            <div className="b-drawer-info">
              <div>
                <div className="b-drawer-room">
                  {selectedRoom.type} ({selectedRoom.code})
                </div>
                <div className="b-drawer-sub">
                  {checkIn} to {checkOut} · {calculation.nights} night{calculation.nights > 1 ? 's' : ''} · {adults} adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} child` : ''} · Free cancellation
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div className="b-drawer-total">
                <div className="b-drawer-price">{formatCurrency(calculation.totalPrice)}</div>
                <div style={{ fontSize: '.74rem', color: 'var(--b-text-muted)' }}>Includes taxes & charges</div>
              </div>

              <button
                type="button"
                className="b-drawer-btn"
                onClick={() => setModalOpen(true)}
              >
                I'll reserve &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking.com Guest Details Checkout Modal */}
      {modalOpen && !confirmedData && (
        <div className="b-modal-overlay">
          <div className="b-modal">
            <div className="b-modal-head">
              <div className="b-modal-title">Enter your details</div>
              <button
                type="button"
                className="b-modal-close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCompleteBooking}>
              <div className="b-modal-body">
                {/* Stay Summary Card */}
                <div className="b-checkout-summary">
                  <div>
                    <div className="b-cs-room">Raintech Grand Stays — {selectedRoom.type}</div>
                    <div className="b-cs-dates">
                      {checkIn} to {checkOut} ({calculation.nights} night{calculation.nights > 1 ? 's' : ''}) · {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child` : ''}
                    </div>
                  </div>
                  <div className="b-cs-price">{formatCurrency(calculation.totalPrice)}</div>
                </div>

                {error && (
                  <div style={{
                    background: 'var(--b-red-bg)', color: 'var(--b-red)', padding: '10px 14px',
                    borderRadius: 4, marginBottom: 16, fontSize: '.84rem', fontWeight: 600,
                  }}>
                    ⚠ {error}
                  </div>
                )}

                {/* Name Fields */}
                <div className="b-form-grid">
                  <div className="b-form-field">
                    <label htmlFor="fn" className="b-form-label">First Name *</label>
                    <input
                      id="fn"
                      type="text"
                      className="b-form-inp"
                      placeholder="e.g. Preetham"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="b-form-field">
                    <label htmlFor="ln" className="b-form-label">Last Name *</label>
                    <input
                      id="ln"
                      type="text"
                      className="b-form-inp"
                      placeholder="e.g. Amin"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="b-form-grid">
                  <div className="b-form-field">
                    <label htmlFor="em" className="b-form-label">Email Address *</label>
                    <input
                      id="em"
                      type="email"
                      className="b-form-inp"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <span style={{ fontSize: '.72rem', color: 'var(--b-text-muted)' }}>
                      Confirmation email will be sent here
                    </span>
                  </div>

                  <div className="b-form-field">
                    <label htmlFor="ph" className="b-form-label">Mobile Phone *</label>
                    <input
                      id="ph"
                      type="tel"
                      className="b-form-inp"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                    <span style={{ fontSize: '.72rem', color: 'var(--b-text-muted)' }}>
                      Needed by the property for your arrival
                    </span>
                  </div>
                </div>

                {/* Who are you booking for? */}
                <div className="b-form-field full" style={{ marginTop: 10 }}>
                  <span className="b-form-label">Who are you booking for?</span>
                  <div className="b-form-radio-row">
                    <label>
                      <input
                        type="radio"
                        name="mainGuest"
                        checked={isMainGuest}
                        onChange={() => setIsMainGuest(true)}
                      />
                      I am the main guest
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="mainGuest"
                        checked={!isMainGuest}
                        onChange={() => setIsMainGuest(false)}
                      />
                      Booking for someone else
                    </label>
                  </div>
                </div>

                {/* Traveling for work? */}
                <div className="b-form-field full">
                  <span className="b-form-label">Are you traveling for work?</span>
                  <div className="b-form-radio-row">
                    <label>
                      <input
                        type="radio"
                        name="work"
                        checked={travelForWork}
                        onChange={() => setTravelForWork(true)}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="work"
                        checked={!travelForWork}
                        onChange={() => setTravelForWork(false)}
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="b-form-field full">
                  <label htmlFor="req" className="b-form-label">Special requests</label>
                  <textarea
                    id="req"
                    className="b-form-inp"
                    rows={2}
                    placeholder="e.g. Quiet room, high floor, feather-free pillows..."
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                  />
                  <span style={{ fontSize: '.72rem', color: 'var(--b-text-muted)' }}>
                    Special requests cannot be guaranteed, but the property will do its best.
                  </span>
                </div>
              </div>

              <div className="b-modal-foot">
                <span style={{ fontSize: '.84rem', color: 'var(--b-green)', fontWeight: 700 }}>
                  ✓ Free cancellation · No prepayment needed
                </span>
                <button type="submit" className="b-btn-complete">
                  Complete booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking.com Confirmation Voucher Modal */}
      {confirmedData && (
        <div className="b-modal-overlay">
          <div className="b-conf-card">
            <div className="b-conf-header">
              <div className="b-conf-check">✓</div>
              <h2 className="b-conf-title">Your booking is confirmed!</h2>
              <p className="b-conf-sub">We have sent a confirmation email to <strong>{confirmedData.guest.email}</strong></p>

              <div className="b-conf-pin-box">
                <div>
                  <div className="b-conf-item-lbl">Confirmation #</div>
                  <div className="b-conf-item-val">{confirmedData.bookingNumber}</div>
                </div>
                <div>
                  <div className="b-conf-item-lbl">PIN Code</div>
                  <div className="b-conf-item-val">{confirmedData.pin}</div>
                </div>
              </div>
            </div>

            <div className="b-conf-body">
              <div className="b-conf-row">
                <span style={{ color: 'var(--b-text-muted)' }}>Property</span>
                <strong>Raintech Grand Stays & Suites</strong>
              </div>
              <div className="b-conf-row">
                <span style={{ color: 'var(--b-text-muted)' }}>Accommodation</span>
                <strong>{selectedRoom.type} ({selectedRoom.code})</strong>
              </div>
              <div className="b-conf-row">
                <span style={{ color: 'var(--b-text-muted)' }}>Lead Guest</span>
                <strong>{confirmedData.guest.fullName}</strong>
              </div>
              <div className="b-conf-row">
                <span style={{ color: 'var(--b-text-muted)' }}>Check-in</span>
                <span>{checkIn} (from 14:00)</span>
              </div>
              <div className="b-conf-row">
                <span style={{ color: 'var(--b-text-muted)' }}>Check-out</span>
                <span>{checkOut} (until 12:00)</span>
              </div>
              <div className="b-conf-row">
                <span style={{ color: 'var(--b-text-muted)' }}>Stay Length</span>
                <span>{calculation.nights} Night{calculation.nights > 1 ? 's' : ''} · {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child` : ''}</span>
              </div>
              {confirmedData.guest.specialRequests && (
                <div className="b-conf-row">
                  <span style={{ color: 'var(--b-text-muted)' }}>Special Requests</span>
                  <span style={{ fontStyle: 'italic' }}>{confirmedData.guest.specialRequests}</span>
                </div>
              )}
              <div className="b-conf-row total">
                <span>Total Amount Paid</span>
                <span style={{ color: 'var(--b-accent)' }}>{formatCurrency(calculation.totalPrice)}</span>
              </div>
            </div>

            <div className="b-conf-actions">
              <button
                type="button"
                className="b-nav-pill"
                style={{ background: '#fff', color: '#1a1a1a', border: '1px solid #ccc' }}
                onClick={() => window.print()}
              >
                ⎙ Print voucher
              </button>
              <button
                type="button"
                className="b-btn-complete"
                onClick={handleReset}
              >
                Done / Make another booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
