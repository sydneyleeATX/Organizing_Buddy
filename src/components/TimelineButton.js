import React, { useState } from 'react';
import styles from './TimelineButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import Timeline from './Timeline';

/**
 * TimelineButton - A button that opens a slide-out panel containing the Timeline component.
 * Uses the same overlay/close logic as FabButton.
 * 
 * Props:
 *  - currentStep: The current step to highlight in the timeline
 *  - style: Optional custom styles for the button
 */
const TimelineButton = ({ currentStep, style = {} }) => {
  // State to control whether the timeline panel is open
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Timeline Button */}
      <button 
        className={styles.timelineButton} 
        style={style} 
        onClick={() => setOpen(true)}
        aria-label="Open Timeline"
      >
        <FontAwesomeIcon icon={faListCheck} style={{color: "#ffffff"}} />
      </button>
      
      {/* Side panel overlay and drawer, shown only when open */}
      {open && (
        <div className={styles.sidePanelOverlay} onClick={() => setOpen(false)}>
          <aside className={styles.sidePanel} onClick={e => e.stopPropagation()}>
            <button className={styles.closeSidePanel} onClick={() => setOpen(false)}>&times;</button>
            <h3 style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>Timeline</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Timeline currentStep={currentStep} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default TimelineButton;
