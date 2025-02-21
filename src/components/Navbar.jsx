import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../assets/images";
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-18 h-18 object-contain' id='logo' />
      </NavLink>
      <nav className='flex text-lg gap-6 font-medium' data-home={isHome}>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `cloud-button min-w-[70px] text-center px-4 py-2 transition-all duration-300 ${isActive
              ? "active text-white bg-blue-600 dark:bg-blue-500"
              : isHome
                ? "!text-blue-600 bg-white hover:bg-slate-50 hover:shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                : "text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) =>
            `cloud-button min-w-[70px] text-center px-4 py-2 transition-all duration-300 ${isActive
              ? "active text-white bg-blue-600 dark:bg-blue-500"
              : isHome
                ? "!text-blue-600 bg-white hover:bg-slate-50 hover:shadow-lg dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                : "text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            }`
          }
        >
          Projects
        </NavLink>
      </nav>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Navbar;
