import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, columns, getGridColumns }) => (
    <div className={`grid ${getGridColumns(columns)} gap-4`}>
        {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} columns={columns} />
        ))}
    </div>
);

export default ProjectGrid;