import React, { useState, useRef, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageModal from '../ImageModal';
import { useTheme } from '../../context/ThemeContext';
import ProjectImage from './ProjectImage';
import ProjectContent from './ProjectContent';
import { useProjectCardAnimation } from '../../hooks/useProjectCardAnimation';

const ProjectCard = ({ project, onUpdateImages, columns, className }) => {
    const { isDarkMode } = useTheme();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Refs for GSAP animations
    const cardRef = useRef(null);
    const imageContainerRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const linkRef = useRef(null);

    // Use our custom animation hook
    useProjectCardAnimation({
        cardRef,
        imageContainerRef,
        contentRef,
        titleRef,
        descRef,
        linkRef,
        isDarkMode
    });

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    // Add CSS for slider progress bar animation
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .progress-bar {
          animation: progress 5s linear forwards;
          animation-play-state: running;
        }
        
        .slick-slider:hover .progress-bar {
          animation-play-state: paused;
        }
        
        /* Fix for empty slides */
        .slick-track {
          display: flex !important;
        }
        
        .slick-slide {
          height: inherit !important;
          display: flex !important;
          justify-content: center;
          align-items: center;
        }
        
        .slick-slide > div {
          width: 100%;
          height: 100%;
        }
      `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Ensure project has valid image array
    const safeImages = project && project.images && Array.isArray(project.images) ?
        project.images : [];

    return (
        <>
            <div
                ref={cardRef}
                className={`${className} overflow-hidden rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-full`}
            >
                <ProjectImage
                    images={safeImages}
                    title={project.title || "Project"}
                    columns={columns}
                    onImageClick={handleImageClick}
                    onUpdateImages={(newImages) => onUpdateImages?.(project.id, newImages)}
                    containerRef={imageContainerRef}
                />

                <ProjectContent
                    title={project.title || "Project"}
                    description={project.description || ""}
                    link={project.link || "#"}
                    isDarkMode={isDarkMode}
                    contentRef={contentRef}
                    titleRef={titleRef}
                    descRef={descRef}
                    linkRef={linkRef}
                />
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                images={safeImages}
                initialSlide={selectedIndex}
                title={project.title || "Project"}
            />
        </>
    );
};

export default ProjectCard;