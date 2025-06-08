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

  const updatedProjects = projects.map(project => {
    if (project.zoneName === zoneName) {
      console.log('[updateProjectStep] Updating project:', project);
      return {
        ...project,
        currentStep: newStep,
        status: getStatus(newStep),
        lastUpdated: new Date().toISOString()
      };
    }
    return project;
  });
  saveProjects(updatedProjects);  // save updated array to localStorage
  console.log('[updateProjectStep] Updated projects array:', updatedProjects);
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
