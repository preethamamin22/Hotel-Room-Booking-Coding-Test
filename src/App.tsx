import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { DateGuestFilter } from './components/DateGuestFilter';
import { RoomsTable } from './components/RoomsTable';
import { HotelShowcase } from './components/HotelShowcase';
import { BookingSummary } from './components/BookingSummary';
import { SAMPLE_ROOMS, MOCK_EXISTING_BOOKINGS } from './data/mockData';
import { validateBookingDates, calculateBooking } from './utils/bookingLogic';

const today = () => new Date().toISOString().split('T')[0];

export default function App() {
  // Start with empty dates (no pre-selected dates for optimal UX)
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const validation = validateBookingDates(checkIn, checkOut);
  const hasValidDates = !!checkIn && !!checkOut && validation.isValid;

  const selectedRoom = SAMPLE_ROOMS.find(r => r.code === selectedCode) ?? null;
  const calculation = selectedRoom && hasValidDates
    ? calculateBooking(selectedRoom.pricePerNight, checkIn, checkOut)
    : { nights: 0, pricePerNight: 0, totalPrice: 0 };

  const promptDates = () => {
    const ci = document.getElementById('ci');
    if (ci) {
      ci.focus();
      ci.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* Booking.com Blue Header with Stays, Flights, etc. */}
      <Header />

      {/* Hero Header */}
      <Hero />

      {/* Iconic 4px Yellow Border Search Bar */}
      <div ref={searchRef}>
        <DateGuestFilter
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          childrenCount={childrenCount}
          onCheckIn={setCheckIn}
          onCheckOut={setCheckOut}
          onAdultsChange={setAdults}
          onChildrenChange={setChildrenCount}
          onSearch={() => {
            if (!hasValidDates) promptDates();
          }}
          validation={validation}
          minDate={today()}
        />
      </div>

      <main className="b-page">
        {/* Breadcrumbs */}
        <nav className="b-crumbs" aria-label="Breadcrumbs">
          <a href="#">Home</a>
          <span className="b-crumbs-sep">&gt;</span>
          <a href="#">India</a>
          <span className="b-crumbs-sep">&gt;</span>
          <a href="#">Karnataka</a>
          <span className="b-crumbs-sep">&gt;</span>
          <a href="#">Bengaluru Hotels</a>
          <span className="b-crumbs-sep">&gt;</span>
          <span className="b-crumbs-cur">Raintech Grand Stays & Suites</span>
        </nav>

        {/* Property Header Info */}
        <div className="b-hotel-header">
          <div className="b-hotel-title-wrap">
            <div className="b-hotel-stars">★★★★★</div>
            <h1 className="b-hotel-title">
              Raintech Grand Stays & Suites
              <span className="b-badge-rec">Recommended</span>
            </h1>
            <div className="b-hotel-address">
              <span>📍 Palace Road, Vasanth Nagar, Bengaluru, Karnataka, 560001, India</span>
              <span className="b-crumbs-sep">·</span>
              <span className="b-map-link" onClick={promptDates}>Great location — show on map</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Booking.com Review Score [ 9.4 ] */}
            <div className="b-score-card">
              <div className="b-score-text">
                <div className="b-score-label">Superb</div>
                <div className="b-score-reviews">1,428 reviews</div>
              </div>
              <div className="b-score-box">9.4</div>
            </div>

            <div className="b-hotel-actions">
              <button
                type="button"
                className="b-btn-reserve"
                onClick={promptDates}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>

        {/* Booking.com Photo Gallery */}
        <div className="b-gallery" aria-label="Hotel photo gallery">
          <div className="b-gal-item main">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
              alt="Raintech Grand Stays Luxury Facade"
              className="b-gal-img"
            />
          </div>
          <div className="b-gal-item">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80"
              alt="Deluxe Suite Bedroom"
              className="b-gal-img"
            />
          </div>
          <div className="b-gal-item">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80"
              alt="Executive Suite Living Lounge"
              className="b-gal-img"
            />
          </div>
          <div className="b-gal-item">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
              alt="Modern Marble Bathroom"
              className="b-gal-img"
            />
          </div>
          <div className="b-gal-item">
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"
              alt="Skyline Balcony View"
              className="b-gal-img"
            />
            <div className="b-gal-overlay">+14 photos</div>
          </div>
        </div>

        {/* Property Highlights Strip */}
        <div className="b-highlights">
          <div className="b-hl-item">
            <span className="b-hl-icon">📍</span>
            <div>
              <div className="b-hl-title">Top Location: Highly Rated</div>
              <div className="b-hl-desc">Recent guests gave location 9.6/10</div>
            </div>
          </div>
          <div className="b-hl-item">
            <span className="b-hl-icon">🥐</span>
            <div>
              <div className="b-hl-title">Exceptional Breakfast</div>
              <div className="b-hl-desc">Continental, Vegetarian, Gourmet buffet</div>
            </div>
          </div>
          <div className="b-hl-item">
            <span className="b-hl-icon">🚗</span>
            <div>
              <div className="b-hl-title">Free Private Parking</div>
              <div className="b-hl-desc">Complimentary on-site valet parking</div>
            </div>
          </div>
          <div className="b-hl-item">
            <span className="b-hl-icon">🛡️</span>
            <div>
              <div className="b-hl-title">Free Cancellation</div>
              <div className="b-hl-desc">Flexible travel with risk-free bookings</div>
            </div>
          </div>
        </div>

        {/* Main Section: Table or Showcase */}
        {hasValidDates ? (
          <RoomsTable
            rooms={SAMPLE_ROOMS}
            selectedCode={selectedCode}
            onSelect={setSelectedCode}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            childrenCount={childrenCount}
            existingBookings={MOCK_EXISTING_BOOKINGS}
            calculation={calculation}
          />
        ) : (
          <HotelShowcase onSelectDatesPrompt={promptDates} />
        )}
      </main>

      {/* Booking.com Sticky Drawer & Checkout Modal */}
      <BookingSummary
        selectedRoom={selectedRoom}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        childrenCount={childrenCount}
        calculation={calculation}
        onClearSelection={() => setSelectedCode(null)}
      />

      {/* Booking.com Navy Footer */}
      <Footer />
    </>
  );
}
