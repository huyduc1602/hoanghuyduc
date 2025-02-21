import React, { useState, useEffect, useRef } from 'react';
import { getProjectsData } from '../utils/googleSheets';
import ProjectCard from './ProjectCard';
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const ProjectTabs = () => {
    const [key, setKey] = useState('web');
    const [tabs, setTabs] = useState([]);
    const [projectsData, setProjectsData] = useState({ web: [], mobile: [] });
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState(2);
    const [isSticky, setIsSticky] = useState(false);
    const tabsRef = useRef(null);

    const getGridColumns = (cols) => {
        const gridMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 sm:grid-cols-2',
            3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
            4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        };
        return gridMap[cols] || gridMap[2];
    };

    const handleColumnChange = (col) => {
        setColumns(col);
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

    useEffect(() => {
        const handleScroll = () => {
            if (tabsRef.current) {
                const { top } = tabsRef.current.getBoundingClientRect();
                const contentEl = document.getElementById('projects-content');
                const contentBottom = contentEl.getBoundingClientRect().bottom;
                const headerHeight = 96; // Adjust this value based on your header height

                // Show tabs when scrolled past horizontal tabs AND not at bottom
                const shouldBeSticky = top < headerHeight && contentBottom > window.innerHeight;

                if (shouldBeSticky !== isSticky) {
                    setIsSticky(shouldBeSticky);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSticky]);

    const handleTabClick = (tabKey) => {
        setKey(tabKey);
        // Scroll to top when tab changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center my-4">
                    <div className="flex space-x-4">
                        {[1, 2].map((index) => (
                            <div
                                key={index}
                                className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                    <div className="hidden md:block h-10 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <ShimmerSimpleGallery card imageHeight={200} caption row={2} col={2} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Header with tabs and filters */}
            <div className="flex justify-between items-center mt-8"> {/* Added mt-8 for top margin */}
                {/* Horizontal tabs */}
                <div ref={tabsRef} className="flex flex-1 space-x-4 max-w-[70%]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.key)}
                            className={`flex-1 ${key === tab.key
                                ? 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
                                : 'bg-gray-200'
                                } hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                            dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg 
                            dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
                            text-center whitespace-nowrap`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid layout controls */}
                <div className="hidden md:flex items-center space-x-4"> {/* Added items-center and increased space-x-4 */}
                    <div className="h-8 w-[1px] bg-gray-200"></div> {/* Added separator */}
                    <div className="flex space-x-2">
                        <button
                            className="hover:scale-110 transition-transform"
                            onClick={() => handleColumnChange(1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                style={{ color: columns === 1 ? 'blue' : '' }}
                                width="24" height="24" viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M4 4h16v16H4V4m2 2v12h12V6H6z" />
                            </svg>
                        </button>
                        <button className="hover:scale-110 transition-transform" onClick={() => handleColumnChange(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: columns === 2 ? 'blue' : '' }} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 3h8v8H3V3m2 2v4h4V5H5m8-2h8v8h-8V3m2 2v4h4V5h-4M3 13h8v8H3v-8m2 2v4h4v-4H5m8-2h8v8h-8v-8m2 2v4h4v-4h-4" />
                            </svg>
                        </button>
                        <button className="hover:scale-110 transition-transform" onClick={() => handleColumnChange(3)}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: columns === 3 ? 'blue' : '' }} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 2h6v6H2V2m7 0h6v6H9V2m7 0h6v6h-6V2M2 9h6v6H2V9m7 0h6v6H9V9m7 0h6v6h-6V9M2 16h6v6H2v-6m7 0h6v6H9v-6m7 0h6v6h-6v-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Compact vertical tabs with hover expand */}
            <div
                className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-2 
                transition-all duration-300 ease-in-out transform
                ${isSticky ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-r-lg p-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`w-10 h-10 mb-2 last:mb-0 rounded-lg flex items-center justify-center 
                                relative group
                                ${key === tab.key
                                    ? 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            onClick={() => handleTabClick(tab.key)}
                        >
                            {/* Only show first letter */}
                            <span className="text-base font-medium uppercase">
                                {tab.label.charAt(0)}
                            </span>

                            {/* Tooltip on hover */}
                            <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm 
                                rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-200 whitespace-nowrap min-w-[100px] shadow-lg"
                            >
                                {tab.label}
                                {/* Arrow */}
                                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
                                    border-8 border-transparent border-r-gray-800"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div id="projects-content" className="flex-1">
                {/* Projects grid */}
                <div className={`grid ${getGridColumns(columns)} gap-4`}>
                    {projectsData[key]?.map((project) => (
                        <ProjectCard key={project.id} project={project} columns={columns} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectTabs;