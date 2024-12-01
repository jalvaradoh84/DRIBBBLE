import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useTheme } from "../../context/ThemeContext";

const Layout = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  
  // Don't show footer on project detail pages
  const hideFooter = location.pathname.startsWith('/project/');

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow mt-[72px]">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
