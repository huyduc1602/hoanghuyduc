import React, { useState, useEffect } from 'react';
import SliderWrapper from './SliderWrapper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getProjectsData } from '../utils/googleSheets';
import ImageGoogleDrive from './ImageGoogleDrive';
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const ProjectCard = ({ project, onUpdateImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        lazyLoad: true, // Add lazy loading
        swipeToSlide: true, // Better mobile experience
        customPaging: (i) => (
            <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors duration-300" />
        ),
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg my-4 group">
            <div className="relative h-48"> {/* Set fixed height */}
                <SliderWrapper settings={settings}>
                    {project.images.map((image, index) => (
                        <div key={index} className="relative h-48"> {/* Match parent height */}
                            <ImageGoogleDrive
                                imageUrl={image}
                                alt={`${project.title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                                onImageSelect={(newUrl) => {
                                    const newImages = [...project.images];
                                    newImages[index] = newUrl;
                                    onUpdateImages?.(project.id, newImages);
                                }}
                            />
                        </div>
                    ))}
                </SliderWrapper>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{project.title}</div>
                <p className="text-gray-700 text-base">{project.description}</p>
                <div className="flex items-center space-x-2 mt-2"><Link
                    to={project.link}
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
                    /></div>
            </div>
        </div>
    );
};

const ProjectTabs = () => {
    const [key, setKey] = useState('web');
    const [tabs, setTabs] = useState([]);
    const [projectsData, setProjectsData] = useState({ web: [], mobile: [] });
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState(2);

    const getGridColumns = (cols) => {
        const gridMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 sm:grid-cols-2',
            3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
            4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        };
        return gridMap[cols] || gridMap[2];
    };

    const handleColumnChange = (e) => {
        setColumns(Number(e.target.value));
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getProjectsData();
                if (data && typeof data === 'object') {
                    const tabsData = Object.keys(data).map((key) => ({
                        id: key,
                        label: key.charAt(0).toUpperCase() + key.slice(1),
                        key
                    }));
                    setTabs(tabsData);
                    setProjectsData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center my-4">
                <div className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`py-2 px-4 rounded ${key === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setKey(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {/* Hide on mobile, show on medium screens and up */}
                <select
                    className="hidden md:block py-2 px-4 rounded border border-gray-300"
                    onChange={handleColumnChange}
                    value={columns}
                >
                    <option value={1}>1 Column</option>
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                </select>
            </div>
            <div className={`grid ${getGridColumns(columns)} gap-4`}>
                {projectsData[key]?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectTabs;