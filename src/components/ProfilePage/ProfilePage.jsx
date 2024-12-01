import React from "react";
import { Link } from "react-router-dom"; 
import { ProjectInterface, UserProfile } from "./common";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import { getUserProjects } from "./firebaseActions"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "./firebase";

const ProfilePage = ({ user }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const userProjects = await getUserProjects(user.id);
      setProjects(userProjects);
    };

    fetchProjects();
  }, [user.id]);

  export const getUserProjects = async (userId) => { 
    const projectsRef = collection(db, "projects"); 
    const q = query(projectsRef, where("createdBy", "==", userId)); 
    const querySnapshot = await getDocs(q); let projects = []; querySnapshot.forEach((doc) => { projects.push({ id: doc.id, ...doc.data() }); }); 
    
  return projects; 
};

  return (
    <section className="flexCenter flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <img
            src={user?.avatarUrl}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            I’m Software Engineer at AdaptiveScale 👋
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
            <Link to={`mailto:${user?.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </div>
        </div>

        {projects.length > 0 ? (
          <img
            src={projects[0].image}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <img
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              image={project.image}
              title={project.title}
              name={user.name}
              avatarUrl={user.avatarUrl}
              userId={user.id}
              description={project.description}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;