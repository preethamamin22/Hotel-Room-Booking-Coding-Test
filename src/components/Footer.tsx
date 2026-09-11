import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="b-footer">
      <div className="b-footer-inner">
        <div className="b-footer-links-grid">
          <div>
            <div className="b-footer-col-head">Destinations</div>
            <a href="#" className="b-footer-link">Bengaluru Hotels</a>
            <a href="#" className="b-footer-link">Karnataka Resorts</a>
            <a href="#" className="b-footer-link">India Luxury Stays</a>
            <a href="#" className="b-footer-link">Palace Road Suites</a>
            <a href="#" className="b-footer-link">Places of Interest</a>
          </div>

          <div>
            <div className="b-footer-col-head">Accommodation Types</div>
            <a href="#" className="b-footer-link">Deluxe King Rooms</a>
            <a href="#" className="b-footer-link">Executive Penthouse Suites</a>
            <a href="#" className="b-footer-link">Family Double Rooms</a>
            <a href="#" className="b-footer-link">Serviced Apartments</a>
            <a href="#" className="b-footer-link">Boutique Villas</a>
          </div>

          <div>
            <div className="b-footer-col-head">Travel Services</div>
            <a href="#" className="b-footer-link">Car Rentals & Transfers</a>
            <a href="#" className="b-footer-link">Airport Taxis</a>
            <a href="#" className="b-footer-link">Fine Dining Reservations</a>
            <a href="#" className="b-footer-link">Corporate Travel Portal</a>
            <a href="#" className="b-footer-link">Raintech for Travel Agents</a>
          </div>

          <div>
            <div className="b-footer-col-head">Help & Support</div>
            <a href="#" className="b-footer-link">Customer Service Help</a>
            <a href="#" className="b-footer-link">Free Cancellation Policy</a>
            <a href="#" className="b-footer-link">Best Price Guarantee</a>
            <a href="#" className="b-footer-link">Safety Resource Centre</a>
            <a href="#" className="b-footer-link">Privacy & Cookies Statement</a>
          </div>
        </div>

        <div className="b-footer-bar">
          <div>© 2026 Raintech.com™. All rights reserved.</div>
          <div>Raintech.com is part of Raintech Hospitality Network, leader in hotel booking and accommodation technology.</div>
        </div>
      </div>
    </footer>
  );
};
