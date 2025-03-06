import React, { useRef, useEffect } from 'react';
import SliderWrapper from '../SliderWrapper';
import ImageGoogleDrive from '../ImageGoogleDrive';
import gsap from 'gsap';

const ProjectImage = ({ 
  images, 
  title, 
  columns, 
  onImageClick, 
  onUpdateImages,
  containerRef 
}) => {
  const dotsRef = useRef(null);
  
  // Enhanced slider settings with more controlled animations
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'ease-in-out', // More natural easing
    lazyLoad: 'ondemand', // Ensure images load properly
    swipeToSlide: true,
    adaptiveHeight: false, // Prevent height jumps
    appendDots: dots => <div ref={dotsRef}>{dots}</div>,
    customPaging: (i) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors duration-300" />
    ),
  };
  
  // Add animation for when slides first appear
  useEffect(() => {
    gsap.from('.slick-active img', {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      delay: 0.2
    });
  }, []);
  
  const getImageContainerClass = (columns) => {
    if (columns === 1) {
      return "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]";
    }
    return "h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]";
  };
  
  return (
    <div ref={containerRef} className="relative bg-gray-100 overflow-hidden">
      <SliderWrapper settings={settings}>
        {/* Make sure we only render if there are images */}
        {images && images.length > 0 && images.map((image, index) => (
          <div
            key={index}
            className={`relative ${getImageContainerClass(columns)}`}
          >
            <div
              onClick={() => onImageClick(image, index)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ImageGoogleDrive
                imageUrl={image}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300"
                onImageSelect={(newUrl) => {
                  const newImages = [...images];
                  newImages[index] = newUrl;
                  onUpdateImages?.(newImages);
                }}
              />
            </div>
          </div>
        ))}
      </SliderWrapper>
      
      {/* Progress bar indicator */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-10">
        <div className="progress-bar h-full bg-blue-500"></div>
      </div>
    </div>
  );
};

export default ProjectImage;