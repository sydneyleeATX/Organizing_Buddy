/**
 * @file Declutter.js
 * @description Page component for the decluttering section of the organizing process
 * 
 * This component provides the interface for users to remove items they no longer need
 * from their space. It will eventually include functionality for:
 * - Selecting items to declutter
 * - Adding reasons for decluttering
 * - Tracking progress
 * - Moving items to donation/sell/garbage categories
 */

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';
import ChatExpert from '../components/ChatExpert';
import DeclutterTips from '../components/DeclutterTips';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { updateProjectStep } from '../utils/projectUtils';



export default function Declutter() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
  const [fabOpen, setFabOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);


  // Messages for the encouragement popup
  const declutterMessages = [
    "Every 'toss' is a weight lifted, creating lightness in your space.", 
    "By deciding to 'keep' what truly matters, you're defining your priorities.", 
    "The 'relocate' pile is just items finding their happy new home – you're helping them!", 
    "You're not just sorting things; you're sorting thoughts and freeing up mental space.", 
    "Each item you handle brings you closer to a home that serves you better.", 
    "Don't rush the 'toss' pile; trust your intuition about what to release.", 
    "Celebrate every 'keep'; these are the treasures that stay with you.", 
    "The act of 'relocating' brings order and purpose to every corner.", 
    "Your decision to 'toss' creates room for clarity, not just emptiness.", 
    "You're building a functional, peaceful environment, one sorted item at a time."
  ];

  const handleNextStep = () => {
    // First, ensure zoneName is valid before trying to use it or pass it
    if (!zoneName || (zoneName === 'your space' && !router.query.zoneName)) {
      console.error("CRITICAL: handleNextStep in declutter.js - zoneName is missing or default without a query parameter. Aborting step update and navigation.", "Current zoneName:", zoneName, "Full router.query:", router.query);
      alert("There was an issue identifying your project zone in Declutter. Please go back and try again.");
      return; 
    }
    updateProjectStep(zoneName, 'clean');
    router.push(`/clean?zoneName=${encodeURIComponent(zoneName)}`);
  };

  // Main container with full viewport height and centered content
  return (
    <Layout>
      <div style={inlineStyles.container}>
        <h1 style={inlineStyles.heading}>
          Sort & Declutter
        </h1>
        <div style={inlineStyles.cardContainer}>
          <div style={{ ...styles.card, backgroundColor: '#d4edda' }}>
            <h2 style={styles.header}>KEEP</h2>
            <p style={styles.description}>It belongs here & you use/love it.</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#f8d7da' }}>
            <h2 style={styles.header}>TOSS</h2>
            <p style={styles.description}>It's broken, expired, or truly not needed.</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#d1ecf1' }}>
            <h2 style={styles.header}>RELOCATE</h2>
            <p style={styles.description}>It belongs somewhere else in your home.</p>
          </div>
        </div>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={declutterMessages} />
        
        <button style={inlineStyles.button} onClick={handleNextStep}>
          Next
        </button>
        {/* Floating button in bottom right corner */}
        <button style={inlineStyles.fabButton} onClick={() => setFabOpen(true)}>
          +
        </button>
        {fabOpen && (
          <div style={inlineStyles.fabPopupOverlay} onClick={() => setFabOpen(false)}>
            <div style={inlineStyles.fabPopup} onClick={e => e.stopPropagation()}>
              <button style={inlineStyles.closeFabPopup} onClick={() => setFabOpen(false)}>&times;</button>
              <h3 style={{marginBottom: '1rem'}}>Quick Actions</h3>
              <button style={inlineStyles.fabPopupButton} onClick={() => { setFabOpen(false); setChatOpen(true); }}>Ask an Expert</button>
              <button style={inlineStyles.fabPopupButton} onClick={() => { setFabOpen(false); setTipsOpen(true); }}>Organizing Tips</button>
            </div>
          </div>
        )}
        <ChatExpert open={chatOpen} onClose={() => setChatOpen(false)} />
        <DeclutterTips open={tipsOpen} onClose={() => setTipsOpen(false)} />
      </div>
    </Layout>
  );
}

// Optional: simple inline styling
const inlineStyles = {
  container: {
    height: '100vh',                      // Full screen height
    display: 'flex',                      // Use flexbox layout
    flexDirection: 'column',             // Stack children vertically
    justifyContent: 'center',            // Center vertically
    alignItems: 'center',                // Center horizontally
    padding: '2rem',                     // Padding around content
    backgroundColor: '#f0f2f5',          // Light background color
  },
  heading: {
    fontSize: '2rem',                    // Large font size
    color: '#333',                       // Dark text color
    marginBottom: '1rem',                // Space below heading
  },
  description: {
    fontSize: '1.1rem',                  // Standard font size
    color: '#333',                       // Text color
    marginBottom: '2rem',                // Space below description
  },
  card: {
    padding: '1.5rem',                   // Padding inside card
    borderRadius: '8px',                 // Rounded corners
    width: '300px',                      // Card width
    marginBottom: '1rem',                // Space between cards
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
  },
  header: {
    fontSize: '1.5rem',                  // Header font size
    color: '#222',                       // Darker header text
    marginBottom: '0.5rem',              // Space below header
  },
  button: {
    padding: '1rem 2rem',                // Padding inside button
    fontSize: '1rem',                    // Standard font size
    borderRadius: '8px',                 // Rounded corners
    border: 'none',                      // No border
    cursor: 'pointer',                   // Pointer cursor on hover
    backgroundColor: '#007bff',          // Bootstrap blue
    color: 'white',                      // White text
    width: '250px',                      // Fixed width
    transition: 'background-color 0.2s', // Smooth color transition
  },
  fabButton: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000
  },
  fabPopupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.2)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabPopup: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem 1.5rem 1.5rem 1.5rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '240px',
    position: 'relative',
  },
  fabPopupButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    margin: '0.5rem 0',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  closeFabPopup: {
    position: 'absolute',
    top: '8px',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '1.5rem',
    cursor: 'pointer',
  }};
