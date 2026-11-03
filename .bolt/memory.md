# Project memory

## Product intent & audience

- Author portfolio + admin dashboard built with Vite + React.
- Author: Mohamed El Baradei (محمد البرادعي), Egyptian Writer and Storyteller.
- Public site showcases literary works; includes e-book store with buy/download modals, contact form.
- Admin dashboard for managing stories and books (CRUD).
- Supports dark and light mode toggle.
- Primary audience: readers exploring the author's works; admin user managing content.

## Brand personality & voice

- Contemporary, confident, intelligent, artistic, memorable — world-class creative studio 2026 aesthetic.
- Explicitly NOT classical/vintage/retro/traditional book publishing or gold-beige luxury.
- User communicates in Arabic; assistant responds in Arabic.
- Content is bilingual (Arabic literary works); RTL is a first-class requirement.

## Visual design & UX direction

- Design style: Modern Minimalism + Creative Editorial + Digital Art Direction.
- Deep graphite / near-black backgrounds; clean white + soft neutral typography.
- Accent color: modern blue (changed from electric lime per user request; applied centrally across buttons, links, dividers, hover/focus states).
- Oversized bold typography; modern Arabic fonts (IBM Plex Sans Arabic / Alexandria / Readix Pro).
- Asymmetrical grid layouts; full-screen visual compositions; large portrait photography; creative image cropping/layering.
- Generous whitespace; strong visual hierarchy.
- Smooth scrolling, subtle reveal animations, sophisticated hover states, elegant section transitions — no excessive/distraction animations.
- Homepage hero: large author portrait, Arabic name as major visual element, short literary statement, elegant nav.
- Content sections: Stories (innovative editorial grids), Reflections (visually distinct, auto-shows when published content exists), Books (interactive previews + dedicated pages), About (contemporary editorial), Contact (minimalist functional).
- Mobile-first responsive; preserve original image aspect ratios.

## Decisions, constraints & rationale

- Stack: Vite + React (JSX), Tailwind, Lucide React only — no additional UI/theme packages (per `.bolt/prompt`).
- Import via `@/` path alias (`@/` → `src/`); avoid deep relative paths.
- Redesign implemented across entire website; existing React architecture, database, content, and integrations preserved — no breaking changes.
- Reusable components, accessibility, SEO, and performance improved.
- Reflections section auto-appears only when published reflections content exists.
- Build passes; no actual errors.
- Accent color changed centrally from electric lime to modern blue — single source of truth ensures site-wide consistency.

## Open questions & assumptions

- Exact routing structure for public vs admin areas not yet confirmed.
- Data persistence method for stories/books (local state, localStorage, API) not established.
- E-book store payment/download flow details not yet specified.
- Contact form backend/submission handler not defined.
- Specific Arabic font choice among IBM Plex Sans Arabic / Alexandria / Readex Pro not finalized.