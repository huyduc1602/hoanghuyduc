import React, { useState } from 'react';
import SliderWrapper from './SliderWrapper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageGoogleDrive from './ImageGoogleDrive';
import ImageModal from './ImageModal';
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const ProjectCard = ({ project, onUpdateImages }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        lazyLoad: true, // Add lazy loading
        swipeToSlide: true, // Better mobile experience
        customPaging: (i) => (
            <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors duration-300" />
        ),
    };

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setSelectedIndex(index);
    };

    return (
        <>
            <div className="max-w-sm overflow-hidden shadow-lg hover:shadow-2xl rounded-xl my-4 group">
                <div className="relative h-48">
                    <SliderWrapper settings={settings}>
                        {project.images.map((image, index) => (
                            <div key={index} className="relative h-48">
                                <div onClick={() => handleImageClick(image, index)}>
                                    <ImageGoogleDrive
                                        imageUrl={image}
                                        alt={`${project.title} - ${index + 1}`}
                                        className="w-full h-full object-cover cursor-pointer"
                                        onImageSelect={(newUrl) => {
                                            const newImages = [...project.images];
                                            newImages[index] = newUrl;
                                            onUpdateImages?.(project.id, newImages);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </SliderWrapper>
                </div>
                <div className="px-6 pb-4">
                    <div className="font-bold text-xl mb-2">{project.title}</div>
                    <p className="text-gray-700 text-base">{project.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                        <Link
                            to={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-semibold text-blue-600'
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
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                images={project.images}
                initialSlide={selectedIndex}
                title={project.title}
            />
        </>
    );
};

export default ProjectCard;