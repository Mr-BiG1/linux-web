'use client';

import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '../utils/commands';
import { CommandLineProps } from '../types';

const CommandLine: React.FC<CommandLineProps> = ({
  prompt = '~$',
  onCommand,
  initialOutput = 'Welcome to the terminal! Type \'help\' to see available commands.',
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(initialOutput);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (command) {
        // Add command to history
        setHistory(prev => [...prev, command]);
        setHistoryIndex(-1);

        // Handle clear command specially
        if (command.toLowerCase() === 'clear') {
          setOutput('');
          setInput('');
          return;
        }

        // Execute command
        const commandOutput = executeCommand(command);
        setOutput(prev => `${prev}\n${prompt} ${command}\n${commandOutput.output}`);
        onCommand?.(command);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="font-mono p-6 text-base">
      <div 
        ref={outputRef}
        className="whitespace-pre-wrap text-gray-300 mb-4 max-h-[60vh] overflow-y-auto"
      >
        {output.split('\n').map((line, index) => (
          <div key={index} className="leading-relaxed">{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-blue-500 mr-2">{prompt}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none text-gray-300 flex-1 font-mono placeholder-gray-600"
          autoFocus
          spellCheck={false}
          placeholder="Type a command..."
        />
      </div>
    </div>
  );
};

export default CommandLine; 