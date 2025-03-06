import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, columns, getGridColumns }) => (
    <div className={`grid gap-8 ${getGridColumns(columns)} transition-all duration-500`}>
        {projects.map((project, index) => (
            <ProjectCard
                key={`${project.id || index}`}
                project={project}
                columns={columns}
                className="project-card"
            />
        ))}
    </div>
);

export default ProjectGrid;