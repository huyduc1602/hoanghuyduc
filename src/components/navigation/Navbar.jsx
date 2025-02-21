import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../../assets/images";
import { useTheme } from '../../context/ThemeContext';
import NavItem from './NavItem';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navItems = ['/about', '/projects'];

  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-18 h-18 object-contain' id='logo' />
      </NavLink>
      <nav className='flex text-lg gap-6 font-medium' data-home={isHome}>
        {navItems.map(path => (
          <NavItem
            key={path}
            to={path}
            isHome={isHome}
            isDarkMode={isDarkMode}
          />
        ))}
      </nav>
      <ThemeToggle
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </header>
  );
};

export default Navbar;