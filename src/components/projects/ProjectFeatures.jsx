import React from 'react';
import { projectFeatures } from "../../constants";
import { Link } from "react-router-dom";
import { arrow } from "../../assets/icons";

const ProjectFeatures = () => {
    return (
        <div className="project-features">
            <h2 className='text-purple-600 text-2xl font-poppins font-semibold mt-10'>Advantages of Software Projects</h2>
            <div className='flex flex-wrap mt-10 mb-20 gap-16'>
                {projectFeatures.map((feature) => (
                    <div className='lg:w-[400px] w-full' key={feature.title}>
                        <div className='block-container w-12 h-12'>
                            <div className={`btn-back rounded-xl ${feature.theme}`} />
                            <div className='btn-front rounded-xl flex justify-center items-center'>
                                <img
                                    src={feature.iconUrl}
                                    alt='threads'
                                    className='w-1/2 h-1/2 object-contain'
                                />
                            </div>
                        </div>

                        <div className='mt-5 flex flex-col'>
                            <h4 className='text-2xl font-poppins font-semibold'>
                                {feature.title}
                            </h4>
                            <p className='mt-2 text-slate-500'>{feature.description}</p>
                            {(feature.link && (feature.link !== '#' || feature.link != '')) && (
                                <div className='mt-5 flex items-center gap-2 font-poppins'>
                                    <Link
                                        to={feature.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='font-semibold text-blue-600'
                                    >
                                        Live Link
                                    </Link>
                                    <img
                                        src={arrow}
                                        alt='arrow'
                                        className='w-4 h-4 object-contain'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectFeatures;