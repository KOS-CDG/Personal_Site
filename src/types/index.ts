// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  /** Proficiency 0–100 */
  level: number;
  label: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'AI' | 'Tools & Hardware';
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  year: string | number;
  bullets: string[];
  tags: string[];
  featured?: boolean;
  link?: string;
}

export interface Recommendation {
  id: number;
  text: string;
  name: string;
  role: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  platform: string;
  completedDate: string;
  courseCount: number;
  type: 'professional' | 'specialization';
  accentColor: string;
  skills: string[];
  verifyUrl: string;
  description: string;
  icon: 'google' | 'ibm' | 'ibm-skillup';
  /** Path to the actual certificate image in /public/certs/ — e.g. '/certs/cert-1.jpg' */
  image?: string;
}
