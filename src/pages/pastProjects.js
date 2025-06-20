// pastProjects.js
// Page to display all completed projects

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import styles from '../components/Layout.module.css';
import { loadProjects } from '../utils/projectUtils';
import ProjectNotesModal from '../components/ProjectNotesModal';

export default function PastProjects() {
  const [completedProjects, setCompletedProjects] = useState([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesProjectId, setNotesProjectId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const allProjects = loadProjects();
    const completed = allProjects.filter(p => p.status === 'completed');
    setCompletedProjects(completed);
  }, []);

  function handleDelete(projectId) {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    // get all stored projects. if none stored return empty array
    const stored = localStorage.getItem('projects');
    const projects = stored ? JSON.parse(stored) : [];
    // get all projects that do not have the same ID as the project we are deleting
    const updated = projects.filter(p => p.id !== projectId);
    // update localStorage with the updated array
    localStorage.setItem('projects', JSON.stringify(updated));
    setCompletedProjects(prev => prev.filter(p => p.id !== projectId));
  }

  return (
    <Layout>
      <div style={inlineStyles.container}>
        <ProjectNotesModal
          open={notesOpen}
          initialNotes={notes}
          onClose={() => setNotesOpen(false)}
          onSave={newNotes => {
            // Update notes for the correct project in localStorage and UI
            const stored = localStorage.getItem('projects');
            const projects = stored ? JSON.parse(stored) : [];
            const idx = projects.findIndex(p => p.id === notesProjectId);
            if (idx !== -1) {
              projects[idx].notes = newNotes;
              localStorage.setItem('projects', JSON.stringify(projects));
              setCompletedProjects(prev => prev.map(p => p.id === notesProjectId ? { ...p, notes: newNotes } : p));
            }
            setNotes(newNotes);
            setNotesOpen(false);
          }}
        />
        <h1 style={inlineStyles.heading}>Completed Projects</h1>
        {completedProjects.length === 0 ? (
          <p style={inlineStyles.noProjects}>No completed projects found.</p>
        ) : (
          <div style={inlineStyles.projectsList}>
            {completedProjects.map(project => (
              <div key={project.id} style={inlineStyles.projectCard}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Left: Zone Name */}
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>{project.zoneName}</h2>
                  </div>
                  {/* Right: Photos */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {project.startPhoto && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                          src={project.startPhoto}
                          alt={`Before photo of ${project.zoneName}`}
                          style={{ maxWidth: '120px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                        />
                        <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>Before photo</div>
                        {project.endPhoto && (
                          <>
                            <img
                              src={project.endPhoto}
                              alt={`After photo of ${project.zoneName}`}
                              style={{ maxWidth: '120px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '0.5rem' }}
                            />
                            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>After photo</div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Action Buttons */}
                <div style={inlineStyles.actionButtons}>
                  <button
                    style={inlineStyles.deleteButton}
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={inlineStyles.showNotesButton}
                    onClick={() => {
                      setNotesProjectId(project.id);
                      setNotes(project.notes || '');
                      setNotesOpen(true);
                    }}
                  >
                    Show Notes
                  </button>
                </div>
                <div style={inlineStyles.projectDetails}>
                  <p><strong>Started:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                  <p><strong>Completed:</strong> {new Date(project.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

// Simple inline styles for consistency with progressProjects.js
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
    borderLeft: '4px solid #4CAF50'
  },
  projectHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  projectName: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333'
  },
  projectDetails: {
    marginBottom: '1rem'
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
    justifyContent: 'flex-end'
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    width: 'auto',
    opacity: 0.7
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
  }, 
  showNotesButton: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    width: 'auto',
    backgroundColor: '#007bff',
    color: 'white'
  }
};
