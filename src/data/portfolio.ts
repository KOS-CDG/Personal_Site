import type { Skill, Project, Recommendation, NavItem, Certificate } from '../types';

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: 'About',           href: '#about'           },
  { label: 'Resume',          href: '#resume'          },
  { label: 'Certs',           href: '#certifications'  },
  { label: 'Skills',          href: '#skills'          },
  { label: 'Projects',        href: '#projects'        },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Contact',         href: '#contact'         },
];

// ─── Certificates ─────────────────────────────────────────────────────────────

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    platform: 'Coursera',
    completedDate: 'Mar 31, 2026',
    courseCount: 7,
    type: 'professional',
    accentColor: '#4285F4',
    icon: 'google',
    description:
      'Fluent in applied AI across brainstorming, research, communication, content creation, data analysis, and app building. Built 20+ AI artifacts and vibe-coded a custom AI solution.',
    skills: ['AI Fundamentals', 'Prompt Engineering', 'Data Analysis', 'Content Creation', 'AI for Research', 'App Building with AI'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/H8F73BR0EO8Z',
    image: '/certs/cert-1.jpg',
  },
  {
    id: 2,
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    platform: 'Coursera',
    completedDate: 'Apr 1, 2026',
    courseCount: 8,
    type: 'professional',
    accentColor: '#34A853',
    icon: 'google',
    description:
      'End-to-end UX mastery: empathizing with users, defining pain points, ideation, wireframing, building low- and high-fidelity prototypes in Figma, and testing designs for feedback.',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Empathy Mapping', 'Usability Testing', 'High-Fidelity UI'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/10LZSWSQLE8X',
    image: '/certs/cert-2.jpg',
  },
  {
    id: 3,
    title: 'IBM Front-End Developer Professional Certificate',
    issuer: 'IBM',
    platform: 'Coursera',
    completedDate: 'Mar 27, 2026',
    courseCount: 11,
    type: 'professional',
    accentColor: '#0F62FE',
    icon: 'ibm',
    description:
      'Core skills to build web and front-end applications using HTML, CSS, JavaScript, React, and GitHub. Includes UI/UX principles, debugging, deployment with automated build tools, and RESTful API integration.',
    skills: ['React', 'HTML5 & CSS3', 'JavaScript', 'GitHub', 'REST APIs', 'Debugging', 'Bootstrap', 'Deployment'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/KY7T4PALVKZD',
    image: '/certs/cert-3.jpg',
  },
  {
    id: 5,
    title: 'IBM Back-End Development Professional Certificate',
    issuer: 'IBM',
    platform: 'Coursera',
    completedDate: 'Apr 6, 2026',
    courseCount: 11,
    type: 'professional',
    accentColor: '#0F62FE',
    icon: 'ibm',
    description:
      'Developed key back-end engineering skills using Linux scripting, Git and GitHub, Python, SQL, Django, Docker, Kubernetes, OpenShift, Microservices, Serverless, Application Security, and Monitoring. Completed numerous hands-on labs and a capstone project demonstrating production-ready server-side development.',
    skills: ['Python', 'Django', 'SQL', 'Docker', 'Kubernetes', 'OpenShift', 'Microservices', 'Serverless', 'Linux', 'Git & GitHub', 'App Security'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/1ICC3ELTVP48',
    image: '/certs/cert-5.jpg',
  },
  {
    id: 6,
    title: 'IBM DevOps and Software Engineering Professional Certificate',
    issuer: 'IBM',
    platform: 'Coursera',
    completedDate: 'Apr 10, 2026',
    courseCount: 15,
    type: 'professional',
    accentColor: '#0F62FE',
    icon: 'ibm',
    description:
      'Essential knowledge and skills to perform the many tasks in an entry-level DevOps practitioner role. Demonstrated a firm grasp and practical experience to adopt a DevOps mindset in Software Engineering using Agile and Scrum methodologies and Cloud Native tools and technologies.',
    skills: ['DevOps', 'Agile & Scrum', 'CI/CD', 'Docker', 'Kubernetes', 'OpenShift', 'Microservices', 'Serverless', 'Python', 'Shell Scripting', 'Git & GitHub', 'TDD/BDD', 'Application Security', 'Monitoring & Observability'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/IJ5JLXMUJS3T',
    image: '/certs/cert-6.jpg',
  },
  {
    id: 7,
    title: 'IBM Full Stack Software Developer Professional Certificate',
    issuer: 'IBM',
    platform: 'Coursera',
    completedDate: 'Apr 7, 2026',
    courseCount: 15,
    type: 'professional',
    accentColor: '#0F62FE',
    icon: 'ibm',
    description:
      'Completed 15 courses on various Application Development and Cloud technologies. Equipped with working knowledge of HTML, CSS, JavaScript, GitHub, Node.js, React, Cloud Native practices, DevOps, CI/CD, Containers, Docker, Kubernetes, OpenShift, Python, Django, SQL, NoSQL, Bootstrap, Application Security, Microservices, and Serverless computing.',
    skills: ['HTML & CSS', 'JavaScript', 'React', 'Node.js & Express', 'Python', 'Django', 'SQL & NoSQL', 'Docker', 'Kubernetes', 'OpenShift', 'Cloud Native', 'CI/CD', 'Microservices', 'Serverless', 'Bootstrap', 'Application Security', 'Generative AI'],
    verifyUrl: 'https://coursera.org/verify/professional-cert/IZZMU2533NIV',
    image: '/certs/cert-7.jpg',
  },
  {
    id: 4,
    title: 'SEO Mastery: From Fundamentals to GenAI & GEO Strategies',
    issuer: 'IBM + SkillUp',
    platform: 'Coursera',
    completedDate: 'Mar 25, 2026',
    courseCount: 4,
    type: 'specialization',
    accentColor: '#00B4D8',
    icon: 'ibm-skillup',
    description:
      'Comprehensive SEO + digital marketing mastery: keyword research, content strategy, on-page SEO, schema markup, generative engine optimization (GEO), and full SEO campaign execution via capstone project.',
    skills: ['Keyword Research', 'On-Page SEO', 'Schema Markup', 'Content Strategy', 'Generative Engine Optimization', 'SEO Campaigns'],
    verifyUrl: 'https://coursera.org/verify/specialization/L0YQTFMDQ5X6',
    image: '/certs/cert-4.jpg',
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Frontend
  {
    name: 'HTML5',
    level: 92,
    label: 'Advanced',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    category: 'Frontend',
  },
  {
    name: 'CSS3',
    level: 88,
    label: 'Advanced',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    category: 'Frontend',
  },
  {
    name: 'JavaScript',
    level: 82,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'Frontend',
  },
  {
    name: 'React',
    level: 75,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'Frontend',
  },
  {
    name: 'Bootstrap',
    level: 70,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    category: 'Frontend',
  },
  // Backend
  {
    name: 'Python',
    level: 78,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    category: 'Backend',
  },
  {
    name: 'Django',
    level: 70,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    category: 'Backend',
  },
  {
    name: 'Node.js',
    level: 72,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'Backend',
  },
  {
    name: 'SQL & NoSQL',
    level: 68,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    category: 'Backend',
  },
  {
    name: 'Firebase',
    level: 72,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    category: 'Backend',
  },
  // DevOps
  {
    name: 'Docker',
    level: 72,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    category: 'DevOps',
  },
  {
    name: 'Kubernetes',
    level: 68,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    category: 'DevOps',
  },
  {
    name: 'Git & GitHub',
    level: 80,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    category: 'DevOps',
  },
  {
    name: 'Linux & Shell',
    level: 72,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    category: 'DevOps',
  },
  {
    name: 'CI/CD',
    level: 68,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    category: 'DevOps',
  },
  // Design
  {
    name: 'Figma',
    level: 78,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    category: 'Design',
  },
  {
    name: 'Wireframing',
    level: 76,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',
    category: 'Design',
  },
  {
    name: 'User Research',
    level: 72,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg',
    category: 'Design',
  },
  // AI
  {
    name: 'AI Fundamentals',
    level: 80,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    category: 'AI',
  },
  {
    name: 'Prompt Engineering',
    level: 82,
    label: 'Proficient',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    category: 'AI',
  },
  {
    name: 'Data Analysis',
    level: 72,
    label: 'Intermediate',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    category: 'AI',
  },
  // Tools & Hardware
  {
    name: 'C++ / Arduino',
    level: 65,
    label: 'Hardware Logic',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    category: 'Tools & Hardware',
  },
  {
    name: 'ESP32-S3',
    level: 70,
    label: 'IoT Platform',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
    category: 'Tools & Hardware',
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Based IoT Attendance System',
    description:
      'A hardware-software bridge that automates school attendance. ESP32-S3 reads RFID cards and streams data in real time to a Firebase-backed web dashboard — eliminating manual logs entirely.',
    bullets: [
      'Designed the circuit layout for ESP32-S3, RFID reader, and TFT display',
      'Integrated real-time data transmission to Firebase Realtime Database',
      'Built a responsive web dashboard to display and filter student attendance logs',
    ],
    tags: ['ESP32-S3', 'RFID', 'Firebase', 'TFT Display', 'C++', 'JavaScript'],
    year: '2026',
    featured: true,
    link: 'https://your-link-here.com',
  },
  {
    id: 2,
    title: 'Learning RestaCo',
    description:
      'This website is a fully functional, modern web portal for the Learning Research Statistics and Coding Club (LRSAC)',
    bullets: [
      'Developed a fully responsive layout using HTML, CSS Flexbox, and Grid',
      'Designed consistent UI components for announcements, events, and leadership profiles',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    year: '2025',
    featured: false,
    link: 'https://learningrestaco.netlify.app/',
  },
  {
    id: 3,
    title: 'Caparros UI Portfolio',
    description:
      'My Company Portfolio — an evolving design-and-engineering playground. Built from scratch with no frameworks to deeply understand the fundamentals of the web platform.',
    bullets: [
      'Implemented CSS custom properties, animations, and Intersection Observer API',
      'Added dark/light theme toggle with localStorage persistence',
      'Integrated EmailJS for serverless contact form handling',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS', 'Vite'],
    year: '2026',
    featured: false,
    link: 'https://caparrosui.com/',
  },
];

// ─── Recommendations ──────────────────────────────────────────────────────────

export const recommendations: Recommendation[] = [
  {
    id: 1,
    text: 'Glen is one of the most hardworking students I have met. His IoT attendance project showed great engineering skill — from circuit design all the way to cloud integration.',
    name: '',
    role: '',
  },
  {
    id: 2,
    text: 'Working with Glen on our practical research was incredible. He handled both the hardware and web interface almost single-handedly, and kept motivated through every challenge.',
    name: '',
    role: '',
  },
  {
    id: 3,
    text: "Glen's research on IoT attendance systems shows exceptional technical depth and a genuine dedication to his craft. He is always pushing to learn something new.",
    name: '',
    role: '',
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactInfo = {
  email: 'dhale.caparros@caparrosui.com',
  phone: '+63 920 695 6275',
  location: 'Gumaca, Quezon, Philippines',
  emailjsServiceId: 'service_oqbmo9h',
  emailjsTemplateId: 'template_o849cxu',
  emailjsPublicKey: 'xLzpH5OuQjOozjpD7',
};
