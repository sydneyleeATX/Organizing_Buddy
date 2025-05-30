/**
 * @file Complete.js
 * @description Page component for the project completion screen
 * 
 * This component will eventually include features for:
 * - Displaying project summary
 * - Showing completion statistics
 * - Saving project for future reference
 * - Sharing project completion
 */

'use client';
import React from 'react';
import { useRouter } from 'next/router';
import CelebrationPage from '../components/Confetti';



export default function Complete() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
  
  return (
    <div style={styles.container}>
      <CelebrationPage />
      <h1 style={styles.heading}>
        Project Complete
      </h1>
      <p style={styles.description}>
        Great job! Your project is complete!
      </p>
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
  }
};