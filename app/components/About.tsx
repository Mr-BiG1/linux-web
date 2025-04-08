'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1b26] rounded-lg shadow-xl w-[90%] max-w-4xl mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1b26] px-3 py-2 flex items-center justify-between border-b border-gray-800 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="text-gray-400 text-sm font-mono">About Me</div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 px-4"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-6 font-mono">
            <div className="flex items-start gap-8 mb-12">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full border border-blue-500 flex items-center justify-center">
                  <span className="text-blue-500">Profile</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-300 text-xl mb-4">Cybersecurity Specialist & Developer</h3>
                <p className="text-gray-400 mb-6">
                  Greetings, stranger 👋 I&apos;m Darsan — a builder, breaker, and defender of tech systems.


                  With a dual passion for cybersecurity and software development, I thrive at the intersection of breaking boundaries and building resilient, innovative solutions. From hardening network defenses to developing AI-powered trading bots, I engineer systems that are secure, scalable, and smart.
                </p>
                <div className="flex gap-6">
                  <a href="https://github.com/Mr-BiG1" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub" className="text-blue-500 hover:text-blue-400">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/darsan-sabu-george" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile" className="text-blue-500 hover:text-blue-400">
                    LinkedIn
                  </a>

                  <a href="mailto:darsansabu09@gmail.com" className="text-blue-500 hover:text-blue-400">
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h4 className="text-blue-500 text-lg mb-6">Skills</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                <div className="bg-[#1e2030] rounded-lg p-6">
                  <h5 className="text-gray-300 mb-4">Cybersecurity</h5>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Penetration Testing</li>
                    <li>• Network Security</li>
                    <li>• Incident Response</li>
                    <li>• Security Operations</li>
                    <li>•  Security Tools Dev</li>
                  </ul>
                </div>
                <div className="bg-[#1e2030] rounded-lg p-6">
                  <h5 className="text-gray-300 mb-4">Development</h5>
                  <ul className="space-y-2 text-gray-400">
                    <li>• JavaScript</li>
                    <li>• Python</li>
                    <li>• Node.js</li>
                    <li>• React/Next.js</li>
                    <li>• SQL/NoSQL</li>
                    <li>• Git/GitHub</li>
                    <li>• RUST</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-blue-500 text-lg mb-6">Experience</h4>
              <div className="space-y-4">
                <div className="bg-[#1e2030] rounded-lg p-6">
                  <h5 className="text-gray-300">Senior Security Engineer</h5>
                  <p className="text-gray-400 mb-2">TechCorp Inc. | 2020 - Present</p>
                  <p className="text-gray-400">
                    Leading security initiatives, conducting penetration tests, and implementing security controls.
                  </p>
                </div>
                <div className="bg-[#1e2030] rounded-lg p-6">
                  <h5 className="text-gray-300">Full Stack Developer</h5>
                  <p className="text-gray-400 mb-2">WebSolutions Ltd. | 2018 - 2020</p>
                  <p className="text-gray-400">
                    Developed and maintained web applications with a focus on security best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About; 