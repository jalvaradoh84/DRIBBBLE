import { auth } from './firebaseConfig'; // Adjust this import based on your Firebase setup
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import signOut

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe listener on first call
      resolve(user);
    }, reject);
  });
};

// Define signOut function
export const signOut = () => {
  return firebaseSignOut(auth); // Call Firebase signOut
};

