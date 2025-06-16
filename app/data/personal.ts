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
  name: "Darsan Sabu George",
  title: "Hii",
  about: `Hi, I’m Darsan — a cybersecurity enthusiast and developer who enjoys solving real-world tech problems. I have experience in penetration testing, network security, and building secure web applications.
What makes me different is that I understand both how systems are built and how they can be broken. This helps me approach challenges from both a developer’s and a hacker’s point of view, making my solutions practical and secure.
I’m always learning, exploring new tools, and working on personal projects that push my skills further. Whether it’s improving security, fixing issues, or building something useful — I’m all in.

Feel free to check out my work or get in touch!`,
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
        "SQL/NOSQL",
        "Git/GitHub"
      ]
    }
  },
  contacts: [
    {
      platform: "GitHub",
      url: "https://github.com/Mr-BiG1"
    },
    {
      platform: "LinkedIn",
      url: "www.linkedin.com/in/darsan-sabu-george"
    },
    {
      platform: "Email",
      url: "darsansabu09@gmail.com"
    }
  ]
}; 