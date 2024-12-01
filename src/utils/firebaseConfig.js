import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfgYBUmaA0c7dGBLqWO6iX8evzSLC0S5I",
  authDomain: "dribbble-418aa.firebaseapp.com",
  databaseURL: "https://dribbble-418aa-default-rtdb.firebaseio.com",
  projectId: "dribbble-418aa",
  storageBucket: "dribbble-418aa.firebasestorage.app",
  messagingSenderId: "244701786274",
  appId: "1:244701786274:web:1bc6504f3d2a581fa267fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize auth

export { db, auth }; // Export auth
