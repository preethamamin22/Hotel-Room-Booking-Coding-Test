import React from 'react';
import { Room, ExistingBooking, BookingCalculation } from '../types/booking';
import { formatCurrency, isRoomAvailable } from '../utils/bookingLogic';

interface Props {
  rooms: Room[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
  checkIn: string;
  checkOut: string;
  adults: number;
  childrenCount: number;
  existingBookings: ExistingBooking[];
  calculation: BookingCalculation;
}

export const RoomsTable: React.FC<Props> = ({
  rooms,
  selectedCode,
  onSelect,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  existingBookings,
  calculation,
}) => {
  const totalGuests = adults + childrenCount;
  const nights = calculation.nights > 0 ? calculation.nights : 1;

  return (
    <div className="b-table-section">
      <div className="b-table-head">
        <div>
          <h2 className="b-table-title">Availability & Room Types</h2>
          <span style={{ fontSize: '.84rem', color: 'var(--b-text-muted)' }}>
            Prices for {nights} night{nights > 1 ? 's' : ''}, {adults} adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} child${childrenCount > 1 ? 'ren' : ''}` : ''}
          </span>
        </div>
        <div className="b-table-dates-pill">
          📅 {checkIn} to {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})
        </div>
      </div>

      <table className="b-table">
        <thead>
          <tr>
            <th className="b-th" style={{ width: '38%' }}>Room Type</th>
            <th className="b-th" style={{ width: '12%', textAlign: 'center' }}>Number of Guests</th>
            <th className="b-th" style={{ width: '18%' }}>Today's Price</th>
            <th className="b-th" style={{ width: '20%' }}>Your Choices</th>
            <th className="b-th" style={{ width: '12%', textAlign: 'center' }}>Select</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => {
            const available = isRoomAvailable(room.code, checkIn, checkOut, existingBookings);
            const isSelected = selectedCode === room.code;
            const roomTotal = room.pricePerNight * nights;
            const exceedsCap = totalGuests > room.maxGuests;

            return (
              <tr
                key={room.code}
                className={`b-tr${isSelected ? ' selected' : ''}${!available ? ' sold-out' : ''}`}
              >
                {/* Col 1: Room Details */}
                <td className="b-td b-room-col">
                  <span className="b-room-name" onClick={() => available && !exceedsCap && onSelect(room.code)}>
                    {room.type} ({room.code})
                  </span>

                  <div className="b-room-photo-row">
                    <img src={room.image} alt={room.type} className="b-room-thumb" />
                    <div className="b-room-chips">
                      <span className="b-chip-bold">🛏️ 1 extra-large double bed</span>
                      <span>📐 45 m² · Balcony · City view</span>
                      <span className="b-chip-green">🚿 Private luxury bathroom</span>
                      <span>📶 Free high-speed WiFi</span>
                    </div>
                  </div>

                  <div style={{ fontSize: '.76rem', color: 'var(--b-text-muted)' }}>
                    {room.description}
                  </div>
                </td>

                {/* Col 2: Number of Guests */}
                <td className="b-td b-guests-col">
                  <div className="b-guest-icons">
                    {Array.from({ length: Math.min(room.maxGuests, 4) }).map((_, i) => (
                      <span key={i}>👤</span>
                    ))}
                  </div>
                  <div className="b-guest-cap">Max {room.maxGuests} guests</div>
                  {exceedsCap && (
                    <div style={{ color: 'var(--b-red)', fontSize: '.7rem', fontWeight: 700, marginTop: 4 }}>
                      Capacity exceeded ({totalGuests} guests)
                    </div>
                  )}
                </td>

                {/* Col 3: Price */}
                <td className="b-td b-price-col">
                  <div className="b-nights-badge">{nights} {nights === 1 ? 'night' : 'nights'}</div>
                  <div style={{ textDecoration: 'line-through', color: 'var(--b-red)', fontSize: '.84rem' }}>
                    {formatCurrency(Math.round(roomTotal * 1.2))}
                  </div>
                  <div className="b-price-val">{formatCurrency(roomTotal)}</div>
                  <div className="b-price-taxes">+ Taxes & fees included</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--b-text-muted)', marginTop: 4 }}>
                    {formatCurrency(room.pricePerNight)} / night
                  </div>
                </td>

                {/* Col 4: Choices */}
                <td className="b-td b-choices-col">
                  <div className="b-choice-item green">
                    <span>✓</span>
                    <span>FREE cancellation before arrival</span>
                  </div>
                  <div className="b-choice-item green">
                    <span>✓</span>
                    <span>NO PREPAYMENT NEEDED - pay at the property</span>
                  </div>
                  <div className="b-choice-item">
                    <span>✓</span>
                    <span>Gourmet breakfast included</span>
                  </div>
                  <div className="b-scarcity">
                    Only 1 room left at this price on our site!
                  </div>
                </td>

                {/* Col 5: Select / Action */}
                <td className="b-td b-select-col">
                  {!available ? (
                    <span className="b-sold-badge">Sold Out for Dates</span>
                  ) : exceedsCap ? (
                    <span style={{ fontSize: '.74rem', color: 'var(--b-text-muted)' }}>Over Capacity</span>
                  ) : (
                    <button
                      type="button"
                      className={`b-btn-pick${isSelected ? ' active' : ''}`}
                      onClick={() => onSelect(room.code)}
                    >
                      {isSelected ? 'Selected ✓' : 'Select Room'}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
