# Portfolio Deep Space Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Usama's portfolio from an editorial cinematic aesthetic to a modern Deep Space Premium tech portfolio using indigo/cyan/violet palette, Space Grotesk + DM Sans fonts, bento grid layouts for Skills/Services, 2-column masonry Projects, and consistent glassmorphism — all in vanilla HTML/CSS/JS.

**Architecture:** All changes are confined to `index.html` and `style.css`. No new files, no framework. The local dev server runs at `http://127.0.0.1:8000` via `node serve-local.js` (already running). Visual verification replaces automated tests — check the browser after each task.

**Tech Stack:** HTML5, CSS3 (custom properties, CSS Grid, backdrop-filter), vanilla JS (no changes), GSAP 3, Three.js, Lenis smooth scroll

**Spec:** `docs/superpowers/specs/2026-06-11-portfolio-redesign-design.md`

---

## Files

- Modify: `index.html` — HTML structure changes (aurora orbs, remove film overlays, skills bento, services bento, projects masonry, preloader text, footer tagline)
- Modify: `style.css` — All CSS changes (variables, fonts, colors, layouts, glassmorphism, bento grids)

---

### Task 1: CSS Variables & Font Swap

**Files:**
- Modify: `style.css` (lines 1–32: `:root` block and `@import`)
- Modify: `index.html` (lines 9–12: Google Fonts `<link>`)

- [ ] **Step 1: Replace Google Fonts link in `index.html`**

