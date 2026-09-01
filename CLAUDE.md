# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal portfolio for **Md. Jakir Hossain**, a MERN stack web developer based in Dhaka,
Bangladesh. A single-page site (anchor-linked sections: Hero, About, Skills, Projects,
Contact, Footer) meant to read as modern and professional, not flashy.

- GitHub: https://github.com/Jakirhossain80
- LinkedIn: https://www.linkedin.com/in/jakir-hossain-dev
- Email: jakir.devbd@gmail.com

## Tech stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** — icons
- **React Hook Form + Zod** — contact form validation only (not used elsewhere)
- **Deployment:** Vercel
- **Source control:** GitHub
- **Package manager:** npm — keep `package-lock.json` in sync, don't introduce yarn/pnpm

## Critical constraints — do not violate these

- **Do NOT add `output: "export"` to `next.config`.** This project deploys to Vercel,
  which runs Next.js natively (SSR, Route Handlers, image optimization all supported).
  Static export would disable the contact form's server-side submission handling and
  next/image optimization for no benefit.
- **lucide-react version check:** some brand/logo icons (`Github`, `Linkedin`, etc.) have
  been removed from recent lucide-react versions. Before importing an icon, confirm it
  actually exists in the installed version. If a brand logo icon isn't available, use a
  small inline SVG instead of guessing at an import name.
- **All editable content lives in `lib/data.ts`** (profile info, skills, projects array).
  Never hardcode bio text, skill names, or project details directly inside component JSX
  — components should read from this file so content updates don't require touching
  component code.
- **next/font/google is fine here** (unlike an earlier Netlify-based prototype of this
  site) — Vercel's build environment has normal internet access. No need to fall back to
  a system font stack.

## Design system

**Colors** — dark-first, one accent only (no gradients, no second/third accent color):

| Token | Dark mode | Light mode |
|---|---|---|
| Background | `#0B0F14` | `#F7F8FA` |
| Elevated surface (cards) | `#131820` | `#FFFFFF` |
| Border | `#1F2733` | `#E2E6EC` |
| Text (primary) | `#EDEFF2` | `#12161C` |
| Text (muted) | `#8B96A5` | `#5B6472` |
| Accent | `#14B8A6` (or `#0F9E8E`) | `#0C8B7D` |

Accent is used sparingly: links, primary CTA, active/hover states. Not washed across the
page as a background or large fill.

**Typography**
- Headings: **Manrope**
- Body: **IBM Plex Sans**
- Code / skill chips / tech-stack tags: **JetBrains Mono**
- Type scale (rem, ~1.25 ratio): 0.8125 / 0.875 / 1 / 1.125 / 1.5 / 2 / 2.75 / 3.5
- `text-wrap: balance` on headings; body copy max-width ~65ch; uppercase labels get
  ~0.04–0.08em letter-spacing

**Animation** — purposeful and restrained, not flashy:
- Scroll-reveal: fade + ~16px upward slide, 500–600ms ease-out, IntersectionObserver-based
  (no animation library), staggered ~80–100ms between siblings
- Hero on page load: one staggered entrance (eyebrow → headline → subhead → CTAs) — not
  repeated on other sections
- Navbar: subtle backdrop-blur/opacity increase on scroll, no hard color snap
- No parallax, no scroll-jacking, no looping decorative motion
- Respect `prefers-reduced-motion: reduce` — disable/shorten all of the above

**Hover states**
- Buttons: scale 1.02–1.03 + shadow lift, 150–200ms ease
- Nav/text links: color shift to accent with a sliding underline, not an abrupt snap
- Project/skill cards: `translateY(-4px)` lift + border shifts to accent + shadow increases
- Social/icon links: color shift to accent (no scale, or a slight 1.1x)

**Cursor**
- `cursor: pointer` on every interactive element — set explicitly on custom-styled
  `<div>`-based cards/toggles, not just native `<button>`/`<a>`
- `cursor: not-allowed` on genuinely disabled controls
- No custom animated cursor (dot-follower, etc.) — deliberately skipped, reads as
  "creative portfolio" rather than "professional"

## Content — projects to feature

Pull the current full list from https://github.com/Jakirhossain80 if it may have changed;
otherwise these five are confirmed:

1. **SaaSify MERN** — multi-tenant SaaS platform, RBAC, JWT + refresh-token auth, tenant
   isolation, audit logs, analytics dashboard.
   Stack: React, TypeScript, Vite, TanStack Query, Tailwind CSS, Node.js, Express, MongoDB Atlas
   Live: https://saasify-mern-client.onrender.com
   Repo: https://github.com/Jakirhossain80/saasify-mern

2. **LiveTasker** — real-time team collaboration & task management, Kanban board, live
   sync via Socket.IO.
   Stack: React, Vite, TypeScript, Zustand, Socket.IO, Tailwind CSS, Node.js, Express, MongoDB
   Live: https://live-tasker.vercel.app
   Repo: https://github.com/Jakirhossain80/live-tasker

3. **Sellora** — full-stack e-commerce, Stripe checkout, admin dashboard, Cloudinary uploads.
   Stack: React (Vite), Redux Toolkit, Tailwind CSS, Node.js, Express, MongoDB, Stripe, Cloudinary
   Live: https://sellora-client.vercel.app/shop/home
   Repos: https://github.com/Jakirhossain80/sellora-client, https://github.com/Jakirhossain80/sellora-server

4. **NextCart** — storefront on Next.js, Sanity CMS-driven catalog and blog, Stripe, Clerk auth.
   Stack: Next.js, TypeScript, Sanity CMS, Stripe, Clerk, Zustand, Tailwind CSS, ShadCN UI
   Live: https://next-cart-psi.vercel.app
   Repo: https://github.com/Jakirhossain80/next-cart

5. **CareerBridge** — recruitment platform connecting employers and job seekers.
   Role-based auth (Super Admin, Admin, Employer, Job Seeker), employer dashboard, job
   seeker profile/resume/application tracking, admin moderation, blog, notifications,
   light/dark/system theme, company profiles.
   Stack: Next.js 16, React 19, TypeScript, Tailwind v4, React Query, React Hook Form,
   Zod, Axios, Node.js, Express 5, MongoDB Atlas, Firebase Auth, Cloudinary
   Live: https://careerbridge-client.vercel.app
   Repo: https://github.com/Jakirhossain80/careerbridge

## Folder structure

```
app/          Routes, layout, global styles
components/   Reusable UI (Navbar, Hero, About, Skills, Projects, Contact, Footer, primitives)
lib/          data.ts (all site content) + types + utilities
public/       Static assets (resume PDF, favicon, OG image)
```

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (run this + lint before considering any feature "done")
- `npm run lint` — ESLint

## Workflow notes

- Prefer **Manual** permission mode early in the build so diffs can be reviewed; switch to
  Auto once comfortable.
- Before saying a task is complete, run lint and `next build` and fix anything that fails
  — don't hand back a broken build.
- Content changes (bio, projects, skills) should only ever touch `lib/data.ts`, never
  component files.
- Contact form (`React Hook Form` + `Zod`) needs an email-sending provider (e.g. Resend)
  wired into a Route Handler or Server Action, with the API key stored as a Vercel
  environment variable — flag this explicitly when building the Contact section rather
  than leaving the form non-functional.
