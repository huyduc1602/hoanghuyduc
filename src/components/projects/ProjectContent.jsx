import React from 'react';
import { Link } from "react-router-dom";
import { arrow } from "../../assets/icons";

const ProjectContent = ({ 
  title, 
  description, 
  link, 
  isDarkMode,
  contentRef,
  titleRef,
  descRef,
  linkRef
}) => {
  return (
    <div ref={contentRef} className="px-6 py-4">
      <div
        ref={titleRef}
        className={`font-bold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
      >
        {title}
      </div>
      <p
        ref={descRef}
        className={`${isDarkMode ? 'text-gray-300' : 'text-black'} text-base`}
      >
        {description}
      </p>
      <div
        ref={linkRef}
        className="flex items-center space-x-2 mt-4"
      >
        <Link
          to={link}
          target='_blank'
          rel='noopener noreferrer'
          className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
        >
          Live Link
        </Link>
        <img
          src={arrow}
          alt='arrow'
          className='w-4 h-4 object-contain'
        />
      </div>
    </div>
  );
};

export default ProjectContent;