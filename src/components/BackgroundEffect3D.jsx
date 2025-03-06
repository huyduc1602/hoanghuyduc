import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundEffect3D = ({ isDarkMode, numElements = 20 }) => {
    const backgroundRef = useRef(null);

    useEffect(() => {
        const container = backgroundRef.current;
        if (!container) return;

        // Clear any existing elements
        container.innerHTML = '';

        // Programming symbols and elements
        const codeSymbols = [
            '{', '}', '(', ')', '[', ']', '<', '>', ';', '/',
            '0', '1', '+', '-', '*', '=', '&', '|', '!', '$'
        ];

        // Binary fragments
        const binaryFragments = [
            '01', '10', '001', '110', '101', '0101', '1010',
            '00110011', '10101010', '11001100'
        ];

        // Create elements
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');

            // Set base styles
            Object.assign(element.style, {
                position: 'absolute',
                fontFamily: 'monospace, Consolas, "Courier New"',
                fontSize: `${gsap.utils.random(16, 40)}px`,
                fontWeight: 'bold',
                color: isDarkMode
                    ? i % 4 === 0 ? 'rgba(76, 165, 255, 0.6)' // blue
                        : i % 4 === 1 ? 'rgba(182, 115, 248, 0.6)' // purple
                            : i % 4 === 2 ? 'rgba(255, 204, 0, 0.6)'   // gold
                                : 'rgba(92, 255, 138, 0.6)'                // green
                    : i % 4 === 0 ? 'rgba(21, 101, 192, 0.5)'  // darker blue
                        : i % 4 === 1 ? 'rgba(123, 31, 162, 0.5)'  // darker purple
                            : i % 4 === 2 ? 'rgba(255, 145, 0, 0.5)'   // orange
                                : 'rgba(29, 131, 72, 0.5)',                // darker green
                willChange: 'transform, opacity',
                pointerEvents: 'none',
                opacity: gsap.utils.random(0.3, 0.8),
                textShadow: isDarkMode
                    ? '0 0 8px rgba(255, 255, 255, 0.5)'
                    : '0 0 5px rgba(0, 0, 0, 0.3)',
                whiteSpace: 'nowrap'
            });

            // Determine the element type
            if (i % 3 === 0) {
                // Code symbol
                element.textContent = codeSymbols[i % codeSymbols.length];
            } else if (i % 3 === 1) {
                // Binary fragments
                element.textContent = binaryFragments[i % binaryFragments.length];
            } else {
                // Code function-like text
                const functions = ['function()', 'const', 'let', 'var', 'if()', 'while()', 'return',
                    'import', 'export', 'class', 'async', 'await', 'try{}', 'for()'];
                element.textContent = functions[i % functions.length];
            }

            container.appendChild(element);
        }

        // Position elements
        const elements = container.querySelectorAll('div');

        gsap.set(elements, {
            x: () => gsap.utils.random(0, window.innerWidth),
            y: () => gsap.utils.random(0, window.innerHeight),
            z: () => gsap.utils.random(-400, 200),
            rotation: () => gsap.utils.random(-20, 20),
            scale: () => gsap.utils.random(0.8, 1.5)
        });

        // Create a "Matrix"-like animation
        const animations = [];
        elements.forEach((element, index) => {
            // Fall-down animation like Matrix code
            animations.push(
                gsap.to(element, {
                    y: `+=${window.innerHeight + 100}`,
                    rotation: gsap.utils.random(-10, 10),
                    repeat: -1,
                    duration: gsap.utils.random(10, 25),
                    delay: gsap.utils.random(0, 10),
                    ease: 'none',
                    onRepeat: () => {
                        // Reset position when reaching bottom
                        gsap.set(element, {
                            y: -50,
                            x: gsap.utils.random(0, window.innerWidth)
                        });
                    }
                })
            );

            // Occasional "typing" effect
            if (index % 4 === 0) {
                animations.push(
                    gsap.to(element, {
                        opacity: 0.2,
                        repeat: -1,
                        yoyo: true,
                        duration: gsap.utils.random(0.5, 1.5),
                        delay: gsap.utils.random(0, 5)
                    })
                );
            }
        });

        // Mouse parallax effect
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth) - 0.5;
            const yPos = (clientY / window.innerHeight) - 0.5;

            gsap.to(elements, {
                x: (i, el) => {
                    const depth = parseFloat(gsap.getProperty(el, 'z'));
                    const currentX = parseFloat(gsap.getProperty(el, 'x'));
                    return currentX + (xPos * Math.abs(depth) * 0.05);
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