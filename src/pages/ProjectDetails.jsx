import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sampleProjects } from '../Constants/projects-updated-v6';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const foundProject = sampleProjects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  // Generate a unique gradient for fallback
  const getGradient = (projectId) => {
    const colors = [
      ['#f082ac', '#ea4c89'],
      ['#6366f1', '#8b5cf6'],
      ['#34d399', '#10b981'],
      ['#fbbf24', '#f59e0b'],
      ['#f472b6', '#ec4899'],
      ['#60a5fa', '#3b82f6']
    ];
    const index = parseInt(projectId, 36) % colors.length;
    return colors[index];
  };

  if (!project) {
    return (
      <div className="w-full min-h-[calc(100vh-72px)] flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Proyecto no encontrado</p>
          <Link 
            to="/"
            className="text-[#ea4c89] hover:text-[#f082ac] transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const [fromColor, toColor] = getGradient(project.id);

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1320px] mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-[#ea4c89] hover:text-[#f082ac] transition-colors gap-2"
          >
            <span className="text-lg">←</span>
            <span>Volver al inicio</span>
          </Link>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0d0c22] mb-6">
              {project.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={project.creator.avatar}
                  alt={project.creator.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/avatar.svg';
                  }}
                />
              </div>
              <div>
                <span className="font-medium text-[#0d0c22] block">
                  {project.creator.name}
                </span>
                <span className="text-sm text-[#6e6d7a]">
                  {project.creator.role}
                </span>
              </div>
            </div>
          </header>

          <div className="rounded-lg overflow-hidden bg-gray-50">
            {imageError ? (
              <div 
                className="w-full aspect-[16/9]"
                style={{
                  background: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`
                }}
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="mt-8 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6e6d7a] leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.tags && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-[#6e6d7a] text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectDetails;
