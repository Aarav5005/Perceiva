# Context

Phase: All code phases complete (Phase 4 Animations, Phase 5 Integrations). Waiting on assets and Formspree config.
Assets: logo NO, video NO, formspree endpoint NO
All components: static layout, React Bits integrations, animations, and form integrations completed

Decisions made:
- Created empty shells for components.
- Initialized Next.js 14 App Router project manually.
- Installed required dependencies (tailwindcss, framer-motion, gsap, animejs, @react-three/fiber, @react-three/drei, three).
- Configured tailwind with the exact color system and font families.
- Setup globals.css.
- Implemented static layouts for Nav, LoadingScreen, Hero, ProblemSection, HorizontalScroll (Panels 1-3), DemoVideo, PersonaCards, PrivacySection, EarlyAccessForm, and Footer.
- Assembled all sections into `app/page.tsx`.
- Applied mobile-first styling with desktop responsive prefixes (`md:`, `lg:`).
- Used exact copy from README.md without placeholder text.
- Ensured color variables refer strictly to Tailwind config.
- Refactored Form into a multi-step dynamic flow.
- Integrated React Bits components: SpecularButton, BorderGlow, CurvedInput, SideRays.
- Added GSAP ScrollTrigger animations to HorizontalScroll, ProblemSection, and DemoVideo.
- Integrated Framer Motion for CursorEye tracking and Hero section entrances.
- Built a custom R3F Three.js particle mesh for Panel1Sees.
- Wired PersonaCards to EarlyAccessForm with a custom event for role pre-selection.
- Wired EarlyAccessForm to Formspree backend (mock fallback active).
- Added Plausible analytics to global layout.
