import PropTypes from 'prop-types';
import { db, storage, auth } from "@/firebase.config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getUser = async (email: string) => {
  if (!email) return null;

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  
  let user = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });

  return user;
};

export const createUser = async (name: string, email: string, avatarUrl: string) => {
  const userRef = doc(db, "users", email);
  await setDoc(userRef, {
    name,
    email,
    avatarUrl,
  });
};

export const uploadImage = async (imagePath: string): Promise<string> => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const storageRef = ref(storage, `images/${blob.name}`);
  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const createNewProject = async (form: ProjectForm, creatorId: string) => {
  try {
    const imageUrl = await uploadImage(form.image);
    const projectRef = doc(collection(db, "projects"));
    await setDoc(projectRef, {
      ...form,
      image: imageUrl,
      createdBy: creatorId,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating project:', error);
    return { 
      success: false, 
      error: error.message || 'Error creating project' 
    };
  }
};

export const fetchAllProjects = async (category) => {
  const projectsRef = collection(db, "projects");
  let q = query(projectsRef);

  if (category) {
    q = query(projectsRef, where("category", "==", category));
  }

  const querySnapshot = await getDocs(q);
  const projects = [];
  
  for (const doc of querySnapshot.docs) {
    const projectData = doc.data();
    const userData = await getUserData(projectData.createdBy);
    
    projects.push({
      id: doc.id,
      ...projectData,
      name: userData?.name || 'Unknown User',
      avatarUrl: userData?.avatarUrl || '/default-avatar.png'
    });
  }

  return projects;
};

export const getProjectDetails = async (id: string) => {
  const projectRef = doc(db, "projects", id);
  const projectSnap = await getDoc(projectRef);

  if (projectSnap.exists()) {
    return projectSnap.data();
  } else {
    console.error("No such project!");
    return null;
  }
};

export const getUserProjects = async (id: string, limit = 100) => {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("createdBy", "==", id), limit);
  const querySnapshot = await getDocs(q);
  let projects: ProjectForm[] = [];
  querySnapshot.forEach((doc) => {
    projects.push(doc.data() as ProjectForm);
  });

  return projects;
};

export const deleteProject = async (id: string) => {
  const projectRef = doc(db, "projects", id);
  await deleteDoc(projectRef);
};

export const updateProject = async (form: ProjectForm, projectId: string) => {
  const projectRef = doc(db, "projects", projectId);
  let updatedForm = { ...form };

  if (form.image.startsWith("data:image")) {
    const imageUrl = await uploadImage(form.image);
    updatedForm = { ...updatedForm, image: imageUrl };
  }

  await updateDoc(projectRef, updatedForm);
};