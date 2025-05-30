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
import ImageUploader from '../components/ImageUpload';

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
  const [zoneName, setZoneName] = useState('');  // holds the user's input for their zone name
  const [confirmedZoneName, setConfirmedZoneName] = useState(false);  // tracks zone name confirmation
  const [zonePhoto, setZonePhoto] = useState(null);  // holds the selected photo file
  const [confirmedZonePhoto, setConfirmedZonePhoto] = useState(false);  // tracks photo confirmation

  /**
   * Handle user confirmation of their focus area
   * 
   * This function checks if the user has entered a valid zone name and
   * updates the confirmation status accordingly.
   */
  const handleConfirmZoneName = () => {
    if (zoneName.trim()) {  // checks if the zone name is not empty
      setConfirmedZoneName(true);
    }
  };

  // Handle photo confirmation from ImageUploader and takes the file as an argument
  const handlePhotoConfirmed = (file) => {
    console.log('Zone photo updated:', file);
    setZonePhoto(file);
    setConfirmedZonePhoto(true);
  };

  return (
    <div style={styles.container}>
      {/* Main heading asking user to define their focus area */}
      <h1 style={styles.h1}>Define your Zone</h1>

      {!confirmedZoneName && ( // If zone name is NOT confirmed, show input field
        <>
          <p style={styles.p}>
            Let's define your focus area. What space are you organizing?
          </p>
          <input
            type="text"
            placeholder="e.g., Kitchen Pantry, Home Office Desk"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            style={styles.input}
          />
          {/* Confirmation button to proceed */}
          <button style={styles.button} onClick={handleConfirmZoneName}>
            Submit
          </button>
        </>
      )}

      {confirmedZoneName && !confirmedZonePhoto && ( // If zone name IS confirmed, but photo is not uploaded yet, show image uploader
        <>
          <p style={styles.p}>
            Great, we are organizing your {zoneName}!
          </p>
          <p style={styles.p}>
            Upload a "before" photo of your {zoneName}. When you finish this project the difference will be remarkable! 
          </p>
          {/* Render the ImageUploader component here */}
          <ImageUploader onImageConfirmed={handlePhotoConfirmed} />
        </>
      )}

      {confirmedZoneName && zonePhoto && ( // If zone name is confirmed and photo is selected, show the "Let's Go!" button
        <>
          <p style={styles.p}>
            Great, we are organizing your {zoneName}!
          </p>                                              {/* ? is start of URL, $ separates parameter name from value*/}
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