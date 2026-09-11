import React from 'react';
import { SAMPLE_ROOMS } from '../data/mockData';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  onSelectDatesPrompt: () => void;
}

export const HotelShowcase: React.FC<Props> = ({ onSelectDatesPrompt }) => {
  return (
    <div>
      {/* Pre-search Prompt Box */}
      <div className="b-presearch-box">
        <div className="b-presearch-icon">📅</div>
        <h2 className="b-presearch-title">Select dates to see prices and availability</h2>
        <p className="b-presearch-sub">
          Check-in and check-out dates are required to view live suite rates, free cancellation options, and confirmed inventory.
        </p>
        <button
          type="button"
          className="b-presearch-action"
          onClick={onSelectDatesPrompt}
        >
          Enter Stay Dates
        </button>
      </div>

      {/* Room Previews Section */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', marginBottom: 14 }}>
          Featured Accommodations at Raintech Grand Stays
        </h3>

        <div className="b-preview-grid">
          {SAMPLE_ROOMS.map(room => (
            <div key={room.code} className="b-pcard">
              <img src={room.image} alt={room.type} className="b-pcard-img" />
              <div className="b-pcard-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 className="b-pcard-title">{room.type}</h4>
                  <span style={{ fontSize: '.75rem', color: 'var(--b-text-muted)', fontWeight: 600 }}>{room.code}</span>
                </div>
                <p className="b-pcard-desc">{room.description}</p>
                <div className="b-pcard-amenities">
                  {room.amenities.slice(0, 3).map(a => (
                    <span key={a} className="b-pcard-amenity">✓ {a}</span>
                  ))}
                  <span className="b-pcard-amenity">👥 Max {room.maxGuests} guests</span>
                </div>
                <div className="b-pcard-foot">
                  <div>
                    <span className="b-pcard-from">From</span>
                    <span className="b-pcard-price">{formatCurrency(room.pricePerNight)}</span>
                    <span style={{ fontSize: '.72rem', color: 'var(--b-text-muted)' }}> / night</span>
                  </div>
                  <button
                    type="button"
                    className="b-pcard-btn"
                    onClick={onSelectDatesPrompt}
                  >
                    See availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
