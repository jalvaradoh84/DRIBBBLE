import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase"; 

const RelatedProjects = ({ userId, projectId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, where("createdBy", "==", userId));
      const querySnapshot = await getDocs(q);

      const userProjects = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== projectId) {
          userProjects.push({ id: doc.id, ...doc.data() });
        }
      });

      setProjects(userProjects);
    };

    fetchUserProjects();
  }, [userId, projectId]);

  if (projects.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flex justify-between">
        <p className="text-base font-bold">
          More by 
          <Link
            to={`/profile/${userId}`}
            className="text-primary-purple text-base"
          >
            View All
          </Link>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex justify-center items-center relative shadow-md rounded-2xl overflow-hidden"
          >
            <Link
              to={`/project/${project.id}`}
              className="relative w-full h-full group"
            >
              <img
                src={project.image}
                alt="project"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="hidden group-hover:flex items-center justify-center absolute inset-0 bg-black bg-opacity-50 text-white font-semibold">
                <p className="w-full text-center">{project.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
