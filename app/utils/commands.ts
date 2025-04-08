import { CommandRegistry, CommandResult } from '../types';
import { projects } from '../data/projects';
import { personalInfo } from '../data/personal';

const formatBulletList = (items: string[]): string =>
  items.map(item => `• ${item}`).join('\n');

// Command aliases mapping
const aliases: { [key: string]: string } = {
  ls: 'projects',
  h: 'help',
  sk: 'skills',
  p: 'projects',
  c: 'contact',
  cls: 'clear',
  w: 'whoami',
  a: 'about'
};

const commands: CommandRegistry = {
  help: {
    name: 'help',
    description: 'Show available commands',
    usage: 'help [command]',
    examples: ['help', 'help skills'],
    execute: (args?: string[]): string => {
      if (args && args.length > 0) {
        const commandName = args[0].toLowerCase();
        const actualCommand = aliases[commandName] || commandName;
        const command = commands[actualCommand];
        if (command) {
          const aliasesList = Object.entries(aliases)
            .filter(([, cmd]) => cmd === actualCommand)
            .map(([alias]) => alias);

          return `Command: ${command.name}${aliasesList.length ? ` (aliases: ${aliasesList.join(', ')})` : ''}
Description: ${command.description}
${command.usage ? `Usage: ${command.usage}` : ''}
${command.examples ? `\nExamples:\n${command.examples.map(ex => `  ${ex}`).join('\n')}` : ''}`;
        }
        return `Command not found: ${commandName}`;
      }

      const commandList = Object.values(commands).map(cmd => {
        const cmdAliases = Object.entries(aliases)
          .filter(([, command]) => command === cmd.name)
          .map(([alias]) => alias);
        const aliasText = cmdAliases.length ? ` (${cmdAliases.join(', ')})` : '';
        return `${cmd.name.padEnd(10)}${aliasText.padEnd(15)} - ${cmd.description}`;
      });

      return `Available commands:\n\n${commandList.join('\n')}`;
    }
  },

  whoami: {
    name: 'whoami',
    description: 'Display current user',
    execute: (): string => personalInfo.name
  },

  about: {
    name: 'about',
    description: 'Show information about me',
    execute: (): string => personalInfo.about
  },

  skills: {
    name: 'skills',
    description: 'List technical skills',
    usage: 'skills [category]',
    examples: ['skills', 'skills cybersecurity', 'skills development'],
    execute: (args?: string[]): string => {
      if (args && args.length > 0) {
        const category = args[0].toLowerCase();
        const categories = Object.keys(personalInfo.skills);

        if (category === 'cybersecurity') {
          return `${personalInfo.skills.cybersecurity.name}:\n${formatBulletList(personalInfo.skills.cybersecurity.items)}`;
        }
        if (category === 'development') {
          return `${personalInfo.skills.development.name}:\n${formatBulletList(personalInfo.skills.development.items)}`;
        }
        return `Unknown category: ${category}. Available categories: ${categories.join(', ')}`;
      }

      return `${personalInfo.skills.cybersecurity.name}:\n${formatBulletList(personalInfo.skills.cybersecurity.items)}\n
${personalInfo.skills.development.name}:\n${formatBulletList(personalInfo.skills.development.items)}`;
    }
  },

  projects: {
    name: 'projects',
    description: 'List recent projects',
    usage: 'projects [search]',
    examples: ['projects', 'projects security', 'projects react'],
    execute: (args?: string[]): string => {
      let filteredProjects = projects;

      if (args && args.length > 0) {
        const searchTerm = args[0].toLowerCase();
        filteredProjects = projects.filter(project =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
        );

        if (filteredProjects.length === 0) {
          return `No projects found matching: "${searchTerm}"\nTry searching with different keywords or use 'projects' to see all projects.`;
        }
      }

      const projectsList = filteredProjects.map(project => `
${project.title}
- ${project.description}
- Technologies: ${project.technologies.join(', ')}
${project.githubUrl ? `- GitHub: ${project.githubUrl}` : ''}`).join('\n');

      return `${filteredProjects.length} Project${filteredProjects.length === 1 ? '' : 's'} Found:${projectsList}`;
    }
  },

  contact: {
    name: 'contact',
    description: 'Show contact information',
    execute: (): string => {
      if (!personalInfo.contacts || personalInfo.contacts.length === 0) {
        return 'Contact information is currently unavailable.';
      }
      return personalInfo.contacts
        .map(contact => `${contact.platform}: ${contact.url}`)
        .join('\n');
    }
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal',
    execute: (): string => ''
  }
};

export const executeCommand = (commandLine: string): CommandResult => {
  const trimmedCommand = commandLine.trim();

  if (!trimmedCommand) {
    return { success: true, output: '' };
  }

  const [cmd, ...args] = trimmedCommand.toLowerCase().split(' ');
  const actualCommand = aliases[cmd] || cmd;

  if (actualCommand in commands) {
    try {
      const output = commands[actualCommand].execute(args);
      return { success: true, output };
    } catch (err) {
      return {
        success: false,
        output: `Error executing command: ${err instanceof Error ? err.message : 'An unexpected error occurred'}`
      };
    }
  }

  const similarCommands = [...Object.keys(commands), ...Object.keys(aliases)]
    .filter(c => c.startsWith(cmd) || c.includes(cmd))
    .slice(0, 3);

  const suggestion = similarCommands.length
    ? `\nDid you mean: ${similarCommands.join(', ')}?`
    : "\nType 'help' to see available commands.";

  return {
    success: false,
    output: `Command not found: ${cmd}.${suggestion}`
  };
};
