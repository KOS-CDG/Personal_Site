# Glen Dhale Caparros — Portfolio v2

Premium React + TypeScript portfolio with Framer Motion animations, custom cursor, and an editorial dark design system.

---

## Tech Stack

| Tool | Why |
|---|---|
| **Vite** | Near-instant HMR, smallest build output for a static site |
| **React 18** | Component model, concurrent features, strict mode |
| **TypeScript** | Typed props prevent bugs as the project grows |
| **Framer Motion 11** | Best-in-class spring physics + layout animations |
| **CSS-in-JSX** (`<style>` blocks) | Zero runtime overhead, scoped per component, no build config |
| **Google Fonts** | Syne (display) + Outfit (body) + JetBrains Mono — loaded in HTML head |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add optional EmailJS browser package (for Contact form)
npm install @emailjs/browser

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Production build
npm run build
npm run preview
```

---

## Folder Structure

```
glen-portfolio/
├── index.html                  # Fonts, meta, root mount
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                # React entry — mounts App + globals
    ├── App.tsx                 # Layout shell: Nav + sections + Footer
    │
    ├── types/
    │   └── index.ts            # Skill, Project, Recommendation interfaces
    │
    ├── data/
    │   └── portfolio.ts        # ★ EDIT YOUR CONTENT HERE ★
    │
    ├── styles/
    │   └── globals.css         # Design tokens, resets, utilities, grain
    │
    ├── hooks/
    │   └── useReducedMotion.ts # Reads prefers-reduced-motion media query
    │
    └── components/
        ├── Nav.tsx             # Floating blur nav, hide-on-scroll, mobile overlay
        ├── Hero.tsx            # Full-viewport hero, typewriter, dot grid
        ├── About.tsx           # 2-col layout, animated stat counters
        ├── Skills.tsx          # Progress bars with scroll-triggered fill
        ├── Projects.tsx        # Featured card + expandable project grid
        ├── Recommendations.tsx # Testimonial cards + add-recommendation form
        ├── Contact.tsx         # EmailJS form, social links
        ├── Footer.tsx          # Marquee strip, back-to-top
        └── ui/
            ├── Cursor.tsx      # Magnetic dot + ring cursor (desktop only)
            └── ScrollReveal.tsx # Reusable scroll-triggered fade+slide
```

---

## Updating Your Content

**Everything you need to edit is in one file:** `src/data/portfolio.ts`

- Add/edit **skills** → `skills` array  
- Add/edit **projects** → `projects` array (`featured: true` renders as a wide card)  
- Add/edit **recommendations** → `recommendations` array  
- Update **contact info** → `contactInfo` object  

---

## Design System

All design tokens live in `src/styles/globals.css` as CSS custom properties:

```css
--green          /* #22c55e — primary accent */
--bg             /* #080808 — page background */
--text           /* #f0ede8 — primary text */
--text-muted     /* #6b6b6b — secondary text */
--font-display   /* Syne — headings */
--font-body      /* Outfit — body */
--font-mono      /* JetBrains Mono — labels/code */
```

---

## Animation Architecture

| System | Implementation |
|---|---|
| **Page load** | Framer Motion `staggerChildren` in Hero |
| **Scroll reveals** | `ScrollReveal.tsx` wraps any element; uses `useInView` hook |
| **Skill bars** | `scaleX` animated on intersection, staggered by index |
| **Stat counters** | `useMotionValue` + `useSpring` in About |
| **Nav hide/show** | `motion.header` with `y` driven by scroll direction |
| **Mobile menu** | `clipPath` circle expand from hamburger origin |
| **Cursor** | `useSpring` on ring for lag; dot snaps precisely |
| **Marquee** | Pure CSS `animation: marquee` — no JS overhead |
| **Grain texture** | CSS `@keyframes grain` on a `body::after` pseudo-element |
| **Reduced motion** | `useReducedMotion` hook disables all animations system-wide |

---

## EmailJS Setup

1. Go to [emailjs.com](https://www.emailjs.com) and grab your credentials
2. Open `src/data/portfolio.ts`
3. Update `contactInfo.emailjsServiceId`, `emailjsTemplateId`, and `emailjsPublicKey`
4. Install the package: `npm install @emailjs/browser`

The Contact component lazy-imports EmailJS only when the form is submitted, keeping the initial bundle lean.

---

## Deployment

**Netlify (recommended):**
```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
# Or connect GitHub repo → auto-deploys
```

**Vercel:**
```bash
npx vercel --prod
```

---

## Suggested Future Improvements

| Enhancement | Effort | Impact |
|---|---|---|
| Add real project screenshots/previews on hover | Medium | High |
| Animate page sections with a progress indicator in nav | Low | Medium |
| Add a `/blog` route with MDX for writing | High | High |
| Integrate GitHub API to show live repo stats | Medium | Medium |
| Add `next-themes` if migrating to Next.js | Low | Low |
| WebGL background (Three.js) on Hero for extra depth | High | High |
| Add `react-use` for better device detection | Low | Low |
| CMS (Sanity/Contentful) for recommendations | High | Medium |
| Lighthouse PWA audit + service worker | Medium | Medium |

---

## Accessibility

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- All interactive elements have `aria-label` or visible text
- Focus styles inherited from browser + CSS `:focus-visible` 
- `prefers-reduced-motion` fully respected — zero motion when requested
- Live region on typewriter (`aria-live="polite"`)
- Form fields all have associated `<label>` elements

---

Built with craft. © Glen Dhale L. Caparros
