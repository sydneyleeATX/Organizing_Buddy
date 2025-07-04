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
import { updateProjectStep } from '../utils/projectUtils';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';



export default function Clean() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space';

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
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
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
    }
  ];

  // Import project utils
  const { loadProjects, saveProjects } = require('../utils/projectUtils');

  // Back button handler: update most recent project step to 'declutter' and go to declutter page
  const handleBack = () => {
    const projects = loadProjects();
    if (projects.length > 0) {
      const lastProject = projects[projects.length - 1];
      lastProject.currentStep = 'declutter';
      lastProject.status = 'in-progress';
      lastProject.lastUpdated = new Date().toISOString();
      saveProjects(projects);
    }
    router.push(`/declutter?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout fabActions={fabActions}>
      <BackButton onClick={handleBack} ariaLabel="Back to declutter" />
      <div style={inlineStyles.container}>
        <ProjectNotesModal
          open={notesOpen}
          initialNotes={notes}
          onClose={() => setNotesOpen(false)}
          onSave={newNotes => {
            const projects = loadProjects();
            // Only update the most recent in-progress project with this zoneName
            const idx = [...projects].reverse().findIndex(
              p => p.zoneName === zoneName && p.status !== 'completed'
            );
            if (idx !== -1) {
              const realIdx = projects.length - 1 - idx;
              projects[realIdx].notes = newNotes;
              saveProjects(projects);
            }
            setNotes(newNotes);
            setNotesOpen(false);
          }}
        />
        <h1 style={inlineStyles.heading}>
          Clean Up
        </h1>
        <p style={inlineStyles.description}>
          Now that it's empty, give your {zoneName} a quick wipe down. Get rid of dust, crumbs, etc
        </p>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={cleanMessages} />

        <button style={inlineStyles.button} onClick={handleNextStep}>
          I'm ready to categorize
        </button>
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
};
