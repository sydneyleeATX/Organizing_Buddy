import React, { useState } from 'react';
import styles from './FabButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
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
        <FontAwesomeIcon icon={faHammer} style={{color: "#ffffff"}} />
      </button>
      {/* Side panel overlay and drawer, shown only when open */}
      {open && (
        <div className={styles.sidePanelOverlay} onClick={() => setOpen(false)}>
          <aside className={styles.sidePanel} onClick={e => e.stopPropagation()}>
            <button className={styles.closeSidePanel} onClick={() => setOpen(false)}>&times;</button>
            <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            {actions && actions.map((action, idx) => (
              <button
                key={idx}
                className={styles.fabPopupButton}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
              >
                {action.label}
              </button>
            ))}
          </aside>
        </div>
      )}
    </>
  );
};

export default FabButton;
