import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

/**
 * Component that creates a flashlight effect in dark mode
 * The light follows the mouse cursor with smooth animation
 */
const DarkModeWithLight = ({ intensity = 0.25, size = 300, delay = 0.1 }) => {
    const { isDarkMode } = useTheme();
    const lightRef = useRef(null);
    const active = useRef(false);
    const tween = useRef(null);

    // Initialize the light effect
    useEffect(() => {
        // Only run effect when component mounts and dark mode is active
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
            
            // Kill any existing animation
            if (tween.current) {
                tween.current.kill();
            }
            
            // Animate to new mouse position
            tween.current = gsap.to(lightRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: delay,
                ease: "power2.out"
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
                    rgba(255, 255, 255, ${intensity}) 0%,
                    rgba(255, 255, 255, ${intensity / 2}) 35%,
                    rgba(255, 255, 255, 0) 70%
                )`,
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'soft-light',
                willChange: 'transform',
                opacity: 0
            }}
        />
    );
};

export default DarkModeWithLight;