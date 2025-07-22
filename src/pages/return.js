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
import { updateProjectStep, getCurrentProject, loadProjects, saveProjects, regressProjectStep } from '../utils/projectUtils';
import ProductSuggestions from '../components/ProductSuggestions';
import fabStyles from '../components/FabButton.module.css';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
import ChatExpert from '../components/ChatExpert';
import StorageTips from '../components/StorageTips';
import Timeline from '../components/Timeline';
import ForwardButton from '../components/ForwardButton';
import CheckBox from '../components/CheckBox';
import FabButton from '../components/FabButton';


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
  const [chatOpen, setChatOpen] = useState(false);
  const [storageTipsOpen, setStorageTipsOpen] = useState(false);

  // When skipPhoto is set to true, proceed to the next step automatically
  React.useEffect(() => {
    if (skipPhoto) {
      handleNextStep();
    }
  }, [skipPhoto]);



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
    // First, ensure zoneName is valid before trying to use it or pass it
    if (!zoneName || (zoneName === 'your space' && !router.query.zoneName)) {
      console.error("CRITICAL: handleNextStep in declutter.js - zoneName is missing or default without a query parameter. Aborting step update and navigation.", "Current zoneName:", zoneName, "Full router.query:", router.query);
      alert("There was an issue identifying your project zone in Declutter. Please go back and try again.");
      return; 
    }
    router.push(`/complete?zoneName=${encodeURIComponent(zoneName)}`);
  };

  const handleConfirmItemsReturned = () => {
    setConfirmedItemsReturned(true);
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
    },
    {
      label: 'Ask an Expert',
      onClick: () => setChatOpen(true)
    },
    {
      label: 'Storage Tips',
      onClick: () => setStorageTipsOpen(true)
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
    router.push(`/categorize?zoneName=${encodeURIComponent(zoneName)}`);
  };
  // forward arrow 
  const handleForward = () => {
    router.push(`/complete?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout fabActions={fabActions}>
      <BackButton onClick={handleBack} ariaLabel="Back to categorize" />
      <div className={styles['bottom-button-container']}>
        <ForwardButton 
          onClick={handleForward} 
          ariaLabel="Forward to declutter" 
          style={{ position: 'static', right: 'unset', bottom: 'unset' }} 
        />
        <FabButton actions={fabActions} />
      </div>
      <ProjectNotesModal
              open={notesOpen}
              initialNotes={notes}
              zoneName={zoneName}
              onClose={() => setNotesOpen(false)}
      />
      <ChatExpert open={chatOpen} onClose={() => setChatOpen(false)} />
      <StorageTips open={storageTipsOpen} onClose={() => setStorageTipsOpen(false)} />
      <div style={inlineStyles.container}>
        {/* Container for heading and checkbox alignment*/}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckBox zoneName={zoneName} markedStep="return" className={styles.checkbox} />
          <h1 style={inlineStyles.h1}>Return Items</h1>
        </div>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={returnMessages} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', width: '100%' }}>
          {/* Left: Timeline */}
          <div style={{ flex: '1 1 33%', maxWidth: 120, minWidth: 60 }}>
            <Timeline currentStep="return" />
          </div>
          {/* Right: Description or Photo Upload */}
          <div style={{ flex: '2 1 66%', minWidth: 0, maxWidth: 320, width: '100%' }}>
            {!confirmedItemsReturned ? (
              <>
                <p style={inlineStyles.description}>
                  Put your categorized items back in your {zoneName}. Think about
                </p>
                <ul style={inlineStyles.ul}>
                  <li>Easy access: What do you use most often?</li>
                  <li>Vertical space: Can you stack items or use risers?</li>
                </ul>
                <button className={styles.button} onClick={handleConfirmItemsReturned}>
                  All items are returned!
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: '1.2rem', margin: 0, textAlign: 'left', lineHeight: 1.5, color: '#333', wordBreak: 'break-word' }}>
                  Upload a photo of your organized space!
                </p>
                <ImageUploader onImageConfirmed={handlePhotoConfirmed} />
                <button onClick={() => setSkipPhoto(true)} style={{ marginTop: '1.2rem' }}>
                  Skip Photo
                </button>
              </>
            )}
          </div>
        </div>

        {/* When skipPhoto is set to true, automatically call handleNextStep to proceed. 
        If you want to perform logic that causes side effects (such as navigation, updating state, fetching data => use useEffect) */}
        
      </div>


    </Layout>
  );
}

