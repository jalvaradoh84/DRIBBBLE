import { useParams } from 'react-router-dom';
import { sampleProjects } from '../Constants/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = sampleProjects.find((proj) => proj.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <img src={project.image} alt={project.title} className="w-full h-auto mb-4" />
      <p className="text-lg mb-4">{project.description}</p>
      <h2 className="text-xl font-semibold">Created by: {project.creator.name}</h2>
      <img src={project.creator.avatar} alt={project.creator.name} className="w-10 h-10 rounded-full" />
    </div>
  );
};

export default ProjectDetails;
