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
import { useRouter } from 'next/router';
import EncouragementPopup from '../components/encourage';



export default function Categorize() {
  const router = useRouter();
  const zoneName = router.query.zoneName || 'your space'; // Get zoneName from query or use default (your space)

  {/* action performed when next button is clicked */}
  const toReturn = () => {
    console.log('Navigating to return page');
    router.push('/return');
  };


  // Main container with full viewport height and centered content
  return (
    <div style={styles.container}>
      {/* Main heading for the categorization section */}
      <h1 style={styles.heading}>
        Categorize Items
      </h1>
      {/* Description text explaining the purpose of this section */}
      <p style={styles.description}>
      Now group your 'KEEP' items. Pens with pens, spices with spices, etc
      </p>

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
        
        {/* Calling EncouragementPopup component and passing messages array as argument */}
        <EncouragementPopup messages={categorizeMessages} />  


      <button style={styles.button} onClick={toReturn}>
        The items are categorized!
      </button>
    </div>
  );
}

// Inline styles for layout and text
const styles = {
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
