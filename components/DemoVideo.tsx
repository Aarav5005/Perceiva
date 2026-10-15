"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // The demo video hasn't been recorded yet. Keep the <video> hidden until it
  // can actually play, so visitors never see a broken-video flash — only the
  // honest placeholder. Drop the mp4 into public/video/ and it appears on its own.
  const [videoReady, setVideoReady] = useState(false);

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
    <section ref={containerRef} className="w-full bg-background py-24 px-6 md:px-12 flex flex-col items-center">
      {/* Section header */}
      <div className="text-center max-w-3xl mb-12 md:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface/30 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>The first demo we plan to build</span>
        </div>
        <p className="font-body text-base md:text-lg text-textPrimary/75 max-w-2xl mx-auto leading-relaxed">
          A teacher asks what happens when a ball is dropped on the Moon. The planned demo will show a model of the ball&apos;s motion; the teacher will then change the gravitational acceleration and see how the trajectory changes according to the chosen equations.
        </p>
      </div>

      <div className="relative w-full max-w-5xl aspect-video bg-surface rounded-lg border border-midtone flex items-center justify-center overflow-hidden">
        
        {/* Placeholder label */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <span className="font-mono text-accent text-sm tracking-wider">PLANNED DEMO</span>
        </div>

        {/* Video placeholder text (shows if video file is missing) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <p className="font-mono text-textPrimary/40 text-center px-4">
            DEMO VIDEO — planned physics prototype (not yet recorded)
          </p>
        </div>

        {/* The Video Element — hidden until it can play (file not recorded yet) */}
        <video
          ref={videoRef}
          src="/video/perceiva-demo.mp4"
          muted
          playsInline
          loop
          preload="metadata"
          className="relative z-10 w-full h-full object-cover bg-surface"
          style={{ display: videoReady ? undefined : "none" }}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />

        {/* Bottom overlay text */}
        <div className="absolute bottom-6 left-0 w-full text-center z-20 px-4 pointer-events-none">
          <span className="font-body text-textPrimary/80 text-sm md:text-base bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm">
            This demo has not been built yet. Planned for an ordinary laptop or classroom projector — no special hardware.
          </span>
        </div>

      </div>
    </section>
  );
}
