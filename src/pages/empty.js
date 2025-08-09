'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import Next.js' router for navigation
import EncouragementPopup from '../components/encourage';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { getCurrentProject} from '../utils/projectUtils';
import { useDoneSteps } from '../components/DoneStepsContext';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
import ChatExpert from '../components/ChatExpert';
import FabButton from '../components/FabButton';



// Menu component with navigation buttons
export default function Empty() {
  const router = useRouter();  // Initialize the router instance
  const { zoneName } = router.query;
  const { setStepChecked } = useDoneSteps();
  const [notesOpen, setNotesOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [notes, setNotes] = useState('');
  

  // Empty FAB actions for this page
  const fabActions = [
    {
      label: 'Project Notes',
      onClick: () => {
        const project = getCurrentProject(zoneName);
        setNotes(project && project.notes ? project.notes : '');
        setNotesOpen(true);
      }
    },
    {
      label: 'Ask an Expert',
      onClick: () => setChatOpen(true)
    }
  ];

// Optional: simple inline styling
const inlineStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f0f2f5',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '2rem',
  }
};

  const emptyMessages = [
    "You're doing the hard part — clearing the way!", 
    "Every item you remove makes space for clarity.", 
    "Great job! One empty surface at a time.", 
    "This is how transformation begins — with a clear space.", 
    "Keep going — you're making room for calm.", 
    "An empty space is a fresh start.", 
    "Don't stop now — the zone is almost clear!", 
    "Let it go — you're creating order.", 
    "This moment sets the tone for your whole project.", 
    "You're making real progress — keep clearing!"
  ];

  const handleNextStep = () => {
    // Ensure zoneName is valid. This is crucial if empty.js is where zoneName
    // is first expected from a URL query (e.g., after project selection).
    if (!zoneName || (zoneName === 'your space' && !router.query.zoneName)) {
      console.error("CRITICAL: handleNextStep in empty.js - zoneName is missing or default without a query parameter. Aborting.", "Current zoneName:", zoneName, "Full router.query:", router.query);
      alert("Project zone not identified in Empty. Please go back and select a project/zone.");
      return;
    }
    setStepChecked(zoneName, 'empty', true);
    router.push(`/declutter?zoneName=${encodeURIComponent(zoneName)}`);
  };

  // Import project utils
  const { loadProjects, saveProjects } = require('../utils/projectUtils');

  // Back button handler: delete most recent project and go to zone page
  const handleBack = () => {
    const projects = loadProjects();
    if (projects.length > 0) {
      projects.pop(); // Remove the most recent project
      saveProjects(projects);
    }
    setStepChecked(zoneName, 'empty', false);
    setStepChecked(zoneName, 'zone', false);
    router.push('/zone');
  };

  return (
    <Layout showTimeline={true} currentStep="empty">
      <BackButton onClick={handleBack} ariaLabel="Back to zone" />
      <div className={styles['bottom-button-container']}>
        <FabButton actions={fabActions} />
      </div>
      {/*Top heading*/}
      <div style={inlineStyles.container}>
        {/* container used for heading alignment */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <h1 style={inlineStyles.h1}>Empty</h1>
        </div>
        
        {/*Description*/}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          {/* Description */}
          <div style={{ minWidth: 0, maxWidth: 400, width: '100%' }}>
            <p style={{ fontSize: '1.2rem', margin: 0, textAlign: 'left', lineHeight: 1.5, color: '#333', wordBreak: 'break-word' }}>
              Take everything out of your zone. Put it on a clear surface nearby.
            </p>
          </div>
        </div>
        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={emptyMessages} />
        {/* Button to start a new project by navigating to /declutter */}
        <button className={styles.button} onClick={handleNextStep}>
          I'm ready to sort
        </button>
        <ChatExpert open={chatOpen} onClose={() => setChatOpen(false)} />
        <ProjectNotesModal
          open={notesOpen}
          initialNotes={notes}
          zoneName={zoneName}
          onClose={() => setNotesOpen(false)}
        />
      </div>
    </Layout>
  );
}
