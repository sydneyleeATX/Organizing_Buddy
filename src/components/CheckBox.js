import React, { useState, useEffect } from 'react';
import { updateProjectStep, loadProjects, saveProjects, completedSteps } from '../utils/projectUtils';

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
 * CheckBox - A reusable checkbox that calls updateProjectStep when checked.
 * Props:
 *   - markedStep: the step that was checked (to be added to donesSteps) (string)
 *   - zoneName: the project zone name (string)
 *   - label: text label to display next to the checkbox (string)
 *   - onChecked: optional callback after successful update
 */
const CheckBox = ({ markedStep, zoneName, label, onChecked }) => {
  const [checked, setChecked] = useState(false);
  const [doneSteps, setDoneSteps] = useState([]);

  // Load doneSteps for this zone/project from localStorage on mount
  // If the zoneName prop changes, the useEffect will run again
  useEffect(() => {  // load doneSteps for this zone/project from completedSteps
    setDoneSteps(completedSteps(zoneName));
    console.log('[CheckBox] zoneName:', zoneName, 'doneSteps:', doneSteps, 'markedStep:', markedStep);
  }, [zoneName]);       


  // Set checked if markedStep is in doneSteps
  useEffect(() => {
    setChecked(doneSteps.includes(markedStep));
    console.log('[CheckBox] Checking if', markedStep, 'is in', doneSteps, '=>', doneSteps.includes(markedStep));
  }, [doneSteps, markedStep]);

  // called whenever the checkbox is checked or unchecked
  const handleChange = async (e) => {
    // gets the new checkbox state
    const isChecked = e.target.checked;
    // immediate UI update
    setChecked(isChecked);
    let updatedDoneSteps = doneSteps;
    if (isChecked && markedStep && zoneName) {
      // Add current step to doneSteps via completedSteps
      updatedDoneSteps = completedSteps(zoneName, markedStep, 'add');
      setDoneSteps(updatedDoneSteps);
      console.log('doneSteps within checkbox.js when checked:', updatedDoneSteps);
      try {
        // update the project step in localStorage
        await updateProjectStep(zoneName, updatedDoneSteps);
      } catch (error) {
        alert('Failed to update project step.');
      }
    } else if (!isChecked) {
      updatedDoneSteps = completedSteps(zoneName, markedStep, 'remove');        // returns the new list of doneSteps
      setDoneSteps(updatedDoneSteps);                                         // updates doneSteps variable
      console.log('doneSteps within checkbox.js when unchecked:', updatedDoneSteps);
      console.log('zone:', zoneName);
      console.log('markedStep:', markedStep);
      console.log('isChecked:', isChecked);
      try {
        // update the project step in localStorage
        await updateProjectStep(zoneName, updatedDoneSteps);
      } catch (error) {
        alert('Failed to update project step.');
      }
    } else {
        console.log('zone:', zoneName);
        console.log('markedStep:', markedStep);
        console.log('isChecked:', isChecked);
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


