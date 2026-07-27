"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => videoRef.current?.play().catch(() => {}),
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play().catch(() => {}),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-background py-24 px-6 md:px-12 flex justify-center">
      <div className="relative w-full max-w-5xl aspect-video bg-surface rounded-lg border border-midtone flex items-center justify-center overflow-hidden">
        
        {/* Placeholder label */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <span className="font-mono text-accent text-sm tracking-wider">LIVE DEMO</span>
        </div>

        {/* Video placeholder text (shows if video file is missing) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <p className="font-mono text-textPrimary/40 text-center px-4">
            DEMO VIDEO — perceiva-demo.mp4 goes here
          </p>
        </div>

        {/* The Video Element */}
        <video
          ref={videoRef}
          src="/video/perceiva-demo.mp4"
          muted
          playsInline
          loop
          className="relative z-10 w-full h-full object-cover bg-surface"
          onError={(e) => {
            // Hide the video element if it fails to load so the placeholder shows
            (e.target as HTMLVideoElement).style.display = "none";
          }}
        />

        {/* Bottom overlay text */}
        <div className="absolute bottom-6 left-0 w-full text-center z-20 px-4 pointer-events-none">
          <span className="font-body text-textPrimary/80 text-sm md:text-base bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm">
            This is real. Running now. On a ₹80k classroom PC.
          </span>
        </div>

      </div>
    </section>
  );
}
