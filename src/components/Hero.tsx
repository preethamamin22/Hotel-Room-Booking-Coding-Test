import React from 'react';

export const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero-bg" />
    <div className="hero-overlay" />
    <div className="hero-body">
      <div className="hero-badge">✦ Five-Star Luxury Experience</div>
      <h1 className="hero-h1">
        Your Perfect Stay<br />Awaits <em>You Here</em>
      </h1>
      <p className="hero-sub">
        Discover handcrafted luxury suites and rooms in the heart of Bengaluru.
        Select your dates, choose your room, and receive an instant quote.
      </p>
      <div className="hero-stats">
        <div><div className="hero-stat-n">5★</div><div className="hero-stat-l">Luxury Rated</div></div>
        <div><div className="hero-stat-n">500+</div><div className="hero-stat-l">Happy Guests</div></div>
        <div><div className="hero-stat-n">5</div><div className="hero-stat-l">Room Types</div></div>
        <div><div className="hero-stat-n">24/7</div><div className="hero-stat-l">Concierge</div></div>
      </div>
    </div>
  </section>
);
