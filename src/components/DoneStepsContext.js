import React, { createContext, useContext, useState, useEffect } from 'react';
const DoneStepsContext = createContext();

/**
 * DoneStepsProvider - Provides context for managing done steps (completed tasks) for projects.
 * Props:
 *   children: React nodes to render within the provider
 * useDoneSteps() gives you access to two functions: 
 * getDoneSteps: to read
 * setStepChecked(zoneName, step, checked) to change the state (i.e., mark a step as checked/unchecked for a zone).
 * Internally, setStepChecked will update the context state, and then any component using getDoneSteps will see the new, updated list
 */
export function DoneStepsProvider({ children }) {
  // Structure: { [zoneName]: [doneSteps] }
  const [doneStepsByZone, setDoneStepsByZone] = useState(() => {
    // the window object cannot be run on the server (backend), only browser
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('doneStepsByZone');
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('doneStepsByZone', JSON.stringify(doneStepsByZone));
    }
  }, [doneStepsByZone]);

  // Get doneSteps for a zone
  const getDoneSteps = (zoneName) => doneStepsByZone[zoneName] || [];

  // Remove all steps for a zone (used when deleting a project)
  const removeZoneSteps = (zoneName) => {
    setDoneStepsByZone(prev => {
      const newObj = { ...prev };
      delete newObj[zoneName];
      return newObj;
    });
  };
  
  // Add or remove a step for a zone
  const setStepChecked = (zoneName, step, checked) => {
    setDoneStepsByZone(prev => {
      // look up the current completed steps for this zone
      const current = prev[zoneName] || [];
      let updated;
      if (checked) {
        // if the step is not already in the list, add it
        updated = current.includes(step) ? current : [...current, step];
      } else {
        // step not checked, so if step is in the list, remove it
        updated = current.filter(s => s !== step);
      }
      // Ensure the current step and status are updated in the projects array
      if (typeof window !== 'undefined') {
        try {
          // Dynamically import updateProjectStep to avoid circular dependency
          import('../utils/projectUtils').then(utils => {
            if (utils && utils.updateProjectStep) {
              utils.updateProjectStep(zoneName, updated);
            }
          });
        } catch (e) {
          // ignore
        }
      }
      return { ...prev, [zoneName]: updated };
    });
  };

  return (
    // Makes data available to all child components wrapped inside it
    <DoneStepsContext.Provider value={{ getDoneSteps, setStepChecked, removeZoneSteps }}>
      {children}
    </DoneStepsContext.Provider>
  );
}

export function useDoneSteps() {
  return useContext(DoneStepsContext);
}
