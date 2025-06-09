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
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { loadProjects, saveProjects as saveProjectsToStorage, updateProjectStep, deleteProject } from '../utils/projectUtils';

/**
 * Main component for displaying progress projects
 * @returns {JSX.Element} The progress projects page component
 */
export default function ProgressProjects() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const projects = loadProjects();
    console.log('[ProgressProjects] Loaded from localStorage:', projects);
    setProjects(projects);
  }, []);

  // Function to update projects in both state and localStorage
  const updateProjects = (updatedProjects) => {
    console.log('[ProgressProjects] Saving to localStorage:', updatedProjects);
    saveProjectsToStorage(updatedProjects);
    setProjects(updatedProjects);
  };

  const handleDelete = (projectId) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    // Delete the project directly from localStorage
    deleteProject(projectId);
    
    // Update the local state
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
  };



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
    <Layout>
      <div style={inlineStyles.container}>
        <h1 style={inlineStyles.heading}>Ongoing Projects</h1>
        
        {/* filter out projects that are completed */}
        {projects.filter(p => p.status !== 'completed').length === 0 ? (
          <p style={inlineStyles.noProjects}>No ongoing projects found. Start a new project from the menu.</p>
        ) : (
          <div style={inlineStyles.projectsList}>
            {projects.filter(p => p.status !== 'completed').map((project) => (
              <div key={project.id} style={inlineStyles.projectCard}>
                <div style={inlineStyles.projectHeader}>
                  <h2 style={inlineStyles.projectName}>{project.zoneName}</h2>
                  <span style={{ ...inlineStyles.status, backgroundColor: getStatusColor(project.status) }}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </span>
                  {project.startPhoto && (
  <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <img 
      src={project.startPhoto} 
      alt={`Before photo of ${project.zoneName}`} 
      style={{ maxWidth: '100px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    />
    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>Before photo</div>
    {project.endPhoto && (
      <>
        <img
          src={project.endPhoto}
          alt={`After photo of ${project.zoneName}`}
          style={{ maxWidth: '100px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '0.5rem' }}
        />
        <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>After photo</div>
      </>
    )}
  </div>
)}
                </div>
                
                <div style={inlineStyles.projectDetails}>
                  <p><strong>Started:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                  <p><strong>Current Step:</strong> {getStepName(project.currentStep)}</p>
                  <p><strong>Last Updated:</strong> {new Date(project.lastUpdated).toLocaleString()}</p>
                </div>
                {/* Navigate buttons to the correct step based on currentStep */}
                <div style={inlineStyles.actionButtons}>
                  <Link href={`/${project.currentStep}?zoneName=${encodeURIComponent(project.zoneName)}`}>
                    <button style={inlineStyles.resumeButton}>Resume Project</button>
                  </Link>
                  <button 
                    style={inlineStyles.deleteButton} 
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
// Optional: simple inline styling
const inlineStyles = {
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
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    width: 'auto'
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    width: 'auto'
  }
};
