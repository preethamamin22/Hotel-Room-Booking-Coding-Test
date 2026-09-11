import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomCard } from './components/RoomCard';
import { BookingSummary } from './components/BookingSummary';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import { validateBookingDates, calculateBooking, isRoomAvailable } from './utils/bookingLogic';

const today = () => new Date().toISOString().split('T')[0];
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };

export default function App() {
  const [checkIn,  setCheckIn]  = useState(today());
  const [checkOut, setCheckOut] = useState(tomorrow());
  const [guests,   setGuests]   = useState(2);
  const [roomCode, setRoomCode] = useState<string | null>('R101');

  const validation   = validateBookingDates(checkIn, checkOut);
  const selectedRoom = SAMPLE_ROOMS.find(r => r.code === roomCode) ?? null;
  const calculation  = selectedRoom
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: 0, totalPrice: 0 };
  const selectedAvail = selectedRoom
    ? isRoomAvailable(selectedRoom.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)
    : true;

  return (
    <>
      <Header />
      <Hero />

      <DateGuestFilter
        checkIn={checkIn} checkOut={checkOut} guests={guests}
        onCheckIn={setCheckIn} onCheckOut={setCheckOut} onGuests={setGuests}
        validation={validation} minDate={today()}
      />

      <main className="page">
        <div className="page-grid">
          {/* ── Rooms ── */}
          <section aria-label="Available rooms">
            <div className="col-hd">
              <h2 className="col-title">Available Accommodations</h2>
              <span className="col-sub">{SAMPLE_ROOMS.length} Room Types · Bengaluru</span>
            </div>

            <div className="rooms">
              {SAMPLE_ROOMS.map(room => (
                <RoomCard
                  key={room.code}
                  room={room}
                  isSelected={room.code === roomCode}
                  onSelect={setRoomCode}
                  isAvailable={isRoomAvailable(room.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)}
                  filterGuests={guests}
                />
              ))}
            </div>

            <div className="avail-box">
              <div className="avail-box-head">ℹ Real-time Availability Check</div>
              <p className="avail-box-body">
                Availability is verified against live reservations. <strong>R101</strong> is held days +2 to +5,
                and <strong>R201</strong> days +7 to +10 from today. Choosing overlapping dates marks those rooms as sold out.
              </p>
            </div>
          </section>

          {/* ── Folio ── */}
          <section aria-label="Reservation folio">
            <div className="col-hd">
              <h2 className="col-title">Reservation Folio</h2>
            </div>
            <BookingSummary
              selectedRoom={selectedRoom} checkIn={checkIn} checkOut={checkOut}
              guests={guests} validation={validation}
              calculation={calculation} isRoomAvailable={selectedAvail}
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
