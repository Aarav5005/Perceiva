"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATEMENTS = [
  { text: "Someone in your classroom is struggling right now.", climax: false },
  { text: "You can't see them.", climax: false },
  { text: "They won't tell you.", climax: false },
  { text: "By the time marks fall, it's already too late.", climax: false },
  { text: "Perceiva sees what teachers can't.", climax: true },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = textContainerRef.current;
    if (!section || !container) return;

    const lineElements = gsap.utils.toArray<HTMLElement>(".problem-statement", container);

    // Set initial state for all statement lines
    gsap.set(lineElements, { opacity: 0, y: 40, filter: "blur(10px)", pointerEvents: "none" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    lineElements.forEach((line, index) => {
      // 1. Reveal current line at exact center position
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

      // Hold current line visible
      tl.to(line, { duration: 1.2 });

      // 2. Hide current line upward (except for final climax statement)
      if (index < lineElements.length - 1) {
        tl.to(line, {
          opacity: 0,
          y: -40,
          filter: "blur(10px)",
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
      className="relative w-full h-screen bg-[radial-gradient(ellipse_at_top,_#0D1F23_0%,_#050A0E_60%,_#030608_100%)] px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-midtone/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Badge */}
      <div className="absolute top-12 md:top-16 z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/20 bg-surface/30 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Classroom Reality</span>
      </div>

      {/* Pinned Statements Stage — all lines replace each other at the exact same center location */}
      <div ref={textContainerRef} className="relative z-10 w-full max-w-4xl min-h-[180px] flex items-center justify-center">
        {STATEMENTS.map((item, idx) => (
          <div
            key={idx}
            className="problem-statement absolute inset-x-0 flex items-center justify-center"
          >
            {item.climax ? (
              <div className="relative w-full max-w-3xl p-8 md:p-12 rounded-3xl bg-surface/20 backdrop-blur-xl border border-accent/25 shadow-[0_0_60px_rgba(74,155,171,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
                <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-accent leading-tight tracking-tight drop-shadow-[0_0_25px_rgba(74,155,171,0.3)]">
                  {item.text}
                </h2>
              </div>
            ) : (
              <h2 className="font-display font-medium text-xl md:text-3xl lg:text-4xl text-textPrimary leading-relaxed tracking-tight px-4 max-w-3xl">
                {item.text}
              </h2>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
