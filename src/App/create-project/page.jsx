import React, { useEffect, useState } from "react";
import ProjectForm from "./components/ProjectForm/ProjectForm"; 
import ProjectModal from "./components/ProjectModal/ProjectModal";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        navigate("/"); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!session) {
    return null; 
  }

  return (
    <ProjectModal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" session={session} />
    </ProjectModal>
  );
};

export default CreateProject;
