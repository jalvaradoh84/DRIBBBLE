import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebase"; 
import Button from "../Button"; 

const ProjectActions = ({ projectId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    try {
      const projectRef = doc(db, "projects", projectId);
      await deleteDoc(projectRef);
      navigate("/"); // Redirige a la página de inicio
    } catch (error) {
      console.error("Error deleting project: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        to={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <img src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteProject}
      >
        <img src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
