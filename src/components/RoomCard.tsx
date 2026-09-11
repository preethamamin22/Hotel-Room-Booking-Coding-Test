import React from 'react';
import { Room } from '../types/booking';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  room: Room; isSelected: boolean;
  onSelect: (c: string) => void;
  isAvailable: boolean; filterGuests: number;
}

export const RoomCard: React.FC<Props> = ({ room, isSelected, onSelect, isAvailable, filterGuests }) => {
  const overCap = filterGuests > room.maxGuests;
  const ok = isAvailable && !overCap;

  return (
    <article
      className={`rcard${isSelected ? ' selected' : ''}${!ok ? ' dimmed' : ''}`}
      onClick={() => ok && onSelect(room.code)}
      id={`room-${room.code}`}
      tabIndex={ok ? 0 : -1}
      role="button"
      onKeyDown={e => e.key === 'Enter' && ok && onSelect(room.code)}
      aria-pressed={isSelected}
    >
      {/* Photo */}
      <div className="rcard-photo">
        <img src={room.image} alt={room.type} className="rcard-img" loading="lazy" />
        <div className="rcard-code">{room.code}</div>
        {isSelected && <div className="rcard-sel-tag">✓ Selected</div>}
        {!isAvailable && (
          <div className="rcard-sold-layer">
            <div className="rcard-sold-box">
              <div style={{ fontSize: '1.5rem' }}>🔒</div>
              <div className="rcard-sold-lbl">Unavailable for Dates</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="rcard-body">
        <div className="rcard-top">
          <div>
            <div className="rcard-type">{room.type}</div>
            <h3 className="rcard-name">{room.code} — {room.type}</h3>
          </div>
          <div className="rcard-price-box">
            <div className="rcard-price">{formatCurrency(room.pricePerNight)}</div>
            <div className="rcard-per">per night, incl. taxes</div>
          </div>
        </div>

        <p className="rcard-desc">{room.description}</p>

        <div className="rcard-specs">
          <div className="rcard-spec">👥 Up to {room.maxGuests} Guests</div>
          {overCap && <div className="rcard-spec warn">⚠ Too small for {filterGuests} guests</div>}
        </div>

        <div className="rcard-tags">
          {room.amenities.map((a, i) => <span key={i} className="rtag">{a}</span>)}
        </div>

        <div className="rcard-foot">
          {!isAvailable
            ? <span className="rcard-status sold">⚠ Sold Out</span>
            : overCap
            ? <span className="rcard-status cap">⚠ Room Too Small</span>
            : <span className="rcard-status ok">✓ Available</span>
          }
          <button
            type="button"
            className={`btn-sel ${isSelected ? 'done' : 'idle'}`}
            disabled={!ok}
            onClick={e => { e.stopPropagation(); if (ok) onSelect(room.code); }}
          >
            {isSelected ? '✓ Selected' : 'Select Room'}
          </button>
        </div>
      </div>
    </article>
  );
};
