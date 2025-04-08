export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    title: 'Security Toolkit',
    description: 'A collection of network scanning and analysis tools for security professionals.',
    technologies: ['Python', 'Bash', 'Docker'],
    githubUrl: 'https://github.com/darsangeorge/security-toolkit'
  },
  {
    title: 'Incident Response Automation',
    description: 'Automated incident response system for detecting and mitigating security threats.',
    technologies: ['Python', 'AWS', 'Lambda'],
    githubUrl: 'https://github.com/darsangeorge/incident-response'
  },
  {
    title: 'E-commerce Platform',
    description: 'Secure e-commerce platform with payment processing and inventory management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/darsangeorge/ecommerce'
  },
  {
    title: 'Threat Intelligence Dashboard',
    description: 'Dashboard for visualizing and analyzing threat intelligence data.',
    technologies: ['TypeScript', 'React', 'D3.js', 'Elasticsearch'],
    githubUrl: 'https://github.com/darsangeorge/threat-dashboard'
  }
]; 