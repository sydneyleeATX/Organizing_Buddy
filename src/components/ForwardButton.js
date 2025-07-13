import React from 'react';

/**
 * ForwardButton - Simple reusable forward arrow button.
 * Props:
 *   - onClick: function to call when button is clicked
 *   - ariaLabel: accessible label (optional)
 */
const ForwardButton = ({ onClick, ariaLabel = 'Go Forward', style = {} }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      zIndex: 1200,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'none',
      ...style
    }}
  >
    {/* SVG right arrow icon */}
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#fff" opacity="0.85"/>
      <path d="M20 14L30 24L20 34" stroke="#b2e0eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

export default ForwardButton;
