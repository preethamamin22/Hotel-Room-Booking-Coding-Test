import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ size = 42, className = '', variant = 'dark' }) => {
  const isDark = variant === 'dark';
  return (
    <div
      className={`brand-logo-mark ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: isDark ? 'linear-gradient(145deg, #1f1f33 0%, #141424 100%)' : '#ffffff',
        border: isDark ? '1px solid rgba(201, 148, 58, 0.4)' : '1px solid rgba(201, 148, 58, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: isDark
          ? '0 3px 10px rgba(20, 20, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 2px 8px rgba(0, 0, 0, 0.06)',
      }}
      aria-hidden="true"
    >
      <svg
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.72)}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGradMark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7e6c4" />
            <stop offset="45%" stopColor="#d4a359" />
            <stop offset="100%" stopColor="#9e6e22" />
          </linearGradient>
        </defs>

        {/* 5-Star Crest Apex */}
        <path
          d="M18 3L19.2 6.2L22.4 6.5L19.9 8.6L20.7 11.8L18 10.1L15.3 11.8L16.1 8.6L13.6 6.5L16.8 6.2L18 3Z"
          fill="url(#goldGradMark)"
        />

        {/* Architectural Pediment / Classical Roof */}
        <path
          d="M6.5 13.5L18 7.2L29.5 13.5"
          stroke="url(#goldGradMark)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="6"
          y1="14.2"
          x2="30"
          y2="14.2"
          stroke="url(#goldGradMark)"
          strokeWidth="1.2"
        />

        {/* Luxury Grand Colonnade */}
        <line x1="9" y1="15" x2="9" y2="28" stroke="url(#goldGradMark)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="13.5" y1="15" x2="13.5" y2="28" stroke="url(#goldGradMark)" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="22.5" y1="15" x2="22.5" y2="28" stroke="url(#goldGradMark)" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="27" y1="15" x2="27" y2="28" stroke="url(#goldGradMark)" strokeWidth="1.4" strokeLinecap="round" />

        {/* Grand Archway with R Monogram */}
        <path
          d="M13.5 28V20.5C13.5 18.0147 15.5147 16 18 16C20.4853 16 22.5 18.0147 22.5 20.5V28"
          stroke="url(#goldGradMark)"
          strokeWidth="1.1"
          fill="rgba(201, 148, 58, 0.08)"
        />
        <text
          x="18"
          y="25.5"
          textAnchor="middle"
          fill="url(#goldGradMark)"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="7.5"
          fontWeight="700"
        >
          R
        </text>

        {/* Classical Stylobate / Foundation Steps */}
        <line x1="5.5" y1="28.5" x2="30.5" y2="28.5" stroke="url(#goldGradMark)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="4" y1="31" x2="32" y2="31" stroke="url(#goldGradMark)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
};
