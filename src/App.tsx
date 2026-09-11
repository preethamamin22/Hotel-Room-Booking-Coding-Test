import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomCard } from './components/RoomCard';
import { BookingSummary } from './components/BookingSummary';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import { validateBookingDates, calculateBooking, isRoomAvailable } from './utils/bookingLogic';

const today = () => new Date().toISOString().split('T')[0];

export default function App() {
  // Dates start unselected for clean UX (user enters stay duration)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const totalGuests = adults + childrenCount;
  const validation = validateBookingDates(checkIn, checkOut);
  const hasValidDates = !!checkIn && !!checkOut && validation.isValid;

  const selectedRoom = SAMPLE_ROOMS.find(r => r.code === selectedCode) ?? null;
  const calculation = selectedRoom && hasValidDates
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: selectedRoom?.pricePerNight ?? 0, totalPrice: 0 };

  const isSelectedAvailable = selectedRoom && hasValidDates
    ? isRoomAvailable(selectedRoom.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)
    : true;

  const promptDates = () => {
    const ci = document.getElementById('ci');
    if (ci) {
      ci.focus();
      ci.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <Header />
      <Hero />

      {/* Date & Guest Filter Widget */}
      <div ref={searchRef}>
        <DateGuestFilter
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          childrenCount={childrenCount}
          onCheckIn={setCheckIn}
          onCheckOut={setCheckOut}
          onAdultsChange={setAdults}
          onChildrenChange={setChildrenCount}
          onSearch={() => {
            if (!hasValidDates) promptDates();
          }}
          validation={validation}
          minDate={today()}
        />
      </div>

      <main className="page">
        {/* Hotel Direct Booking Perks */}
        <div className="showcase-trust" style={{ marginBottom: 32 }}>
          <div className="trust-item">
            <div className="trust-icon">🛡️</div>
            <div>
              <div className="trust-title">Best Price Guarantee</div>
              <div className="trust-desc">Lowest rates verified for direct bookings with no extra fees.</div>
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

        {/* Main 2-Column Booking System Grid */}
        <div className="page-grid">
          {/* Column 1: Available Rooms List (5 Sample Rooms) */}
          <section aria-label="Available rooms">
            <div className="col-hd">
              <div>
                <h2 className="col-title">Available Accommodations</h2>
                <div className="col-sub">
                  {hasValidDates
                    ? `${checkIn} to ${checkOut} (${calculation.nights} ${calculation.nights === 1 ? 'Night' : 'Nights'}) · ${adults} Adult${adults > 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}`
                    : `Showing all ${SAMPLE_ROOMS.length} room types · Select dates to calculate total stay price`}
                </div>
              </div>

              {hasValidDates && (
                <button
                  type="button"
                  className="btn-change-dates"
                  onClick={promptDates}
                >
                  Change Dates
                </button>
              )}
            </div>

            <div className="rooms">
              {SAMPLE_ROOMS.map(room => (
                <RoomCard
                  key={room.code}
                  room={room}
                  isSelected={room.code === selectedCode}
                  onSelect={setSelectedCode}
                  isAvailable={hasValidDates ? isRoomAvailable(room.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS) : true}
                  filterGuests={totalGuests}
                  nights={calculation.nights}
                />
              ))}
            </div>

            {/* Availability Check Explanation Box (Bonus Feature) */}
            <div className="avail-box">
              <div className="avail-box-head">ℹ Real-time Availability Verification</div>
              <p className="avail-box-body">
                Availability checks for date conflicts against mock reservations: <strong>R101</strong> is reserved for days +2 to +5,
                and <strong>R201</strong> for days +7 to +10 from today. Selecting conflicting dates marks those rooms as booked.
              </p>
            </div>
          </section>

          {/* Column 2: Sticky Reservation Folio with Live Calculation */}
          <section aria-label="Reservation folio">
            <div className="col-hd">
              <h2 className="col-title">Reservation Folio</h2>
            </div>
            <BookingSummary
              selectedRoom={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              childrenCount={childrenCount}
              validation={validation}
              calculation={calculation}
              isRoomAvailable={isSelectedAvailable}
              onClearSelection={() => setSelectedCode(null)}
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
