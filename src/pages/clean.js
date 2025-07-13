/**
 * @file Clean.js
 * @description Page component for the cleaning section of the organizing process
 * 
 * This component will provide tools for:
 * - Tracking cleaning tasks
 * - Managing cleaning schedules
 * - Recording cleaning progress
 * - Maintaining organization standards
 */

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { updateProjectStep, getCurrentProject, regressProjectStep } from '../utils/projectUtils';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
import ChatExpert from '../components/ChatExpert';
import Timeline from '../components/Timeline';
import ForwardButton from '../components/ForwardButton'
import CheckBox from '../components/CheckBox';
import FabButton from '../components/FabButton';




export default function Clean() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space';
  const [notesOpen, setNotesOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notes, setNotes] = useState('');

  const handleNextStep = () => {
    updateProjectStep(zoneName, 'categorize');
    const navigationPath = `/categorize?zoneName=${encodeURIComponent(zoneName)}`;
    console.log('[clean.js] Navigating with zoneName:', zoneName, 'Attempting to push to path:', navigationPath);
    router.push(navigationPath);
  };

  const cleanMessages = [
    "Every swipe brings you closer to a sparkling space.", 
    "A clean home is a clear mind – you're investing in your peace.", 
    "You're creating a fresh start with every scrub and polish.", 
    "Feel the satisfaction of transformation as dirt disappears.", 
    "Even small cleaning tasks make a big difference in how your home feels.", 
    "Think of cleaning as an act of self-care for your living environment.", 
    "You're building healthy habits that benefit your well-being.", 
    "Embrace the process; the results of your effort will shine through.", 
    "You're creating a sanctuary, one clean surface at a time.", 
    "A tidy space is a happy place, and you're making it happen!"
  ];

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

  // Import project utils
  const { loadProjects, saveProjects } = require('../utils/projectUtils');

  // Back button handler: update most recent project step to 'declutter' and go to declutter page
  const handleBack = () => {
    router.push(`/declutter?zoneName=${encodeURIComponent(zoneName)}`);
  };
  const handleForward = () => {
    router.push(`/categorize?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout>
      <BackButton onClick={handleBack} ariaLabel="Back to declutter" />
      <div className={styles['bottom-button-container']}>
        <ForwardButton 
          onClick={handleForward} 
          ariaLabel="Forward to declutter" 
          style={{ position: 'static', right: 'unset', bottom: 'unset' }} 
        />
        <FabButton actions={fabActions} />
      </div>
      <div style={inlineStyles.container}>
        <ProjectNotesModal
          open={notesOpen}
          initialNotes={notes}
          zoneName={zoneName}
          onClose={() => setNotesOpen(false)}
        />
        {/* Container for heading and checkbox alignment*/}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckBox zoneName={zoneName} className={styles.checkbox} />
          <h1 style={inlineStyles.h1}>Clean the Space</h1>
        </div>
        {/*Description*/}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Left: Timeline, about 1/3 width on desktop, full on mobile */}
          <div style={{ flex: '1 1 33%', maxWidth: 120, minWidth: 60 }}>
            <Timeline currentStep="clean" />
          </div>
          {/* Right: Description */}
          <div style={{ flex: '2 1 66%', minWidth: 0, maxWidth: 320, width: '100%' }}>
            <p style={{ fontSize: '1.2rem', margin: 0, textAlign: 'left', lineHeight: 1.5, color: '#333', wordBreak: 'break-word' }}>
              Now that it's empty, give your {zoneName} a quick wipe down. Get rid of dust, crumbs, etc
            </p>
            <button className={styles.button} onClick={handleNextStep}>
              I'm ready to categorize
            </button>
          </div>
        </div>
        <ChatExpert open={chatOpen} onClose={() => setChatOpen(false)} />
        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={cleanMessages} />
      </div>
    </Layout>
  );
}



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
  }
};