Find this block (lines 10–12):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet">
```

Replace with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Replace `:root` CSS variables in `style.css`**

Replace the entire `:root { ... }` block (lines 6–32) with:
```css
:root {
    --bg-primary: #0B0F1A;
    --bg-secondary: #111827;
    --bg-elevated: rgba(17, 24, 39, 0.85);
    --bg-glass: rgba(15, 23, 42, 0.60);
    --primary: #6366F1;
    --primary-light: #818CF8;
    --primary-dark: #4F46E5;
    --cyan-accent: #06B6D4;
    --violet-accent: #A78BFA;
    --amber-accent: #F59E0B;
    --rose-accent: #F43F5E;
    --green-accent: #22C55E;
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --text-muted: #64748B;
    --border-color: rgba(99, 102, 241, 0.15);
    --border-glow: rgba(99, 102, 241, 0.35);
    --gradient-primary: linear-gradient(135deg, #6366F1 0%, #06B6D4 50%, #A78BFA 100%);
    --gradient-surface: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    --shadow-blue: 0 18px 44px rgba(99, 102, 241, 0.18);
    --shadow-glow: 0 24px 70px rgba(99, 102, 241, 0.22);
    --font-primary: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-display: 'Space Grotesk', sans-serif;
    --card-radius: 12px;
    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 3: Update all `var(--font-cinema)` references in `style.css` to `var(--font-display)`**

Search for every occurrence of `var(--font-cinema)` in `style.css` and replace with `var(--font-display)`. These appear in: `.preloader-glitch`, `.hero-title`, `.char-reveal`, `.section-title`, `.stat-number`, `.mobile-link`, `.nav-logo` (partial), `.footer-logo`.

Also replace `--font-cinema: 'Playfair Display', serif;` (it's now `--font-display` above, so just ensure no old reference remains).

- [ ] **Step 4: Update all `border-radius: 8px` on cards to use `var(--card-radius)`**

In `style.css`, replace `border-radius: 8px` with `border-radius: var(--card-radius)` on these selectors:
- `.skill-card`
- `.service-card`
- `.project-card-cinema`
- `.timeline-card`
- `.contact-card`
- `.about-terminal`
- `.about-image-placeholder`
- `.nav-toggle`
- `.hero-badge`
- `.btn` (keep as `8px` — buttons stay slightly tighter, don't use var here)
- `.skill-tab`
- `.tag`

- [ ] **Step 5: Verify in browser**

Open `http://127.0.0.1:8000`. Confirm:
- Headings now render in Space Grotesk (geometric, not serif)
- Body text in DM Sans
- All card corners slightly more rounded (12px vs 8px)
- Color palette shifted to indigo tones

- [ ] **Step 6: Commit**

```bash
git add index.html style.css
git commit -m "design: swap fonts to Space Grotesk/DM Sans, update CSS variables to indigo palette"
```

---

### Task 2: Remove Film Overlays, Add Aurora Orbs & Dot Grid

**Files:**
- Modify: `index.html` — remove 3 overlay divs, add aurora orbs to hero
- Modify: `style.css` — remove overlay CSS, add aurora orb styles, add dot-grid body pattern

- [ ] **Step 1: Remove film overlay divs from `index.html`**

Delete these 4 lines from `index.html` (after the preloader closing div):
```html
<div class="film-grain"></div>
<div class="vignette"></div>
<div class="lens-flare" id="lensFlare"></div>
<div class="cinematic-bars">
    <div class="cine-bar cine-bar-top"></div>
    <div class="cine-bar cine-bar-bottom"></div>
</div>
```

- [ ] **Step 2: Replace hero depth layers with aurora orbs in `index.html`**

Inside `<section id="hero">`, find:
```html
<div class="hero-depth-layer hero-layer-1"></div>
<div class="hero-depth-layer hero-layer-2"></div>
```

Replace with:
```html
<div class="aurora-orb aurora-orb-1"></div>
<div class="aurora-orb aurora-orb-2"></div>
<div class="aurora-orb aurora-orb-3"></div>
```

- [ ] **Step 3: Remove film overlay CSS from `style.css`**

Delete the following CSS rule blocks entirely:
- `/* ============ FILM OVERLAYS ============ */` section (`.film-grain`, `@keyframes grainShift`, `.vignette`, `.lens-flare`, `.cinematic-bars`, `.cine-bar`, `.cinematic-bars.active .cine-bar`)

- [ ] **Step 4: Replace hero depth layer CSS with aurora orb CSS in `style.css`**

Remove `.hero-depth-layer`, `.hero-layer-1`, `.hero-layer-2` rules.

Add after the `#hero` block:
```css
/* Aurora Orbs */
.aurora-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(120px);
    opacity: 0;
    animation: auroraFadeIn 2s 1.2s ease forwards;
}
.aurora-orb-1 {
    width: 500px;
    height: 500px;
    top: -100px;
    left: -100px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.28), transparent 70%);
    filter: blur(120px);
}
.aurora-orb-2 {
    width: 400px;
    height: 400px;
    bottom: -80px;
    right: -80px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.22), transparent 70%);
    filter: blur(100px);
}
.aurora-orb-3 {
    width: 300px;
    height: 300px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(167, 139, 250, 0.14), transparent 70%);
    filter: blur(140px);
}
@keyframes auroraFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

- [ ] **Step 5: Add dot-grid background pattern to `body` in `style.css`**

In the `body { ... }` rule, replace the current `background:` value with:
```css
background:
    radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.12) 1px, transparent 0),
    linear-gradient(160deg, rgba(99, 102, 241, 0.08) 0%, transparent 28%),
    linear-gradient(20deg, rgba(6, 182, 212, 0.05) 0%, transparent 26%),
    var(--bg-primary);
background-size: 32px 32px, 100% 100%, 100% 100%, 100% 100%;
```

- [ ] **Step 6: Verify in browser**

Refresh `http://127.0.0.1:8000`. Confirm:
- No film grain noise overlay
- No cinematic letterbox bars
- Faint dot grid visible on background
- Indigo and cyan aurora glow in hero section

- [ ] **Step 7: Commit**

```bash
git add index.html style.css
git commit -m "design: remove film overlays, add aurora orbs and dot-grid background"
```

---

### Task 3: Preloader Upgrade

**Files:**
- Modify: `index.html` — subtitle text
- Modify: `style.css` — glitch colors, font references

- [ ] **Step 1: Update preloader subtitle text in `index.html`**

Find:
```html
<div class="preloader-subtitle">FULL STACK DEVELOPER</div>
```

Replace with:
```html
<div class="preloader-subtitle">AI AUTOMATION &middot; WEB DEVELOPMENT &middot; MS365</div>
```

- [ ] **Step 2: Update preloader glitch colors in `style.css`**

Find `.preloader-glitch::before` rule, change `color: var(--cyan-accent)` to `color: var(--primary)`.
Find `.preloader-glitch::after` rule, change `color: var(--blue-primary)` to `color: var(--cyan-accent)`.

Also update the `@keyframes glitchText` rule:
```css
@keyframes glitchText {
    0%, 85%, 100% { text-shadow: none; }
    87% { text-shadow: -3px 0 var(--primary), 3px 0 var(--cyan-accent); }
    89% { text-shadow: 3px 0 var(--primary), -3px 0 var(--cyan-accent); }
    91% { text-shadow: none; }
}
```

- [ ] **Step 3: Remove `var(--blue-primary)` references in preloader CSS**

In `style.css`, replace any remaining `var(--blue-primary)` in preloader rules with `var(--primary)`.

- [ ] **Step 4: Verify preloader**

Hard-refresh the page (`Ctrl+Shift+R`). Confirm:
- Preloader shows "USAMA" in Space Grotesk
- Glitch effect uses indigo + cyan colors
- Subtitle reads "AI AUTOMATION · WEB DEVELOPMENT · MS365"

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "design: upgrade preloader with Space Grotesk, indigo glitch, new subtitle"
```

---

### Task 4: Navigation Upgrade

**Files:**
- Modify: `style.css` — nav active state, scrolled border, color references

- [ ] **Step 1: Update nav active link indicator in `style.css`**

Find `.nav-link.active` rule. Replace with:
```css
.nav-link:hover, .nav-link.active { color: var(--text-primary); }
.nav-link:hover::after, .nav-link.active::after { width: 100%; }
.nav-link.active {
    background: rgba(99, 102, 241, 0.1);
    border-radius: 6px;
    padding: 4px 10px;
    text-shadow: none;
}
```

- [ ] **Step 2: Update scrolled navbar border**

Find `#navbar.scrolled` rule. Update `border-bottom`:
```css
#navbar.scrolled {
    padding: 10px 0;
    background: rgba(11, 15, 26, 0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}
```

- [ ] **Step 3: Update nav-link underline color**

Find `.nav-link::after` rule. Change `background: var(--cyan-accent)` to `background: var(--primary)`.

- [ ] **Step 4: Replace all `var(--blue-primary)` in nav CSS with `var(--primary)`**

Search `style.css` for `var(--blue-primary)` in the `/* ============ NAVIGATION ============ */` section and replace all instances with `var(--primary)`.

- [ ] **Step 5: Update mobile menu link hover color**

Find `.mobile-link:hover`. Change color to `var(--primary)`.

- [ ] **Step 6: Verify in browser**

Scroll down to trigger the scrolled navbar state. Confirm indigo border. Click a nav link and confirm indigo pill highlight on active item.

- [ ] **Step 7: Commit**

```bash
git add style.css
git commit -m "design: update navbar with indigo active state and scrolled border"
```

---

### Task 5: Hero Section Redesign

**Files:**
- Modify: `index.html` — hero badge, stat items, button classes
- Modify: `style.css` — badge, stats, buttons, name gradient, hero socials

- [ ] **Step 1: Wrap each stat item in a glass card in `index.html`**

Find the `.hero-stats` div. Replace with:
```html
<div class="hero-stats">
    <div class="stat-item">
        <span class="stat-number" data-count="3">0</span>
        <span class="stat-suffix">+</span>
        <span class="stat-label">Years Experience</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
        <span class="stat-number" data-count="50">0</span>
        <span class="stat-suffix">+</span>
        <span class="stat-label">Projects Completed</span>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
        <span class="stat-number" data-count="30">0</span>
        <span class="stat-suffix">+</span>
        <span class="stat-label">Happy Clients</span>
    </div>
</div>
```

- [ ] **Step 2: Update stat card CSS in `style.css`**

Find `.hero-stats` and `.stat-item` rules. Replace with:
```css
.hero-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: center;
    gap: 16px;
    max-width: 680px;
    margin: 0 auto;
}
.stat-item {
    text-align: center;
    padding: 20px 16px;
    background: rgba(99, 102, 241, 0.06);
    border: 1px solid rgba(99, 102, 241, 0.18);
    border-top: 3px solid var(--primary);
    border-radius: var(--card-radius);
    backdrop-filter: blur(10px);
    transition: all 0.3s var(--ease);
}
.stat-item:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.35);
    transform: translateY(-3px);
}
```

- [ ] **Step 3: Update hero badge CSS in `style.css`**

Find `.hero-badge` rule. Replace `border` and add background:
```css
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: rgba(34, 197, 94, 0.06);
    border: 1px solid rgba(34, 197, 94, 0.3);
    border-radius: 8px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    backdrop-filter: blur(10px);
    margin-bottom: 32px;
}
```

- [ ] **Step 4: Update `.highlight` color in `style.css`**

Find `.highlight { color: var(--cyan-accent); font-weight: 600; }` and change to:
```css
.highlight { color: var(--primary-light); font-weight: 600; }
```

- [ ] **Step 5: Update `.btn-primary` in `style.css`**

Find `.btn-primary` rule. Replace:
```css
.btn-primary {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 4px 25px rgba(99, 102, 241, 0.3);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 40px rgba(99, 102, 241, 0.45); background: var(--primary-dark); }
```

- [ ] **Step 6: Update `.btn-glass` in `style.css`**

```css
.btn-glass {
    background: rgba(99, 102, 241, 0.06);
    color: var(--primary-light);
    border: 1px solid rgba(99, 102, 241, 0.25);
    backdrop-filter: blur(12px);
}
.btn-glass:hover { background: rgba(99, 102, 241, 0.12); border-color: var(--primary); transform: translateY(-3px); }
```

- [ ] **Step 7: Update `.btn-outline` in `style.css`**

```css
.btn-outline {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-glow);
    backdrop-filter: blur(10px);
}
.btn-outline:hover { background: var(--bg-glass); border-color: var(--primary); transform: translateY(-3px); }
```

- [ ] **Step 8: Update hero social link hover in `style.css`**

Find `.social-link:hover`. Change color to `var(--primary-light)`.

- [ ] **Step 9: Verify hero section in browser**

Confirm: indigo CTA buttons, green badge border, indigo-highlighted keywords, stats in glass cards with indigo top border, aurora orbs glowing in background.

- [ ] **Step 10: Commit**

```bash
git add index.html style.css
git commit -m "design: redesign hero — indigo buttons, glass stat cards, green badge, aurora orbs"
```

---

### Task 6: About Section Upgrade

**Files:**
- Modify: `style.css` — terminal colors, floating card glassmorphism, profile glow, tags

- [ ] **Step 1: Update terminal prompt and header colors in `style.css`**

Find `.terminal-prompt`. Change `color: var(--cyan-accent)` to `color: var(--primary-light)`.

Find `.about-terminal`. Add `border-color: rgba(99, 102, 241, 0.2)`.

Find `.terminal-header`. Update background:
```css
.terminal-header {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px;
    background: rgba(99, 102, 241, 0.04);
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
}
```

- [ ] **Step 2: Update `.highlight-text` in `style.css`**

```css
.highlight-text { color: var(--primary-light) !important; font-style: italic; }
```

- [ ] **Step 3: Upgrade floating card glassmorphism in `style.css`**

Find `.about-floating-card`. Replace:
```css
.about-floating-card {
    position: absolute;
    display: flex; align-items: center; gap: 8px;
    padding: 10px 18px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.35);
    border-radius: var(--card-radius);
    font-size: 0.85rem; font-weight: 600;
    z-index: 3;
    animation: float 6s ease-in-out infinite;
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15);
}
```

Update icon colors per card:
```css
.about-floating-card.card-1 i { color: var(--primary-light); }
.about-floating-card.card-2 i { color: var(--cyan-accent); }
.about-floating-card.card-3 i { color: var(--violet-accent); }
```

Remove the old `.about-floating-card i { color: var(--cyan-accent); }` rule.

- [ ] **Step 4: Update profile image glow and border in `style.css`**

Find `.about-image-border`. Change `opacity` to `0.5` and keep gradient (already using `--gradient-primary` which now is indigo→cyan→violet).

Find `.about-image-glow`. Replace:
```css
.about-image-glow {
    position: absolute; inset: -18px; border-radius: 8px;
    background: linear-gradient(135deg, rgba(99,102,241,0.18), transparent 70%);
    z-index: 0; filter: blur(25px);
    transform: translateZ(-32px) scale(1.08);
}
```

- [ ] **Step 5: Update about tags to full-pill shape in `style.css`**

Find `.tag` rule. Change `border-radius: 8px` to `border-radius: 100px`. Add:
```css
.tag:hover { border-color: var(--primary); color: var(--primary-light); background: rgba(99,102,241,0.08); }
```

- [ ] **Step 6: Verify About section in browser**

Confirm: terminal prompt in indigo, floating cards with stronger glass effect (each with different icon color), profile glow in indigo, tags as full pills.

- [ ] **Step 7: Commit**

```bash
git add style.css
git commit -m "design: upgrade About section — indigo terminal, glassmorphism floating cards, pill tags"
```

---

### Task 7: Skills Section — Bento Grid

**Files:**
- Modify: `index.html` — add `skill-featured` class to featured skills, remove skill-bar divs
- Modify: `style.css` — bento grid CSS, remove skill-bar styles, upgrade tab pills

- [ ] **Step 1: Remove all `.skill-bar` divs from `index.html`**

In all 4 skill panels (`#fullstack`, `#ms365`, `#ai`, `#delivery`), remove every occurrence of:
```html
<div class="skill-bar"><div class="skill-fill" style="--fill:XX%"></div></div>
```
There are ~74 of these across all panels. Remove them all.

- [ ] **Step 2: Add `skill-featured` class to featured skills in `index.html`**

In the `#fullstack` panel, add `skill-featured` class to these skill cards:
- HTML5 (`data-skill="95"`)
- JavaScript (`data-skill="90"`)
- React.js (`data-skill="87"`)
- Tailwind CSS (`data-skill="90"`)

In the `#ms365` panel:
- Microsoft 365 Admin (`data-skill="92"`)
- MS365 GCC High (`data-skill="86"`)

In the `#ai` panel:
- OpenAI / Claude APIs (`data-skill="90"`)
- Zapier Workflows (`data-skill="90"`)

In the `#delivery` panel:
- Git / GitHub (`data-skill="88"`)
- Docker (`data-skill="85"`)

Example of a featured card (add class alongside existing classes):
```html
<div class="skill-card skill-featured" data-skill="95">
```

- [ ] **Step 3: Remove skill-bar CSS from `style.css`**

Delete these rule blocks:
```css
.skill-bar { ... }
.skill-fill { ... }
.skill-card.animated .skill-fill { ... }
```

- [ ] **Step 4: Add bento grid support to skill cards in `style.css`**

Find `.skills-grid` rule. Replace:
```css
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 180px), 1fr));
    gap: 16px;
}
.skill-card.skill-featured {
    grid-column: span 2;
}
```

- [ ] **Step 5: Update `.skill-card` to remove bottom dead space from missing bars in `style.css`**

Find `.skill-card` rule. Update:
```css
.skill-card {
    background: var(--gradient-surface), var(--bg-glass);
    border: 1px solid var(--border-color);
    border-radius: var(--card-radius);
    padding: 24px 18px;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: all 0.4s var(--ease-out);
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    will-change: transform;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
    min-height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
}
```

- [ ] **Step 6: Update skill card hover to indigo in `style.css`**

Find `.skill-card:hover`. Replace:
```css
.skill-card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: var(--shadow-blue); }
.skill-card:hover .skill-icon { color: var(--cyan-accent); transform: scale(1.15); }
```

Update `.skill-icon` default:
```css
.skill-icon { font-size: 2rem; color: var(--primary); margin-bottom: 8px; transition: all 0.3s; }
```

- [ ] **Step 7: Upgrade skill tabs to pill toggles in `style.css`**

Find `.skill-tab` rule. Replace:
```css
.skill-tab {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 22px;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 100px;
    color: var(--text-secondary);
    font-family: var(--font-primary);
    font-size: 0.85rem; font-weight: 500;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
    min-height: 44px;
    cursor: pointer;
}
.skill-tab:hover { border-color: var(--primary); color: var(--text-primary); }
.skill-tab.active {
    background: rgba(99, 102, 241, 0.15);
    border-color: var(--primary);
    color: var(--primary-light);
    box-shadow: var(--shadow-blue);
}
```

- [ ] **Step 8: Verify Skills section in browser**

Confirm: no progress bars, featured skills span 2 columns, tabs are pill-shaped, icon color is indigo, hover shifts to cyan.

- [ ] **Step 9: Commit**

```bash
git add index.html style.css
git commit -m "design: skills section bento grid — remove progress bars, featured card spans, pill tabs"
```

---

### Task 8: Services Section — Asymmetric Bento

**Files:**
- Modify: `index.html` — add `service-wide` class to wide cards
- Modify: `style.css` — bento grid layout, per-service icon colors, featured tile gradient

- [ ] **Step 1: Add `service-wide` classes to wide service cards in `index.html`**

In the services grid, add `service-wide` to:
- Web Development card: `<div class="service-card service-wide">`
- MS365 & GCC High card: `<div class="service-card service-wide">`
- Server & Cloud Handling card: `<div class="service-card service-wide">`

Also add specific ID classes for per-service icon colors:
- Web Dev: add class `service-web`
- AI Automation: add class `service-ai`
- Zapier/Make/n8n: add class `service-zapier`
- MS365 GCC High: add class `service-ms365`
- Tenant Migration: add class `service-migration`
- Server & Cloud: add class `service-server`

Example:
```html
<div class="service-card service-wide service-web">
```

- [ ] **Step 2: Replace services grid CSS in `style.css`**

Find `.services-grid` rule. Replace:
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
}
.service-card.service-wide {
    grid-column: span 2;
}
```

- [ ] **Step 3: Add per-service icon accent colors in `style.css`**

After the `.service-card:hover .service-icon` rule, add:
```css
.service-web .service-icon { background: rgba(99,102,241,0.1); border-color: rgba(99,102,241,0.2); color: var(--primary); }
.service-ai .service-icon { background: rgba(6,182,212,0.1); border-color: rgba(6,182,212,0.2); color: var(--cyan-accent); }
.service-zapier .service-icon { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.2); color: var(--violet-accent); }
.service-ms365 .service-icon { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.2); color: var(--green-accent); }
.service-migration .service-icon { background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.2); color: var(--amber-accent); }
.service-server .service-icon { background: rgba(244,63,94,0.1); border-color: rgba(244,63,94,0.2); color: var(--rose-accent); }
```

- [ ] **Step 4: Add featured tile gradient overlay for wide cards in `style.css`**

```css
.service-card.service-wide::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(167,139,250,0.04), transparent 70%);
    border-radius: var(--card-radius);
    pointer-events: none;
    z-index: 0;
}
.service-card.service-wide > * { position: relative; z-index: 1; }
```

- [ ] **Step 5: Update service card hover glow color in `style.css`**

Find `.service-card:hover`. Change `box-shadow` to `var(--shadow-glow)` (already uses indigo now via updated variable).

- [ ] **Step 6: Handle responsive for services bento in `style.css`**

In the `@media (max-width: 1024px)` block, add:
```css
.services-grid { grid-template-columns: repeat(2, 1fr); }
.service-card.service-wide { grid-column: span 2; }
```

In the `@media (max-width: 768px)` block, update:
```css
.services-grid { grid-template-columns: 1fr; }
.service-card.service-wide { grid-column: span 1; }
```

- [ ] **Step 7: Verify Services section in browser**

Confirm: 3-column bento with Web Dev, MS365, Server cards spanning 2 columns; each service icon has unique accent color; wide cards have subtle gradient overlay.

- [ ] **Step 8: Commit**

```bash
git add index.html style.css
git commit -m "design: services asymmetric bento — wide cards, per-service icon colors, gradient overlay"
```

---

### Task 9: Projects Section — 2-Column Masonry Grid

**Files:**
- Modify: `index.html` — replace horizontal track with grid, add featured classes
- Modify: `style.css` — replace horizontal scroll CSS with masonry grid, card accent borders

- [ ] **Step 1: Replace projects horizontal track markup in `index.html`**

Find:
```html
<div class="projects-horizontal-wrapper depth-stage">
    <div class="projects-horizontal-track">
        <!-- all project cards -->
    </div>
