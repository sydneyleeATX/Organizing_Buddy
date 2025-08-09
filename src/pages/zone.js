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
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ImageUploader from '../components/ImageUpload';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { updateProjectStep, getCurrentProject, loadProjects, saveProjects, completedSteps } from '../utils/projectUtils';
import SpaceSuggestions from '../components/SpaceSuggestions';
import { useDoneSteps } from '../components/DoneStepsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faTrash, faSprayCanSparkles, faTags, faArrowRotateLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import FabButton from '../components/FabButton';

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
  const { setStepChecked } = useDoneSteps();

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
  // Tracks whether the project has been created
  const [projectCreated, setProjectCreated] = useState(false);
 // Track if we are resuming an existing project
 const [isResumingProject, setIsResumingProject] = useState(false);

 // Restore state if resuming a project
 useEffect(() => {
   if (!router.isReady) return;
   const { zoneName: queryZoneName } = router.query;
   if (queryZoneName) {
     const stored = localStorage.getItem('projects');
     const projects = stored ? JSON.parse(stored) : [];
     const project = projects.find(p => p.zoneName === queryZoneName && p.status !== 'completed');
     if (project) {
       // If the project is at a later step, redirect to that page
       if (project.currentStep && project.currentStep !== 'zone') {
         router.replace(`/${project.currentStep}?zoneName=${encodeURIComponent(project.zoneName)}`);
         return;
       }
       // Restore state for "zone" step
       setZoneName(project.zoneName || '');
       setConfirmedZoneName(true);
       if (project.startPhoto) {
         setZonePhoto(project.startPhoto);
         setConfirmedZonePhoto(true);
       } else if (project.startPhoto === null && project.skipPhoto) {
         setSkipPhoto(true);
       }
       setIsResumingProject(true);
     }
   }
 }, [router.isReady, router.query]);

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
      // start date is today
      startDate: new Date().toLocaleString(),
      currentStep: 'zone',
      status: 'In Progress',
      // last updated is now
      lastUpdated: new Date().toLocaleString(),
      startPhoto: zonePhoto,
      endPhoto: null,
      notes: '',

    };
    console.log('[createNewProject] New project:', newProject);

    const updatedProjects = [...existingProjects, newProject];
    console.log('[createNewProject] Updated projects array:', updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

 

  // automatically called if the bottom list of variables changes
  useEffect(() => {
    if (
      confirmedZoneName &&
      (confirmedZonePhoto || skipPhoto) &&
      !projectCreated &&
      !isResumingProject // Only create if NOT resuming
    ) {
      createNewProject(zoneName);
      setProjectCreated(true);
    }
  }, [confirmedZoneName, confirmedZonePhoto, skipPhoto, zoneName, projectCreated, isResumingProject]);

  const handleZoneConfirm = () => {
    setStepChecked(zoneName, 'zone', true);
    router.push(`/empty?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout> {/* Attach FAB actions to the Layout */}
      {/* SpaceSuggestions popup/modal. Appears when spaceSuggestionsOpen is true. */}
      {/* SpaceSuggestions modal: clicking a space fills the zoneName input, but does NOT submit */}
      <FabButton actions={fabActions} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1200 }} />
      <SpaceSuggestions
        open={spaceSuggestionsOpen}
        onClose={() => setSpaceSuggestionsOpen(false)}
        onSelect={setZoneName}
      />
      <div style={inlineStyles.container}>

        {/* Main heading asking user to define their focus area */}
        

        {/* If zone name is NOT confirmed, show input field for zone name */}
        {!confirmedZoneName && (
          <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <h1 style={inlineStyles.h1}>Define your Zone</h1>
          </div>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <h1 style={inlineStyles.h1}>Define your Zone</h1>
            </div>
            <p style={inlineStyles.p}>
              Great, we are organizing your {zoneName}!
            </p>
            <p style={inlineStyles.p}>
              Upload a "before" photo of your {zoneName}.
            </p>
            {/* Render the ImageUploader component here */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <ImageUploader onImageConfirmed={handlePhotoConfirmed} />
              <button
                type="button"
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
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
               <h1 style={inlineStyles.h1}>Define your Zone</h1>
             </div>
            <p style={inlineStyles.p}>
              Great, we are organizing your {zoneName}!
            </p>
            <div style={{ marginBottom: '2rem', textAlign: 'left', maxWidth: '350px' }}>
              <p style={{ ...inlineStyles.p, marginBottom: '1rem', fontWeight: 'bold' }}>Here's what we'll do:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <FontAwesomeIcon icon={faBoxOpen} style={{ color: '#000', width: '16px' }} />
                  <span style={{ fontSize: '1rem', color: '#333' }}><strong>Empty:</strong> Remove everything from your space</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <FontAwesomeIcon icon={faTrash} style={{ color: '#000', width: '16px' }} />
                  <span style={{ fontSize: '1rem', color: '#333' }}><strong>Declutter:</strong> Sort items into keep, toss, or relocate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <FontAwesomeIcon icon={faSprayCanSparkles} style={{ color: '#000', width: '16px' }} />
                  <span style={{ fontSize: '1rem', color: '#333' }}><strong>Clean:</strong> Wipe down and refresh your space</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <FontAwesomeIcon icon={faTags} style={{ color: '#000', width: '16px' }} />
                  <span style={{ fontSize: '1rem', color: '#333' }}><strong>Categorize:</strong> Group similar items together</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <FontAwesomeIcon icon={faArrowRotateLeft} style={{ color: '#000', width: '16px' }} />
                  <span style={{ fontSize: '1rem', color: '#333' }}><strong>Return:</strong> Put everything back in its place</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#000', width: '16px' }} />
                  <span style={{ fontSize: '1rem', color: '#333' }}><strong>Complete:</strong> Celebrate your organized space!</span>
                </div>
              </div>
            </div>
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