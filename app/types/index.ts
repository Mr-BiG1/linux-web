export interface Command {
  name: string;
  description: string;
  execute: () => string;
}

export interface TerminalProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
}

export interface CommandLineProps {
  prompt?: string;
  onCommand?: (command: string) => void;
  initialOutput?: string;
}

export interface BootScreenProps {
  onBootComplete: () => void;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface CommandDefinition {
  name: string;
  description: string;
  usage?: string;
  examples?: string[];
  execute: (args?: string[]) => string;
}

export interface CommandRegistry {
  [key: string]: CommandDefinition;
}

export interface CommandResult {
  success: boolean;
  output: string;
} 