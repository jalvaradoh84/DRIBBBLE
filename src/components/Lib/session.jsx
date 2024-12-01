import { auth, db, googleProvider, signInWithPopup } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react"; 
import { signInWithGoogle, getCurrentUser, getUserData } from "./auth"; // Ajusta la ruta según tu estructura de carpetas
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL
        });
      }

      return user;
    }
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    return null;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      unsubscribe();
      if (user) {
        const userData = await getUserData(user.uid);
        resolve({ ...user, ...userData });
      } else {
        resolve(null);
      }
    }, reject);
  });
};

export const persistSession = async (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error persisting session:', error);
  }
};

export const getUserData = async (uid) => {
  if (!uid) return null;
  
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.error("No such user!");
    return null;
  }
};

const AuthComponent = () => { const [user, setUser] = useState(null); useEffect(() => { const fetchUser = async () => { const currentUser = await getCurrentUser(); if (currentUser) { const userData = await getUserData(currentUser.uid); setUser(userData); } }; fetchUser(); }, []); const handleSignIn = async () => { const user = await signInWithGoogle(); if (user) { const userData = await getUserData(user.uid); setUser(userData); } }; return ( <div> {user ? ( <div> <p>Welcome, {user.name}!</p> <img src={user.avatarUrl} alt="Avatar" /> </div> ) : ( <button onClick={handleSignIn}>Sign in with Google</button> )} </div> ); }; 
export  AuthComponent;