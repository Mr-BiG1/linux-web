export interface Skill {
  name: string;
  items: string[];
}

export interface Contact {
  platform: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  skills: {
    cybersecurity: Skill;
    development: Skill;
  };
  contacts: Contact[];
}

export const personalInfo: PersonalInfo = {
  name: "Darsan George",
  title: "Cybersecurity Specialist & Developer",
  about: `I am a passionate cybersecurity specialist and developer with expertise in 
penetration testing, network security, and web development. My dual background allows 
me to approach security challenges with a developer's mindset and vice versa.`,
  skills: {
    cybersecurity: {
      name: "Cybersecurity",
      items: [
        "Penetration Testing",
        "Network Security",
        "Cloud Security",
        "Incident Response",
        "Threat Hunting",
        "Security Operations"
      ]
    },
    development: {
      name: "Development",
      items: [
        "TypeScript/JavaScript",
        "Python",
        "Node.js",
        "React/Next.js",
        "SQL/NoSQL",
        "Git/GitHub"
      ]
    }
  },
  contacts: [
    {
      platform: "GitHub",
      url: "https://github.com/darsangeorge"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/darsangeorge"
    },
    {
      platform: "Email",
      url: "contact@darsangeorge.dev"
    }
  ]
}; 