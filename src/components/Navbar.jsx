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
      <nav className='flex text-lg gap-6 font-medium'>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            `cloud-button min-w-[70px] text-center px-4 py-2 transition-all duration-300 ${isActive
              ? "text-blue-600 bg-white shadow-lg"
              : isHome
                ? "text-black bg-white hover:bg-white/90 hover:text-blue-600 hover:shadow-lg"
                : "text-black hover:text-blue-600"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) =>
            `cloud-button min-w-[70px] text-center px-4 py-2 transition-all duration-300 ${isActive
              ? "text-blue-600 bg-white shadow-lg"
              : isHome
                ? "text-black bg-white hover:bg-white/90 hover:text-blue-600 hover:shadow-lg"
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
