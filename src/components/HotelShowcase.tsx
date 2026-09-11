import React from 'react';
import { SAMPLE_ROOMS } from '../data/mockData';
import { formatCurrency } from '../utils/bookingLogic';

interface Props {
  onSelectDatesPrompt: () => void;
}

export const HotelShowcase: React.FC<Props> = ({ onSelectDatesPrompt }) => {
  return (
    <section className="showcase" aria-label="Hotel highlights and accommodations">
      {/* Date Prompt Banner */}
      <div className="showcase-prompt-bar">
        <div>
          <h2 className="showcase-prompt-title">Select your stay dates above to check live rates</h2>
          <p className="showcase-prompt-desc">
            Enter your check-in and check-out dates to view confirmed room availability, seasonal packages, and instant booking options.
          </p>
        </div>
        <button
          type="button"
          className="showcase-prompt-btn"
          onClick={onSelectDatesPrompt}
        >
          Select Dates
        </button>
      </div>

      {/* Direct Booking Trust Perks */}
      <div className="showcase-trust">
        <div className="trust-item">
          <div className="trust-icon">🛡️</div>
          <div>
            <div className="trust-title">Best Price Guarantee</div>
            <div className="trust-desc">Always receive the lowest verified rates when booking directly with us.</div>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">🥐</div>
          <div>
            <div className="trust-title">Gourmet Breakfast</div>
            <div className="trust-desc">Daily chef-crafted breakfast buffet included with all direct suite bookings.</div>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">↺</div>
          <div>
            <div className="trust-title">Free Cancellation</div>
            <div className="trust-desc">Enjoy full flexibility with 100% refund up to 24 hours prior to arrival.</div>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">⭐</div>
          <div>
            <div className="trust-title">4.9 / 5 Guest Rating</div>
            <div className="trust-desc">Voted Bengaluru's premier boutique luxury hotel by verified guests.</div>
          </div>
        </div>
      </div>

      {/* Luxury Accommodations Preview */}
      <div>
        <div className="col-hd">
          <div>
            <h2 className="col-title">Our Accommodations</h2>
            <div className="col-sub">Choose from 5 exquisitely appointed luxury suites and rooms</div>
          </div>
        </div>

        <div className="showcase-grid">
          {SAMPLE_ROOMS.map(room => (
            <div key={room.code} className="scard">
              <div className="scard-img-wrap">
                <img src={room.image} alt={room.type} className="scard-img" />
                <span className="scard-badge">{room.code}</span>
              </div>

              <div className="scard-body">
                <div className="scard-top">
                  <h3 className="scard-title">{room.type}</h3>
                  <div className="scard-price-box">
                    <span className="scard-price-from">From</span>
                    <span className="scard-price-val">{formatCurrency(room.pricePerNight)}</span>
                    <span className="scard-price-per">/ night</span>
                  </div>
                </div>

                <p className="scard-desc">{room.description}</p>

                <div className="scard-amenities">
                  {room.amenities.slice(0, 3).map(a => (
                    <span key={a} className="scard-chip">✓ {a}</span>
                  ))}
                  <span className="scard-chip">👥 Up to {room.maxGuests} Guests</span>
                </div>

                <button
                  type="button"
                  className="scard-btn"
                  onClick={onSelectDatesPrompt}
                >
                  Select Dates to Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
