import React, { useState, useEffect } from 'react';
import { getProjectsData } from '../utils/googleSheets';
import ProjectCard from './ProjectCard';


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
                            className={`${key === tab.key ? ' text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' : 'bg-gray-200'} hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
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