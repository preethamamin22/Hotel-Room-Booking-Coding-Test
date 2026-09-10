import React from 'react';
import { Room } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { Users, Check, AlertTriangle } from 'lucide-react';

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
      className={`room-card-item ${isSelected ? 'selected' : ''} ${!isSelectable ? 'disabled' : ''}`}
      onClick={() => isSelectable && onSelect(room.code)}
      id={`room-card-${room.code}`}
    >
      {/* Room Image Container */}
      <div className="room-card-image-wrap">
        <img src={room.image} alt={room.type} className="room-card-image" loading="lazy" />
        <div className="room-badge-code">{room.code}</div>

        {isSelected && (
          <div className="selected-check-badge">
            <Check size={14} />
            <span>Selected</span>
          </div>
        )}
      </div>

      {/* Room Details & Actions */}
      <div className="room-card-body">
        <div>
          <div className="room-title-rate-row">
            <div>
              <div className="room-category-label">{room.type}</div>
              <h3 className="room-title-heading">{room.code} — {room.type}</h3>
            </div>
            <div className="room-rate-display">
              <div className="rate-amount">{formatCurrency(room.pricePerNight)}</div>
              <div className="rate-per-night">per night</div>
            </div>
          </div>

          <p className="room-description-text">{room.description}</p>

          <div className="room-capacity-spec">
            <Users size={15} />
            <span>Accommodates up to {room.maxGuests} Guests</span>
          </div>

          <div className="amenities-pills-row">
            {room.amenities.map((amenity, idx) => (
              <span key={idx} className="amenity-tag-pill">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="room-card-action-bar">
          {!isAvailable ? (
            <span className="status-indicator sold-out">
              <AlertTriangle size={15} />
              Booked for selected dates
            </span>
          ) : exceedsGuestCapacity ? (
            <span className="status-indicator capacity-warning">
              <AlertTriangle size={15} />
              Exceeds guest capacity ({filterGuests} requested)
            </span>
          ) : (
            <span className="status-indicator available">
              ✓ Available for stay
            </span>
          )}

          <button
            type="button"
            className={`action-select-btn ${isSelected ? 'is-selected' : ''}`}
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
