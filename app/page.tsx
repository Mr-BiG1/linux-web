'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootScreen from './components/BootScreen';
import Terminal from './components/Terminal';
import CommandLine from './components/CommandLine';
import MatrixRain from './components/MatrixRain';
import About from './components/About';
import Projects from './components/Projects';

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [activeWindow, setActiveWindow] = useState<'welcome' | 'terminal'>('welcome');
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  const handleCommand = (command: string) => {
    // Handle different commands here
    console.log('Command received:', command);
  };

  if (!isBooted) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 p-2 sm:p-4 min-h-screen">
        <AnimatePresence>
          {activeWindow === 'welcome' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-auto mt-4 sm:mt-8"
            >
              <Terminal
                title="Welcome"
                onClick={() => setActiveWindow('welcome')}
              >
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full border-4 border-blue-500 flex items-center justify-center">
                    <span className="text-blue-500 text-sm sm:text-base">Profile</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">Darsan George</h1>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">Cybersecurity Specialist & Developer</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                    <button
                      onClick={() => setShowAbout(true)}
                      className="px-4 sm:px-6 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
                    >
                      About Me
                    </button>
                    <button
                      onClick={() => setShowProjects(true)}
                      className="px-4 sm:px-6 py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
                    >
                      Projects
                    </button>
                  </div>
                </div>
              </Terminal>
            </motion.div>
          )}

          {activeWindow === 'terminal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-auto mt-4 sm:mt-8"
            >
              <Terminal
                title="Terminal"
                onClick={() => setActiveWindow('terminal')}
              >
                <CommandLine
                  prompt="~$"
                  onCommand={handleCommand}
                  initialOutput="Welcome to the terminal! Type 'help' to see available commands."
                />
              </Terminal>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 bg-[#1a1b26] border-t border-gray-800">
          <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-between text-sm sm:text-base">
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => setActiveWindow('welcome')}
                className={`px-2 sm:px-4 py-1 rounded ${
                  activeWindow === 'welcome'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Welcome
              </button>
              <button
                onClick={() => setActiveWindow('terminal')}
                className={`px-2 sm:px-4 py-1 rounded ${
                  activeWindow === 'terminal'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Terminal
              </button>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Portfolio
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAbout && <About onClose={() => setShowAbout(false)} />}
        {showProjects && <Projects onClose={() => setShowProjects(false)} />}
      </AnimatePresence>
    </main>
  );
}
