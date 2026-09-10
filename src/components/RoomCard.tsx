import React from 'react';
import { Room } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { Users, AlertTriangle } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: (roomCode: string) => void;
  isAvailable: boolean;
  filterGuests: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isSelected,
  onSelect,
  isAvailable,
  filterGuests,
}) => {
  const exceedsGuestCapacity = filterGuests > room.maxGuests;
  const isSelectable = isAvailable && !exceedsGuestCapacity;

  return (
    <div
      className={`room-card ${isSelected ? 'is-selected' : ''} ${!isSelectable ? 'is-disabled' : ''}`}
      onClick={() => isSelectable && onSelect(room.code)}
    >
      {/* Room Photo */}
      <div className="room-media">
        <img src={room.image} alt={room.type} className="room-photo" loading="lazy" />
        <span className="room-code-tag">{room.code}</span>
      </div>

      {/* Room Content */}
      <div className="room-content">
        <div>
          <div className="room-title-row">
            <h3 className="room-type-title">{room.type}</h3>
            <div className="room-price-box">
              <span className="price-amount">{formatCurrency(room.pricePerNight)}</span>
              <div className="price-unit">per night</div>
            </div>
          </div>

          <p className="room-desc">{room.description}</p>

          <div className="room-specs-list">
            <div className="spec-item">
              <Users size={14} />
              <span>Up to {room.maxGuests} Guests</span>
            </div>
          </div>

          <div className="features-tags">
            {room.amenities.map((amenity, idx) => (
              <span key={idx} className="feature-tag">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions & Status */}
        <div className="room-card-footer">
          {!isAvailable ? (
            <span className="status-badge sold-out">
              <AlertTriangle size={14} />
              Sold Out for Dates
            </span>
          ) : exceedsGuestCapacity ? (
            <span className="status-badge over-capacity">
              <AlertTriangle size={14} />
              Exceeds Capacity ({filterGuests} Guests)
            </span>
          ) : (
            <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '600' }}>
              ✓ Instant Confirmation
            </span>
          )}

          <button
            type="button"
            className={`btn-select ${isSelected ? 'selected' : ''}`}
            disabled={!isSelectable}
            onClick={(e) => {
              e.stopPropagation();
              if (isSelectable) onSelect(room.code);
            }}
          >
            {isSelected ? '✓ Selected' : 'Select Room'}
          </button>
        </div>
      </div>
    </div>
  );
};
