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
import React from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';

export default function Declutter() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)

  {/* action performed when next button is clicked */}
  const toClean = () => {
    console.log('Navigating to clean page');
    router.push('/clean');
  };

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

  // Main container with full viewport height and centered content
  return (
    <Layout>
      <div style={inlineStyles.container}>
        <h1 style={inlineStyles.h1}>
          Sort & Declutter
        </h1>
        <div style={inlineStyles.p}>
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
        
        <button 
          style={inlineStyles.button} 
          onClick={toClean}
        >
          Next
        </button>
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
  h1: {
    fontSize: '2rem',                    // Large font size
    color: '#333',                       // Dark text color
    marginBottom: '1rem',                // Space below heading
  },
  p: {
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
};
