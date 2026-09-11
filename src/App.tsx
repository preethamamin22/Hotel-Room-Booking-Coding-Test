import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomCard } from './components/RoomCard';
import { BookingDetailsView } from './components/BookingDetailsView';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import { validateBookingDates, calculateBooking, isRoomAvailable } from './utils/bookingLogic';

const today = () => new Date().toISOString().split('T')[0];

export default function App() {
  // Dates start unselected for clean initial UX (no errors by default)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Selected room and page view state ('rooms' | 'details')
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [view, setView] = useState<'rooms' | 'details'>('rooms');
  const [dateNotice, setDateNotice] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const totalGuests = adults + childrenCount;
  const validation = validateBookingDates(checkIn, checkOut);
  const hasValidDates = !!checkIn && !!checkOut && validation.isValid;

  const selectedRoom = SAMPLE_ROOMS.find(r => r.code === selectedCode) ?? null;
  const calculation = selectedRoom && hasValidDates
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: selectedRoom?.pricePerNight ?? 0, totalPrice: 0 };

  const promptDates = (message?: string) => {
    setDateNotice(message || 'Please select your check-in and check-out dates above to proceed with reservation.');
    const ci = document.getElementById('ci');
    if (ci) {
      ci.focus();
      ci.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSelectRoom = (code: string) => {
    if (!hasValidDates) {
      promptDates('Please select your check-in and check-out dates before reserving a room.');
      return;
    }
    setDateNotice(null);
    setSelectedCode(code);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToRooms = () => {
    setView('rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Hero />

      {/* Date & Guest Search Controls */}
      <div ref={searchRef}>
        <DateGuestFilter
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          childrenCount={childrenCount}
          onCheckIn={(v) => { setCheckIn(v); setDateNotice(null); }}
          onCheckOut={(v) => { setCheckOut(v); setDateNotice(null); }}
          onAdultsChange={setAdults}
          onChildrenChange={setChildrenCount}
          onSearch={() => {
            if (!hasValidDates) promptDates();
            else setDateNotice(null);
          }}
          validation={validation}
          minDate={today()}
        />
      </div>

      <main className="page">
        {dateNotice && (
          <div style={{
            maxWidth: 1240,
            margin: '0 auto 24px',
            background: 'var(--gold-bg)',
            color: '#875a13',
            border: '1.5px solid #eed08d',
            padding: '12px 18px',
            borderRadius: 10,
            fontSize: '.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span>📅</span>
            <span>{dateNotice}</span>
          </div>
        )}

        {view === 'details' && selectedRoom && hasValidDates ? (
          /* Dedicated Details & Confirmation View (Booking.com style) */
          <BookingDetailsView
            room={selectedRoom}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            childrenCount={childrenCount}
            calculation={calculation}
            onBack={handleBackToRooms}
          />
        ) : (
          /* Main Room Selection View (Single Clean List of 5 Rooms, No Redundant Side Form) */
          <div>
            {/* Hotel Direct Booking Perks */}
            <div className="showcase-trust" style={{ marginBottom: 32 }}>
              <div className="trust-item">
                <div className="trust-icon">🛡️</div>
                <div>
                  <div className="trust-title">Best Price Guarantee</div>
                  <div className="trust-desc">Lowest rates verified for direct bookings with no hidden fees.</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">🥐</div>
                <div>
                  <div className="trust-title">Gourmet Breakfast</div>
                  <div className="trust-desc">Complimentary chef-prepared breakfast included with all rooms.</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">↺</div>
                <div>
                  <div className="trust-title">Free Cancellation</div>
                  <div className="trust-desc">Full flexibility with 100% refund up to 24 hours before check-in.</div>
                </div>
              </div>
              <div className="trust-item">
                <div className="trust-icon">⭐</div>
                <div>
                  <div className="trust-title">4.9 / 5 Guest Rating</div>
                  <div className="trust-desc">Ranked #1 boutique luxury property in Bengaluru.</div>
                </div>
              </div>
            </div>

            {/* Room List Header */}
            <div className="col-hd">
              <div>
                <h2 className="col-title">Available Accommodations</h2>
                <div className="col-sub">
                  {hasValidDates
                    ? `Showing live pricing for ${checkIn} to ${checkOut} (${calculation.nights} ${calculation.nights === 1 ? 'Night' : 'Nights'}) · ${adults} Adult${adults > 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}`
                    : `Showing all ${SAMPLE_ROOMS.length} room types · Select your stay dates above to calculate total price`}
                </div>
              </div>
            </div>

            {/* The 5 Room Cards */}
            <div className="rooms">
              {SAMPLE_ROOMS.map(room => (
                <RoomCard
                  key={room.code}
                  room={room}
                  isSelected={room.code === selectedCode}
                  onSelect={handleSelectRoom}
                  isAvailable={hasValidDates ? isRoomAvailable(room.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS) : true}
                  filterGuests={totalGuests}
                  nights={calculation.nights}
                />
              ))}
            </div>

            {/* Availability Check Explanation (Bonus Feature) */}
            <div className="avail-box">
              <div className="avail-box-head">ℹ Live Reservation Availability Status</div>
              <p className="avail-box-body">
                Availability checks for date conflicts against hotel reservations: <strong>R101</strong> is reserved for days +2 to +5,
                and <strong>R201</strong> for days +7 to +10 from today. Selecting conflicting dates marks those rooms as booked.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
