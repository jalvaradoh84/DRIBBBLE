import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;