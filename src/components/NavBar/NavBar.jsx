import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../utils/supabaseAuth";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import Logo from "../Logo/Logo";
import { useTheme } from "../../context/ThemeContext";

const NavLinks = [
  { href: '/inspiration', text: 'Inspiración', key: 'inspiration' },
  { href: '/find-work', text: 'Encuentra Trabajo', key: 'work' },
  { href: '/learn-design', text: 'Aprende Diseño', key: 'learn' },
  { href: '/hire-designers', text: 'Contrata Diseñadores', key: 'hire' },
];

const NavBar = () => {
  const [session, setSession] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const fetchSession = async () => {
      const user = await getCurrentUser();
      setSession(user);
    };

    fetchSession();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className={`h-[72px] bg-white border-b border-[#e7e7e9] ${isDarkMode ? 'dark:bg-gray-900 dark:border-gray-700' : ''}`}>
      <div className="max-w-[1320px] mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Primary Navigation */}
          <div className="flex items-center gap-8">
            <Logo />

            {/* Primary Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {NavLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-[#6e6d7a] hover:text-[#0d0c22] dark:text-gray-400 dark:hover:text-white text-[14px] font-medium transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Search and Auth Section */}
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-[180px] h-[40px] px-4 py-2 bg-[#f8f7f4] dark:bg-gray-800 rounded-[8px] text-[14px] dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ea4c89] focus:ring-opacity-50"
              />
              <img 
                src="/magnifying-glass.svg"
                alt="Buscar"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              />
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <ProfileMenu session={session} />
                  <Link 
                    to="/create-project" 
                    className="hidden md:flex px-4 py-2 bg-[#ea4c89] hover:bg-[#f082ac] text-white text-[14px] font-medium rounded-[8px] transition-colors"
                  >
                    Compartir Trabajo
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/login" 
                    className="text-[#6e6d7a] hover:text-[#0d0c22] dark:text-gray-400 dark:hover:text-white text-[14px] font-medium transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/signup" 
                    className="hidden md:flex px-4 py-2 bg-[#ea4c89] hover:bg-[#f082ac] text-white text-[14px] font-medium rounded-[8px] transition-colors"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden flex items-center text-2xl"
              aria-label="Toggle menu"
            >
              {showMenu ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="lg:hidden absolute left-0 right-0 top-[72px] bg-white dark:bg-gray-900 border-t border-[#e7e7e9] dark:border-gray-700 py-4">
            <div className="flex flex-col gap-4">
              {NavLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="text-[#6e6d7a] hover:text-[#0d0c22] dark:text-gray-400 dark:hover:text-white text-[14px] font-medium px-4 transition-colors"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
