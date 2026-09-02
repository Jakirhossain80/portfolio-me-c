import type { Profile, Skill, Project } from "./types";

export const profile: Profile = {
  name: "Md. Jakir Hossain",
  title: "MERN Stack Web Developer",
  tagline: "Building fast, full-stack web experiences with the MERN stack and Next.js.",
  summary:
    "MERN stack web developer based in Dhaka, Bangladesh. I build full-stack " +
    "web applications end to end — from multi-tenant SaaS platforms and " +
    "e-commerce storefronts to real-time collaboration tools and recruitment " +
    "platforms — with a focus on clean architecture, role-based auth, and " +
    "production-ready deployments.",
  focusAreas: [
    "Full-stack MERN development",
    "Multi-tenant architecture & RBAC",
    "REST API design & real-time features",
    "Authentication & access control",
  ],
  location: "Dhaka, Bangladesh",
  email: "jakir.devbd@gmail.com",
  githubUrl: "https://github.com/Jakirhossain80",
  linkedinUrl: "https://www.linkedin.com/in/jakir-hossain-dev",
  photoUrl: "/images/profile.jpg",
  resumeUrl: "/jakir-hossain-cv.pdf",
};

export const skills: Skill[] = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Redux Toolkit", category: "Frontend" },
  { name: "Zustand", category: "Frontend" },
  { name: "TanStack Query", category: "Frontend" },

  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "JWT / RBAC Auth", category: "Backend" },
  { name: "Socket.IO", category: "Backend" },

  { name: "Git & GitHub", category: "Tools & Platforms" },
  { name: "Vercel", category: "Tools & Platforms" },
  { name: "Stripe", category: "Tools & Platforms" },
  { name: "Cloudinary", category: "Tools & Platforms" },
];

export const projects: Project[] = [
  {
    slug: "saasify-mern",
    name: "SaaSify MERN",
    description:
      "Multi-tenant SaaS platform with RBAC, JWT + refresh-token authentication, " +
      "tenant isolation, audit logs, and an analytics dashboard.",
    highlights: [
      "Role-based access control (RBAC) with JWT + refresh-token authentication",
      "Multi-tenant architecture with strict tenant isolation",
      "Audit logs for tracking user and admin actions",
      "Analytics dashboard for usage and account insights",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB Atlas",
    ],
    liveUrl: "https://saasify-mern-client.onrender.com",
    repoUrl: "https://github.com/Jakirhossain80/saasify-mern",
    featured: true,
  },
  {
    slug: "live-tasker",
    name: "LiveTasker",
    description:
      "Real-time team collaboration and task management platform with a Kanban " +
      "board and live sync.",
    highlights: [
      "Kanban-style board for organizing and tracking tasks",
      "Real-time collaboration and live sync powered by Socket.IO",
      "Client-side state management with Zustand",
      "Built with a fully typed React + TypeScript + Vite stack",
    ],
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Zustand",
      "Socket.IO",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    liveUrl: "https://live-tasker.vercel.app",
    repoUrl: "https://github.com/Jakirhossain80/live-tasker",
    featured: true,
  },
  {
    slug: "sellora",
    name: "Sellora",
    description:
      "Full-stack e-commerce platform with Stripe checkout, an admin dashboard, " +
      "and Cloudinary-powered image uploads.",
    highlights: [
      "Stripe-powered checkout and payment processing",
      "Admin dashboard for managing products and orders",
      "Cloudinary integration for product image uploads",
      "Global state management with Redux Toolkit",
    ],
    stack: [
      "React (Vite)",
      "Redux Toolkit",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe",
      "Cloudinary",
    ],
    liveUrl: "https://sellora-client.vercel.app/shop/home",
    repoUrl: "https://github.com/Jakirhossain80/sellora-client",
    featured: true,
  },
  {
    slug: "next-cart",
    name: "NextCart",
    description:
      "Storefront built on Next.js with a Sanity CMS-driven catalog and blog, " +
      "Stripe payments, and Clerk authentication.",
    highlights: [
      "Sanity CMS-driven product catalog and blog content",
      "Stripe integration for checkout and payments",
      "Clerk-based authentication",
      "Built with Next.js, TypeScript, and ShadCN UI components",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Sanity CMS",
      "Stripe",
      "Clerk",
      "Zustand",
      "Tailwind CSS",
      "ShadCN UI",
    ],
    liveUrl: "https://next-cart-psi.vercel.app",
    repoUrl: "https://github.com/Jakirhossain80/next-cart",
    featured: true,
  },
  {
    slug: "careerbridge",
    name: "CareerBridge",
    description:
      "Recruitment platform connecting employers and job seekers, with " +
      "role-based auth, employer and job-seeker dashboards, admin moderation, " +
      "and a blog.",
    highlights: [
      "Role-based authentication for Super Admin, Admin, Employer, and Job Seeker roles",
      "Employer dashboard and job-seeker profile/resume/application tracking",
      "Admin moderation tools, blog, and notifications",
      "Light/dark/system theme support and company profiles",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "React Query",
      "React Hook Form",
      "Zod",
      "Axios",
      "Node.js",
      "Express 5",
      "MongoDB Atlas",
      "Firebase Auth",
      "Cloudinary",
    ],
    liveUrl: "https://careerbridge-client.vercel.app",
    repoUrl: "https://github.com/Jakirhossain80/careerbridge",
    featured: true,
  },
];
