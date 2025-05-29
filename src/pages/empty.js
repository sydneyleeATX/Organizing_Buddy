'use client';
import React from 'react';
import { useRouter } from 'next/router';

// Menu component with navigation buttons
export default function Empty() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default


  return (
    <div style={styles.container}>
      <h1 style={styles.message}>
        Empty {zoneName}
      </h1>
      <p style={styles.description}>
        Take everything out of {zoneName}. Put it on a clear surface nearby.
      </p>
      {/* Button to start a new project by navigating to /declutter */}
      <button style={styles.button} onClick={() => router.push('/declutter')}>
        I'm ready to sort
      </button>
    </div>
  );
}


// Optional: simple inline styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '2rem',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#333',
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
  },
};