</div>
```

Replace wrapper + track with:
```html
<div class="container">
    <div class="projects-grid depth-stage">
        <!-- all project cards go here, same cards, same content -->
    </div>
</div>
```

Move all `.project-card-cinema` divs inside `.projects-grid`. Keep all card content identical.

- [ ] **Step 2: Add `project-featured` class to featured projects in `index.html`**

Add `project-featured` class to:
- AI Automation Workflow Hub card
- n8n Automation Server card

Example: `<div class="project-card-cinema project-featured">`

- [ ] **Step 3: Add alternating accent border classes in `index.html`**

Add color accent classes to each project card in order:
1. E-Commerce Platform: `project-accent-indigo`
2. MS365 GCC High Dashboard: `project-accent-cyan`
3. AI Automation Workflow Hub: `project-accent-violet` (+ featured)
4. Tenant Migration Runbook: `project-accent-green`
5. CRM Lead Automation: `project-accent-indigo`
6. n8n Automation Server: `project-accent-cyan` (+ featured)
7. Claude Skills Support Assistant: `project-accent-violet`
8. Server Hardening Package: `project-accent-green`
9. Purview Compliance Workflow: `project-accent-indigo`
10. Operations Analytics Dashboard: `project-accent-cyan`

- [ ] **Step 4: Replace horizontal scroll CSS with masonry grid in `style.css`**

Delete the `/* ============ PROJECTS — HORIZONTAL SCROLL ============ */` section entirely (`.projects-horizontal-wrapper`, `.projects-horizontal-track`).

Add:
```css
/* ============ PROJECTS — MASONRY GRID ============ */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}
.project-card-cinema.project-featured {
    grid-column: span 2;
}
.project-card-cinema.project-featured .project-image {
    aspect-ratio: 21 / 9;
}

