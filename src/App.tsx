import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomCard } from './components/RoomCard';
import { BookingSummary } from './components/BookingSummary';
import { HotelShowcase } from './components/HotelShowcase';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import { validateBookingDates, calculateBooking, isRoomAvailable } from './utils/bookingLogic';

const today = () => new Date().toISOString().split('T')[0];

export default function App() {
  // Start with unselected dates (user explicitly enters their stay dates)
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
    : { nights: 0, pricePerNight: 0, totalPrice: 0 };

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
        {hasValidDates ? (
          /* Live Room Availability & Folio (When stay dates are entered) */
          <div className="page-grid">
            <section aria-label="Available rooms">
              <div className="col-hd">
                <div>
                  <h2 className="col-title">Available Accommodations</h2>
                  <div className="col-sub">
                    {checkIn} to {checkOut} ({calculation.nights} {calculation.nights === 1 ? 'Night' : 'Nights'}) · {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-change-dates"
                  onClick={promptDates}
                >
                  Change Dates
                </button>
              </div>

              <div className="rooms">
                {SAMPLE_ROOMS.map(room => (
                  <RoomCard
                    key={room.code}
                    room={room}
                    isSelected={room.code === selectedCode}
                    onSelect={setSelectedCode}
                    isAvailable={isRoomAvailable(room.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)}
                    filterGuests={totalGuests}
                    nights={calculation.nights}
                  />
                ))}
              </div>

              <div className="avail-box">
                <div className="avail-box-head">ℹ Live Inventory & Availability Status</div>
                <p className="avail-box-body">
                  Availability is verified live against hotel reservations. <strong>R101</strong> is booked days +2 to +5,
                  and <strong>R201</strong> days +7 to +10 from today. Overlapping dates automatically disable conflicting rooms.
                </p>
              </div>
            </section>

            {/* Sticky Reservation Folio with Booking.com style guest details checkout */}
            <section aria-label="Reservation summary">
              <div className="col-hd">
                <h2 className="col-title">Your Stay</h2>
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
        ) : (
          /* Pre-Search Hotel Information & Suite Previews (Before dates are entered) */
          <HotelShowcase onSelectDatesPrompt={promptDates} />
        )}
      </main>

      <Footer />
    </>
  );
}
