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
  // Start with empty dates so user inputs their stay
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomCode, setRoomCode] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  const totalGuests = adults + childrenCount;
  const validation = validateBookingDates(checkIn, checkOut);
  const selectedRoom = SAMPLE_ROOMS.find(r => r.code === roomCode) ?? null;

  const calculation = selectedRoom && checkIn && checkOut && validation.isValid
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: 0, totalPrice: 0 };

  const selectedAvail = selectedRoom && checkIn && checkOut
    ? isRoomAvailable(selectedRoom.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)
    : true;

  // Have dates been entered?
  const hasDatesSelected = !!checkIn && !!checkOut && validation.isValid;

  const handlePromptDates = () => {
    // Focus check-in input
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

      <div ref={filterRef}>
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
            if (!hasDatesSelected) handlePromptDates();
          }}
          validation={validation}
          minDate={today()}
        />
      </div>

      <main className="page">
        {hasDatesSelected ? (
          /* Live Available Rooms & Booking Folio (after dates are selected) */
          <div className="page-grid">
            {/* Rooms List */}
            <section aria-label="Available rooms">
              <div className="col-hd">
                <div>
                  <h2 className="col-title">Available Accommodations</h2>
                  <span className="col-sub">
                    {checkIn} to {checkOut} · {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? 'ren' : ''}` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-change-dates"
                  onClick={handlePromptDates}
                >
                  Change Dates
                </button>
              </div>

              <div className="rooms">
                {SAMPLE_ROOMS.map(room => (
                  <RoomCard
                    key={room.code}
                    room={room}
                    isSelected={room.code === roomCode}
                    onSelect={setRoomCode}
                    isAvailable={isRoomAvailable(room.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)}
                    filterGuests={totalGuests}
                  />
                ))}
              </div>

              <div className="avail-box">
                <div className="avail-box-head">ℹ Live Inventory & Availability Status</div>
                <p className="avail-box-body">
                  Availability is updated live against reservations. <strong>R101</strong> is booked days +2 to +5,
                  and <strong>R201</strong> days +7 to +10 from today. Conflicting date ranges disable the room card.
                </p>
              </div>
            </section>

            {/* Folio Sidebar */}
            <section aria-label="Reservation folio">
              <div className="col-hd">
                <h2 className="col-title">Your Reservation</h2>
              </div>
              <BookingSummary
                selectedRoom={selectedRoom}
                checkIn={checkIn}
                checkOut={checkOut}
                adults={adults}
                childrenCount={childrenCount}
                validation={validation}
                calculation={calculation}
                isRoomAvailable={selectedAvail}
                onResetDates={() => { setCheckIn(''); setCheckOut(''); setRoomCode(null); }}
              />
            </section>
          </div>
        ) : (
          /* Pre-Search Hotel Showcase (before dates are entered) */
          <HotelShowcase onSelectDatesPrompt={handlePromptDates} />
        )}
      </main>

      <Footer />
    </>
  );
}
