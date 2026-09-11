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
  const overCap = filterGuests > room.maxGuests;
  const selectable = isAvailable && !overCap;

  let cardClass = 'rcard';
  if (isSelected)   cardClass += ' rcard--selected';
  if (!selectable)  cardClass += ' rcard--unavail';

  return (
    <article
      className={cardClass}
      onClick={() => selectable && onSelect(room.code)}
      id={`room-${room.code}`}
    >
      {/* ── Photo ── */}
      <div className="rcard__media">
        <img src={room.image} alt={room.type} className="rcard__img" loading="lazy" />

        <div className="rcard__code">{room.code}</div>

        {isSelected && (
          <div className="rcard__sel-badge">
            <Check size={12} /> Selected
          </div>
        )}

        {!isAvailable && (
          <div className="rcard__unavail-layer">
            <Lock size={18} />
            Unavailable for dates
          </div>
        )}
      </div>

      {/* ── Details ── */}
      <div className="rcard__body">
        <div className="rcard__top">
          <div>
            <div className="rcard__cat">{room.type}</div>
            <h3 className="rcard__name">{room.code} — {room.type}</h3>
          </div>
          <div className="rcard__price">
            <div className="rcard__amount">{formatCurrency(room.pricePerNight)}</div>
            <div className="rcard__per">per night, incl. taxes</div>
          </div>
        </div>

        <p className="rcard__desc">{room.description}</p>

        <div className="rcard__specs">
          <div className="spec">
            <Users size={14} />
            Up to {room.maxGuests} Guests
          </div>
          {overCap && (
            <div className="spec spec--warn">
              <AlertTriangle size={13} />
              Exceeds limit ({filterGuests} requested)
            </div>
          )}
        </div>

        <div className="rcard__tags">
          {room.amenities.map((a, i) => (
            <span key={i} className="tag">{a}</span>
          ))}
        </div>

        <div className="rcard__foot">
          {!isAvailable ? (
            <span className="rcard__status rcard__status--sold">
              <AlertTriangle size={13} /> Sold Out for Selected Dates
            </span>
          ) : overCap ? (
            <span className="rcard__status rcard__status--cap">
              <AlertTriangle size={13} /> Room Too Small for Party
            </span>
          ) : (
            <span className="rcard__status rcard__status--ok">
              ✓ Available for Booking
            </span>
          )}

          <button
            type="button"
            className={`btn-sel ${isSelected ? 'btn-sel--chosen' : 'btn-sel--idle'}`}
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
