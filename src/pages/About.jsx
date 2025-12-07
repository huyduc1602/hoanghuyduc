import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA, Meta } from "../components";
import { experiences, skills } from "../constants";
import { useTheme } from '../context/ThemeContext';

import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className='max-container'>
      <Meta
        title="About"
        description="Learn more about Hoang Huy Duc - Experience, skills, and background in web development"
        keywords="about, experience, skills, education, web development"
        image="/about-preview.png"
      />
      <h1 className={`head-text ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Hello, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          {" "}
          Duc
        </span>{" "}
        👋
      </h1>

      <div className={`mt-5 flex flex-col gap-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
        <p>
          Software Engineer based in Vietnam, specializing in website and mobile through hands-on learning and building applications.
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className={`subhead-text ${isDarkMode ? 'text-white' : 'text-black'}`}>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div className={`block-container w-[5rem] h-20 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl`} key={skill.name}>
              <div className={`btn-back rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-white'}`} />
              <div className={`btn-front rounded-xl flex justify-center items-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <div className='py-16'>
        <h3 className={`subhead-text ${isDarkMode ? 'text-white' : 'text-black'}`}>Work Experience.</h3>
        <div className={`mt-5 flex flex-col gap-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <p>
            I've worked with all sorts of companies, leveling up my skills and
            teaming up with smart people. Here's the rundown:
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className='flex justify-center items-center w-full h-full'>
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[60%] h-[60%] object-contain'
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                  background: isDarkMode ? '#1e293b' : '#ffffff',
                  borderRadius: '0.5rem',
                }}
                contentArrowStyle={{
                  borderRight: isDarkMode ? '7px solid #1e293b' : '7px solid #ffffff'
                }}
              >
                <div>
                  <h3 className={`text-xl font-poppins font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {experience.title}
                  </h3>
                  <p
                    className={`font-medium text-base ${isDarkMode ? 'text-slate-300' : 'text-black-500'}`}
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className={`font-normal pl-1 text-sm ${isDarkMode ? 'text-slate-400' : 'text-black-500/50'}`}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div> */}

      <hr className={isDarkMode ? 'border-slate-700' : 'border-slate-200'} />

      <CTA />
    </section>
  );
};

export default About;
