/**
 * @file Clean.js
 * @description Page component for the cleaning section of the organizing process
 * 
 * This component will provide tools for:
 * - Tracking cleaning tasks
 * - Managing cleaning schedules
 * - Recording cleaning progress
 * - Maintaining organization standards
 */

'use client';
import React from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';




export default function Clean() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space';

  // Messages for the encouragement popup
  const cleanMessages = [
    "Every swipe brings you closer to a sparkling space.", 
    "A clean home is a clear mind – you're investing in your peace.", 
    "You're creating a fresh start with every scrub and polish.", 
    "Feel the satisfaction of transformation as dirt disappears.", 
    "Even small cleaning tasks make a big difference in how your home feels.", 
    "Think of cleaning as an act of self-care for your living environment.", 
    "You're building healthy habits that benefit your well-being.", 
    "Embrace the process; the results of your effort will shine through.", 
    "You're creating a sanctuary, one clean surface at a time.", 
    "A tidy space is a happy place, and you're making it happen!"
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Clean Up
      </h1>
      <p style={styles.description}>
        Now that it's empty, give your {zoneName} a quick wipe down. Get rid of dust, crumbs, etc
      </p>

      {/* Calling EncouragementPopup component and passing messages array as argument */}
      <EncouragementPopup messages={cleanMessages} />

      <button style={styles.button} onClick={() => router.push('/categorize')}>
        I'm ready to categorize
      </button>
    </div>
  );
}

// Inline styles for layout and text
const styles = {
  container: {
    height: '100vh',                      // Full screen height
    display: 'flex',                      // Use flexbox layout
    flexDirection: 'column',             // Stack children vertically
    justifyContent: 'center',            // Center content vertically
    alignItems: 'center',                // Center content horizontally
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
};
