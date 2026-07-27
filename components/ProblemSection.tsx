"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATEMENTS = [
  {
    html: (
      <>
        Someone in your classroom is{" "}
        <span className="text-accent drop-shadow-[0_0_18px_rgba(74,155,171,0.7)] font-semibold">
          struggling right now
        </span>
        .
      </>
    ),
    climax: false,
  },
  {
    html: (
      <>
        You{" "}
        <span className="text-accent drop-shadow-[0_0_18px_rgba(74,155,171,0.7)] font-semibold">
          can't see them
        </span>
        .
      </>
    ),
    climax: false,
  },
  {
    html: (
      <>
        They{" "}
        <span className="text-accent drop-shadow-[0_0_18px_rgba(74,155,171,0.7)] font-semibold">
          won't tell you
        </span>
        .
      </>
    ),
    climax: false,
  },
  {
    html: (
      <>
        By the time marks fall, it's{" "}
        <span className="text-rose-400 drop-shadow-[0_0_18px_rgba(244,63,94,0.7)] font-semibold">
          already too late
        </span>
        .
      </>
    ),
    climax: false,
  },
  {
    html: (
      <>
        Perceiva{" "}
        <span className="text-accent drop-shadow-[0_0_25px_rgba(74,155,171,0.8)] font-bold">
          sees what teachers can't.
        </span>
      </>
    ),
    climax: true,
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = textContainerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const lineElements = gsap.utils.toArray<HTMLElement>(".problem-statement", container);

      // Initial state for all statement lines
      gsap.set(lineElements, { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.96, pointerEvents: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              STATEMENTS.length - 1,
              Math.floor(self.progress * STATEMENTS.length)
            );
            setActiveIndex(idx);
          },
        },
      });

      lineElements.forEach((line, index) => {
        // 1. Reveal line in center
        tl.to(line, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          onStart: () => {
            line.style.pointerEvents = "auto";
          },
        });

        // Hold visible
        tl.to(line, { duration: 1.2 });

        // 2. Hide line upward (except final climax line)
        if (index < lineElements.length - 1) {
          tl.to(line, {
            opacity: 0,
            y: -30,
            scale: 0.96,
            filter: "blur(12px)",
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
              line.style.pointerEvents = "none";
            },
          });
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#03070A] px-6 md:px-12 flex flex-col items-center justify-between py-12 text-center overflow-hidden font-display"
    >
      {/* Sci-Fi Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#132E35_1px,transparent_1px)] [background-size:36px_36px] opacity-30 pointer-events-none" />

      {/* Futuristic Animated Concentric Target Radar Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-accent/15 border-dashed animate-[spin_90s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-accent/10 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: activeIndex === 4 ? "rgba(74, 155, 171, 0.22)" : activeIndex === 3 ? "rgba(244, 63, 94, 0.15)" : "rgba(74, 155, 171, 0.09)"
        }}
      />

      {/* Top Futuristic Telemetry Bar */}
      <div className="z-20 w-full max-w-5xl flex justify-between items-center text-[10px] font-mono text-utility tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-accent/90">SYS_DIAG // OBSERVER_FEED</span>
        </div>
        <div className="hidden sm:block text-accent/60">
          SIGNAL: OPTIMAL · 60 FPS
        </div>
      </div>

      {/* Center Tactical HUD Hologram Stage */}
      <div className="relative z-10 w-full max-w-3xl my-auto">
        <div className="relative p-8 md:p-14 rounded-3xl bg-surface/20 backdrop-blur-2xl border border-accent/30 shadow-[0_0_60px_rgba(74,155,171,0.12)] overflow-hidden min-h-[220px] flex items-center justify-center">
          
          {/* HUD Corner Brackets */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-accent/70" />
          <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-accent/70" />
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-accent/70" />
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-accent/70" />

          {/* Statement Lines Stage */}
          <div ref={textContainerRef} className="w-full flex items-center justify-center">
            {STATEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="problem-statement absolute inset-x-0 flex flex-col items-center justify-center px-4"
              >
                {item.climax ? (
                  <>
                    <div className="w-10 h-10 mb-4 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(74,155,171,0.5)]">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                    <h2 className="font-display font-bold text-2xl md:text-4xl text-pureWhite leading-tight tracking-tight">
                      {item.html}
                    </h2>
                  </>
                ) : (
                  <h2 className="font-display font-medium text-xl md:text-3xl text-pureWhite/90 leading-relaxed tracking-tight max-w-2xl">
                    {item.html}
                  </h2>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Futuristic HUD Controller & Step Counter */}
      <div className="z-20 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {STATEMENTS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-8 bg-accent shadow-[0_0_14px_rgba(74,155,171,0.9)]"
                  : i < activeIndex
                  ? "w-3 bg-accent/50"
                  : "w-3 bg-surface/60"
              }`}
            />
          ))}
        </div>
        <div className="font-mono text-utility text-[11px] tracking-widest uppercase flex items-center gap-2">
          <span className="text-accent font-bold">STATE 0{activeIndex + 1}</span>
          <span className="text-utility/50">/</span>
          <span>0{STATEMENTS.length}</span>
        </div>
      </div>

    </section>
  );
}
