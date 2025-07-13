import React, { useState, useEffect } from 'react';
import { updateProjectStep, loadProjects, saveProjects } from '../utils/projectUtils';

/**
 * regressStep - regress the most recent project for a zone to a previous step
 * @param {string} zoneName - the project zone name
 * @param {string} prevStep - the previous step to regress to
 */
export function regressStep(zoneName, prevStep) {
  const projects = loadProjects();
  if (projects.length > 0) {
    // Find the most recent project with this zoneName
    const idx = [...projects].reverse().findIndex(
      project => project.zoneName === zoneName && project.status !== 'completed'
    );
    if (idx !== -1) {
      const realIdx = projects.length - 1 - idx;
      projects[realIdx].currentStep = prevStep;
      projects[realIdx].status = 'in-progress';
      projects[realIdx].lastUpdated = new Date().toISOString();
      saveProjects(projects);
    }
  }
}
/**
 * completedSteps - get or update the array of completed steps for a project
 * @param {string} zoneName - the project zone name
 * @param {string} step - the step to add or remove
 * @param {string} action - 'add' | 'remove' | undefined
 * @returns {Array} - the array of completed steps
 */
export function completedSteps(zoneName, step, action) {
  // action: 'add' | 'remove' | undefined
  const key = `doneSteps_${zoneName}`;
  let steps = [];
  const stored = localStorage.getItem(key);
  if (stored) steps = JSON.parse(stored);
  if (action === 'add' && step && !steps.includes(step)) {
    steps.push(step);
    localStorage.setItem(key, JSON.stringify(steps));
  } else if (action === 'remove' && step) {
    steps = steps.filter(s => s !== step);
    localStorage.setItem(key, JSON.stringify(steps));
  }
  return steps;
}

  

/**
 * CheckBox - A reusable checkbox that calls updateProjectStep when checked.
 * Props:
 *   - nextStep: the step to update the project to (string)
 *   - zoneName: the project zone name (string)
 *   - label: text label to display next to the checkbox (string)
 *   - onChecked: optional callback after successful update
 */
const CheckBox = ({ nextStep, zoneName, label, onChecked }) => {
  const [checked, setChecked] = useState(false);
  const [doneSteps, setDoneSteps] = useState([]);

  // Load doneSteps for this zone/project from localStorage on mount
  // If the zoneName prop changes, the useEffect will run again
  useEffect(() => {  // load doneSteps for this zone/project from completedSteps
    setDoneSteps(completedSteps(zoneName));
  }, [zoneName]);                                          

  // Set checked if nextStep is in doneSteps
  useEffect(() => {
    setChecked(doneSteps.includes(nextStep));
  }, [doneSteps, nextStep]);

  // called whenever the checkbox is checked or unchecked
  const handleChange = async (e) => {
    // gets the new checkbox state
    const isChecked = e.target.checked;
    // updates the checkbox state
    setChecked(isChecked);
    // prepares an array to hold the updated array of steps
    let updatedDoneSteps = doneSteps;
    if (isChecked && nextStep && zoneName) {
      // Add current step to doneSteps via completedSteps
      updatedDoneSteps = completedSteps(zoneName, nextStep, 'add');
      setDoneSteps(updatedDoneSteps);
      try { // update the project step in localStorage
        await updateProjectStep(zoneName, doneSteps);
      } catch (error) {
        alert('Failed to update project step.');
      }
    } else if (!isChecked) {
      // Remove from doneSteps via completedSteps
      updatedDoneSteps = completedSteps(zoneName, nextStep, 'remove');
      setDoneSteps(updatedDoneSteps);
    }
  };

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', marginRight: 12 }}>
        {/*pass in state variable 'checked' */}
      <input type="checkbox" checked={checked} onChange={handleChange} style={{ width: 30, height: 30 }} />
    </label>
  );
};

export default CheckBox;

