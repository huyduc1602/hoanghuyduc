import { CTA, ProjectTabs, ProjectFeatures } from "../components";
import { projects } from "../constants";
import { Meta } from "../components";

const Projects = () => {
  return (
    <section className='max-container'>
      <Meta
        title="Projects"
        description="Explore my portfolio of web development projects and applications"
        keywords="projects, portfolio, web applications, react projects, full stack projects"
        image="https://hoanghuyduc.com/projects-preview.png"
      />
      <h1 className='head-text'>
        My{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p className='text-slate-500 mt-2 leading-relaxed'>
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. You can check out those projects with the links below and let me know if you feel like they need improvement.
      </p>
      <ProjectTabs />

      <ProjectFeatures />

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default Projects;
