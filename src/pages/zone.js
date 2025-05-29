/**
 * @file Zone.js
 * @description Page component for organizing by zones
 * 
 * This component serves as the starting point for the organizing process,
 * prompting users to define their focus area or zone for organization.
 * It's part of a larger organizing flow that guides users through
 * different steps of the organization process.
 */

// Enable React hooks in Next.js pages
'use client';

// Import necessary dependencies
import React, { useState } from 'react';
import { useRouter } from 'next/router';

/**
 * Zone component
 * 
 * This component displays a simple interface asking users to define their
 * focus area for organization. It serves as a gateway to the next step
 * in the organizing process.
 */
export default function Zone() {
  // Initialize Next.js router for navigation
  const router = useRouter();

  // State variables to track user input and confirmation status
  const [zoneName, setZoneName] = useState('');  // stores the name of the zone and provides method to update it
  const [confirmed, setConfirmed] = useState(false);  // tracks whether the user has confirmed their zone name

  /**
   * Handle user confirmation of their focus area
   * 
   * This function checks if the user has entered a valid zone name and
   * updates the confirmation status accordingly.
   */
  const handleConfirm = () => {
    if (zoneName.trim()) {  // checks if the zone name is not empty
      setConfirmed(true);
    }
  };

  return (
    <div style={styles.container}>
      {/* Main heading asking user to define their focus area */}
      <h1 style={styles.h1}>Define your Zone</h1>
      <p style={styles.p}>
        Let's define your focus area. What space are you organizing?
      </p>

      {/* User input field for zone name */}
      {!confirmed && (  // if the user has not confirmed their zone name, show the input field
        <>
          <input
            type="text"
            placeholder="e.g., Kitchen, Garage, Closet"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            style={styles.input}
          />
          {/* Confirmation button to proceed */}
          <button style={styles.button} onClick={handleConfirm}>
            Submit
          </button>
        </>
      )}

      {confirmed && (  // if the user has confirmed their zone name, show the next step
        <>
          <p style={styles.p}>
            Great, we are organizing your {zoneName}!
          </p>
          <button style={styles.button} onClick={() => router.push(`/empty?zoneName=${encodeURIComponent(zoneName)}`)}>
            Let's Go!
          </button>
        </>
      )}
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '2rem',
    textAlign: 'center',
  },
  h1: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  p: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '80%',
    maxWidth: '300px',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    marginTop: '1rem',
  },
};