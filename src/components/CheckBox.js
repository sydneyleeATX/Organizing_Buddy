
import React, { useState, useEffect } from 'react';
import { useDoneSteps } from './DoneStepsContext';


/**
 * CheckBox - A reusable checkbox that calls updateProjectStep when checked.
 * Props:
 *   - markedStep: the step that was checked (to be added to donesSteps) (string)
 *   - zoneName: the project zone name (string)
 *   - label: text label to display next to the checkbox (string)
 *   - onChecked: optional callback after successful update
 */


const CheckBox = ({ markedStep, zoneName, label, onChecked }) => {
  const { getDoneSteps, setStepChecked } = useDoneSteps();
  const [checked, setChecked] = useState(false);

  // Update checked state based on context
  useEffect(() => {
    const steps = getDoneSteps(zoneName);
    setChecked(steps.includes(markedStep));
    console.log('[CheckBox] zoneName:', zoneName, 'doneSteps:', steps, 'markedStep:', markedStep);
  }, [zoneName, markedStep, getDoneSteps]);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    console.log('[CheckBox] handleChange: zoneName:', zoneName, 'markedStep:', markedStep, 'isChecked:', isChecked);
    setChecked(isChecked);
    setStepChecked(zoneName, markedStep, isChecked);
    if (onChecked) onChecked(isChecked);
  };


  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', marginRight: 12 }}>
        {/*pass in state variable 'checked' */}
      <input type="checkbox" checked={checked} onChange={handleChange} style={{ width: 30, height: 30 }} />
    </label>
  );
};

export default CheckBox;


