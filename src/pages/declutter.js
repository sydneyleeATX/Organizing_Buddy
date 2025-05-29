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

export default function Declutter() {
  const router = useRouter();

  const handleNext = () => {
    console.log('Navigating to clean page');
    router.push('/clean');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Sort & Declutter
      </h1>
      <div style={styles.container}>
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
        <button 
          style={styles.button} 
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Inline styles for layout and text
const styles = {
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
};
