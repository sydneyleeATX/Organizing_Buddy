'use client'; // Marks this component as a Client Component (required if using Next.js App Router and client-side hooks like useRouter)

import { useRouter } from 'next/router'; // Import Next.js' router for navigation

// Menu component with navigation buttons
export default function Menu() {
  const router = useRouter(); // Initialize the router instance

  return (
    <div style={styles.container}>
      {/* Page Title */}
      <h1 style={styles.title}>Project Menu</h1>

      {/* Button to start a new project by navigating to /empty */}
      <button style={styles.button} onClick={() => router.push('/empty')}>
        Start New Project
      </button>

      {/* Placeholder button for continuing a project */}
      <button style={styles.button}>
        Continue Existing Project
      </button>

      {/* Placeholder button for viewing completed projects */}
      <button style={styles.button}>
        Completed Projects
      </button>
    </div>
  );
}

// Inline styles for layout and buttons
const styles = {
  container: {
    height: '100vh',                      // Full screen height
    display: 'flex',                      // Use flexbox layout
    flexDirection: 'column',             // Stack children vertically
    justifyContent: 'center',            // Center vertically
    alignItems: 'center',                // Center horizontally
    backgroundColor: '#f0f2f5',          // Light background color
    gap: '1rem',                         // Space between elements
  },
  title: {
    marginBottom: '2rem',                // Space below title
    fontSize: '2rem',                    // Large font size
    color: '#333',                       // Dark text color
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