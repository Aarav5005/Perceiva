"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Panel1Sees from "./Panel1Sees";
import Panel2Understands from "./Panel2Understands";
import Panel3Remembers from "./Panel3Remembers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeatureSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (!card1 || !card2 || !card3) return;

      // Card 1 scales down slightly as Card 2 overlaps it
      gsap.to(card1, {
        scale: 0.94,
        opacity: 0.5,
        filter: "blur(4px)",
        ease: "none",
        scrollTrigger: {
          trigger: card2,
          start: "top 70%",
          end: "top 25%",
          scrub: true,
        },
      });

      // Card 2 scales down as Card 3 overlaps it
      gsap.to(card2, {
        scale: 0.95,
        opacity: 0.6,
        filter: "blur(3px)",
        ease: "none",
        scrollTrigger: {
          trigger: card3,
          start: "top 70%",
          end: "top 25%",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-background py-28 px-4 md:px-12 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mb-16 md:mb-24 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface/30 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>How Perceiva Works</span>
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite tracking-tight leading-tight">
          From raw pixels to real-time intelligence.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/75">
          Three seamless layers operating synchronously in every classroom session.
        </p>
      </div>

      {/* Vertical Stacking Deck */}
      <div className="relative w-full max-w-6xl space-y-12 md:space-y-20 pb-20">
        
        {/* Step 01 */}
        <div 
          ref={card1Ref}
          className="sticky top-20 md:top-24 z-10 w-full rounded-3xl border border-accent/25 bg-surface/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
        >
          <Panel1Sees />
        </div>

        {/* Step 02 */}
        <div 
          ref={card2Ref}
          className="sticky top-24 md:top-28 z-20 w-full rounded-3xl border border-accent/25 bg-surface/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
        >
          <Panel2Understands />
        </div>

        {/* Step 03 */}
        <div 
          ref={card3Ref}
          className="sticky top-28 md:top-32 z-30 w-full rounded-3xl border border-pureWhite/20 bg-surface/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
        >
          <Panel3Remembers />
        </div>

      </div>

    </section>
  );
}
