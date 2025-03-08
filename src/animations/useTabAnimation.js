import { useRef } from 'react';
import gsap from 'gsap';

/**
 * Hook for handling tab switching animations
 * @returns {Object} Animation utilities
 */
const useTabAnimation = () => {
  const isAnimating = useRef(false);

  /**
   * Animate tab content switching
   * @param {Function} setKey - State setter for active tab key
   * @param {String} newKey - New tab key
   * @param {String} currentKey - Current tab key
   * @param {React.RefObject} contentRef - Reference to content container
   * @param {Object} options - Animation options
   */
  const animateTabSwitch = (setKey, newKey, currentKey, contentRef, options = {}) => {
    if (isAnimating.current || newKey === currentKey) return;
    isAnimating.current = true;

    const contentContainer = contentRef.current;
    if (!contentContainer) {
      setKey(newKey);
      isAnimating.current = false;
      return;
    }

    // First fade out existing content
    gsap.to(contentContainer.querySelectorAll('.project-card'), {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.3,
      onComplete: () => {
        // Update the active tab
        setKey(newKey);

        // Wait for React to update the DOM with new content
        setTimeout(() => {
          // Then animate the new content in
          gsap.fromTo(
            contentContainer.querySelectorAll('.project-card'),
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                isAnimating.current = false;
                // Scroll behavior can be customized via options
                if (options.scrollToTop) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }
          );
        }, 50);
      }
    });
  };

  return {
    isAnimating,
    animateTabSwitch
  };
};

export default useTabAnimation;