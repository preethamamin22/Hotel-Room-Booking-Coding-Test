import React from 'react';
import { Room } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';
import { Users, Check, AlertTriangle, Lock } from 'lucide-react';

interface Props {
  room: Room;
  isSelected: boolean;
  onSelect: (code: string) => void;
  isAvailable: boolean;
  filterGuests: number;
}

export const RoomCard: React.FC<Props> = ({
  room, isSelected, onSelect, isAvailable, filterGuests,
}) => {
  const overCapacity = filterGuests > room.maxGuests;
  const selectable = isAvailable && !overCapacity;

  return (
    <article
      className={`room-card
        ${isSelected ? 'room-card--selected' : ''}
        ${!selectable ? 'room-card--unavailable' : ''}`}
      onClick={() => selectable && onSelect(room.code)}
      id={`room-${room.code}`}
    >
      {/* Photo */}
      <div className="room-card__media">
        <img src={room.image} alt={room.type} className="room-card__img" loading="lazy" />

        <div className="room-card__code-badge">{room.code}</div>

        {isSelected && (
          <div className="room-card__selected-badge">
            <Check size={12} /> Selected
          </div>
        )}

        {!isAvailable && (
          <div className="room-card__unavail-overlay">
            <Lock size={18} />
            <span>Unavailable for dates</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="room-card__body">
        <div className="room-card__top">
          <div>
            <div className="room-card__category">{room.type}</div>
            <h3 className="room-card__name">{room.code} — {room.type}</h3>
          </div>
          <div className="room-card__price">
            <div className="room-card__price-amount">{formatCurrency(room.pricePerNight)}</div>
            <div className="room-card__price-unit">per night, incl. taxes</div>
          </div>
        </div>

        <p className="room-card__desc">{room.description}</p>

        <div className="room-card__specs">
          <div className="spec-item">
            <Users size={14} />
            Up to {room.maxGuests} Guests
          </div>
          {overCapacity && (
            <div className="spec-item" style={{ color: 'var(--amber-600)' }}>
              <AlertTriangle size={14} />
              Exceeds limit ({filterGuests} requested)
            </div>
          )}
        </div>

        <div className="room-card__amenities">
          {room.amenities.map((a, i) => (
            <span key={i} className="amenity-tag">{a}</span>
          ))}
        </div>

        <div className="room-card__footer">
          {!isAvailable ? (
            <span className="status-text status-text--booked">
              <AlertTriangle size={13} /> Sold Out for Selected Dates
            </span>
          ) : overCapacity ? (
            <span className="status-text status-text--capacity">
              <AlertTriangle size={13} /> Room Capacity Too Small
            </span>
          ) : (
            <span className="status-text status-text--available">
              ✓ Available for Booking
            </span>
          )}

          <button
            type="button"
            className={`btn-select ${isSelected ? 'btn-select--selected' : ''}`}
            disabled={!selectable}
            onClick={e => { e.stopPropagation(); if (selectable) onSelect(room.code); }}
          >
            {isSelected ? '✓ Selected' : 'Select Room'}
          </button>
        </div>
      </div>
    </article>
  );
};
