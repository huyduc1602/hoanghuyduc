import { useEffect } from 'react';
import gsap from 'gsap';

export const useProjectCardAnimation = ({ 
  cardRef, 
  imageContainerRef, 
  contentRef, 
  titleRef, 
  descRef, 
  linkRef,
  isDarkMode
}) => {
  // Entry animation - gentler and more subtle
  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const link = linkRef.current;
    
    if (!card || !title || !desc || !link) return;
    
    // Initial state
    gsap.set(card, { 
      y: 30, // Less extreme starting position
      opacity: 0,
      scale: 0.98 // Less extreme scale
    });
    
    gsap.set([title, desc, link], { 
      y: 15, // Less extreme
      opacity: 0 
    });
    
    // Entry animation - slower and gentler
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" } // Gentler easing
    });
    
    tl.to(card, { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      duration: 0.8, // Slower duration
      clearProps: "scale"
    });
    
    tl.to([title, desc, link], { 
      y: 0, 
      opacity: 1, 
      stagger: 0.1,
      duration: 0.6 // Slower duration
    }, "-=0.3");
    
    return () => {
      tl.kill();
    };
  }, [cardRef, titleRef, descRef, linkRef]);
  
  // Hover animation - gentler
  useEffect(() => {
    const card = cardRef.current;
    const imageContainer = imageContainerRef.current;
    
    if (!card || !imageContainer) return;
    
    const handleMouseEnter = () => {
      gsap.to(card, { 
        y: -5, // Less extreme movement
        scale: 1.01, // Less extreme scale
        boxShadow: isDarkMode 
          ? "0 15px 20px -5px rgba(0, 0, 0, 0.3), 0 8px 8px -5px rgba(0, 0, 0, 0.1)"
          : "0 15px 20px -5px rgba(0, 0, 0, 0.08), 0 8px 8px -5px rgba(0, 0, 0, 0.03)",
        duration: 0.4, // Slightly slower for smoothness
        ease: "power2.out" // Gentler easing
      });
      
      gsap.to(imageContainer, {
        scale: 1.02, // Less extreme scale
        duration: 0.6,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, { 
        y: 0, 
        scale: 1,
        boxShadow: isDarkMode 
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
          : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(imageContainer, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cardRef, imageContainerRef, isDarkMode]);
};