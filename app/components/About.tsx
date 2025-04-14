'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personal'; 

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

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-6 font-mono">
            <div className="flex items-start gap-8 mb-12">
              <div className="flex-shrink-0">
                <img
                  src="https://avatars.githubusercontent.com/u/103304514"
                  alt={personalInfo.name}
                  className="rounded-full w-32 h-32 object-cover border border-blue-500"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-300 text-xl mb-4">{personalInfo.title}</h3>
                <p className="text-gray-400 mb-6">{personalInfo.about}</p>
                <div className="flex gap-6 flex-wrap">
                  {personalInfo.contacts.map((contact) => (
                    <a
                      key={contact.platform}
                      href={
                        contact.platform === 'Email'
                          ? `mailto:${contact.url}`
                          : contact.url.startsWith('http')
                          ? contact.url
                          : `https://${contact.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      {contact.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-blue-500 text-lg mb-6">Skills</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                {Object.values(personalInfo.skills).map((skillCategory) => (
                  <div key={skillCategory.name} className="bg-[#1e2030] rounded-lg p-6">
                    <h5 className="text-gray-300 mb-4">{skillCategory.name}</h5>
                    <ul className="space-y-2 text-gray-400">
                      {skillCategory.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-green-500 mt-8 text-center font-mono text-sm">
              // "Hack the planet." — Darsan, probably
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
