import { useEffect, useRef } from "react";
import { CTA, ProjectTabs } from "../components";
import { Meta } from "../components";
import gsap from "gsap";
import { useTheme } from '../context/ThemeContext';
import BackgroundEffect3D from '../components/BackgroundEffect3D';
import TextAnimation from '../components/TextAnimation';

const Projects = () => {
  const { isDarkMode } = useTheme();
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Paragraph animation (simple version, main animation is now in TextAnimation component)
    if (paragraphRef.current) {
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6 }
      );
    }

    return () => {
      gsap.killTweensOf(paragraphRef.current);
    };
  }, []);

  return (
    <section className='max-container relative'>
      {/* The BackgroundEffect3D component */}
      <BackgroundEffect3D isDarkMode={isDarkMode} numElements={25} />

      <div className="relative z-10">
        <Meta
          title="Projects"
          description="Explore my portfolio of web development projects and applications"
          keywords="projects, portfolio, web applications, react projects, full stack projects"
          image="/projects-preview.png"
        />

        {/* Using the new TextAnimation component */}
        <TextAnimation
          text="My Projects"
          className={`head-text ${isDarkMode ? 'text-white' : 'text-black'}`}
          splitBy="words"
          stagger={0.2}
          duration={0.8}
          from={{ opacity: 0, y: 50, rotationX: -90 }}
          highlightedIndices={[1]} // Highlight "Projects"
        />

        <p
          className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-2 leading-relaxed`}
          ref={paragraphRef}
        >
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. You can check out those projects with the links below and let me know if you feel like they need improvement.
        </p>

        <ProjectTabs />

        <hr className={isDarkMode ? 'border-slate-700' : 'border-slate-200'} />

        <CTA />
      </div>
    </section>
  );
};

export default Projects;
