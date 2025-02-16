import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderWrapper = ({ children, settings }) => {
    const [initialized, setInitialized] = useState(false);
    const [slidesToShow, setSlidesToShow] = useState(1);

    useEffect(() => {
        // Calculate slidesToShow based on number of children
        const childCount = React.Children.count(children);
        setSlidesToShow(Math.min(childCount, 1)); // Always show 1 slide at a time
        setInitialized(true);
    }, [children]);

    const defaultSettings = {
        ...settings,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShow,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="slider-wrapper relative">
            {initialized && children && React.Children.count(children) > 0 ? (
                <Slider {...defaultSettings}>
                    {children}
                </Slider>
            ) : (
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
            )}
        </div>
    );
};

export default SliderWrapper;