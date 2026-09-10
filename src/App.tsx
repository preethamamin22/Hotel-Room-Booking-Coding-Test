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

export function App() {
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

  const [checkIn, setCheckIn] = useState<string>(getTodayStr());
  const [checkOut, setCheckOut] = useState<string>(getTomorrowStr());
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoomCode, setSelectedRoomCode] = useState<string | null>('R101');

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
    <div>
      <Header />

      <main className="main-page-wrapper">
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

        <div className="content-grid-layout">
          <section>
            <div className="section-head">
              <h2>Available Accommodations</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                Showing {SAMPLE_ROOMS.length} Luxury Room Types
              </span>
            </div>

            <div className="rooms-stack">
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
          </section>

          <section>
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
        </div>
      </main>
    </div>
  );
}

export default App;
