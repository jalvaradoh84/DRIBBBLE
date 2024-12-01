import Search from '../Search';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, title: "Project 1", description: "Description for project 1", image: "/projects/dashboard.jpg", link: "https://dribbble.com/shots/1234567" },
  { id: 2, title: "Project 2", description: "Description for project 2", image: "/projects/mobile-app.jpg", link: "https://dribbble.com/shots/1234568" },
  { id: 3, title: "Project 3", description: "Description for project 3", image: "/projects/branding.jpg", link: "https://dribbble.com/shots/1234569" },
  { id: 4, title: "Project 4", description: "Description for project 4", image: "/projects/website.jpg", link: "https://dribbble.com/shots/1234570" },
];

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-5 text-center">
      <h1 className="text-4xl font-extrabold mb-2">Discover the world’s top designers</h1>
      <p className="text-lg mb-5">Explore work from the most talented and accomplished designers ready to take on your next project</p>
      <Search />
      <h2 className="text-2xl font-semibold mb-4">What are you looking for?</h2>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map(project => (
          <Link key={project.id} to={project.link} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl">{project.title}</h2>
            <p>{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
