/**
 * @file Return.js
 * @description Page component for returning items to their proper places
 * 
 * This component will provide tools for:
 * - Returning categorized items to their designated spots
 * - Ensuring everything has a proper home
 * - Maintaining organization
 */

'use client';
import React from 'react';
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';

export default function Return() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space';

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Return Items
      </h1>
      <p style={styles.description}>
      Put your categorized items back in your {zoneName}. Think about
      </p>
      <ul style={styles.ul}>
        <li>Easy access: What do you use most often?</li>
        <li>Vertical space: Can you stack items or use risers?</li>
        </ul>

      
      const returnMessages = [
        "Every item now has a purpose and a place – your home is truly serving you.", 
        "You're completing the cycle; giving each belonging its logical and happy home.", 
        "No more searching! You've designed a system where everything is effortlessly found.", 
        "This final step seals the deal, locking in all your hard-earned order.", 
        "You're creating a sustainable system, making future tidying a breeze.", 
        "Feel the immense satisfaction of knowing exactly where everything belongs.", 
        "Your space is now a testament to your hard work and thoughtful decisions.", 
        "You've transformed your home from a storage unit into a true sanctuary.", 
        "This is the moment of effortless living; enjoy the fruits of your organizing efforts!", 
        "Congratulations! You've given your home and your belongings the clarity they deserve."
      ];
        
      {/* Calling EncouragementPopup component and passing messages array as argument */}
      <EncouragementPopup messages={returnMessages} />

      <button style={styles.button} onClick={() => router.push('/complete')}>
        All items are returned!
      </button>
    </div>
  );
}


// Inline styles for layout and text
const styles = {
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
  ul: {
    listStyleType: 'circle',               // Hollow bullet points
    marginBottom: '2rem',                // Space below list
    fontSize: '1.1rem',                  // Standard font size
    color: '#333',                       // Text color
  },
};