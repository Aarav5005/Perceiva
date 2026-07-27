"use client";

import ScrollFloat from "./ScrollFloat";

export default function ProblemSection() {
  return (
    <section className="relative w-full bg-[radial-gradient(ellipse_at_top,_#0D1F23_0%,_#050A0E_60%,_#030608_100%)] py-36 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-midtone/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl space-y-24 md:space-y-36">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/20 bg-surface/30 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Classroom Reality</span>
        </div>

        {/* Floating Problem Statements */}
        <div className="space-y-20 md:space-y-28">
          <ScrollFloat
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom-=15%"
            scrollEnd="bottom center+=10%"
            stagger={0.018}
            scrub={1.2}
            textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight tracking-tight"
          >
            Someone in your classroom is struggling right now.
          </ScrollFloat>

          <ScrollFloat
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom-=15%"
            scrollEnd="bottom center+=10%"
            stagger={0.025}
            scrub={1.2}
            textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary/90 leading-tight tracking-tight"
          >
            You can't see them.
          </ScrollFloat>

          <ScrollFloat
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom-=15%"
            scrollEnd="bottom center+=10%"
            stagger={0.025}
            scrub={1.2}
            textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary/90 leading-tight tracking-tight"
          >
            They won't tell you.
          </ScrollFloat>

          <ScrollFloat
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom-=15%"
            scrollEnd="bottom center+=10%"
            stagger={0.018}
            scrub={1.2}
            textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary/90 leading-tight tracking-tight"
          >
            By the time marks fall, it's already too late.
          </ScrollFloat>
        </div>

        {/* Climactic Statement Box */}
        <div className="pt-8">
          <div className="relative inline-block w-full p-8 md:p-14 rounded-3xl bg-surface/20 backdrop-blur-xl border border-accent/25 shadow-[0_0_60px_rgba(74,155,171,0.15)] overflow-hidden">
            {/* Corner highlight glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
            
            <ScrollFloat
              animationDuration={1.2}
              ease="power3.out"
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center+=15%"
              stagger={0.018}
              scrub={1.2}
              textClassName="font-display font-bold text-3xl md:text-6xl lg:text-7xl text-accent leading-tight tracking-tight drop-shadow-[0_0_25px_rgba(74,155,171,0.3)]"
            >
              Perceiva sees what teachers can't.
            </ScrollFloat>
          </div>
        </div>

      </div>
    </section>
  );
}
