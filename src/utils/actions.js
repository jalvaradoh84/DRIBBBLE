import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Function to add a document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to get documents from a collection
export const getDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
};

// Function to update a document in a collection
export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
  console.log("Document updated with ID: ", id);
};

// Function to delete a document from a collection
export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  console.log("Document deleted with ID: ", id);
};
