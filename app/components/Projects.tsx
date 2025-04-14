'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectsProps {
  onClose: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  date: string;
  stars?: number;
  forks?: number;
}

const Projects: React.FC<ProjectsProps> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<'recent' | 'name'>('recent');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/github-projects');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const normalizedProjects = Array.isArray(data)
          ? data.map(project => ({
            id: project.id || Math.random().toString(36).substring(2, 9),
            title: project.title || 'Untitled Project',
            description: project.description || 'No description available',
            technologies: Array.isArray(project.technologies) ? project.technologies : [],
            githubUrl: project.githubUrl || '#',
            demoUrl: project.demoUrl,
            date: project.date || new Date().toISOString(),
            stars: project.stars,
            forks: project.forks
          }))
          : [];

        setProjects(normalizedProjects);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (project.title || '').toLowerCase().includes(searchLower) ||
      (project.description || '').toLowerCase().includes(searchLower) ||
      (project.technologies || []).some(tech =>
        tech.toLowerCase().includes(searchLower)
      )
    );
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === 'name') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-start sm:items-center justify-center z-50 p-2 sm:p-4 bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#1a1b26] rounded-lg shadow-xl w-full max-w-5xl my-2 sm:my-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1b26] px-3 py-2 flex items-center justify-between border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-4 mx-4">
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-[#2a2e3f] text-gray-300 px-3 py-1 rounded-md text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search projects"
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as 'recent' | 'name')}
                className="bg-[#2a2e3f] text-gray-300 px-2 py-1 rounded-md text-sm"
                aria-label="Sort projects"
              >
                <option value="recent">Sort by Recent</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 px-4"
            aria-label="Close projects modal"
          >
            ✕
          </button>
        </div>

        {/* Project Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono overflow-y-auto flex-1">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
              <span className="sr-only">Loading projects...</span>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-400">
              <p>Error loading projects</p>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : sortedProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              {searchTerm ? 'No projects match your search' : 'No projects available'}
            </div>
          ) : (
            sortedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#1e2030] rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-colors h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-blue-500 text-lg">{project.title}</h3>
                  <span className="text-gray-500 text-sm">{new Date(project.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="bg-[#2a2e3f] text-gray-300 px-3 py-1 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400 inline-flex items-center gap-1"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      GitHub
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-400 inline-flex items-center gap-1"
                        aria-label={`View ${project.title} live demo`}
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-3 text-gray-400 text-sm">
                    {project.stars !== undefined && <span>⭐ {project.stars}</span>}
                    {project.forks !== undefined && <span>⑂ {project.forks}</span>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
