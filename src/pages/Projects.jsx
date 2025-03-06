import { useEffect, useRef } from "react";
import { CTA, ProjectTabs, ProjectFeatures } from "../components";
import { projects } from "../constants";
import { Meta } from "../components";
import gsap from "gsap";
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { isDarkMode } = useTheme();
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Main timeline for animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initially hide both heading and paragraph
    gsap.set([headingRef.current, paragraphRef.current], { opacity: 0 });

    // Handle complex heading with custom text splitting
    if (headingRef.current) {
      // Get original content and structure
      const originalContent = headingRef.current.innerHTML;

      // Extract text parts (assuming "My" and "Projects")
      const textParts = headingRef.current.textContent.trim().split(/\s+/);

      // Create custom HTML structure for animation
      headingRef.current.innerHTML = `
        <span class="word-container">
          <span class="word">${textParts[0]}</span>
        </span>
        <span class="word-container">
          <span class="word blue-gradient_text drop-shadow font-semibold">${textParts[1]}</span>
        </span>
      `;

      // Select elements for animation
      const words = headingRef.current.querySelectorAll('.word');

      // Show the heading
      gsap.set(headingRef.current, { opacity: 1 });

      // Animate each word
      tl.from(words, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.2,
        duration: 0.8,
      });
    }

    // Make paragraph visible and then animate
    gsap.set(paragraphRef.current, { opacity: 1 });

    // Paragraph animation
    tl.from(paragraphRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
    }, "-=0.4");

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className='max-container'>
      <Meta
        title="Projects"
        description="Explore my portfolio of web development projects and applications"
        keywords="projects, portfolio, web applications, react projects, full stack projects"
        image="/projects-preview.png"
      />
      <h1 className={`head-text ${isDarkMode ? 'text-white' : 'text-black'}`} ref={headingRef}>
        My{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p
        className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mb-2 leading-relaxed`}
        ref={paragraphRef}
      >
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. You can check out those projects with the links below and let me know if you feel like they need improvement.
      </p>
      <ProjectTabs />

      <ProjectFeatures />

      <hr className={isDarkMode ? 'border-slate-700' : 'border-slate-200'} />

      <CTA />
    </section>
  );
};

export default Projects;
