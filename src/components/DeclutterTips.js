import React from "react";
import Dropdown from "./Dropdown";

const DeclutterTips = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={inlineStyles.overlay}>
      <div style={inlineStyles.modal}>
        <button style={{...inlineStyles.closeButton, zIndex: 10, background: '#fff', color: '#333', border: '1px solid #ddd'}} onClick={onClose}>&times;</button>
        <h2>Declutter Tips</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', marginTop: '20px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Dropdown
              label="Be honest: Do I actually use this?"
              items={[
                "Ask: “Have I used this in the last year?”",
                "If the answer is no, it's probably not worth keeping — unless it’s seasonal or sentimental."
              ]}
            />
            <Dropdown
              label="Keep only what you use, love, or need"
              items={[
                "Use the 3-question rule:",
                "Do I use this regularly?",
                "Do I genuinely like it?",
                "Would I buy it again today?"
              ]}
            />
            <Dropdown
              label="Create a “Move” pile for out-of-place items"
              items={[
                "Keep the current space focused: If something belongs elsewhere, don't decide its fate now — just label it “Move” (e.g., soap belongs in bathroom, not closet).",
                "Set up a bin or box for items to be relocated later."
              ]}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Dropdown
              label="Check expiration and condition"
              items={[
                "Discard anything expired, broken, moldy, or damaged",
                "Even if it’s technically useful — if it’s no longer safe, let it go"
              ]}
            />
            <Dropdown
              label="Use a “Not Sure” box — but revisit it"
              items={[
                "If you can’t decide, put it in a clearly marked “Maybe” bin",
                "Set a reminder to review it in 30 days — if you haven’t missed it, discard or donate it"
              ]}
            />
            <Dropdown
              label="Be mindful of duplicates"
              items={[
                "Do you really need 5 half-used lotions or 4 pairs of scissors?",
                "Keep the best one and discard/donate extras"
              ]}
            />
          </div>
        </div>
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