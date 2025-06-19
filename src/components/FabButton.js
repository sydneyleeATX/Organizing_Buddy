import React, { useState } from 'react';
import styles from './FabButton.module.css';

/**
 * FabButton - A floating action button that opens a popup with customizable quick actions.
 *
 * Props:
 *  - actions: Array of objects with { label, onClick } for each quick action button.
 */
const FabButton = ({ actions }) => {
  // State to control whether the popup is open
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button className={styles.fabButton} onClick={() => setOpen(true)}>
        +
      </button>
      {/* Popup overlay and popup content, shown only when open */}
      {open && (
        <div className={styles.fabPopupOverlay} onClick={() => setOpen(false)}>
          <div className={styles.fabPopup} onClick={e => e.stopPropagation()}>
            {/* Close (X) button */}
            <button className={styles.closeFabPopup} onClick={() => setOpen(false)}>&times;</button>
            <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            {/* Render a button for each action passed in */}
            {actions && actions.map((action, idx) => (
              <button
                key={idx}
                className={styles.fabPopupButton}
                onClick={() => {
                  action.onClick(); // Call the provided action
                  setOpen(false);  // Close the popup after click
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FabButton;
