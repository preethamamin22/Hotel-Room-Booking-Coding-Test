import React from 'react';
import { SAMPLE_ROOMS } from '../data/mockData';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  onSelectDatesPrompt: () => void;
}

export const HotelShowcase: React.FC<Props> = ({ onSelectDatesPrompt }) => {
  return (
    <section className="showcase" aria-label="Hotel overview and room preview">
      {/* Banner prompt */}
      <div className="showcase-banner">
        <div className="showcase-banner-icon">📅</div>
        <div className="showcase-banner-text">
          <h3>Select your check-in & check-out dates above</h3>
          <p>Enter your stay dates and guests to view live rates, seasonal offers, and real-time room availability.</p>
        </div>
        <button type="button" className="showcase-banner-btn" onClick={onSelectDatesPrompt}>
          Choose Dates
        </button>
      </div>

      {/* Booking.com style perks */}
      <div className="showcase-perks">
        <div className="perk-card">
          <div className="perk-icon">🛡️</div>
          <div>
            <div className="perk-title">Best Price Guarantee</div>
            <div className="perk-desc">Book direct with no hidden booking fees or surcharges.</div>
          </div>
        </div>

        <div className="perk-card">
          <div className="perk-icon">☕</div>
          <div>
            <div className="perk-title">Complimentary Breakfast</div>
            <div className="perk-desc">Daily gourmet buffet included with all direct suite reservations.</div>
          </div>
        </div>

        <div className="perk-card">
          <div className="perk-icon">↺</div>
          <div>
            <div className="perk-title">Free Cancellation</div>
            <div className="perk-desc">Flexible travel plans with 100% refund up to 24 hours before check-in.</div>
          </div>
        </div>

        <div className="perk-card">
          <div className="perk-icon">⭐</div>
          <div>
            <div className="perk-title">4.9 / 5 Guest Rating</div>
            <div className="perk-desc">Ranked #1 luxury boutique hotel in Bengaluru for 2026.</div>
          </div>
        </div>
      </div>

      {/* Room Category Previews */}
      <div className="showcase-section">
        <div className="showcase-section-head">
          <div>
            <h2 className="showcase-title">Explore Our Accommodations</h2>
            <p className="showcase-subtitle">Choose from 5 exquisitely appointed luxury suites and rooms</p>
          </div>
          <span className="showcase-count">{SAMPLE_ROOMS.length} Room Types Available</span>
        </div>

        <div className="showcase-grid">
          {SAMPLE_ROOMS.map(room => (
            <div key={room.code} className="showcase-card">
              <div className="showcase-card-img-wrap">
                <img src={room.image} alt={room.type} className="showcase-card-img" />
                <span className="showcase-card-badge">{room.code}</span>
              </div>

              <div className="showcase-card-body">
                <div className="showcase-card-top">
                  <h3 className="showcase-card-title">{room.type}</h3>
                  <div className="showcase-card-price">
                    <span className="showcase-price-from">From</span>
                    <span className="showcase-price-val">{formatCurrency(room.pricePerNight)}</span>
                    <span className="showcase-price-per">/ night</span>
                  </div>
                </div>

                <p className="showcase-card-desc">{room.description}</p>

                <div className="showcase-card-amenities">
                  {room.amenities.slice(0, 3).map(a => (
                    <span key={a} className="showcase-amenity-chip">✓ {a}</span>
                  ))}
                  <span className="showcase-amenity-chip">👥 Up to {room.maxGuests} Guests</span>
                </div>

                <button
                  type="button"
                  className="showcase-book-btn"
                  onClick={onSelectDatesPrompt}
                >
                  Select Dates to Check Availability
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
