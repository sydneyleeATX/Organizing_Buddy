import React from "react";

const DeclutterTips = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={inlineStyles.overlay}>
      <div style={inlineStyles.modal}>
        <button style={inlineStyles.closeButton} onClick={onClose}>&times;</button>
        <h2>Declutter Tips</h2>
        <ul>
          <li>Start small: Tackle one drawer or shelf at a time.</li>
          <li>Sort items into keep, donate, and discard piles.</li>
          <li>Set a timer to stay focused and avoid overwhelm.</li>
          <li>Ask yourself if you’ve used the item in the last year.</li>
          <li>Organize by category, not by location.</li>
          <li>Label storage containers for easy identification.</li>
          <li>Maintain your space by decluttering regularly.</li>
        </ul>
      </div>
    </div>
  );
};

export default DeclutterTips;

const inlineStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  modal: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    minWidth: '340px',
    maxWidth: '90vw',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
    position: 'relative',
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
  },
};