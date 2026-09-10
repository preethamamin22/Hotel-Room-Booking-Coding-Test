import React from 'react';
import { Room } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { Users, Check, AlertTriangle, Lock } from 'lucide-react';

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
      className={`room-card ${isSelected ? 'selected' : ''} ${!isSelectable ? 'disabled' : ''}`}
      onClick={() => isSelectable && onSelect(room.code)}
      id={`room-card-${room.code}`}
    >
      {/* Room Image Container */}
      <div className="room-image-wrapper">
        <img src={room.image} alt={room.type} className="room-image" loading="lazy" />
        <div className="room-code-badge">{room.code}</div>
        
        {isSelected && (
          <div className="selected-badge">
            <Check size={16} />
            <span>Selected</span>
          </div>
        )}

        {!isAvailable && (
          <div className="unavailable-overlay">
            <Lock size={16} />
            <span>Booked for selected dates</span>
          </div>
        )}
      </div>

      {/* Room Content Details */}
      <div className="room-details">
        <div className="room-header-line">
          <div>
            <span className="room-type-category">{room.type}</span>
            <h3 className="room-title">{room.code} — {room.type}</h3>
          </div>
          <div className="room-price-tag">
            <span className="price-val">{formatCurrency(room.pricePerNight)}</span>
            <span className="price-unit">/ night</span>
          </div>
        </div>

        <p className="room-description">{room.description}</p>

        {/* Room Specs & Capacity */}
        <div className="room-specs">
          <div className={`spec-badge ${exceedsGuestCapacity ? 'spec-warning' : ''}`}>
            <Users size={14} />
            <span>Max {room.maxGuests} Guests</span>
          </div>
          {exceedsGuestCapacity && (
            <span className="capacity-warning-text">
              Exceeds guest limit ({filterGuests} requested)
            </span>
          )}
        </div>

        {/* Amenities Pills */}
        <div className="amenities-list">
          {room.amenities.map((amenity, idx) => (
            <span key={idx} className="amenity-chip">
              {amenity}
            </span>
          ))}
        </div>

        {/* Card Action Footer */}
        <div className="room-action-footer">
          {!isAvailable ? (
            <div className="status-notice status-booked">
              <AlertTriangle size={14} />
              <span>Unavailable for dates</span>
            </div>
          ) : exceedsGuestCapacity ? (
            <div className="status-notice status-capacity">
              <AlertTriangle size={14} />
              <span>Capacity too small</span>
            </div>
          ) : (
            <button
              type="button"
              className={`select-btn ${isSelected ? 'btn-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(room.code);
              }}
            >
              {isSelected ? (
                <>
                  <Check size={16} /> Selected
                </>
              ) : (
                'Select Room'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
