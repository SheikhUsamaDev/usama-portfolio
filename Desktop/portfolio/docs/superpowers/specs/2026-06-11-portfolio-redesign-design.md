# Usama Portfolio — Deep Space Premium Redesign Spec
**Date:** 2026-06-11
**Approach:** A — Deep Space Premium (comprehensive redesign)
**Stack:** Vanilla HTML / CSS / JS (no framework change)

---

## 1. Design System

### Colors

| Token | Old Value | New Value | Notes |
|---|---|---|---|
| `--bg-primary` | `#050609` | `#0B0F1A` | Warmer dark slate |
| `--bg-secondary` | `#0a1014` | `#111827` | Slate-900 |
| `--bg-elevated` | `rgba(17,22,28,0.78)` | `rgba(17,24,39,0.85)` | Consistent slate base |
| `--bg-glass` | `rgba(15,20,26,0.64)` | `rgba(15,23,42,0.60)` | Slate-950 glass |
| `--primary` | `#3d7cff` | `#6366F1` | Indigo-500 |
| `--primary-light` | `#8fb4ff` | `#818CF8` | Indigo-400 |
| `--accent-cyan` | `#35d0c2` | `#06B6D4` | Cyan-500 |
| `--accent-violet` | *(none)* | `#A78BFA` | Violet-400, used sparingly |
| `--accent-green` | `#6bdc8c` | `#22C55E` | Green-500, CTA/badge |
| `--gradient-primary` | blue→cyan→amber | `indigo→cyan→violet` | Cohesive dark-tech |
| `--border-color` | `rgba(149,174,190,0.16)` | `rgba(99,102,241,0.15)` | Indigo-tinted border |
| `--border-glow` | `rgba(53,208,194,0.34)` | `rgba(99,102,241,0.35)` | Indigo glow |
| `--shadow-glow` | cyan shadow | `0 24px 70px rgba(99,102,241,0.18)` | Indigo glow shadow |
| `--card-radius` | `8px` | `12px` | Softer, more modern |

### Typography

| Role | Old Font | New Font |
|---|---|---|
| Display / Headings | `Playfair Display` (serif) | `Space Grotesk` (geometric sans) |
| Body | `Inter` | `DM Sans` |
| Mono / Code | `JetBrains Mono` | `JetBrains Mono` (unchanged) |

Google Fonts import:
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap
```

### Global Structural Changes

- **Remove:** `film-grain` div, `lens-flare` div, `cinematic-bars` div — accessibility/performance anti-patterns
- **Keep:** Three.js `bg-canvas`, GSAP animations, Lenis smooth scroll, custom cursor, preloader
- **Add:** 3 CSS aurora orb divs in hero (indigo, cyan, violet) — pure CSS, no JS
- **Add:** Subtle `dot-grid` CSS background on `body` using `radial-gradient` pattern
- **Upgrade:** All `border-radius` from `8px` → `12px` globally
- **Upgrade:** Card box-shadows to indigo-tinted glow

---

## 2. Preloader

- Font: `Space Grotesk` 900 weight (was `Playfair Display`)
- Glitch colors: `#6366F1` indigo + `#06B6D4` cyan (was cyan + blue)
- Subtitle text: `"AI AUTOMATION · WEB DEVELOPMENT · MS365"` (was `"FULL STACK DEVELOPER"`)

---

## 3. Navigation

- Logo font: `Space Grotesk` monospace fallback (was `JetBrains Mono` — keep mono for logo only)
- Active nav link: indigo pill background `rgba(99,102,241,0.12)` + indigo underline (was cyan underline only)
- Scrolled border: `rgba(99,102,241,0.2)` indigo tint (was plain border-color)

---

## 4. Hero Section

### Remove
- `.film-grain`, `.lens-flare`, `.cinematic-bars` elements
- `.hero-layer-1`, `.hero-layer-2` depth layers

### Add — Aurora Orbs (CSS only)
```
.aurora-orb-1: top-left, 400px, #6366F1, blur(120px), opacity 0.18
.aurora-orb-2: bottom-right, 300px, #06B6D4, blur(100px), opacity 0.14
.aurora-orb-3: center, 200px, #A78BFA, blur(140px), opacity 0.10
```

### Updates
- `hero-title` font: `Space Grotesk` 900
- Name gradient: `indigo #6366F1 → cyan #06B6D4 → violet #A78BFA`
- `.hero-badge` border: `rgba(34,197,94,0.3)` green tint, bg `rgba(34,197,94,0.06)`
- `.highlight` spans in description: `#818CF8` indigo-light (was cyan)
- Stats row: each stat wrapped in a glass card with indigo top-border accent `3px solid #6366F1`
- `.btn-primary`: background `#6366F1`, hover `#4F46E5`
- `.btn-glass`: cyan accent → indigo accent

---

## 5. About Section

