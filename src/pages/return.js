'use client';

/**
 * @file Return.js
 * @description Page component for returning items to their proper places
 * 
 * This component will provide tools for:
 * - Returning categorized items to their designated spots
 * - Ensuring everything has a proper home
 * - Maintaining organization
 */


import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import ImageUploader from '../components/ImageUpload';
import { updateProjectStep } from '../utils/projectUtils';
import ProductSuggestions from '../components/ProductSuggestions';
import fabStyles from '../components/FabButton.module.css';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';


export default function Return() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space';
  // State variables
  const [itemsReturned, setItemsReturned] = useState('');
  const [confirmedItemsReturned, setConfirmedItemsReturned] = useState(false);
  const [confirmedPhotoUploaded, setConfirmedPhotoUploaded] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [productSuggestionsOpen, setProductSuggestionsOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [skipPhoto, setSkipPhoto] = useState(false);

  // When skipPhoto is set to true, proceed to the next step automatically
  React.useEffect(() => {
    if (skipPhoto) {
      handleNextStep();
    }
  }, [skipPhoto]);

  // Load notes for this project on open
  const getCurrentProject = () => {
    const projects = loadProjects();
    return projects.find(p => p.zoneName === zoneName);
  };
  // Import project utils
  const { loadProjects, saveProjects } = require('../utils/projectUtils');

  const handleConfirmItemsReturned = () => {
    setItemsReturned('confirmed');
    setConfirmedItemsReturned(true);
  };



  const handlePhotoConfirmed = (photoDataUrl) => {
    const projects = loadProjects();
    // Find the last in-progress project with this zoneName
    const idx = [...projects].reverse().findIndex(
      project => project.zoneName === zoneName && project.status !== 'completed'
    );
    if (idx !== -1) {
      const realIdx = projects.length - 1 - idx;
      projects[realIdx].endPhoto = photoDataUrl;
      saveProjects(projects);
    }
    setConfirmedPhotoUploaded(true);
    handleNextStep();
  };

  const handleNextStep = () => {
    updateProjectStep(zoneName, 'complete');
    router.push(`/complete?zoneName=${encodeURIComponent(zoneName)}`);
  };


  // Messages for the encouragement popup
  const returnMessages = [
    "Every item now has a purpose and a place – your home is truly serving you.", 
    "You're completing the cycle; giving each belonging its logical and happy home.", 
    "No more searching! You've designed a system where everything is effortlessly found.", 
    "This final step seals the deal, locking in all your hard-earned order.", 
    "You're creating a sustainable system, making future tidying a breeze.", 
    "Feel the immense satisfaction of knowing exactly where everything belongs.", 
    "Your space is now a testament to your hard work and thoughtful decisions.", 
    "You've transformed your home from a storage unit into a true sanctuary.", 
    "This is the moment of effortless living; enjoy the fruits of your organizing efforts!", 
    "Congratulations! You've given your home and your belongings the clarity they deserve."
  ];

  // FAB actions for this page
  // Product Suggestions Modal, can be modified as link to Google Shopping or direct recommendations 
  // <ProductSuggestions open={productSuggestionsOpen} onClose={() => setProductSuggestionsOpen(false)} /> 
  const fabActions = [
    {
      label: 'Project Notes',
      onClick: () => {
        const project = getCurrentProject();
        setNotes(project && project.notes ? project.notes : '');
        setNotesOpen(true);
      }
    },
    {
      label: 'Product Suggestions',
      onClick: () => window.open('https://www.google.com/shopping', '_blank')
    }
  ];

  // Optional: simple inline styling
  const inlineStyles = {
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
    ul: {
      listStyleType: 'circle',               // Hollow bullet points
      marginBottom: '2rem',                // Space below list
      fontSize: '1.1rem',                  // Standard font size
      color: '#333',                       // Text color
    },
    p: {
      fontSize: '1.1rem',                  // Standard font size
      color: '#333',                       // Text color
      marginBottom: '1rem',                // Space below paragraph
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

  // Back button handler: update most recent project step to 'categorize' and go to categorize page
  const handleBack = () => {
    const projects = loadProjects();
    // Only update the most recent in-progress project with this zoneName
    const idx = [...projects].reverse().findIndex(
      project => project.zoneName === zoneName && project.status !== 'completed'
    );
    if (idx !== -1) {
      const realIdx = projects.length - 1 - idx;
      projects[realIdx].currentStep = 'categorize';
      projects[realIdx].status = 'in-progress';
      projects[realIdx].lastUpdated = new Date().toISOString();
      saveProjects(projects);
    }
    router.push(`/categorize?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout fabActions={fabActions}>
      <BackButton onClick={handleBack} ariaLabel="Back to categorize" />
      <ProjectNotesModal
        open={notesOpen}
        initialNotes={notes}
        onClose={() => setNotesOpen(false)}
        onSave={newNotes => {
          const projects = loadProjects();
          const idx = projects.findIndex(p => p.zoneName === zoneName);
          if (idx !== -1) {
            projects[idx].notes = newNotes;
            saveProjects(projects);
          }
          setNotes(newNotes);
          setNotesOpen(false);
        }}
      />
      <div style={inlineStyles.container}>
        <h1 style={inlineStyles.heading}>
          Return Items
        </h1>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={returnMessages} />

        {!confirmedItemsReturned && (
          <>
            <p style={inlineStyles.description}>
              Put your categorized items back in your {zoneName}. Think about
            </p>
            <ul style={inlineStyles.ul}>
              <li>Easy access: What do you use most often?</li>
              <li>Vertical space: Can you stack items or use risers?</li>
            </ul>
            <button style={inlineStyles.button} onClick={handleConfirmItemsReturned}>
              All items are returned!
            </button>
          </>
        )}
        {confirmedItemsReturned && (
          <>
            <p style={inlineStyles.p}>
              Upload a photo of your organized space!
            </p>
            <ImageUploader onImageConfirmed={handlePhotoConfirmed} />
            <button style={inlineStyles.skipButton} onClick={() => setSkipPhoto(true)}>
              Skip Photo
            </button>
          </>
        )}

        {/* When skipPhoto is set to true, automatically call handleNextStep to proceed. 
        If you want to perform logic that causes side effects (such as navigation, updating state, fetching data => use useEffect) */}
        
      </div>


    </Layout>
  );
}

