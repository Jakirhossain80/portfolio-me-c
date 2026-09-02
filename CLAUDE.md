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
- **Tailwind CSS v4** — CSS-first `@theme` / `@theme inline` config lives in
  `app/globals.css`; there is no `tailwind.config.ts` or `.js` in this repo
- **Lucide React** — icons (not yet installed as of the UI-primitives step; add it when
  the first icon usage actually lands, e.g. Navbar/Footer social links)
- **React Hook Form + Zod** — contact form validation only, not used elsewhere (not yet
  installed; add when building the Contact section)
- **next-themes** — Light/Dark/System theme switching (`components/ThemeProvider.tsx`,
  `components/ui/ThemeToggle.tsx`); see the color-tokens implementation note above
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
  small inline SVG instead of guessing at an import name. (Not hit in practice yet —
  lucide-react isn't installed and no component through the UI-primitives step has
  needed an icon.)
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
| Accent | `#14B8A6` (or `#0F9E8E`) | `#0B7D70` |

Accent is used sparingly: links, primary CTA, active/hover states. Not washed across the
page as a background or large fill.

**Implementation note:** these tokens are real CSS custom properties in
`app/globals.css` — `--background`, `--surface`, `--border`, `--foreground`, `--muted`,
`--accent` — set on `:root` for light and overridden inside a `.dark` class selector.
`next-themes` (`components/ThemeProvider.tsx`, wired in `app/layout.tsx`) toggles that
class on `<html>` based on the user's Light/Dark/System preference — System resolves to
the OS `prefers-color-scheme` via next-themes' own matchMedia listener rather than a
bare CSS media query, so an explicit Light/Dark choice can override the OS preference.
The icon-based selector lives in `components/ui/ThemeToggle.tsx`, used from `Navbar.tsx`.
They're re-exposed to Tailwind via an
`@theme inline` block as `--color-background`, `--color-surface`, `--color-border`,
`--color-foreground`, `--color-muted`, `--color-accent`, which is what makes
`bg-background`, `bg-surface`, `border-border`, `text-foreground`, `text-muted`, and
`text-accent` work as plain Tailwind utility classes — use those names, not raw hex or
invented token names. Dark-mode accent is implemented as `#14B8A6` (the primary of the
two options above); `#0F9E8E` was not used. Light-mode accent was darkened from the
original `#0C8B7D` to `#0B7D70` during the accessibility audit — the original only hit
3.95:1 against `--background`, below WCAG AA's 4.5:1 for normal text; `#0B7D70` clears
it at 4.73:1 along the same hue. The `Button` primary variant's text color is
`text-background` rather than `text-white`/`text-black`, since `--accent`'s luminance
differs enough between themes that no single fixed text color clears 4.5:1 in both —
`--background` (near-white in light mode, near-black in dark mode) does.

**Typography**
- Headings: **Manrope**
- Body: **IBM Plex Sans**
- Code / skill chips / tech-stack tags: **JetBrains Mono**
- Type scale (rem, ~1.25 ratio): 0.8125 / 0.875 / 1 / 1.125 / 1.5 / 2 / 2.75 / 3.5
- `text-wrap: balance` on headings; body copy max-width ~65ch; uppercase labels get
  ~0.04–0.08em letter-spacing
- **Implementation note:** the type scale is implemented as overrides to Tailwind's
  built-in size scale (`--text-xs` through `--text-4xl` in the same `@theme inline`
  block), so the standard `text-xs`…`text-4xl` utility classes already resolve to these
  values — there are no separate custom-named size tokens. Font CSS variables:
  `--font-heading` (Manrope), `--font-body` (IBM Plex Sans), `--font-mono` (JetBrains
  Mono) — set via `next/font/google` in `app/layout.tsx` and mapped through
  `@theme inline`, giving `font-heading`, `font-body`, and `font-mono` Tailwind
  utilities.

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

**Implemented so far:** `components/ui/Button.tsx` covers the button hover/cursor/disabled
rules; `components/ui/Reveal.tsx` covers the scroll-reveal animation rule
(IntersectionObserver, fires once, verified to respect `prefers-reduced-motion` via the
global rule in `globals.css`). Nav-link, card, and social-icon hover states, and the Hero
entrance animation, are not built yet.

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

**Confirmed current as of the content-layer step:** all five are implemented verbatim
in `lib/data.ts` (`profile`, `skills`, `projects`) — that file is the source of truth
going forward. Update there, not here, when project details actually change.

## Folder structure

```
app/            Routes, layout, global styles, metadata (layout.tsx, globals.css, page.tsx)
components/
  ui/           Shared primitives: Button, Badge, SectionHeading, Reveal
                (Navbar, Hero, About, Skills, Projects, Contact, Footer will land
                 directly under components/ as each is built)
lib/            data.ts (profile/skills/projects) + types.ts (shared interfaces)
public/         Currently just the default Next.js SVGs from create-next-app; still
                needs images/profile.jpg, og-image.png, a resume PDF, and a custom
                favicon
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