- Terminal `$` prompt color: `#818CF8` indigo (was cyan)
- Terminal header bg: `rgba(99,102,241,0.04)` indigo tint
- Profile photo gradient border: indigo→cyan (was tri-color)
- Profile photo glow: `rgba(99,102,241,0.14)` (was cyan)
- Floating cards: full glassmorphism — `backdrop-filter: blur(20px)`, `border: 1px solid rgba(99,102,241,0.4)`
  - Card 1 (Code): indigo icon `#818CF8`
  - Card 2 (Cloud): cyan icon `#06B6D4`
  - Card 3 (AI): violet icon `#A78BFA`
- About tags: `border-radius: 100px` full pill, indigo hover

---

## 6. Skills Section

### Layout Change: Bento Grid (replaces uniform card grid)

- **Remove:** Progress bars (`.skill-bar`, `.skill-fill`) from all skill cards
- **Add:** Varied card sizes using CSS Grid `grid-column: span 2` on featured skills
- Each card: large icon (top), category badge (middle), skill name (bottom) — no progress bar
- Featured skills (span 2): HTML5, JavaScript, React.js, Microsoft 365 Admin, Zapier Workflows, OpenAI/Claude APIs
- Tabs: upgrade to pill toggles — `border-radius: 100px`, active state indigo bg
- Hover: indigo border glow + icon transitions to cyan

### Card min-height
- Regular cards: `160px`
- Span-2 cards: `160px` (wider, not taller)

---

## 7. Services Section

### Layout Change: Asymmetric Bento

CSS Grid layout (desktop, 3-col):
```
"web    web    ai"
"zapier ms365  ms365"
"tenant cloud  cloud"
```

- `web` (Web Development): 2-col wide
- `ms365` (MS365 & GCC High): 2-col wide — signals specialization
- `cloud` (Server & Cloud): 2-col wide
- `ai`, `zapier`, `tenant`: single col

### Card upgrades
- Icon boxes: unique accent per service
  - Web Dev: indigo `#6366F1`
  - AI Automation: cyan `#06B6D4`
  - Zapier/Make/n8n: violet `#A78BFA`
  - MS365 GCC High: green `#22C55E`
  - Tenant Migration: amber `#F59E0B`
  - Server & Cloud: rose `#F43F5E`
- Featured tiles (wide): subtle indigo-to-violet gradient bg overlay
- Hover: left-to-right shimmer sweep animation

---

## 8. Projects Section

### Layout Change: 2-Column Masonry Grid (replaces horizontal scroll)

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
/* Featured projects span full width */
.project-card-featured { grid-column: span 2; }
```

- Featured (full-width): AI Automation Workflow Hub, n8n Automation Server
- Regular (half-width): all others
- Top-border accent per card alternates: indigo / cyan / violet / green
- Hover overlay: indigo gradient `rgba(99,102,241,0.85)` (was plain black)
- Category badge: indigo pill
- Remove `.projects-horizontal-wrapper` and `.projects-horizontal-track`
- Add `.projects-grid` inside `.container`

---

## 9. Experience / Timeline

- Timeline line gradient: `#6366F1 → #06B6D4`
- Dot border: `#6366F1` indigo
- Dot inner: `#A78BFA` violet
- Date labels: `#818CF8` indigo
- Company name: `#06B6D4` cyan
- Card left-border accent: `3px solid rgba(99,102,241,0.4)`
- Card hover border: indigo
- **Note:** "Tech Company" and "Startup" placeholders should be updated with real company names

---

## 10. Contact Section

- Contact icon boxes: `#6366F1` indigo bg `rgba(99,102,241,0.1)`, border `rgba(99,102,241,0.2)`
- Contact card hover: indigo border + indigo glow shadow
- Social link hover: indigo (was cyan)
- Form focus underline: indigo gradient
- Label float color: `#818CF8` (was cyan)
- Submit button: `#6366F1` background, `#4F46E5` hover

---

## 11. Footer

- Tagline text change: `"AI Automation · Web Development · MS365 Expert"` (was `"A cinematic experience"`)
- Top border: thin indigo gradient line `linear-gradient(90deg, transparent, rgba(99,102,241,0.4) 50%, transparent)`

---

## 12. Back to Top Button

- Border/color: indigo tint (was cyan)
- Progress ring stroke: `#6366F1` indigo

---

## Implementation Notes

- All changes are in `style.css` and `index.html` only — no new files needed
- `script.js` requires no changes (Three.js, GSAP, Lenis all color-agnostic)
- CSS variable swap handles ~70% of color changes globally
- Font swap requires updating Google Fonts `<link>` in `<head>` and `--font-cinema` / `--font-primary` vars
- Bento grid for Skills requires HTML changes (add `class="skill-featured"` to span-2 cards, remove skill-bar divs)
- Services bento requires HTML structure + CSS grid-template-areas
- Projects masonry requires replacing horizontal track markup with a standard grid

---

## Anti-Patterns to Avoid

- Do not use progress bars for skill levels
- Do not use `Playfair Display` anywhere after this redesign
- Do not use amber/warm accent — this palette is indigo/cyan/violet/green only
- Do not add film grain, parallax layers, or scroll-jacking effects back
- All `border-radius` must be `12px` for cards (not `8px`)
