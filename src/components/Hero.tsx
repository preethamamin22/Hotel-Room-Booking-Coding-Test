import React from 'react';

export const Hero: React.FC = () => (
  <div className="hero">
    <div className="hero__bg" />
    <div className="hero__overlay" />
    <div className="hero__content">
      <div className="hero__eyebrow">
        <span>★</span>
        Five-Star Luxury Experience
      </div>
      <h1 className="hero__title">
        Your Perfect Stay<br />
        Awaits <em>You Here</em>
      </h1>
      <p className="hero__sub">
        Discover handpicked luxury suites and rooms in the heart of Bengaluru. Select your dates, pick your room, and get an instant booking quote.
      </p>
    </div>
  </div>
);
