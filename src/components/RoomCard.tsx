import React from 'react';
import { Room } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  room: Room;
  isSelected: boolean;
  onSelect: (code: string) => void;
  isAvailable: boolean;
  filterGuests: number;
  nights?: number;
}

export const RoomCard: React.FC<Props> = ({
  room,
  isSelected,
  onSelect,
  isAvailable,
  filterGuests,
  nights = 1,
}) => {
  const exceedsCapacity = filterGuests > room.maxGuests;
  const stayNights = Math.max(1, nights);
  const stayTotal = room.pricePerNight * stayNights;

  return (
    <article
      className={`rcard${isSelected ? ' selected' : ''}${!isAvailable ? ' sold-out' : ''}`}
      aria-label={`${room.type} details`}
    >
      <div className="rcard-photo-wrap">
        <img src={room.image} alt={room.type} className="rcard-photo" />
        <span className="rcard-code-tag">{room.code}</span>
      </div>

      <div className="rcard-body">
        <div className="rcard-top">
          <div>
            <h3 className="rcard-name">{room.type}</h3>
            <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginTop: 2 }}>
              Max {room.maxGuests} Guests · Palace Road Suite
            </div>
          </div>

          <div className="rcard-price-box">
            <div className="rcard-price">{formatCurrency(stayTotal)}</div>
            <div className="rcard-per">
              {stayNights > 1 ? `for ${stayNights} nights (${formatCurrency(room.pricePerNight)}/night)` : 'per night'}
            </div>
          </div>
        </div>

        <p className="rcard-desc">{room.description}</p>

        <div className="rcard-amenities">
          {room.amenities.map(amenity => (
            <span key={amenity} className="rcard-chip">✓ {amenity}</span>
          ))}
        </div>

        {exceedsCapacity && (
          <div style={{ color: 'var(--red)', fontSize: '.76rem', fontWeight: 600 }}>
            ⚠ Party size ({filterGuests} guests) exceeds room capacity of {room.maxGuests}.
          </div>
        )}

        <div className="rcard-foot">
          <div className="rcard-choices">
            <span>✓ Free Cancellation up to 24h prior to check-in</span>
            <span>✓ Complimentary Gourmet Breakfast & High Tea</span>
          </div>

          <div>
            {!isAvailable ? (
              <span className="badge-sold">Booked for selected dates</span>
            ) : (
              <button
                type="button"
                className={`btn-sel${isSelected ? ' selected' : ''}`}
                disabled={exceedsCapacity}
                onClick={() => onSelect(room.code)}
              >
                {isSelected ? 'Selected ✓' : 'Select Room'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
