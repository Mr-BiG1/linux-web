'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BootScreenProps } from '../types';

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [bootStage, setBootStage] = useState(0);
  const bootMessages = [
    'Initializing system...',
    'Loading kernel modules...',
    'Mounting filesystems...',
    'Starting network services...',
    'Loading user profile...',
    'System ready.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBootStage((prev) => {
        if (prev < bootMessages.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(onBootComplete, 1000);
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center"
    >
      <div className="text-center max-w-md p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-xl backdrop-blur-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={bootStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <div className="mb-6">
              <pre className="text-xs text-blue-400">
                {`
  ██████╗  █████╗ ██████╗ ███████╗ █████╗ ███╗   ██╗
  ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗████╗  ██║
  ██   ██╔███████║██████╔╝███████╗███████║██╔██╗ ██║
  ██╔══██╗██╔══██║██╔══██╗╚════██║██╔══██║██║╚██╗██║
  ██████╔╝██║  ██║██║  ██║███████║██║  ██║██║ ╚████║
  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
                `}
              </pre>
            </div>
            <div className="text-gray-300 text-sm mb-4">{bootMessages[bootStage]}</div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(bootStage + 1) * (100 / bootMessages.length)}%` }}
              ></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BootScreen; 