import React, { useState, useEffect } from 'react';

/**
 * ProjectNotesModal - Modal for viewing/editing project notes.
 * Props:
 *   open: boolean - whether modal is open
 *   initialNotes: string - current notes for this project
 *   onClose: function - called when modal is closed
 *   onSave: function - called with new notes when saved
 */
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    position: 'relative',
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    padding: '0.75rem',
    outline: 'none',
    width: '100%',
  },
  saveBtn: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  closeBtn: {
    position: 'absolute',
    top: '0.75rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
  },
};

import { loadProjects, saveProjects } from '../utils/projectUtils';

const ProjectNotesModal = ({ open, initialNotes, zoneName, onClose, onSave }) => {
  const [notes, setNotes] = useState(initialNotes || '');


  useEffect(() => {
    setNotes(initialNotes || '');
  }, [initialNotes, open]);

  if (!open) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button style={modalStyles.closeBtn} onClick={onClose} aria-label="Close notes">×</button>
        <h2 style={{margin:0, fontWeight:600}}>Project Notes</h2>
        <textarea
          style={modalStyles.textarea}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add notes about this project..."
        />
        <button style={modalStyles.saveBtn} onClick={() => {
      if (zoneName) {
        const projects = loadProjects();
        const idx = projects.findIndex(p => p.zoneName === zoneName);
        if (idx !== -1) {
          projects[idx].notes = notes;
          saveProjects(projects);
        }
      }
      if (onSave) onSave(notes);
      onClose();
    }}>
      Save
    </button>
      </div>
    </div>
  );
};

export default ProjectNotesModal;
