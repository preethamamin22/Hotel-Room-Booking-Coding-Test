import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-body">
        <div className="hero-badge">✦ Five-Star Luxury Experience</div>
        <h1 className="hero-h1">Timeless Elegance, <em>Bespoke Stays</em></h1>
        <p className="hero-sub">
          Experience world-class hospitality, award-winning culinary arts, and tranquil luxury in the heart of Bengaluru.
        </p>
      </div>
    </section>
  );
};
