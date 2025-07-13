/**
 * @file Categorize.js
 * @description Page component for categorizing items during the organizing process
 * 
 * This component will eventually include features for:
 * - Creating and managing categories
 * - Drag-and-drop item organization
 * - Visual category representation
 * - Progress tracking
 */

'use client'; // Marks this as a Client Component for interactive features
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { updateProjectStep, getCurrentProject, loadProjects, saveProjects, regressProjectStep } from '../utils/projectUtils';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
import ChatExpert from '../components/ChatExpert';
import Timeline from '../components/Timeline';
import ForwardButton from '../components/ForwardButton';
import CheckBox from '../components/CheckBox';
import FabButton from '../components/FabButton';

export default function Categorize() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  console.log('Categorize component rendering. zoneName from query:', zoneName, 'Full query:', router.query);



  // Messages for the encouragement popup
  const categorizeMessages = [
    "Every category you create brings clarity to your chaos.", 
    "You're building a system that will save you time and stress later.", 
    "Imagine finding exactly what you need, exactly when you need it – you're making that possible.", 
    "Don't just organize things; organize your peace of mind.", 
    "Each label you add is a step toward effortless retrieval.", 
    "You're transforming clutter into a streamlined flow for your daily life.", 
    "Think of organizing as crafting a personalized map for your belongings.", 
    "The effort you put into categorizing pays dividends in daily efficiency.", 
    "You're creating a sense of calm and control, one organized drawer at a time.", 
    "A place for everything, and everything in its place – you're the architect of that order!"
  ];

  const handleNextStep = () => {
    console.log('handleNextStep called. Current zoneName:', zoneName, "Router query:", router.query);
    if (!zoneName || (zoneName === 'your space' && !router.query.zoneName)) {
        console.error("CRITICAL: handleNextStep in categorize.js - zoneName is missing or default without a query parameter. Aborting step update and navigation.", "Current zoneName:", zoneName, "Full router.query:", router.query);
        alert("There was an issue identifying your project zone. Please go back and try again.");
        return; 
    }
    try {
        updateProjectStep(zoneName, 'return');
        console.log(`Updated project step to 'return' for zone: ${zoneName}. Navigating...`);
        router.push(`/return?zoneName=${encodeURIComponent(zoneName)}`);
    } catch (error) {
        console.error("Error during updateProjectStep or navigation in categorize.js:", error, "ZoneName:", zoneName);
        alert("An error occurred while saving your progress. Please try again.");
    }
  };

  // Empty FAB actions for this page
  // Load notes for this project on open
  const getCurrentProject = () => {
    const projects = loadProjects();
    return projects.find(p => p.zoneName === zoneName);
  };
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
      label: 'Ask an Expert',
      onClick: () => setChatOpen(true)
    }
  ];

  // Main container with full viewport height and centered content
  // Import project utils
  const { loadProjects, saveProjects } = require('../utils/projectUtils');

  // Back button handler: update most recent project step to 'clean' and go to clean page
  const handleBack = () => {
    router.push(`/clean?zoneName=${encodeURIComponent(zoneName)}`);
  };
  // forward arrow 
  const handleForward = () => {
    router.push(`/return?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout>
      <BackButton onClick={handleBack} ariaLabel="Back to clean" />
      <div className={styles['bottom-button-container']}>
        <ForwardButton 
          onClick={handleForward} 
          ariaLabel="Forward to declutter" 
          style={{ position: 'static', right: 'unset', bottom: 'unset' }} 
        />
        <FabButton actions={fabActions} />
      </div>
      <div style={inlineStyles.container}>
        {/* Container for heading and checkbox alignment*/}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckBox zoneName={zoneName} className={styles.checkbox} />
          <h1 style={inlineStyles.h1}>Categorize</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Left: Timeline, about 1/3 width on desktop, full on mobile */}
          <div style={{ flex: '1 1 33%', maxWidth: 120, minWidth: 60 }}>
            <Timeline currentStep="categorize" />
          </div>
          {/* Right: Description */}
          <div style={{ flex: '2 1 66%', minWidth: 0, maxWidth: 320, width: '100%' }}>
            <p style={{ fontSize: '1.2rem', margin: 0, textAlign: 'left', lineHeight: 1.5, color: '#333', wordBreak: 'break-word' }}>
              Now group your 'KEEP' items. Pens with pens, spices with spices, etc.
            </p>
            {/* EncouragementPopup and Next button */}
            <EncouragementPopup messages={categorizeMessages} />
            <button className={styles.button} onClick={handleNextStep} style={{ marginTop: '1.2rem' }}>
              The items are categorized!
            </button>
          </div>
        </div>
      </div>
      <ChatExpert open={chatOpen} onClose={() => setChatOpen(false)} />
      <ProjectNotesModal
        open={notesOpen}
        initialNotes={notes}
        zoneName={zoneName}
        onClose={() => setNotesOpen(false)}
      />
    </Layout>
  );
}

// Optional: simple inline styling
const inlineStyles = {
  container: {
    height: '100vh', // Full viewport height
    display: 'flex', // Flexbox layout for centering
    flexDirection: 'column', // Stack elements vertically
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: '2rem', // Padding around the content
    backgroundColor: '#f0f2f5' // Light background color
  },
  heading: {
    fontSize: '2rem', // Large font size
    color: '#333', // Dark text color
    marginBottom: '1rem' // Space below heading
  },
  description: {
    fontSize: '1.1rem', // Standard font size
    color: '#333', // Text color
    marginBottom: '2rem' // Space below description
  }
};
