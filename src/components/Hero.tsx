import React from 'react';

export const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero__img" aria-hidden="true" />
    <div className="hero__overlay" aria-hidden="true" />
    <div className="hero__body">
      <div className="hero__badge">✦ Five-Star Luxury Experience</div>
      <h1 className="hero__h1">
        Your Perfect Stay<br />
        Awaits <em>You Here</em>
      </h1>
      <p className="hero__sub">
        Discover handcrafted luxury suites and rooms in the heart of Bengaluru.
        Select your dates, choose your room, and receive an instant quote.
      </p>
      <div className="hero__stats">
        <div>
          <div className="hero__stat-val">5★</div>
          <div className="hero__stat-lbl">Luxury Rated</div>
        </div>
        <div>
          <div className="hero__stat-val">500+</div>
          <div className="hero__stat-lbl">Happy Guests</div>
        </div>
        <div>
          <div className="hero__stat-val">5</div>
          <div className="hero__stat-lbl">Room Types</div>
        </div>
        <div>
          <div className="hero__stat-val">24/7</div>
          <div className="hero__stat-lbl">Concierge</div>
        </div>
      </div>
    </div>
  </section>
);
