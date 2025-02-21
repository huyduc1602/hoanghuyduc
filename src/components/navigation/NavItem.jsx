import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const NavItem = ({ to, isHome, isDarkMode }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `cloud-button min-w-[70px] text-center px-4 py-2 transition-all duration-300 ${
          isActive
            ? `active text-white ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`
            : isHome
              ? `!text-blue-600 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-blue-400 hover:bg-gray-700' 
                    : 'bg-white hover:bg-slate-50'
                } hover:shadow-lg`
              : `${isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'}`
        }`
      }
    >
      {to.charAt(1).toUpperCase() + to.slice(2)}
    </NavLink>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  isHome: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export default NavItem;