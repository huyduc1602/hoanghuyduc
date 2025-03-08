import { useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Hook for handling smooth tab switching animations
 * @returns {Object} Animation utilities
 */
const useTabAnimation = () => {
  const isAnimating = useRef(false);
  const timeline = useRef(null);

  /**
   * Animate tab content switching with advanced techniques
   * @param {Function} setKey - State setter for active tab key
   * @param {String} newKey - New tab key
   * @param {String} currentKey - Current tab key
   * @param {React.RefObject} contentRef - Reference to content container
   * @param {Object} options - Animation options
   */
  const animateTabSwitch = useCallback((setKey, newKey, currentKey, contentRef, options = {}) => {
    // Default options
    const config = {
      duration: options.duration || 0.5,
      stagger: options.stagger || 0.03,
      ease: options.ease || "power2.inOut",
      scrollToTop: options.scrollToTop || false,
      crossfade: options.crossfade !== false,
      ...options
    };

    // Prevent animation overlap and unnecessary animations
    if (isAnimating.current || newKey === currentKey) return;
    isAnimating.current = true;

    // Kill any running animations
    if (timeline.current) {
      timeline.current.kill();
    }

    const contentContainer = contentRef.current;
    if (!contentContainer) {
      setKey(newKey);
      isAnimating.current = false;
      return;
    }

    // Store references to current items for smoother transitions
    const currentItems = Array.from(contentContainer.querySelectorAll('.project-card'));

    // Take snapshot of current layout
    const snapshots = currentItems.map(card => {
      const rect = card.getBoundingClientRect();
      return {
        element: card,
        opacity: gsap.getProperty(card, "opacity"),
        rect
      };
    });

    // Create new timeline
    timeline.current = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        timeline.current = null;
      }
    });

    // Phase 1: Fade out current content with overlap
    timeline.current.to(currentItems, {
      opacity: 0,
      scale: config.crossfade ? 0.98 : 1,
      y: config.crossfade ? 10 : 0,
      stagger: config.stagger,
      duration: config.duration * 0.6,
      ease: config.ease,
      onComplete: () => {
        // Update the active tab at the right moment
        setKey(newKey);

        // MutationObserver to detect when React updates the DOM
        const observer = new MutationObserver((mutations) => {
          // Once we detect new content, animate it in
          const newItems = contentContainer.querySelectorAll('.project-card');
          if (newItems.length > 0) {
            observer.disconnect();

            // Prepare new content
            gsap.set(newItems, {
              opacity: 0,
              y: config.crossfade ? -10 : 0,
              scale: config.crossfade ? 0.98 : 1
            });

            // Phase 2: Animate in new content with slight delay
            timeline.current.to(newItems, {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: config.stagger,
              duration: config.duration * 0.7,
              ease: "power2.out",
              onComplete: () => {
                if (config.scrollToTop) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }, config.crossfade ? "-=0.2" : "+=0.05");
          }
        });

        // Start observing for DOM changes
        observer.observe(contentContainer, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        });

        // Safety timeout in case observer doesn't trigger
        setTimeout(() => observer.disconnect(), 1000);
      }
    });

  }, []);

  return {
    isAnimating,
    animateTabSwitch
  };
};

export default useTabAnimation;