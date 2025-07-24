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
import { updateProjectStep, getCurrentProject, regressProjectStep, completedSteps } from '../utils/projectUtils';
import { useDoneSteps } from '../components/DoneStepsContext';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
import ChatExpert from '../components/ChatExpert';



import FabButton from '../components/FabButton';




export default function Clean() {
  const router = useRouter();
  const { zoneName } = router.query;
  const [notesOpen, setNotesOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const { setStepChecked } = useDoneSteps();

  const handleNextStep = () => {
    updateProjectStep(zoneName, 'categorize');
    const navigationPath = `/categorize?zoneName=${encodeURIComponent(zoneName)}`;
    setStepChecked(zoneName, 'clean', true);
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
    setStepChecked(zoneName, 'clean', false);
    setStepChecked(zoneName, 'declutter', false)
    router.push(`/declutter?zoneName=${encodeURIComponent(zoneName)}`);
  };
 

  return (
    <Layout showTimeline={true} currentStep="clean">
      <BackButton onClick={handleBack} ariaLabel="Back to declutter" />
      <div className={styles['bottom-button-container']}>
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
          <h1 style={inlineStyles.h1}>Clean the Space</h1>
        </div>
        {/*Description*/}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          {/* Description */}
          <div style={{ minWidth: 0, maxWidth: 400, width: '100%' }}>
            <p style={{ fontSize: '1.2rem', margin: 0, textAlign: 'left', lineHeight: 1.5, color: '#333', wordBreak: 'break-word' }}>
              Now that it's empty, give your {zoneName} a quick wipe down. Get rid of dust, crumbs, etc
            </p>
          </div>
        </div>
        
        {/* Centered button outside the constrained div */}
        <button className={styles.button} onClick={handleNextStep}>
          I'm ready to categorize
        </button>
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
