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

  return (
    <article
      className={`rc${isSelected ? ' rc--active' : ''}${!selectable ? ' rc--dim' : ''}`}
      onClick={() => selectable && onSelect(room.code)}
      id={`room-${room.code}`}
      role="button"
      tabIndex={selectable ? 0 : -1}
      onKeyDown={e => e.key === 'Enter' && selectable && onSelect(room.code)}
    >
      {/* Photo */}
      <div className="rc__photo">
        <img src={room.image} alt={`${room.type} — ${room.code}`} className="rc__img" loading="lazy" />
        <div className="rc__code">{room.code}</div>

        {isSelected && (
          <div className="rc__sel-pill">
            <Check size={12} /> Selected
          </div>
        )}

        {!isAvailable && (
          <div className="rc__sold-cover">
            <div className="rc__sold-inner">
              <Lock size={20} className="rc__sold-icon" />
              <div className="rc__sold-text">Unavailable for Dates</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="rc__body">
        <div className="rc__top">
          <div className="rc__left">
            <div className="rc__type">{room.type}</div>
            <h3 className="rc__name">{room.code} — {room.type}</h3>
          </div>
          <div className="rc__right">
            <div className="rc__price">{formatCurrency(room.pricePerNight)}</div>
            <div className="rc__per">per night, incl. taxes</div>
          </div>
        </div>

        <p className="rc__desc">{room.description}</p>

        <div className="rc__specs">
          <div className="rc__spec">
            <Users size={14} /> Up to {room.maxGuests} Guests
          </div>
          {overCap && (
            <div className="rc__spec rc__spec--warn">
              <AlertTriangle size={13} /> Exceeds capacity ({filterGuests} guests)
            </div>
          )}
        </div>

        <div className="rc__tags">
          {room.amenities.map((a, i) => (
            <span key={i} className="tag">{a}</span>
          ))}
        </div>

        <div className="rc__footer">
          {!isAvailable ? (
            <span className="rc__status rc__status--sold">
              <AlertTriangle size={13} /> Sold Out
            </span>
          ) : overCap ? (
            <span className="rc__status rc__status--cap">
              <AlertTriangle size={13} /> Too Small for Party
            </span>
          ) : (
            <span className="rc__status rc__status--ok">✓ Available</span>
          )}

          <button
            type="button"
            className={`btn-pick ${isSelected ? 'btn-pick--done' : 'btn-pick--idle'}`}
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
