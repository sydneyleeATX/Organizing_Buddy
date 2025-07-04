import React from 'react';

/**
 * SpaceSuggestions Popup Component
 * Appears as a modal listing spaces to organize when triggered from the FAB in zone.js
 *
 * Props:
 *   open (boolean): Whether the popup is open
 *   onClose (function): Function to close the popup
 */
const SPACES = [
  'bedroom closet',
  'kitchen pantry',
  'home office',
  'garage',
  'bathroom cabinets',
  'living room shelves',
  'laundry room',
  'entryway',
  'kids playroom',
  'basement storage',
  'attic',
  'craft room',
  'car trunk',
  'bookshelves',
  'pet area',
];
 // Inline styles for the modal
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'fade-in 0.2s ease',
  },
  modal: {
    background: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    position: 'relative',
    outline: 'none',
  },
  closeBtn: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    color: '#888',
    cursor: 'pointer',
    lineHeight: 1,
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#4338ca', // indigo-700
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  listItem: {
    background: '#eef2ff', // indigo-50
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: '#1e293b', // slate-800
    fontSize: '1rem',
  },
};

/**
 * SpaceSuggestions Popup Component
 * Appears as a modal listing spaces to organize when triggered from the FAB in zone.js
 *
 * Props:
 *   open (boolean): Whether the popup is open
 *   onClose (function): Function to close the popup
 *   onSelect (function): Called with the text of the clicked suggestion
 */
const SpaceSuggestions = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    // aria-modal causes background content to be inert
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal} tabIndex={-1} aria-modal="true" role="dialog">
        <button
          style={modalStyles.closeBtn}
          onClick={onClose}
          aria-label="Close"  // assistive tech reads that this is a close button
        >
          &times;  // visual close button
        </button>
        <h2 style={modalStyles.heading}>Space Suggestions</h2>
        <ul style={modalStyles.list}>
          {SPACES.map((space, idx) => (
            <li
              key={idx}
              style={{ ...modalStyles.listItem, cursor: 'pointer' }}
              // When clicked, fill the field and close the modal
              onClick={() => {
                if (onSelect) onSelect(space);
                if (onClose) onClose();
              }}
              tabIndex={0}  // makes the list keyboard navigable via tab
              role="button"
              aria-label={`Select ${space}`}  // assistive tech reads this text when focused
              onKeyDown={e => {  // when enter or space is pressed, call the onSelect and onClose functions
                if (e.key === 'Enter' || e.key === ' ') {
                  if (onSelect) onSelect(space);
                  if (onClose) onClose();
                }
              }}
            >
              {space}
            </li>
          ))}
        </ul>
        <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </div>
    </div>
  );
};

export default SpaceSuggestions;
