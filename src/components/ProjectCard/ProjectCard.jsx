import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import { useState } from 'react';

const ProjectCard = ({ project }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const capturePreview = () => {
    const cardElement = document.getElementById(`project-card-${project.id}`);
    html2canvas(cardElement).then((canvas) => {
      setPreviewImage(canvas.toDataURL());
    });
  };

  const handleClick = () => {
    console.log(`Navigating to project with ID: ${project.id}`);
  };

  return (
    <div className="p-4">
      <Link to={`/project/${project.id}`} className="block w-full sm:w-auto" onMouseEnter={capturePreview} onClick={handleClick}>
        <div id={`project-card-${project.id}`} className="relative rounded-lg overflow-hidden cursor-pointer shadow-md transition-transform transform hover:scale-105">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
            <h3 className="text-white text-lg font-semibold">{project.title}</h3>
          </div>
        </div>
        <p className="mt-2 text-gray-700">{project.description}</p>
      </Link>
      {previewImage && (
        <div className="preview-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    creator: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProjectCard;
