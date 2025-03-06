import React, { useState, useEffect, useRef } from 'react';
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { getProjectsData } from '../../utils/googleSheets';
import GridControls from './GridControls';
import HorizontalTabs from './HorizontalTabs';
import VerticalTabs from './VerticalTabs';
import ProjectGrid from './ProjectGrid';
import LoadingState from './LoadingState';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

// Register the Flip plugin
gsap.registerPlugin(Flip);

const ProjectTabs = () => {
    const [key, setKey] = useState('web');
    const [tabs, setTabs] = useState([]);
    const [projectsData, setProjectsData] = useState({ web: [], mobile: [] });
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState(2);
    const [isSticky, setIsSticky] = useState(false);
    const tabsRef = useRef(null);
    const gridRef = useRef(null);
    const isAnimating = useRef(false);

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
        if (isAnimating.current || columns === col) return;
        isAnimating.current = true;

        // Store the current state before changing layout
        const state = Flip.getState('.project-card');

        // Update columns state immediately
        setColumns(col);

        // Wait a tiny bit for React to update the DOM with the new column layout
        setTimeout(() => {
            // Create the animation with Flip
            Flip.from(state, {
                duration: 0.6,
                ease: "power2.inOut",
                stagger: {
                    each: 0.03,
                    from: "start"
                },
                absolutePosition: true, // Ensures accurate positioning
                onEnter: elements => {
                    // Animation for new elements appearing
                    return gsap.fromTo(elements,
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.6 }
                    );
                },
                onLeave: elements => {
                    // Animation for elements being removed
                    return gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.6 });
                },
                onComplete: () => {
                    isAnimating.current = false;
                }
            });
        }, 10);
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
        if (isAnimating.current || key === tabKey) return;
        isAnimating.current = true;

        // Store the current state before changing content
        const contentContainer = gridRef.current;
        const state = Flip.getState(contentContainer.querySelectorAll('.project-card'));

        // First fade out existing content
        gsap.to(contentContainer.querySelectorAll('.project-card'), {
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 0.3,
            onComplete: () => {
                // Update the active tab
                setKey(tabKey);

                // Wait for React to update the DOM with new content
                setTimeout(() => {
                    // Then animate the new content in
                    gsap.fromTo(
                        contentContainer.querySelectorAll('.project-card'),
                        { opacity: 0, y: -20 },
                        {
                            opacity: 1,
                            y: 0,
                            stagger: 0.05,
                            duration: 0.5,
                            ease: "power2.out",
                            onComplete: () => {
                                isAnimating.current = false;
                                // Scroll to top after animation completes
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }
                    );
                }, 50);
            }
        });
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