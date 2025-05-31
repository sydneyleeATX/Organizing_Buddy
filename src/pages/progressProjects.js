/**
 * @file ProgressProjects.js
 * @description Page component for viewing and managing ongoing organizing projects
 * 
 * This component will show:
 * - List of started projects
 * - Current step of each project
 * - Option to resume projects
 * - Project completion status
 */

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * Mock data representing ongoing organizing projects
 * In a real application, this data would come from a database
 * Each project has:
 * - Unique ID
 * - Zone name (area being organized)
 * - Start date
 * - Current step in the organization process
 * - Status (in-progress/completed)
 * - Last updated timestamp
 */
const mockProjects = [
  {
    id: 1,
    zoneName: 'Kitchen',
    startDate: '2025-05-28',
    currentStep: 'categorize',
    status: 'in-progress',
    lastUpdated: '2025-05-30 15:00'
  },
  {
    id: 2,
    zoneName: 'Living Room',
    startDate: '2025-05-25',
    currentStep: 'declutter',
    status: 'in-progress',
    lastUpdated: '2025-05-28 10:30'
  }
];

/**
 * Main component for displaying progress projects
 * @returns {JSX.Element} The progress projects page component
 */
export default function ProgressProjects() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  /**
   * Initialize projects state with mock data
   * In a real app, this would fetch projects from a database
   */
  useEffect(() => {
    setProjects(mockProjects);
  }, []);

   // Returns appropriate color for project status
  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress':
        return '#2196F3'; // Blue for in-progress
      case 'completed':
        return '#4CAF50'; // Green for completed
      default:
        return '#9E9E9E'; // Gray for unknown status
    }
  };

  // Function to format the step name
  const getStepName = (step) => {
    const steps = {
      'empty': 'Emptying',
      'declutter': 'Decluttering',
      'clean': 'Cleaning',
      'categorize': 'Categorizing',
      'return': 'Returning Items',
      'complete': 'Completed'
    };
    return steps[step] || 'Unknown Step';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Ongoing Projects</h1>
      
      {projects.length === 0 ? (
        <p style={styles.noProjects}>No ongoing projects found. Start a new project from the menu.</p>
      ) : (
        <div style={styles.projectsList}>
          {projects.map((project) => (
            <div key={project.id} style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <h2 style={styles.projectName}>{project.zoneName}</h2>
                <span style={{ ...styles.status, backgroundColor: getStatusColor(project.status) }}>
                  {project.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              <div style={styles.projectDetails}>
                <p><strong>Started:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                <p><strong>Current Step:</strong> {getStepName(project.currentStep)}</p>
                <p><strong>Last Updated:</strong> {new Date(project.lastUpdated).toLocaleString()}</p>
              </div>
              
              {/* Navigate to the correct step based on currentStep */}
              <Link href={`/zone?zoneName=${encodeURIComponent(project.zoneName)}&step=${project.currentStep}`}>
                <button style={styles.resumeButton}>Resume Project</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// inline styles for layout and text
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  noProjects: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '2rem'
  },
  projectsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  projectCard: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderLeft: '4px solid #2196F3'
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  projectName: {
    fontSize: '1.5rem',
    color: '#333'
  },
  status: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '0.875rem'
  },
  projectDetails: {
    marginBottom: '1rem'
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%'
  }
};
