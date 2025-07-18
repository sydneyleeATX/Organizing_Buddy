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
import { updateProjectStep, getCurrentProject, regressProjectStep } from '../utils/projectUtils';
import BackButton from '../components/BackButton';
import ProjectNotesModal from '../components/ProjectNotesModal';
const { loadProjects, saveProjects } = require('../utils/projectUtils');
import KeepQuiz from '../components/KeepQuiz';
import Timeline from '../components/Timeline';
import ForwardButton from '../components/ForwardButton';
import FabButton from '../components/FabButton';
import CheckBox from '../components/CheckBox';



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
    router.push(`/clean?zoneName=${encodeURIComponent(zoneName)}`);
  };

    // Back button handler: update most recent project step to 'empty' and go to empty page
    const handleBack = () => {
      router.push(`/empty?zoneName=${encodeURIComponent(zoneName)}`);
    };
    const handleForward = () => {
      router.push(`/clean?zoneName=${encodeURIComponent(zoneName)}`);
    };

    return (
      <Layout>
        <BackButton onClick={handleBack} ariaLabel="Back to empty" />
        <div className={styles['bottom-button-container']}>
        <ForwardButton 
          onClick={handleForward} 
          ariaLabel="Forward to declutter" 
          style={{ position: 'static', right: 'unset', bottom: 'unset' }} 
        />
        <FabButton actions={fabActions} />
      </div>
        <div style={inlineStyles.container}>


        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={declutterMessages} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckBox zoneName={zoneName} markedStep="declutter" className={styles.checkbox} />
          <h1 style={inlineStyles.h1}>Sort & Declutter</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Left: Timeline, about 1/3 width on desktop, full on mobile */}
          <div style={{ flex: '1 1 33%', maxWidth: 120, minWidth: 60 }}>
            <Timeline currentStep="declutter" />
          </div>
          {/* Right: Description */}

          <div style={{ flex: '2 1 66%', minWidth: 0, maxWidth: 320, width: '100%' }}>
            <p style={{ fontSize: '1.2rem', margin: 0, textAlign: 'left', lineHeight: 1.5, color: '#333', wordBreak: 'break-word' }}>
              Sort the items into one of three categories:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
              <div style={{ background: '#d4edda', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #b7e4c7' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#155724', letterSpacing: '0.01em' }}>KEEP</h2>
                <p style={{ margin: 0, color: '#155724', fontSize: '1rem', lineHeight: 1.4 }}>It belongs here & you use/love it.</p>
              </div>
              <div style={{ background: '#f8d7da', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f5c6cb' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#721c24', letterSpacing: '0.01em' }}>TOSS</h2>
                <p style={{ margin: 0, color: '#721c24', fontSize: '1rem', lineHeight: 1.4 }}>It's broken, expired, or truly not needed.</p>
              </div>
              <div style={{ background: '#d1ecf1', borderRadius: '10px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #bee5eb' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.3rem 0', color: '#0c5460', letterSpacing: '0.01em' }}>RELOCATE</h2>
                <p style={{ margin: 0, color: '#0c5460', fontSize: '1rem', lineHeight: 1.4 }}>It belongs somewhere else in your home.</p>
              </div>
            </div>
            <button className={styles.button} onClick={handleNextStep} style={{ paddingTop: '1.2rem', marginTop: '1.2rem' }}>
              Next
            </button>
          </div>
        </div>
  
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