/* Accent border colors */
.project-accent-indigo { border-top: 3px solid var(--primary); }
.project-accent-cyan { border-top: 3px solid var(--cyan-accent); }
.project-accent-violet { border-top: 3px solid var(--violet-accent); }
.project-accent-green { border-top: 3px solid var(--green-accent); }

/* Project card overlay — indigo gradient */
.project-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.82), rgba(6,182,212,0.6));
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: all 0.4s;
}

/* Project card base */
.project-card-cinema {
    min-width: unset;
    max-width: unset;
    background: var(--gradient-surface), var(--bg-glass);
    border: 1px solid var(--border-color);
    border-radius: var(--card-radius);
    overflow: hidden;
    backdrop-filter: blur(10px);
    transition: all 0.5s var(--ease-out);
    position: relative;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
}
.project-card-cinema:hover { border-color: var(--primary); transform: translateY(-6px); box-shadow: var(--shadow-glow); }
```

- [ ] **Step 5: Update project category badge color in `style.css`**

Find `.project-category`. Replace `color: var(--cyan-accent)` with `color: var(--primary-light)`.

- [ ] **Step 6: Handle responsive for projects grid in `style.css`**

In `@media (max-width: 768px)`, replace the old horizontal track mobile styles:
```css
.projects-grid {
    grid-template-columns: 1fr;
}
.project-card-cinema.project-featured {
    grid-column: span 1;
}
.project-card-cinema.project-featured .project-image {
    aspect-ratio: 16 / 9;
}
.project-card-cinema:hover { transform: none; }
```

- [ ] **Step 7: Verify Projects section in browser**

Confirm: 2-column masonry grid, featured cards span full width, each card has colored top border, hover overlay is indigo gradient, section no longer requires horizontal dragging.

- [ ] **Step 8: Commit**

```bash
git add index.html style.css
git commit -m "design: projects masonry grid — 2-col layout, featured cards, accent borders, indigo overlay"
```

---

### Task 10: Experience / Timeline Upgrade

**Files:**
- Modify: `style.css` — timeline line, dot, card, date, company colors

- [ ] **Step 1: Update timeline colors in `style.css`**

Find `.timeline-line`. Keep structure, update `background: rgba(0,102,255,0.08)` to `rgba(99,102,241,0.1)`.

Find `.timeline-line-fill`. Change `background` to `linear-gradient(to bottom, var(--primary), var(--cyan-accent))`.

Find `.timeline-dot`. Change `border: 2px solid var(--blue-primary)` to `border: 2px solid var(--primary)`.

Find `.timeline-dot-inner`. Change `background: var(--blue-primary)` to `background: var(--violet-accent)`.

Find `.timeline-dot-pulse`. Change `border: 1px solid var(--blue-primary)` to `border: 1px solid var(--primary)`.

- [ ] **Step 2: Update timeline item hover dot colors in `style.css`**

Find `.timeline-item:hover .timeline-dot`. Change `border-color: var(--cyan-accent)` to `border-color: var(--cyan-accent)` (keep cyan here — intentional contrast).

Find `.timeline-item:hover .timeline-dot-inner`. Change `background: var(--cyan-accent)` → keep as `var(--cyan-accent)`.

- [ ] **Step 3: Update timeline date and company colors in `style.css`**

Find `.timeline-date`. Change `color: var(--cyan-accent)` to `color: var(--primary-light)`.

Find `.timeline-company`. Change `color: var(--blue-light)` to `color: var(--cyan-accent)`.

- [ ] **Step 4: Add left-border accent to timeline cards in `style.css`**

Find `.timeline-card`. Add:
```css
border-left: 3px solid rgba(99, 102, 241, 0.3);
```

Find `.timeline-card:hover`. Change `border-color` to `var(--primary)`, add `border-left-color: var(--primary)`.

- [ ] **Step 5: Update timeline tags in `style.css`**

Find `.timeline-tags span`. Change `color: var(--blue-light)` to `color: var(--primary-light)`. Change `border: 1px solid rgba(0,102,255,0.12)` to `rgba(99,102,241,0.15)`. Change `background: rgba(0,102,255,0.06)` to `rgba(99,102,241,0.07)`.

- [ ] **Step 6: Verify Timeline in browser**

Confirm: indigo gradient line, violet inner dots, indigo date labels, cyan company names, left-border accent on cards.

- [ ] **Step 7: Commit**

```bash
git add style.css
git commit -m "design: timeline upgrade — indigo gradient line, violet dots, accent border cards"
```

---

### Task 11: Contact Section + Footer + Back-to-Top

**Files:**
- Modify: `index.html` — footer tagline text
- Modify: `style.css` — contact icon colors, form colors, social hover, footer border, back-to-top

- [ ] **Step 1: Update footer tagline in `index.html`**

Find:
```html
<p class="footer-text">Designed & Built by Usama — A cinematic experience.</p>
```

Replace with:
```html
<p class="footer-text">Designed & Built by Usama &mdash; AI Automation &middot; Web Development &middot; MS365 Expert</p>
```

- [ ] **Step 2: Update contact icon box colors in `style.css`**

Find `.contact-icon` rule. Replace:
```css
.contact-icon {
    width: 48px; height: 48px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-radius: var(--card-radius);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; color: var(--primary); flex-shrink: 0;
}
```

- [ ] **Step 3: Update contact card hover in `style.css`**

Find `.contact-card:hover`. Ensure `border-color: var(--primary)` and `box-shadow: var(--shadow-blue)`.

- [ ] **Step 4: Update contact social link hover in `style.css`**

Find `.contact-social-link:hover`. Change `border-color: var(--blue-primary)` to `var(--primary)`. Change `color: var(--cyan-accent)` to `var(--primary-light)`.

- [ ] **Step 5: Update form focus colors in `style.css`**

Find `.form-group input:focus, .form-group textarea:focus`. Change `border-bottom-color: var(--blue-primary)` to `var(--primary)`.

Find `.form-group input:focus ~ label, .form-group textarea:focus ~ label` etc. Change `color: var(--cyan-accent)` to `color: var(--primary-light)`.

Find `.form-line`. The `background: var(--gradient-primary)` already uses new indigo gradient — no change needed.

- [ ] **Step 6: Update footer top border in `style.css`**

Find `#footer`. Change `border-top: 1px solid var(--border-color)` to:
```css
border-top: none;
background: linear-gradient(to top, rgba(11,15,26,1), transparent) top/100% 1px no-repeat, var(--bg-primary);
```

