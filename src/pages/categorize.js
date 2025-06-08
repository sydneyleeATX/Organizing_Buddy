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
import { updateProjectStep } from '../utils/projectUtils';


export default function Categorize() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)
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

  // Main container with full viewport height and centered content
  return (
    <Layout>
      <div style={inlineStyles.container}>
      {/* Main heading for the categorization section */}
        <h1 style={inlineStyles.heading}>
          Categorize Items
        </h1>
        <p style={inlineStyles.description}>
          Now group your 'KEEP' items. Pens with pens, spices with spices, etc
        </p>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={categorizeMessages} />

        <button style={inlineStyles.button} onClick={handleNextStep}>
          The items are categorized!
        </button>
      </div>
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
