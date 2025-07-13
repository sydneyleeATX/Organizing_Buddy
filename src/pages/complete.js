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
import { updateProjectStep, regressProjectStep } from '../utils/projectUtils';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import BackButton from '../components/BackButton';
import { loadProjects, saveProjects } from '../utils/projectUtils';
import CheckBox from '../components/CheckBox';

export default function Complete() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
  
  // Move back a step
  const handleBack = () => {

    router.push(`/return?zoneName=${encodeURIComponent(zoneName)}`);
  };

  return (
    <Layout>
      <div style={inline_styles.container}>
        <CelebrationPage />  {/* CelebrationPage component, use the slash because it is a self-closing HTML tag */}
        <h1 style={inline_styles.heading}>
          Project Complete
        </h1>
        <p style={inline_styles.description}>
          Great job! Your project is complete!
        </p>
      </div>
      <BackButton onClick={handleBack} ariaLabel="Back to return" />
    </Layout>
    
  );
}

// Inline styles for layout and text
const inline_styles = {
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
  }
};