Actually simpler — keep border-top but add a gradient pseudo-element. Replace with:
```css
#footer { position: relative; z-index: 1; padding: 40px 0; }
#footer::before {
    content: '';
    position: absolute;
    top: 0; left: 5%; right: 5%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4) 50%, transparent);
}
```

- [ ] **Step 7: Update back-to-top button in `style.css`**

Find `.back-to-top`. Change `color: var(--cyan-accent)` to `color: var(--primary-light)`.

Find `.back-to-top:hover`. Change `border-color: var(--cyan-accent)` to `var(--primary)`. Change box-shadow to `0 0 25px rgba(99,102,241,0.2)`.

Find `.progress-ring-fill`. Change `stroke: var(--cyan-accent)` to `stroke: var(--primary)`.

- [ ] **Step 8: Verify Contact + Footer in browser**

Confirm: indigo contact icons, indigo form focus states, indigo gradient footer top-line, "AI Automation · Web Development · MS365 Expert" tagline, indigo back-to-top button.

- [ ] **Step 9: Commit**

```bash
git add index.html style.css
git commit -m "design: contact + footer — indigo icons, form focus, gradient footer line, updated tagline"
```

---

### Task 12: Global Cleanup & Responsive Polish

**Files:**
- Modify: `style.css` — fix any remaining `var(--blue-primary)` references, section dividers, scrollbar

