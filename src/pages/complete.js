/**
 * @file Complete.js
 * @description Page component for the project completion screen
 * 
 * This component will eventually include features for:
 * - Displaying project summary
 * - Showing completion statistics
 * - Saving project for future reference
 * - Sharing project completion
 */

'use client';
import React from 'react';
import { useRouter } from 'next/router';
import CelebrationPage from '../components/Confetti';
import { updateProjectStep} from '../utils/projectUtils';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import BackButton from '../components/BackButton';
import { loadProjects, saveProjects } from '../utils/projectUtils';
import { useDoneSteps } from '../components/DoneStepsContext';

export default function Complete() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
  const { setStepChecked } = useDoneSteps();
  
  // Move back a step
  const handleBack = () => {
    setStepChecked(zoneName, 'complete', false);
    setStepChecked(zoneName, 'return', false)
    router.push(`/return?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout>
      <div style={inlineStyles.container}>
        <CelebrationPage />  {/* CelebrationPage component, use the slash because it is a self-closing HTML tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <h1 style={inlineStyles.h1}>Project Complete </h1>
        </div>
        <p style={inlineStyles.description}>
          Great job! Your project is complete!
        </p>
      </div>
      <BackButton onClick={handleBack} ariaLabel="Back to return" />
    </Layout>
    
  );
}

// Inline styles for layout and text
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
  h1s: {
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