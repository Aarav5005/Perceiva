"use client";

import ScrollFloat from "./ScrollFloat";

export default function ProblemSection() {
  return (
    <section className="w-full bg-background py-32 px-6 md:px-12 flex flex-col items-center text-center">
      <div className="max-w-5xl space-y-24 md:space-y-32">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=15%"
          scrollEnd="bottom center+=10%"
          stagger={0.02}
          textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight"
        >
          Someone in your classroom is struggling right now.
        </ScrollFloat>

        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=15%"
          scrollEnd="bottom center+=10%"
          stagger={0.03}
          textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight"
        >
          You can't see them.
        </ScrollFloat>

        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=15%"
          scrollEnd="bottom center+=10%"
          stagger={0.03}
          textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight"
        >
          They won't tell you.
        </ScrollFloat>

        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=15%"
          scrollEnd="bottom center+=10%"
          stagger={0.02}
          textClassName="font-display font-medium text-2xl md:text-5xl lg:text-6xl text-textPrimary leading-tight"
        >
          By the time marks fall, it's already too late.
        </ScrollFloat>

        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="top bottom-=15%"
          scrollEnd="bottom center+=10%"
          stagger={0.02}
          textClassName="font-display font-bold text-3xl md:text-6xl lg:text-7xl text-accent leading-tight"
        >
          Perceiva sees what teachers can't.
        </ScrollFloat>
      </div>
    </section>
  );
}
