import { sampleProjects } from '../Constants/projects-updated-v6';

export const getProjectDetails = (id) => {
  const project = sampleProjects.find(p => p.id === id);
  return project ? { project } : null;
};
