/**
 * @file projectUtils.js
 * @description Utility functions for managing organizing projects
 */


export const updateProjectStep = (zoneName, doneStepsInput) => {  // updates the project step in localStorage
  // Try to retrieve the latest doneSteps using context if available
  let doneSteps = doneStepsInput;
  try {
    // if being run on the client side, get the latest doneSteps from context
    if (typeof window !== 'undefined' && window.__DONE_STEPS_CONTEXT__) {
      doneSteps = window.__DONE_STEPS_CONTEXT__.getDoneSteps(zoneName);
      console.log('[updateProjectStep] Got doneSteps from context:', doneSteps);
    }
  } catch (e) {
    console.warn('[updateProjectStep] Could not get doneSteps from context:', e);
  }
  console.log('[updateProjectStep] Called with:', { zoneName, doneSteps });
  const stored = localStorage.getItem('projects');  // get projects from localStorage
  const projects = stored ? JSON.parse(stored) : [];  // parse projects from localStorage
  console.log('[updateProjectStep] Original projects array:', projects);

  // Define the hierarchical order of steps
  const orderedSteps = ['zone', 'empty', 'declutter', 'clean', 'categorize', 'return', 'complete'];

  // Find the first (leftmost) step in the array that is NOT present in doneSteps
  let currentStep = orderedSteps.find(step => !doneSteps.includes(step));
  if (!currentStep) currentStep = 'complete'; // If all steps are done
  console.log('[updateProjectStep] Current step:', currentStep);

  // Determine the status based on the current step
  const getStatus = (step) => {
    if (step === 'complete') return 'Completed';
    return 'In Progress';
  };

  // Only update the most recent in-progress project with this zoneName
  const idx = [...projects].reverse().findIndex(
    project => project.zoneName === zoneName && project.status !== 'Completed'
  );
  if (idx !== -1) {
    const realIdx = projects.length - 1 - idx;
    projects[realIdx] = {
      ...projects[realIdx],
      currentStep: currentStep,
      status: getStatus(currentStep),
      lastUpdated: new Date().toISOString()
    };
    saveProjects(projects);  // save updated array to localStorage
    console.log('[updateProjectStep] Updated projects array:', projects);
  }
  console.log('[doneSteps] doneSteps within projectUtils.js:', doneSteps);
};

export const saveProjects = (updatedProjects) => {  // saves projects to localStorage
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
};


export const loadProjects = () => {  // loads projects from localStorage
  const stored = localStorage.getItem('projects');
  return stored ? JSON.parse(stored) : [];  // checks if stored has value, return data or empty array
};

export const deleteProject = (projectId) => {  // deletes project from localStorage
  const stored = localStorage.getItem('projects');
  if (!stored) return;  // if no projects, return

  const projects = JSON.parse(stored);
  const index = projects.findIndex(project => project.id === projectId);  // find index of project
  if (index === -1) return;  // if project not found, return

  // Get the zoneName before removing the project
  const zoneName = projects[index].zoneName;

  // Remove the project from the array
  projects.splice(index, 1);

  // Save the updated array to localStorage
  localStorage.setItem('projects', JSON.stringify(projects));

  // Remove the done steps for this zoneName
  const doneStepsRaw = localStorage.getItem('doneStepsByZone');
  if (doneStepsRaw) {
    const doneStepsByZone = JSON.parse(doneStepsRaw);
    if (zoneName && doneStepsByZone[zoneName]) {
      delete doneStepsByZone[zoneName];
      localStorage.setItem('doneStepsByZone', JSON.stringify(doneStepsByZone));
    }
  }
};

export function getCurrentProject(zoneName) {
  const projects = loadProjects();
  return projects.find(p => p.zoneName === zoneName);
}




