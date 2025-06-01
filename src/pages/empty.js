'use client';
import React from 'react';
import { useRouter } from 'next/router'; // Import Next.js' router for navigation
import EncouragementPopup from '../components/encourage';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';

// Menu component with navigation buttons
export default function Empty() {
  const router = useRouter();  // Initialize the router instance
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)

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
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    width: '250px',
    transition: 'background-color 0.2s',
  },
};

  // Messages for the encouragement popup
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

  return (
    <Layout>
      <div style={inlineStyles.container}>
        <h1 style={inlineStyles.message}>
          Empty 
        </h1>
        <p style={inlineStyles.description}>
          Take everything out of your {zoneName}. Put it on a clear surface nearby.
        </p>

        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={emptyMessages} />

        {/* Button to start a new project by navigating to /declutter */}
        <button style={inlineStyles.button} onClick={() => router.push('/declutter')}>
          I'm ready to sort
        </button>
      </div>
    </Layout>
  );
}
