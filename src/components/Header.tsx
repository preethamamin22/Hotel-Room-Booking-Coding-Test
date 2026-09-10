import React from 'react';
import { Hotel, Sparkles, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-badge">
          <Sparkles className="badge-icon" size={14} />
          <span>Raintech Software Limited Assessment</span>
        </div>
        <div className="brand-main">
          <div className="logo-icon-wrapper">
            <Hotel size={28} className="logo-icon" />
          </div>
          <div>
            <h1 className="brand-title">Raintech Luxury Stays</h1>
            <p className="brand-subtitle">Find & Book Your Ideal Accommodation</p>
          </div>
        </div>
      </div>
      <div className="header-features">
        <div className="feature-pill">
          <ShieldCheck size={16} />
          <span>Real-time Rate & Availability Calculation</span>
        </div>
      </div>
    </header>
  );
};
