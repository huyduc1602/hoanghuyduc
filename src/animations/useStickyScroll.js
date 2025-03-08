import { useState, useEffect } from 'react';

/**
 * Hook to handle sticky element behavior on scroll
 * @param {Object} options Configuration options
 * @param {React.RefObject} options.elementRef Reference to the element to check
 * @param {string} options.contentSelector Selector for the content element
 * @param {number} options.headerOffset Offset for the header height
 * @returns {boolean} Whether the element should be sticky
 */
const useStickyScroll = ({ 
  elementRef, 
  contentSelector = '#projects-content', 
  headerOffset = 96 
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        const contentEl = document.querySelector(contentSelector);
        
        if (!contentEl) return;
        
        const contentBottom = contentEl.getBoundingClientRect().bottom;

        // Show tabs when scrolled past element AND not at bottom
        const shouldBeSticky = top < headerOffset && contentBottom > window.innerHeight;

        if (shouldBeSticky !== isSticky) {
          setIsSticky(shouldBeSticky);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, isSticky, contentSelector, headerOffset]);

  return isSticky;
};

export default useStickyScroll;