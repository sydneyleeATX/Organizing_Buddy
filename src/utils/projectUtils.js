/**
 * @file projectUtils.js
 * @description Utility functions for managing organizing projects
 */


export const updateProjectStep = (zoneName, doneSteps) => {  // updates the project step in localStorage
  console.log('[updateProjectStep] Called with:', { zoneName, doneSteps });
  const stored = localStorage.getItem('projects');  // get projects from localStorage
  const projects = stored ? JSON.parse(stored) : [];  // parse projects from localStorage
  console.log('[updateProjectStep] Original projects array:', projects);

  // Define the hierarchical order of steps
  const orderedSteps = ['zone', 'empty', 'declutter', 'clean', 'categorize', 'return', 'complete'];

  // Find the first (leftmost) step in the array that is NOT present in doneSteps
  let currentStep = orderedSteps.find(step => !doneSteps.includes(step));
  if (!currentStep) currentStep = 'complete'; // If all steps are done

  // Determine the status based on the current step
  const getStatus = (step) => {
    switch(step) {
      case 'complete':
        return 'completed';
      default:
        return 'in-progress';
    }
  };

  // Only update the most recent in-progress project with this zoneName
  const idx = [...projects].reverse().findIndex(
    project => project.zoneName === zoneName && project.status !== 'completed'
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
  console.log('[doneSteps] doneSteps within projectUtils.js:', doneSteps);               // why is this only called when box unchecked?
};

export const saveProjects = (updatedProjects) => {  // saves projects to localStorage
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
};

/**
 * completedSteps - get or update the array of completed steps for a project
 * @param {string} zoneName - the project zone name
 * @param {string} step - the step to add or remove
 * @param {string} action - 'add' | 'remove' | undefined
 * @returns {Array} - the array of completed steps
 */
export function completedSteps(zoneName, step, action) {
  // action: 'add' | 'remove' | undefined
  // load projects from local storage
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  // find the most recent project with this zoneName
  const idx = [...projects].reverse().findIndex(
    project => project.zoneName === zoneName && project.status !== 'completed'
  );
  // if found, update the doneSteps array
  if (idx !== -1) {
    const realIdx = projects.length - 1 - idx;
    // get the doneSteps array
    let doneSteps = projects[realIdx].doneSteps || [];
    // if step is add, the step is valid, and the step is not already in the array, add it
    if (action === 'add' && step && !doneSteps.includes(step)) {
      doneSteps.push(step);
    } else if (action === 'remove' && step) {
      // if step is remove, the step is valid, and the step is in the array, remove it
      doneSteps = doneSteps.filter(s => s !== step);
    }
    // update the project in localStorage
    projects[realIdx].doneSteps = doneSteps;
    localStorage.setItem('projects', JSON.stringify(projects));
    return doneSteps;
  }
  return [];
}


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
  
  // Remove the project from the array
  projects.splice(index, 1);
  
  // Save the updated array to localStorage
  localStorage.setItem('projects', JSON.stringify(projects));
};

export function getCurrentProject(zoneName) {
  const projects = loadProjects();
  return projects.find(p => p.zoneName === zoneName);
}

export function regressProjectStep(zoneName) {
  const projects = loadProjects();
  const idx = [...projects].reverse().findIndex(
    project => project.zoneName === zoneName && project.status !== 'completed'
  );
  if (idx !== -1) {
    const realIdx = projects.length - 1 - idx;
    projects[realIdx] = {
      ...projects[realIdx],
      currentStep: 'empty',
      status: 'in-progress',
      lastUpdated: new Date().toISOString()
    };
    saveProjects(projects);
    console.log('[regressProjectStep] Updated projects array:', projects);
  }
}


