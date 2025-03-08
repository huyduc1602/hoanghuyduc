import { useRef } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

/**
 * Hook for handling grid layout animations with GSAP Flip
 * @returns {Object} Animation utilities and state
 */
const useGridAnimation = () => {
  const isAnimating = useRef(false);
  
  /**
   * Animate grid layout changes 
   * @param {Function} setColumns - State setter for columns
   * @param {Number} newColumns - New number of columns
   * @param {Number} currentColumns - Current number of columns
   * @param {String} selector - CSS selector for items to animate
   * @param {Object} options - Animation options
   */
  const animateGridChange = (setColumns, newColumns, currentColumns, selector = '.project-card', options = {}) => {
    if (isAnimating.current || newColumns === currentColumns) return;
    isAnimating.current = true;

    // Store the current state before changing layout
    const state = Flip.getState(selector);

    // Update columns state immediately
    setColumns(newColumns);

    // Wait for React to update the DOM
    setTimeout(() => {
      // Create the animation with Flip
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        stagger: {
          each: 0.03,
          from: "start"
        },
        absolutePosition: true,
        onEnter: elements => {
          return gsap.fromTo(elements,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6 }
          );
        },
        onLeave: elements => {
          return gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.6 });
        },
        onComplete: () => {
          isAnimating.current = false;
        },
        ...options
      });
    }, 10);
  };

  return {
    isAnimating,
    animateGridChange
  };
};

export default useGridAnimation;