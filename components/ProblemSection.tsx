"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const lines = gsap.utils.toArray<HTMLElement>(".problem-line", containerRef.current);

    gsap.set(lines, { opacity: 0.1, y: 30 });

    const triggers: ScrollTrigger[] = [];

    lines.forEach((line) => {
      const animation = gsap.to(line, {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: line,
          start: "top 85%",
          end: "top 55%",
          scrub: 1,
        },
      });
      if (animation.scrollTrigger) {
        triggers.push(animation.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-background py-32 px-6 md:px-12 flex flex-col items-center text-center">
      <div className="max-w-4xl space-y-24 md:space-y-32">
        <p className="problem-line font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight">
          Someone in your classroom is struggling right now.
        </p>
        <p className="problem-line font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight">
          You can&apos;t see them.
        </p>
        <p className="problem-line font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight">
          They won&apos;t tell you.
        </p>
        <p className="problem-line font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight">
          By the time marks fall, it&apos;s already too late.
        </p>
        <p className="problem-line font-display font-medium text-3xl md:text-6xl lg:text-7xl text-accent leading-tight">
          Perceiva sees what teachers can&apos;t.
        </p>
      </div>
    </section>
  );
}
