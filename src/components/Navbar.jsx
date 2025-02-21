import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../assets/images";

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-18 h-18 object-contain' id='logo' />
      </NavLink>
      <nav className='flex text-lg gap-4 font-medium'>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `min-w-[80px] text-center px-3 py-1.5 rounded-lg transition-all duration-300 ${isActive
              ? "text-blue-600 bg-white shadow-md"
              : isHome
                ? "text-black bg-white hover:bg-white/70 hover:text-blue-600 hover:shadow-md"
                : "text-black hover:text-blue-600"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) =>
            `min-w-[80px] text-center px-3 py-1.5 rounded-lg transition-all duration-300 ${isActive
              ? "text-blue-600 bg-white shadow-md"
              : isHome
                ? "text-black bg-white hover:bg-white/70 hover:text-blue-600 hover:shadow-md"
                : "text-black hover:text-blue-600"
            }`
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
