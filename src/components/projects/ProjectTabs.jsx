import React, { useState, useEffect, useRef } from 'react';
import { getProjectsData } from '@utils/googleSheets';
import GridControls from './GridControls';
import HorizontalTabs from './HorizontalTabs';
import VerticalTabs from './VerticalTabs';
import ProjectGrid from './ProjectGrid';
import LoadingState from './LoadingState';
import useGridAnimation from '@animations/useGridAnimation';
import useTabAnimation from '@animations/useTabAnimation';
import useStickyScroll from '@animations/useStickyScroll';

const ProjectTabs = () => {
    // State management
    const [key, setKey] = useState('web');
    const [tabs, setTabs] = useState([]);
    const [projectsData, setProjectsData] = useState({ web: [], mobile: [] });
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState(2);

    // Refs
    const tabsRef = useRef(null);
    const gridRef = useRef(null);

    // Animation hooks
    const gridAnimation = useGridAnimation();
    const tabAnimation = useTabAnimation();
    const isSticky = useStickyScroll({
        elementRef: tabsRef,
        contentSelector: '#projects-content',
        headerOffset: 96
    });

    // Grid column utility
    const getGridColumns = (cols) => {
        const gridMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 sm:grid-cols-2',
            3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
            4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        };
        return gridMap[cols] || gridMap[2];
    };

    // Column change handler (using the animation hook)
    const handleColumnChange = (col) => {
        gridAnimation.animateGridChange(setColumns, col, columns, '.project-card');
    };

    // Tab click handler (using the animation hook)
    const handleTabClick = (tabKey) => {
        tabAnimation.animateTabSwitch(setKey, tabKey, key, gridRef, { scrollToTop: true });
    };

    // Fetch projects data
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

    // Loading state
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

            <div id="projects-content" className="flex-1" ref={gridRef}>
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