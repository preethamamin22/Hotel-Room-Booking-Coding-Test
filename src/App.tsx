import { useState } from 'react';
import { Header } from './components/Header';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomCard } from './components/RoomCard';
import { BookingSummary } from './components/BookingSummary';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import {
  validateBookingDates,
  calculateBooking,
  isRoomAvailable,
} from './utils/bookingLogic';
import { Filter } from 'lucide-react';

export function App() {
  // Today's date helper formatted YYYY-MM-DD
  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const minDateStr = getTodayStr();

  // Application State
  const [checkIn, setCheckIn] = useState<string>(getTodayStr());
  const [checkOut, setCheckOut] = useState<string>(getTomorrowStr());
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>('R101');

  // Business Logic Computations
  const validation = validateBookingDates(checkIn, checkOut);

  const selectedRoom =
    SAMPLE_ROOMS.find((room) => room.code === selectedRoomCode) || null;

  const calculation = selectedRoom
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: 0, totalPrice: 0 };

  const isSelectedRoomAvailable = selectedRoom
    ? isRoomAvailable(selectedRoom.code, checkIn, checkOut, MOCK_EXISTING_BOOKINGS)
    : true;

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Date & Guest Filter Controls */}
      <DateGuestFilter
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
        onGuestsChange={setGuests}
        validation={validation}
        minDate={minDateStr}
      />

      {/* Main Content Layout */}
      <main className="main-layout">
        {/* Left Side: Room Listing */}
        <section className="rooms-section">
          <div className="section-title-wrapper">
            <h2 className="section-title">Available Accommodations</h2>
            <span className="room-count-tag">
              Showing {SAMPLE_ROOMS.length} Rooms ({guests} {guests === 1 ? 'Guest' : 'Guests'} filter)
            </span>
          </div>

          <div className="rooms-grid">
            {SAMPLE_ROOMS.map((room) => {
              const available = isRoomAvailable(
                room.code,
                checkIn,
                checkOut,
                MOCK_EXISTING_BOOKINGS
              );
              return (
                <RoomCard
                  key={room.code}
                  room={room}
                  isSelected={room.code === selectedRoomCode}
                  onSelect={setSelectedRoomCode}
                  isAvailable={available}
                  filterGuests={guests}
                />
              );
            })}
          </div>

          {/* Bonus Info Card: Existing Mock Bookings Notice */}
          <div className="filter-card" style={{ marginTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: '700', marginBottom: '8px' }}>
              <Filter size={18} />
              <span>Simulated Real-time Availability (Bonus Feature)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
              The system automatically checks requested stay intervals against existing reservations.
              <br />
              • <strong>R101</strong> is pre-booked from <strong>2 to 5 days from now</strong>.
              <br />
              • <strong>R201</strong> is pre-booked from <strong>7 to 10 days from now</strong>.
              <br />
              Selecting overlapping dates will mark those rooms as unavailable with explicit visual feedback.
            </p>
          </div>
        </section>

        {/* Right Side: Booking Summary & Instant Quote Calculator */}
        <section className="summary-section-wrapper">
          <BookingSummary
            selectedRoom={selectedRoom}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            validation={validation}
            calculation={calculation}
            isRoomAvailable={isSelectedRoomAvailable}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
