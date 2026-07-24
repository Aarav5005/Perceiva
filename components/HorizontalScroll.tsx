"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Panel1Sees from "./Panel1Sees";
import Panel2Understands from "./Panel2Understands";
import Panel3Remembers from "./Panel3Remembers";

// Register ScrollTrigger, making sure it only happens on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop, let CSS flex-col handle mobile natively without GSAP overhead
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!scrollWrapperRef.current || !containerRef.current) return;
      
      const sections = gsap.utils.toArray(scrollWrapperRef.current.children);
      
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          end: () => "+=" + scrollWrapperRef.current!.offsetWidth // Scroll duration based on total width
        }
      });

      return () => {
        scrollTween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full overflow-hidden bg-background">
      <div 
        ref={scrollWrapperRef}
        className="flex flex-col md:flex-row w-full md:w-[300vw] h-auto md:h-screen"
      >
        <div className="w-full md:w-[100vw] h-auto md:h-screen flex items-center shrink-0">
          <Panel1Sees />
        </div>
        <div className="w-full md:w-[100vw] h-auto md:h-screen flex items-center shrink-0">
          <Panel2Understands />
        </div>
        <div className="w-full md:w-[100vw] h-auto md:h-screen flex items-center shrink-0">
          <Panel3Remembers />
        </div>
      </div>
    </section>
  );
}
