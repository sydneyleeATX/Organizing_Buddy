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
import SpaceSuggestions from '../components/SpaceSuggestions';

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
  skipButton: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#888',
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
  // User's input for their zone name
  const [zoneName, setZoneName] = useState('');
  // Tracks whether the zone name has been confirmed
  const [confirmedZoneName, setConfirmedZoneName] = useState(false);
  // Holds the selected photo file for the zone
  const [zonePhoto, setZonePhoto] = useState(null);
  // Tracks whether the zone photo has been confirmed
  const [confirmedZonePhoto, setConfirmedZonePhoto] = useState(false);
  // Controls the visibility of the SpaceSuggestions popup/modal
  const [spaceSuggestionsOpen, setSpaceSuggestionsOpen] = useState(false);
  // Tracks whether the user has skipped the photo step
  const [skipPhoto, setSkipPhoto] = useState(false);


  // Floating Action Button (FAB) actions for this page
  // Each action is shown in the FAB menu. The Space Suggestions action opens the modal.
  const fabActions = [
    {
      label: 'Space Suggestions',
      onClick: () => setSpaceSuggestionsOpen(true) // Open the SpaceSuggestions modal
    }
  ];

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
    console.log('[createNewProject] Called with:', zoneName);
    const stored = localStorage.getItem('projects');
    const existingProjects = stored ? JSON.parse(stored) : [];
    console.log('[createNewProject] Existing projects:', existingProjects);
    
    const newProject = {
      id: generateUniqueID(),
      zoneName,
      startDate: new Date().toISOString().split('T')[0],
      currentStep: 'empty',
      status: 'in-progress',
      lastUpdated: new Date().toISOString(),
      startPhoto: zonePhoto,
      endPhoto: null,
      notes: ''
    };
    console.log('[createNewProject] New project:', newProject);

    const updatedProjects = [...existingProjects, newProject];
    console.log('[createNewProject] Updated projects array:', updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleZoneConfirm = () => {
    createNewProject(zoneName);
    router.push(`/empty?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout fabActions={fabActions}> {/* Attach FAB actions to the Layout */}
      {/* SpaceSuggestions popup/modal. Appears when spaceSuggestionsOpen is true. */}
      {/* SpaceSuggestions modal: clicking a space fills the zoneName input, but does NOT submit */}
      <SpaceSuggestions
        open={spaceSuggestionsOpen}
        onClose={() => setSpaceSuggestionsOpen(false)}
        onSelect={setZoneName}
      />
      <div style={inlineStyles.container}>

        {/* Main heading asking user to define their focus area */}
        <h1 style={inlineStyles.h1}>Define your Zone</h1>

        {/* If zone name is NOT confirmed, show input field for zone name */}
        {!confirmedZoneName && (
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
            <button className={styles.button} onClick={handleConfirmZoneName}>
              Submit
            </button>
          </>
        )}


        {/* If zone name IS confirmed, but photo is not uploaded yet, show image uploader */}
        {confirmedZoneName && !confirmedZonePhoto && !skipPhoto && (
          <>
            <p style={inlineStyles.p}>
              Great, we are organizing your {zoneName}!
            </p>
            <p style={inlineStyles.p}>
              Upload a "before" photo of your {zoneName}. When you finish this project the difference will be remarkable! 
            </p>
            {/* Render the ImageUploader component here */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <ImageUploader onImageConfirmed={handlePhotoConfirmed} />
              <button
                type="button"
                style={inlineStyles.skipButton}
                onClick={() => setSkipPhoto(true)}
                aria-label="Skip photo upload"
              >
                Skip Photo
              </button>
            </div>
          </>
        )}


        {/* If zone name is confirmed and photo is uploaded, show the "Let's Go!" button */}
        {confirmedZoneName && (confirmedZonePhoto || skipPhoto) && (
          <>
            <p style={inlineStyles.p}>
              Great, we are organizing your {zoneName}!
            </p>
            {/* Button to proceed to the next step (empty.js) */}
            <button className={styles.button} onClick={() => handleZoneConfirm(zoneName)}>
              Let's Go!
            </button>
          </>
        )}

      </div>
    </Layout>
  );
}