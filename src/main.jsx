import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { db } from './utils/firebaseConfig'; // Import Firebase configuration
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

console.log('Firebase Database Initialized:', db); // Log the database instance

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
