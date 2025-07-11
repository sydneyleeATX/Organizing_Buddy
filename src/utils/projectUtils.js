/**
 * @file projectUtils.js
 * @description Utility functions for managing organizing projects
 */


export const updateProjectStep = (zoneName, newStep) => {  // updates the project step in localStorage
  console.log('[updateProjectStep] Called with:', { zoneName, newStep });
  const stored = localStorage.getItem('projects');  // get projects from localStorage
  const projects = stored ? JSON.parse(stored) : [];  // parse projects from localStorage
  console.log('[updateProjectStep] Original projects array:', projects);

  // Determine the status based on the new step
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
      currentStep: newStep,
      status: getStatus(newStep),
      lastUpdated: new Date().toISOString()
    };
    saveProjects(projects);  // save updated array to localStorage
    console.log('[updateProjectStep] Updated projects array:', projects);
  }
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
  
  // Remove the project from the array
  projects.splice(index, 1);
  
  // Save the updated array to localStorage
  localStorage.setItem('projects', JSON.stringify(projects));
};

export function getCurrentProject(zoneName) {
  const projects = loadProjects();
  return projects.find(p => p.zoneName === zoneName);
}
