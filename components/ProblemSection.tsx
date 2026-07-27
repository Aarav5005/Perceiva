"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATEMENTS = [
  {
    html: <>Someone in your classroom is <span className="text-pureWhite font-semibold underline decoration-accent/50 decoration-2 underline-offset-4">struggling right now</span>.</>,
    climax: false,
  },
  {
    html: <>You <span className="text-pureWhite font-semibold">can't see them</span>.</>,
    climax: false,
  },
  {
    html: <>They <span className="text-pureWhite font-semibold">won't tell you</span>.</>,
    climax: false,
  },
  {
    html: <>By the time marks fall, it's <span className="text-rose-400/90 font-semibold underline decoration-rose-500/40 underline-offset-4">already too late</span>.</>,
    climax: false,
  },
  {
    html: <>Perceiva <span className="text-accent drop-shadow-[0_0_20px_rgba(74,155,171,0.4)]">sees what teachers can't.</span></>,
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

    const lineElements = gsap.utils.toArray<HTMLElement>(".problem-statement", container);

    // Initial state for all statement lines
    gsap.set(lineElements, { opacity: 0, y: 40, filter: "blur(12px)", pointerEvents: "none" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate current active statement index (0 to 4)
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
          y: -40,
          filter: "blur(12px)",
          duration: 0.8,
          ease: "power2.in",
          onComplete: () => {
            line.style.pointerEvents = "none";
          },
        });
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[radial-gradient(ellipse_at_top,_#0D1F23_0%,_#050A0E_60%,_#030608_100%)] px-6 md:px-12 flex flex-col items-center justify-between py-16 text-center overflow-hidden"
    >
      {/* Background Dynamic Ambient Light */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: activeIndex === 4 ? "rgba(74, 155, 171, 0.18)" : activeIndex === 3 ? "rgba(244, 63, 94, 0.12)" : "rgba(74, 155, 171, 0.08)"
        }}
      />

      {/* Top Section Badge */}
      <div className="z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/20 bg-surface/30 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Classroom Reality</span>
      </div>

      {/* Center Pinned Statements Stage */}
      <div ref={textContainerRef} className="relative z-10 w-full max-w-4xl min-h-[220px] flex items-center justify-center my-auto">
        {STATEMENTS.map((item, idx) => (
          <div
            key={idx}
            className="problem-statement absolute inset-x-0 flex items-center justify-center px-4"
          >
            {item.climax ? (
              <div className="relative w-full max-w-3xl p-8 md:p-14 rounded-3xl bg-surface/30 backdrop-blur-2xl border border-accent/35 shadow-[0_0_80px_rgba(74,155,171,0.2)] overflow-hidden">
                
                {/* Glowing Eye Icon Header */}
                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(74,155,171,0.4)]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>

                <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-pureWhite leading-tight tracking-tight">
                  {item.html}
                </h2>
              </div>
            ) : (
              <h2 className="font-display font-medium text-xl md:text-3xl lg:text-4xl text-textPrimary/90 leading-relaxed tracking-tight max-w-3xl">
                {item.html}
              </h2>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Progress Bar & Step Counter */}
      <div className="z-20 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {STATEMENTS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-10 bg-accent shadow-[0_0_12px_rgba(74,155,171,0.8)]"
                  : i < activeIndex
                  ? "w-4 bg-accent/40"
                  : "w-4 bg-surface/60"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-utility text-xs tracking-widest uppercase">
          0{activeIndex + 1} / 0{STATEMENTS.length}
        </span>
      </div>

    </section>
  );
}
