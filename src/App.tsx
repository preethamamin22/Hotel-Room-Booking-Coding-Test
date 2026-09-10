import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomCard } from './components/RoomCard';
import { BookingSummary } from './components/BookingSummary';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import {
  validateBookingDates,
  calculateBooking,
  isRoomAvailable,
} from './utils/bookingLogic';
import { Info } from 'lucide-react';

export default function App() {
  const today = () => new Date().toISOString().split('T')[0];
  const tomorrow = () => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(tomorrow());
  const [guests, setGuests] = useState(2);
  const [selectedCode, setSelectedCode] = useState<string | null>('R101');

  const validation = validateBookingDates(checkIn, checkOut);
  const selectedRoom = SAMPLE_ROOMS.find(r => r.code === selectedCode) ?? null;
  const calculation = selectedRoom
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: 0, totalPrice: 0 };
  const selectedAvailable = selectedRoom
    ? isRoomAvailable(selectedRoom.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)
    : true;

  return (
    <>
      <Header />

      <Hero />

      <DateGuestFilter
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
        onGuestsChange={setGuests}
        validation={validation}
        minDate={today()}
      />

      <main className="page-body">
        <div className="layout-grid">
          {/* ── Rooms Column ── */}
          <section>
            <div className="section-header">
              <h2 className="section-title">Available Accommodations</h2>
              <span className="section-meta">
                {SAMPLE_ROOMS.length} Room Types · Bengaluru
              </span>
            </div>

            <div className="rooms-stack">
              {SAMPLE_ROOMS.map(room => (
                <RoomCard
                  key={room.code}
                  room={room}
                  isSelected={room.code === selectedCode}
                  onSelect={setSelectedCode}
                  isAvailable={isRoomAvailable(room.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)}
                  filterGuests={guests}
                />
              ))}
            </div>

            {/* Availability notice */}
            <div className="info-notice">
              <div className="info-notice__title">
                <Info size={14} />
                Real-time Availability Check
              </div>
              <p className="info-notice__body">
                Room availability is checked against existing reservations in real-time. Currently,{' '}
                <strong>R101</strong> is held from days +2 to +5 and{' '}
                <strong>R201</strong> from days +7 to +10 from today.
                Selecting overlapping dates will mark those rooms as sold out.
              </p>
            </div>
          </section>

          {/* ── Folio Sidebar ── */}
          <section>
            <div className="section-header">
              <h2 className="section-title">Reservation Folio</h2>
            </div>
            <BookingSummary
              selectedRoom={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              validation={validation}
              calculation={calculation}
              isRoomAvailable={selectedAvailable}
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
