import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure the correct path to your firebase config

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projects");
        const querySnapshot = await getDocs(projectsRef);
        const fetchedProjects = [];
        querySnapshot.forEach((doc) => {
          fetchedProjects.push({ id: doc.id, ...doc.data() });
        });
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  return ( 
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#f8f7f4] pt-[72px]">
        <div className="max-w-[1320px] mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-[32px] md:text-[48px] font-bold text-[#0d0c22] leading-tight mb-6">
              Embárcate en un viaje por el universo del diseño
            </h1>
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Buscar proyectos..."
                className="w-full px-4 py-2 border border-[#e7e7e9] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ea4c89] focus:ring-opacity-50"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="ml-2 px-4 py-2 border border-[#e7e7e9] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#ea4c89] focus:ring-opacity-50"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Filtrar por categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[16px] md:text-[18px] text-[#6e6d7a] mb-8">
              Descubre las maravillas del diseño a través de las obras maestras de los diseñadores más visionarios y versátiles, listos para transformar tu próximo proyecto en una obra de arte.
            </p>
            <Link 
              to="/signup"
              className="inline-block px-6 py-3 bg-[#ea4c89] hover:bg-[#f082ac] text-white text-[14px] font-medium rounded-lg transition-colors hover-lift"
            >
              Regístrate para continuar
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-[#e7e7e9]">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-300 hover-lift ${
                  selectedCategory === category
                    ? 'bg-[#0d0c22] text-white'
                    : 'text-[#6e6d7a] hover:text-[#0d0c22]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-[1320px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            ['0', '100', '200', '300'].map((delay) => (
              <SkeletonCard key={delay} delay={delay} />
            ))
          ) : (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`animate-fade-in`}
                style={{ 
                  animationDelay: `${Math.min(index * 100, 300)}ms`
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sign Up Banner */}
      <div className="bg-[#f8f7f4] py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-[24px] md:text-[32px] font-bold text-[#0d0c22] mb-4">
              Encuentra tu próximo diseñador hoy
            </h2>
            <p className="text-[16px] text-[#6e6d7a] mb-8">
              Las marcas líderes mundiales confían en RIBBBLE para contratar talento creativo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="px-6 py-3 bg-[#ea4c89] hover:bg-[#f082ac] text-white text-[14px] font-medium rounded-lg transition-colors hover-lift text-center"
              >
                Comienza ahora
              </Link>
              <Link 
                to="/hire"
                className="px-6 py-3 border border-[#e7e7e9] hover:border-[#0d0c22] text-[#0d0c22] text-[14px] font-medium rounded-lg transition-colors hover-lift text-center"
              >
                Aprende sobre contratación
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
