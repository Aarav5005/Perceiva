# Perceiva Website — Full Planning Document
## For Antigravity Agent Build

---

## 1. Project Overview

**What this is:** The official marketing and early-access website for Perceiva — an AI classroom intelligence platform for premium Indian schools (IB and ICSE boards). This is a pre-launch site. Its only job is to make the right people feel something, understand what Perceiva does, and sign up for early access.

**Live domain:** perceiva.in
**Hosting:** Vercel
**Status:** Pre-launch — no paying customers yet, no fabricated stats, no fake traction

**Founders:** Aarav Panchal + Chakrashen Maurya, IIT Jodhpur

---

## 2. Brand Identity

### Logo
- Eye icon with facial landmark dot-mesh on the left half
- Teal iris/pupil (#5EEAD4)
- Dark indigo background (#0B0F1A)
- Wordmark: "Perceiva" in geometric sans-serif (Space Grotesk feel)
- Tagline: "What if your classroom could think?"
- Files needed: SVG version of eye icon (iris + outer shape as separate layers for animation)

### Color System
```
#0B0F1A  — primary background (near-black indigo)
#1C2438  — elevated surface / cards
#5EEAD4  — teal accent (detection / seeing moments)
#F5A623  — amber accent (insight / understanding moments, use sparingly)
#E8E6E1  — primary text (off-white)
#FFFFFF  — pure white (headings only, used rarely)
```

### Typography
```
Display:  Space Grotesk — geometric, technical, confident
Body:     Inter — clean, readable
Mono:     IBM Plex Mono — data labels, status tags only (sparingly)
```

### Voice / Tone
- Quiet, cinematic, deliberate — NOT loud, NOT hyped
- One idea at a time, never cluttered
- Honest about being pre-launch
- Emotional truth first, product explanation second
- Never say "facial recognition" — say "attention signals," "engagement patterns," "classroom intelligence"
- Never fabricate stats, customers, or case studies

---

## 3. Overall Aesthetic Direction

**Primary reference:** izanami-official.com
- Cinematic, atmospheric, minimal text floating in space
- Deep breathing room between elements
- Dark, foggy, something emerging from darkness feeling
- Slow deliberate scroll pace

**Structural references:**
- haoqi.design — horizontal scroll when scrolling down (content moves LEFT as user scrolls DOWN)
- cinetica.studio — scroll-triggered video autoplay, smooth section transitions
- noth.in — clean dark aesthetic, letting visuals speak over text
- quartermaster.us — floating UI card mockups showing actual product

**The mood in one sentence:** "Something profound is being revealed" — not "look at our cool AI product."

---

## 4. Interactive Signature Element

**Cursor-following Perceiva eye:**
- The logo eye icon follows the user's cursor across the screen
- The iris/pupil (teal circle) moves independently within the eye shape toward the cursor
- Feels like the product is literally watching — thematically perfect since Perceiva reads attention
- On mobile: eye follows scroll position instead of cursor (no cursor on mobile)
- Appears subtly in hero and possibly in the "How It Works" section
- NOT intrusive — subtle, elegant, notices you without announcing itself

---

## 5. Page Structure (Section by Section)

### SECTION 0 — Loading Screen
**Reference:** Izanami loading experience
**Behavior:**
- Pure black screen (#0B0F1A)
- Tagline appears word by word using anime.js:
  - "What" → pause → "if" → pause → "your classroom" → pause → "could think?" 
- Each word fades in with a subtle upward drift
- After full tagline appears: Perceiva logo fades in centered
- Loading counter counts 0 → 100 in bottom left (like Izanami's "100")
- Total duration: ~3 seconds, then main page fades in
- On mobile: identical experience, same timing

**Animation library:** anime.js (letter/word reveal)

---

### SECTION 1 — Hero
**Behavior:**
- Full viewport height
- Deep dark atmospheric background — NOT a flat color
  - Option A: subtle CSS animated gradient fog effect (dark indigo with slow-moving lighter patches)
  - Option B: Three.js atmospheric particle field (very subtle, like dust in a dark room)
- Perceiva logo top left
- Nav: Logo left + "Get Early Access" button right (transparent, solidifies on scroll)
- Center: Large headline fades in after loading screen
- Cursor-following eye is active here

**Copy:**
```
Headline:  "What if your classroom could think?"
Subhead:   "Perceiva reads attention, detects struggle, and 
            understands every student — in real time."
CTA:       "Join the early access list ↓"
Small tag: "Currently building with founding schools · IIT Jodhpur"
```

**Scroll indicator:** "SCROLL" text bottom right, like Izanami

---

### SECTION 2 — The Problem (Scroll-triggered text reveal)
**Behavior:**
- Dark section, minimal
- As user scrolls, lines appear ONE AT A TIME — typewriter/fade-up reveal
- Each line has a pause before the next one appears
- GSAP ScrollTrigger handles the reveal timing
- No background image — pure dark with text

**Copy (lines appear sequentially):**
```
Line 1: "A teacher can't watch 30 faces at once."
Line 2: "By the time marks fall, the struggle is old news."
Line 3: "Some students never raise their hand."
Line 4: "The quietest student is often the one who needs help most."
Line 5: "Perceiva sees what teachers can't."
```

Line 5 appears in teal (#5EEAD4) — the payoff line, different color.

---

### SECTION 3 — Horizontal Scroll (How It Works)
**Reference:** haoqi.design side scroll
**Behavior:**
- Section is PINNED while user scrolls vertically
- As user scrolls DOWN, content moves LEFT — 3 panels slide into view
- Each panel is full viewport width
- GSAP ScrollTrigger + horizontal scroll pin

**Panel 1 — "It Sees" (teal accent)**
```
Large number: 01
Label:        IT SEES
Headline:     "Every face, every frame."
Body:         "A classroom camera reads attention patterns across 
               all students simultaneously — without recording or 
               storing any video."
Visual:       Animated facial landmark mesh (Three.js point cloud)
              showing dots connecting across a face silhouette
```

**Panel 2 — "It Understands" (amber accent)**
```
Large number: 02
Label:        IT UNDERSTANDS
Headline:     "Focused. Drifting. Confused."
Body:         "Head orientation, gaze direction, and behavioral 
               patterns combine into a real-time attention state 
               per student — updated continuously."
Visual:       Split UI mockup showing "Aarav — Focused" (green)
              and "Student — Distracted" (red) side by side
```

**Panel 3 — "It Remembers" (white accent)**
```
Large number: 03
Label:        IT REMEMBERS
Headline:     "A picture of every student, over time."
Body:         "Session logs, engagement trends, and attention 
               patterns build a term-long picture — not just 
               a snapshot."
Visual:       Session summary mockup showing the timeline bar
              (green/red blocks) from perceiva_demo.py output
```

**Mobile fallback:** Vertical scroll, panels stack — no horizontal movement on mobile

---

### SECTION 4 — Demo Video
**Reference:** cinetica.studio + noth.in scroll-triggered video
**Behavior:**
- Full viewport width, dark section
- As user scrolls into this section, video AUTOPLAYS (muted)
- Video: screen recording of perceiva_demo.py — showing:
  - Live detection with "Aarav — Focused" green box
  - Then "Aarav — Distracted" red box when looking away
  - Then session summary screen with timeline bar
- Video is centered, slightly inset (not edge-to-edge) with dark padding
- Text appears OVER the video as overlay:
  - Top left corner: "LIVE DEMO" in IBM Plex Mono, teal
  - Bottom: "This is real. Running now. On a ₹80k classroom PC."

**Video specs needed:**
- Format: MP4, H.264
- Duration: 60-90 seconds
- Resolution: 1920x1080 minimum
- Content: Clean run of perceiva_demo.py with 2 enrolled students
- YOU WILL RECORD AND ADD THIS LATER — placeholder for now

---

### SECTION 5 — Who It's For
**Behavior:**
- Four persona cards in a 2x2 grid (desktop) or vertical stack (mobile)
- Each card has: icon, role name, one pain point line, one Perceiva benefit line
- Hover: card lifts, border appears in teal
- Click: smoothly scrolls to form AND pre-selects that role in the form

**Cards:**
```
🏫 PRINCIPAL
Pain:    "You manage outcomes but can't see inside classrooms."
Benefit: "Term-long engagement data across every class, every teacher."

👩‍🏫 TEACHER  
Pain:    "You can't watch 30 students and teach at the same time."
Benefit: "Know who's lost before they give up. While class is happening."

👨‍👩‍👧 PARENT
Pain:    "You only hear about problems after the test."
Benefit: "Understand your child's classroom reality, not just their marks."

🧑‍🎒 STUDENT
Pain:    "You struggle but no one notices until it's too late."
Benefit: "Be seen. Not just graded."
```

---

### SECTION 6 — Privacy (Trust Signal)
**Behavior:**
- Dark card/panel treatment, IBM Plex Mono font
- Feels like a technical spec, not a marketing promise
- No animations — deliberately still and serious

**Copy:**
```
DATA HANDLING — PLAIN ENGLISH

No video stored.
Faces converted to numbers, not images.
Everything processed on your school's device.
Nothing leaves the classroom without parent consent.
Any student's data deleted on request, immediately.

Built for DPDP Act 2023 compliance.
```

---

### SECTION 7 — Early Access Form
**Behavior:**
- Typeform-style: ONE question at a time
- Each question fades in, previous question fades out
- anime.js handles transitions between questions
- Progress indicator: thin teal line at top showing completion %
- Large tap-friendly on mobile (minimum 48px touch targets)
- Pre-selects role if user clicked a persona card in Section 5

**Questions in order:**
```
Q1: "Who are you?"
    → Four large cards: Principal / Teacher / Parent / Student
    
Q2: "Which school are you from?"
    → Text input: School name
    → Text input: City
    
Q3: "What board does your school follow?"
    → Four options: IB / ICSE / CBSE / Other
    
Q4: "What's your biggest classroom challenge right now?"
    → Optional textarea (skip button available)
    
Q5: "Last one — your email, so we can reach you."
    → Email input
    → Submit button: "I'm in →"

Final screen:
    Large text: "You're on the list."
    Subtext:    "We'll reach out personally. Not a newsletter."
    Small:      "Built by Aarav & Chakrashen · IIT Jodhpur"
```

**Backend:** Formspree (free tier, no server needed)
- Endpoint: configure at formspree.io before build
- Responses go to your email automatically

---

### SECTION 8 — Footer
```
Left:   Perceiva logo (small)
Center: "Built by founders at IIT Jodhpur"
        Contact: hello@perceiva.in
Right:  Social links (once created)
        © 2026 Perceiva
Bottom: "perceiva.in is secured · Data processed in India"
```

---

## 6. Animation System

### Libraries and their specific jobs
```
anime.js        → Loading screen word-by-word reveal
                → Form question transitions (fade in/out)
                → Any text character-level animations

GSAP +          → Horizontal scroll pin (Section 3)
ScrollTrigger   → Scroll-triggered text reveals (Section 2)
                → Video autoplay trigger (Section 4)
                → Section entrance animations

Framer Motion   → React component animations
                → Hover states on cards
                → Nav solidify on scroll
                → Page-level transitions

Three.js /      → Facial landmark mesh visual (Section 3, Panel 1)
R3F             → Hero atmospheric particles (if using Option B)
                → Cursor-following eye iris movement

CSS             → Atmospheric fog/gradient animation (hero background)
                → Smooth color transitions
                → Loading counter animation
```

### Performance rules
- Three.js scene: max 500 particles, no shadows, simple geometry only
- All animations respect `prefers-reduced-motion` media query
- Mobile: disable Three.js entirely, use CSS fallbacks
- Images: WebP format, lazy loaded, next/image component
- Video: preload="none" until ScrollTrigger fires

---

## 7. Tech Stack

```
Framework:    Next.js 14 (App Router)
Styling:      Tailwind CSS
Animation:    anime.js + GSAP + ScrollTrigger + Framer Motion
3D:           Three.js via @react-three/fiber + @react-three/drei
Form backend: Formspree
Hosting:      Vercel (free tier)
Domain:       perceiva.in (already purchased)
Analytics:    Plausible (privacy-respecting, thematically consistent)
Fonts:        Google Fonts — Space Grotesk + Inter + IBM Plex Mono
```

### Folder structure
```
perceiva-website/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page, section assembly
│   └── globals.css         # Base styles, CSS variables
├── components/
│   ├── LoadingScreen.tsx   # anime.js word reveal + counter
│   ├── Nav.tsx             # Logo + CTA, solidifies on scroll
│   ├── Hero.tsx            # Headline + atmospheric bg + cursor eye
│   ├── CursorEye.tsx       # The cursor-following logo eye
│   ├── ProblemSection.tsx  # ScrollTrigger text reveal
│   ├── HorizontalScroll.tsx # GSAP pin + 3 panels
│   ├── Panel1Sees.tsx      # Landmark mesh visual
│   ├── Panel2Understands.tsx # UI mockup visual
│   ├── Panel3Remembers.tsx # Timeline bar visual
│   ├── DemoVideo.tsx       # Scroll-triggered autoplay
│   ├── PersonaCards.tsx    # 4 audience cards
│   ├── PrivacySection.tsx  # Mono font trust card
│   ├── EarlyAccessForm.tsx # Typeform-style multi-step
│   └── Footer.tsx
├── lib/
│   ├── animations.ts       # Reusable animation configs
│   └── formspree.ts        # Form submission logic
├── public/
│   ├── logo/
│   │   ├── perceiva-logo.svg      # Full logo (icon + wordmark)
│   │   ├── perceiva-icon.svg      # Eye icon only (for cursor animation)
│   │   └── perceiva-favicon.ico
│   ├── video/
│   │   └── perceiva-demo.mp4      # YOU ADD THIS LATER
│   └── fonts/                     # Self-hosted font fallbacks
└── skills/                        # Antigravity agent skills (see Section 8)
```

---

## 8. Antigravity Agent Skills

These are the skills the Antigravity agent needs to build and maintain this project.

### SKILL 01 — context.md (Context Saving)
**Purpose:** Saves and loads the full project context so the agent never loses state between sessions.

**What it stores:**
```
- Current build phase (which sections are done/in-progress/not started)
- Last known working state of each component
- Open bugs or issues
- Decisions made (e.g. "chose CSS fog over Three.js for hero")
- Assets available (logo SVG: YES/NO, demo video: YES/NO)
- Formspree endpoint URL (once configured)
- Vercel deployment URL
- Any deferred decisions
```

**Format:** Plain markdown file updated at the end of every session

---

### SKILL 02 — design-system.md
**Purpose:** Single source of truth for all visual decisions — agent reads this before touching any UI.

**Contents:**
```
- Exact hex values for all colors
- Font names, weights, sizes for each text role
- Spacing scale (which Tailwind classes to use)
- Animation timing standards (duration, easing curves)
- Border radius standards
- Which library handles which animation (no overlap)
- Mobile breakpoint behavior for each section
```

---

### SKILL 03 — section-builder.md
**Purpose:** Step-by-step instructions for building each section in isolation — agent builds one section at a time, tests it, commits, then moves to next.

**Build order:**
```
Phase 1 (Foundation):
  1. Project setup (Next.js + all dependencies installed)
  2. Global styles + CSS variables
  3. Font loading
  4. Nav component

Phase 2 (Core sections, no animation yet):
  5. LoadingScreen (static version first)
  6. Hero (static layout)
  7. ProblemSection (static text)
  8. HorizontalScroll (static 3 panels)
  9. DemoVideo (placeholder box)
  10. PersonaCards (static)
  11. PrivacySection
  12. EarlyAccessForm (static, all questions visible)
  13. Footer

Phase 3 (Animation layer):
  14. anime.js loading screen reveal
  15. GSAP ScrollTrigger text reveals
  16. GSAP horizontal scroll pin
  17. Framer Motion card hovers + section entrances
  18. Three.js cursor eye
  19. Three.js landmark mesh (Panel 1)
  20. Video autoplay trigger
  21. Form multi-step transitions

Phase 4 (Integration + Polish):
  22. Formspree form wiring
  23. Persona card → form role pre-select
  24. Mobile responsive pass (every section)
  25. Performance audit (Lighthouse)
  26. Vercel deployment
  27. perceiva.in domain connection
  28. Plausible analytics
```

---

### SKILL 04 — component-specs.md
**Purpose:** Detailed spec for each component — props, behavior, edge cases — so agent builds exactly what's needed, not a generic version.

**Example entry:**
```
## CursorEye.tsx

Purpose: Logo eye icon that follows cursor. Iris moves toward cursor.

Props: none (reads window mouse position internally)

Behavior:
- Outer eye shape: fixed, does not move
- Iris (teal circle): moves up to 8px in any direction toward cursor
- Movement is smoothed with lerp (linear interpolation), not instant
- On mobile: iris drifts slowly downward as user scrolls (no cursor)
- Z-index: above hero background, below nav
- Position: absolute, placed in hero section center-right area

Animation:
- Uses requestAnimationFrame loop
- Lerp factor: 0.08 (slow, smooth follow)
- Max displacement: 8px from center in any direction

Edge cases:
- If cursor leaves window: iris slowly returns to center
- Reduced motion: iris stays fixed at center
```

---

### SKILL 05 — mobile-rules.md
**Purpose:** Mobile-specific decisions for every section, since you said mobile-first.

**Key rules:**
```
Loading screen:     Identical to desktop
Hero:               Stack vertically, headline smaller (text-4xl not text-7xl)
                    Atmospheric bg: CSS only (no Three.js on mobile)
                    CursorEye: scroll-reactive not cursor-reactive
Problem section:    Identical, just font size adjusted
Horizontal scroll:  DISABLED on mobile — panels stack vertically instead
                    Each panel is full width, normal scroll
Demo video:         Full width, tap to play/pause (not autoplay on mobile
                    due to browser restrictions)
Persona cards:      2x2 grid on tablet, 1 column on phone
Privacy section:    Full width card
Form:               Same multi-step behavior, larger touch targets (min 48px)
                    Keyboard-aware (scroll up when keyboard opens)
Footer:             Stack vertically
```

---

### SKILL 06 — asset-checklist.md
**Purpose:** Tracks which assets are ready vs. still needed — agent checks this before starting each phase.

```
ASSETS STATUS

Logo:
  [ ] perceiva-logo.svg (full logo with wordmark)
  [ ] perceiva-icon.svg (eye icon only, iris as separate layer)
  [ ] perceiva-favicon.ico (32x32)
  [ ] perceiva-logo-light.svg (for light backgrounds, documents)

Video:
  [ ] perceiva-demo.mp4 (60-90sec, 1080p, screen recording of demo)
      → YOU RECORD THIS — run perceiva_demo.py with 2 enrolled students
      → Show: detection, name labels, focused/distracted, session summary
      → Export as MP4 H.264, compress to under 15MB if possible

Copy:
  [x] Headline: "What if your classroom could think?"
  [x] All section copy (see Section 5 of this README)
  [ ] Final email for contact (hello@perceiva.in or similar)

Accounts needed:
  [ ] Formspree account + form created → get endpoint URL
  [ ] Vercel account (free)
  [ ] Plausible account (free trial)
  [ ] perceiva.in DNS access (to point to Vercel)
```

---

## 9. Content Rules (Agent Must Follow)

```
NEVER:
- Claim existing customers or pilot schools by name
- Use fabricated statistics ("used by 500+ students")
- Say "facial recognition" — say "attention signals" or "engagement patterns"
- Add stock photos of classrooms or students
- Add generic AI imagery (brains, robots, circuits)
- Make privacy claims that aren't architecturally true

ALWAYS:
- One idea per section
- Mobile test every component before moving to next
- Commit working code before adding animation layer
- Keep copy exactly as written in this README — no paraphrasing
- Check asset-checklist.md before referencing any asset
- Update context.md at end of every build session
```

---

## 10. Definition of Done

The website is ready to go live when ALL of these are true:

```
[ ] Loading screen works on mobile and desktop
[ ] All 8 sections render correctly on mobile (375px width)
[ ] All 8 sections render correctly on desktop (1440px width)
[ ] Horizontal scroll works on desktop, gracefully falls back on mobile
[ ] Form submits successfully to Formspree and email is received
[ ] Persona card click pre-selects correct role in form
[ ] Demo video autoplays on scroll (desktop) / tap-to-play (mobile)
[ ] Cursor eye tracks mouse on desktop
[ ] No console errors in production build
[ ] Lighthouse performance score > 80 on mobile
[ ] perceiva.in resolves to the live site with HTTPS
[ ] Plausible analytics firing on page load
[ ] Privacy section is visible without scrolling past the form
[ ] Copy matches this README exactly — no drift
```

---

## 11. What's Deferred to v2

These are explicitly NOT in scope for this build:

```
- Blog / articles section
- Pricing page
- Case studies or testimonials (nothing real to show yet)
- School login / dashboard portal
- Multi-language support
- A/B testing
- The Itachi/anime character (deferred — needs 3D model asset)
- AI chat widget
- Cookie consent banner (add before GDPR-relevant markets)
```

---

*Last updated: 2026-07-24*
*Status: Planning complete — ready for Antigravity agent build*
