import React from 'react';
import SliderWrapper from './SliderWrapper';
import ImageGoogleDrive from './ImageGoogleDrive';

const ImageModal = ({ isOpen, onClose, images, initialSlide, title }) => {
    const modalSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        initialSlide: initialSlide || 0
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                onClick={onClose}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* Modal Content */}
            <div
                className="w-full max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <SliderWrapper settings={modalSettings}>
                    {images.map((image, index) => (
                        <div key={index} className="relative h-[80vh]">
                            <ImageGoogleDrive
                                imageUrl={image}
                                alt={`${title} - ${index + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </SliderWrapper>
            </div>
        </div>
    );
};

export default ImageModal;