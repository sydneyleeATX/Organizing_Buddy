/**
 * @file Declutter.js
 * @description Page component for the decluttering section of the organizing process
 * 
 * This component provides the interface for users to remove items they no longer need
 * from their space. It will eventually include functionality for:
 * - Selecting items to declutter
 * - Adding reasons for decluttering
 * - Tracking progress
 * - Moving items to donation/sell/garbage categories
 */

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';
import ChatExpert from '../components/ChatExpert';
import DeclutterTips from '../components/DeclutterTips';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { updateProjectStep, getCurrentProject } from '../utils/projectUtils';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
const { loadProjects, saveProjects } = require('../utils/projectUtils');
import KeepQuiz from '../components/KeepQuiz';



export default function Declutter() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
  const [chatOpen, setChatOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [keepQuizOpen, setKeepQuizOpen] = useState(false);



  // FAB actions for this page
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
    },
    {
      label: 'Declutter Tips',
      onClick: () => setTipsOpen(true)
    },
    {
      label: 'Should I keep this?',
      onClick: () => {setKeepQuizOpen(true)}
    }
  ];


  // Messages for the encouragement popup
  const declutterMessages = [
    "Every 'toss' is a weight lifted, creating lightness in your space.", 
    "By deciding to 'keep' what truly matters, you're defining your priorities.", 
    "The 'relocate' pile is just items finding their happy new home – you're helping them!", 
    "You're not just sorting things; you're sorting thoughts and freeing up mental space.", 
    "Each item you handle brings you closer to a home that serves you better.", 
    "Don't rush the 'toss' pile; trust your intuition about what to release.", 
    "Celebrate every 'keep'; these are the treasures that stay with you.", 
    "The act of 'relocating' brings order and purpose to every corner.", 
    "Your decision to 'toss' creates room for clarity, not just emptiness.", 
    "You're building a functional, peaceful environment, one sorted item at a time."
  ];

  const handleNextStep = () => {
    // First, ensure zoneName is valid before trying to use it or pass it
    if (!zoneName || (zoneName === 'your space' && !router.query.zoneName)) {
      console.error("CRITICAL: handleNextStep in declutter.js - zoneName is missing or default without a query parameter. Aborting step update and navigation.", "Current zoneName:", zoneName, "Full router.query:", router.query);
      alert("There was an issue identifying your project zone in Declutter. Please go back and try again.");
      return; 
    }
    updateProjectStep(zoneName, 'clean');
    router.push(`/clean?zoneName=${encodeURIComponent(zoneName)}`);
  };

    // Back button handler: update most recent project step to 'empty' and go to empty page
    const handleBack = () => {
      const projects = loadProjects();
      if (projects.length > 0) {
        const lastProject = projects[projects.length - 1];
        lastProject.currentStep = 'empty';
        lastProject.status = 'in-progress';
        lastProject.lastUpdated = new Date().toISOString();
        saveProjects(projects);
      }
      router.push(`/empty?zoneName=${encodeURIComponent(zoneName)}`);
    };

    return (
      <Layout fabActions={fabActions}>
        <BackButton onClick={handleBack} ariaLabel="Back to empty" />
        <div style={inlineStyles.container}>
        <h1 style={inlineStyles.heading}>
          Sort & Declutter
        </h1>
        <div style={inlineStyles.cardContainer}>
          <div style={{ ...styles.card, backgroundColor: '#d4edda' }}>
            <h2 style={styles.header}>KEEP</h2>
            <p style={styles.description}>It belongs here & you use/love it.</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#f8d7da' }}>
            <h2 style={styles.header}>TOSS</h2>
            <p style={styles.description}>It's broken, expired, or truly not needed.</p>
          </div>

          <div style={{ ...styles.card, backgroundColor: '#d1ecf1' }}>
            <h2 style={styles.header}>RELOCATE</h2>
            <p style={styles.description}>It belongs somewhere else in your home.</p>
          </div>
        </div>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={declutterMessages} />
        
        <button className={styles.button} onClick={handleNextStep}>
          Next
        </button>
        <ChatExpert open={chatOpen} onClose={() => setChatOpen(false)} />
        <DeclutterTips open={tipsOpen} onClose={() => setTipsOpen(false)} />
        <KeepQuiz open={keepQuizOpen} onClose={() => setKeepQuizOpen(false)} />
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

// Optional: simple inline styling
const inlineStyles = {
  container: {
    height: '100vh',                      // Full screen height
    display: 'flex',                      // Use flexbox layout
    flexDirection: 'column',             // Stack children vertically
    justifyContent: 'center',            // Center vertically
    alignItems: 'center',                // Center horizontally
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
  card: {
    padding: '1.5rem',                   // Padding inside card
    borderRadius: '8px',                 // Rounded corners
    width: '300px',                      // Card width
    marginBottom: '1rem',                // Space between cards
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
  },
  header: {
    fontSize: '1.5rem',                  // Header font size
    color: '#222',                       // Darker header text
    marginBottom: '0.5rem',              // Space below header
  }
};