- [ ] **Step 1: Replace all remaining `var(--blue-primary)` references in `style.css`**

Search for every remaining `var(--blue-primary)` or `--blue-primary:` in `style.css` and replace with `var(--primary)`. Also replace `var(--blue-light)` with `var(--primary-light)` and `var(--blue-neon)` with `var(--cyan-accent)`.

- [ ] **Step 2: Update scrollbar colors in `style.css`**

Find `html::-webkit-scrollbar-thumb`. Change `background: var(--blue-primary)` to `background: var(--primary)`.

Find `html { scrollbar-color: var(--blue-primary) ... }`. Change to `scrollbar-color: var(--primary) var(--bg-secondary)`.

- [ ] **Step 3: Update section divider glow in `style.css`**

Find `.section::before` pseudo rule. Change `var(--border-glow)` — already uses `--border-glow` which now maps to indigo. No change needed.

- [ ] **Step 4: Update `::selection` color in `style.css`**

```css
::selection { background: rgba(99, 102, 241, 0.3); color: var(--cyan-accent); }
```

- [ ] **Step 5: Update section-line gradient reference in `style.css`**

Find `.section-line`. The `background: var(--gradient-primary)` already updated. Confirm it renders correctly.

- [ ] **Step 6: Verify responsive at key breakpoints**

