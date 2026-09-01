export interface Profile {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  photoUrl: string;
}

export type SkillCategory = "Frontend" | "Backend" | "Tools & Platforms";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  featured?: boolean;
}
