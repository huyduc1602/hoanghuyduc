import React, { useState, useEffect, useRef } from 'react';
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { getProjectsData } from '../../utils/googleSheets';
import GridControls from './GridControls';
import HorizontalTabs from './HorizontalTabs';
import VerticalTabs from './VerticalTabs';
import ProjectGrid from './ProjectGrid';
import LoadingState from './LoadingState';

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
        return <LoadingState />;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mt-8">
                <HorizontalTabs
                    tabs={tabs}
                    activeKey={key}
                    onTabClick={handleTabClick}
                    tabsRef={tabsRef}
                />
                <GridControls
                    columns={columns}
                    onColumnChange={handleColumnChange}
                />
            </div>

            <VerticalTabs
                tabs={tabs}
                activeKey={key}
                isSticky={isSticky}
                onTabClick={handleTabClick}
            />

            <div id="projects-content" className="flex-1">
                <ProjectGrid
                    projects={projectsData[key]}
                    columns={columns}
                    getGridColumns={getGridColumns}
                />
            </div>
        </div>
    );
};

export default ProjectTabs;