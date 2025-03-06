import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

/**
 * Component that creates a flashlight effect in dark mode
 * The light follows the mouse cursor with smooth animation
 * Gets brighter when moving the mouse
 */
const DarkModeWithLight = ({ baseIntensity = 0.25, size = 300, delay = 0.1 }) => {
    const { isDarkMode } = useTheme();
    const lightRef = useRef(null);
    const active = useRef(false);
    const tween = useRef(null);
    const intensityTween = useRef(null);
    const mouseMoving = useRef(false);
    const mouseTimeout = useRef(null);
    const [currentIntensity, setCurrentIntensity] = useState(baseIntensity);

    // Handle intensity changes when mouse moves/stops
    const handleMouseActivity = (isMoving) => {
        // Clear any existing timeout
        if (mouseTimeout.current) {
            clearTimeout(mouseTimeout.current);
        }

        if (isMoving) {
            // Mouse is moving - increase brightness
            mouseMoving.current = true;

            // Kill any existing animation
            if (intensityTween.current) {
                intensityTween.current.kill();
            }

            // Animate to higher intensity (up to 0.7)
            const targetIntensity = Math.min(0.7, baseIntensity * 2.5);
            intensityTween.current = gsap.to({ intensity: currentIntensity }, {
                intensity: targetIntensity,
                duration: 0.3,
                onUpdate: function () {
                    setCurrentIntensity(this.targets()[0].intensity);
                }
            });
        } else {
            // Mouse stopped - gradually return to normal brightness
            mouseTimeout.current = setTimeout(() => {
                mouseMoving.current = false;

                // Kill any existing animation
                if (intensityTween.current) {
                    intensityTween.current.kill();
                }

                // Animate back to base intensity
                intensityTween.current = gsap.to({ intensity: currentIntensity }, {
                    intensity: baseIntensity,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: function () {
                        setCurrentIntensity(this.targets()[0].intensity);
                    }
                });
            }, 100); // Short delay before dimming
        }
    };

    // Initialize the light effect
    useEffect(() => {
        // Only run effect when component mounts
        if (!lightRef.current) return;

        const initialize = () => {
            // Set initial position off-screen
            gsap.set(lightRef.current, {
                x: -100,
                y: -100,
                opacity: isDarkMode ? 0 : 0
            });

            if (isDarkMode) {
                // Fade in the light when dark mode is active
                gsap.to(lightRef.current, {
                    opacity: 1,
                    duration: 0.5
                });
                active.current = true;
            }
        };

        initialize();

        return () => {
            if (tween.current) {
                tween.current.kill();
            }
            if (intensityTween.current) {
                intensityTween.current.kill();
            }
            if (mouseTimeout.current) {
                clearTimeout(mouseTimeout.current);
            }
            active.current = false;
        };
    }, []);

    // Toggle effect when dark mode changes
    useEffect(() => {
        if (!lightRef.current) return;

        if (isDarkMode && !active.current) {
            // Show the light effect
            gsap.to(lightRef.current, {
                opacity: 1,
                duration: 0.5,
                onComplete: () => {
                    active.current = true;
                }
            });
        } else if (!isDarkMode && active.current) {
            // Hide the light effect
            gsap.to(lightRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    active.current = false;
                }
            });
        }
    }, [isDarkMode]);

    // Add mouse movement tracking
    useEffect(() => {
        if (!isDarkMode) return;

        const handleMouseMove = (e) => {
            if (!lightRef.current || !active.current) return;

            // Indicate mouse is moving
            handleMouseActivity(true);

            // Kill any existing position animation
            if (tween.current) {
                tween.current.kill();
            }

            // Animate to new mouse position
            tween.current = gsap.to(lightRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: delay,
                ease: "power2.out",
                onComplete: () => {
                    // Start dimming process after movement completes
                    handleMouseActivity(false);
                }
            });
        };

        // Add event listener
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (tween.current) {
                tween.current.kill();
            }
            if (intensityTween.current) {
                intensityTween.current.kill();
            }
            if (mouseTimeout.current) {
                clearTimeout(mouseTimeout.current);
            }
        };
    }, [isDarkMode, delay]);

    return (
        <div
            ref={lightRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, ${currentIntensity}) 0%,
                    rgba(255, 255, 255, ${currentIntensity * 0.6}) 35%,
                    rgba(255, 255, 255, 0) 70%
                )`,
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'soft-light',
                willChange: 'transform, background',
                opacity: 0,
                filter: `blur(${currentIntensity > baseIntensity ? 5 : 0}px)` // Add slight blur when brighter
            }}
        />
    );
};

export default DarkModeWithLight;