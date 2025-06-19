import React from 'react';

/**
 * BackButton - Simple reusable back arrow button.
 * Props:
 *   - onClick: function to call when button is clicked
 *   - ariaLabel: accessible label (optional)
 */
const BackButton = ({ onClick, ariaLabel = 'Go Back' }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      zIndex: 1200,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'none',
    }}
  >
    {/* SVG left arrow icon */}
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#fff" opacity="0.85"/>
      <path d="M28 34L18 24L28 14" stroke="#007bff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

export default BackButton;
