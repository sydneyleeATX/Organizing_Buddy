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
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';

// Inline styles
const inlineStyles = {
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
    setZonePhoto(file);
    setConfirmedZonePhoto(true);
  };

  const generateUniqueID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const createNewProject = (zoneName) => {
    const stored = localStorage.getItem('projects');
    const existingProjects = stored ? JSON.parse(stored) : [];
    
    const newProject = {
      id: generateUniqueID(),
      zoneName,
      startDate: new Date().toISOString().split('T')[0],
      currentStep: 'empty',
      status: 'in-progress',
      lastUpdated: new Date().toISOString()
    };

    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleZoneConfirm = () => {
    createNewProject(zoneName);
    router.push(`/empty?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout>
      <div style={inlineStyles.container}>
        {/* Main heading asking user to define their focus area */}
        <h1 style={inlineStyles.h1}>Define your Zone</h1>

        {!confirmedZoneName && ( // If zone name is NOT confirmed, show input field
          <>
            <p style={inlineStyles.p}>
              Let's define your focus area. What space are you organizing?
            </p>
            <input
              type="text"
              placeholder="e.g., Kitchen Pantry, Home Office Desk"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              style={inlineStyles.input}
            />
          {/* Confirmation button to proceed */}
            <button style={inlineStyles.button} onClick={handleConfirmZoneName}>
              Submit
            </button>
          </>
        )}

        {confirmedZoneName && !confirmedZonePhoto && ( // If zone name IS confirmed, but photo is not uploaded yet, show image uploader
          <>
            <p style={inlineStyles.p}>
              Great, we are organizing your {zoneName}!
            </p>
            <p style={inlineStyles.p}>
              Upload a "before" photo of your {zoneName}. When you finish this project the difference will be remarkable! 
            </p>
          {/* Render the ImageUploader component here */}
            <ImageUploader onImageConfirmed={handlePhotoConfirmed} />
          </>
        )}

        {confirmedZoneName && confirmedZonePhoto && (  // If zone name is confirmed and photo is uploaded, show the "Let's Go!" button
          <>
            <p style={inlineStyles.p}>
              Great, we are organizing your {zoneName}!
            </p>                                              {/* ? is start of URL, $ separates parameter name from value*/}
            <button style={inlineStyles.button} onClick={handleZoneConfirm}>
              Let's Go!
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}