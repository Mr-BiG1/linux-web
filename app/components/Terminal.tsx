// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { TerminalProps } from '../types';

// const Terminal: React.FC<TerminalProps> = ({ children, title = 'Window', className = '', onClick }) => {
//   const [isMaximized, setIsMaximized] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`bg-[#1a1b26] border border-gray-800 rounded-lg overflow-hidden shadow-lg w-full ${className}`}
//       onClick={onClick}
//     >
//       {/* Window Header */}
//       <div className="bg-[#1a1b26] px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b border-gray-800">
//         <div className="flex items-center space-x-1.5 sm:space-x-2">
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full" />
//           <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
//         </div>
//         <div className="text-gray-400 text-xs sm:text-sm font-medium">{title}</div>
//         <div className="w-10 sm:w-14">{/* Spacer to maintain center alignment */}</div>
//       </div>

//       {/* Window Content */}
//       <div className="text-gray-200 overflow-x-auto">
//         {children}
//       </div>
//     </motion.div>
//   );
// };

// export default Terminal; 
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TerminalProps } from '../types';

const Terminal: React.FC<TerminalProps> = ({ children, title = 'Window', className = '', onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#1a1b26] border border-gray-800 rounded-lg overflow-hidden shadow-lg w-full ${className}`}
      onClick={onClick}
    >
      {/* Window Header */}
      <div className="bg-[#1a1b26] px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
        </div>
        <div className="text-gray-400 text-xs sm:text-sm font-medium">{title}</div>
        <div className="w-10 sm:w-14">{/* Spacer to maintain center alignment */}</div>
      </div>

      {/* Window Content */}
      <div className="text-gray-200 overflow-x-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default Terminal;
