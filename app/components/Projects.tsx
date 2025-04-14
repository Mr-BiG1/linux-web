'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectsProps {
  onClose: () => void;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
}

const Projects: React.FC<ProjectsProps> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/github-projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-start sm:items-center justify-center z-50 p-2 sm:p-4 bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1b26] rounded-lg shadow-xl w-full max-w-5xl my-2 sm:my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1a1b26] px-3 py-2 flex items-center justify-between border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="text-gray-400 text-sm font-mono">Projects</div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 px-4"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Project Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono max-h-[75vh] overflow-y-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#1e2030] rounded-lg p-6 border border-gray-800"
            >
              <h3 className="text-blue-500 text-lg mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-[#2a2e3f] text-gray-300 px-3 py-1 rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 
                    2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 
                    0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-
                    3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-
                    .62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 
                    1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-
                    1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 
                    0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-
                    2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 
                    0112 6.844c.85.004 1.705.115 2.504.337 
                    1.909-1.294 2.747-1.025 2.747-1.025.546 
                    1.377.203 2.394.1 2.647.64.699 1.028 1.592 
                    1.028 2.683 0 3.842-2.339 4.687-4.566 
                    4.935.359.309.678.919.678 1.852 0 1.336-.012 
                    2.415-.012 2.743 0 .267.18.578.688.48C19.137 
                    20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
