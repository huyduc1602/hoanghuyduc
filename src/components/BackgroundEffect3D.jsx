import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundEffect3D = ({ isDarkMode, numElements = 20 }) => {
    const backgroundRef = useRef(null);

    useEffect(() => {
        // Create and append 3D elements
        const container = backgroundRef.current;
        if (!container) return;

        // Clear any existing elements
        container.innerHTML = '';

        // Create elements with direct styling to ensure visibility
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');

            // Set base styles directly
            Object.assign(element.style, {
                position: 'absolute',
                width: '50px',
                height: '50px',
                willChange: 'transform, opacity',
                pointerEvents: 'none',
                opacity: isDarkMode ? '0.15' : '0.25',
                top: '0',
                left: '0'
            });

            if (i % 3 === 0) {
                // Cube
                Object.assign(element.style, {
                    backgroundColor: isDarkMode ? 'rgba(76, 165, 255, 0.2)' : 'rgba(76, 165, 255, 0.3)',
                    border: isDarkMode ? '1px solid rgba(76, 165, 255, 0.4)' : '1px solid rgba(76, 165, 255, 0.5)'
                });
            } else if (i % 3 === 1) {
                // Pyramid
                Object.assign(element.style, {
                    backgroundColor: isDarkMode ? 'rgba(182, 115, 248, 0.2)' : 'rgba(182, 115, 248, 0.3)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                });
            } else {
                // Sphere
                Object.assign(element.style, {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    boxShadow: isDarkMode ? '0 0 20px rgba(255, 255, 255, 0.2)' : '0 0 25px rgba(255, 255, 255, 0.3)'
                });
            }

            container.appendChild(element);
        }

        // Position elements more visibly in the viewport
        const elements = container.querySelectorAll('div');

        gsap.set(elements, {
            x: () => gsap.utils.random(0, window.innerWidth), // Cover entire width
            y: () => gsap.utils.random(0, window.innerHeight), // Cover entire height
            z: () => gsap.utils.random(-300, 100), // Bring some elements closer
            opacity: () => gsap.utils.random(0.3, 0.7), // Increase opacity
            scale: () => gsap.utils.random(0.7, 1.5),
            rotationX: () => gsap.utils.random(0, 360),
            rotationY: () => gsap.utils.random(0, 360),
            rotationZ: () => gsap.utils.random(0, 360),
        });

        // More noticeable animations
        const animations = [];
        elements.forEach(element => {
            // Rotation animation
            animations.push(
                gsap.to(element, {
                    rotationX: '+=360',
                    rotationY: '+=360',
                    repeat: -1,
                    duration: gsap.utils.random(15, 30), // Faster rotation
                    ease: 'none'
                })
            );

            // Up/down animation
            animations.push(
                gsap.to(element, {
                    y: '+=70', // More movement
                    yoyo: true,
                    repeat: -1,
                    duration: gsap.utils.random(2, 5), // Faster movement
                    ease: 'sine.inOut'
                })
            );
        });

        // Enhanced mouse parallax effect
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth) - 0.5;
            const yPos = (clientY / window.innerHeight) - 0.5;

            gsap.to(elements, {
                x: (i, el) => {
                    const depth = parseFloat(gsap.getProperty(el, 'z'));
                    const currentX = parseFloat(gsap.getProperty(el, 'x'));
                    return currentX + (xPos * Math.abs(depth) * 0.5); // Stronger effect
                },
                y: (i, el) => {
                    const depth = parseFloat(gsap.getProperty(el, 'z'));
                    const currentY = parseFloat(gsap.getProperty(el, 'y'));
                    return currentY + (yPos * Math.abs(depth) * 0.5); // Stronger effect
                },
                duration: 1,
                ease: 'power1.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            animations.forEach(animation => animation.kill());
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDarkMode, numElements]);

    return (
        <div
            className="background-3d-container"
            ref={backgroundRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                perspective: '1200px',
                zIndex: 0,
                pointerEvents: 'none',
                transformStyle: 'preserve-3d'
            }}
        />
    );
};

export default BackgroundEffect3D;