Test in browser DevTools:
- 375px (iPhone SE): no horizontal scroll, hero stacks cleanly, skills single column, services single column, projects single column
- 768px (iPad): 2-col skills, 2-col services (wide cards span 2), 2-col projects
- 1024px (iPad Pro): 3-col services bento, 2-col projects, full nav visible
- 1440px (desktop): full layout, 2-col projects with featured full-width

- [ ] **Step 7: Final full-page visual check**

Scroll through the entire page and confirm:
- No Playfair Display serif text anywhere
- No film grain, no letterbox bars
- Consistent indigo/cyan/violet palette everywhere
- All cards at 12px border-radius
- Dot grid visible on background
- Aurora orbs glow in hero

- [ ] **Step 8: Final commit**

```bash
git add index.html style.css
git commit -m "design: global cleanup — replace all blue-primary refs, scrollbar, selection, responsive polish"
```

---

## Self-Review

**Spec coverage check:**
- ✅ CSS Variables updated (Task 1)
- ✅ Fonts: Space Grotesk + DM Sans (Task 1)
- ✅ Film overlays removed (Task 2)
- ✅ Aurora orbs added (Task 2)
- ✅ Dot grid background (Task 2)
- ✅ Preloader upgrade (Task 3)
- ✅ Navigation indigo (Task 4)
- ✅ Hero — badge, stats, buttons, gradient (Task 5)
- ✅ About — terminal, floating cards, glow, tags (Task 6)
- ✅ Skills bento grid, no progress bars, pill tabs (Task 7)
- ✅ Services asymmetric bento, per-service icon colors (Task 8)
- ✅ Projects 2-col masonry, featured cards, accent borders (Task 9)
- ✅ Timeline — gradient line, violet dots, accent borders (Task 10)
- ✅ Contact + footer — indigo icons, form, footer line, tagline (Task 11)
- ✅ Back-to-top indigo (Task 11)
- ✅ Global `--blue-primary` cleanup, scrollbar (Task 12)
- ✅ Responsive verification at all breakpoints (Task 12)

**No placeholders found.**
**Type/name consistency:** All CSS class names referenced in HTML steps match what CSS steps define. `skill-featured`, `service-wide`, `service-web/ai/zapier/ms365/migration/server`, `project-featured`, `project-accent-*` are all consistently named.
