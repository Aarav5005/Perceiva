"use client";

import SpecularButton from "./SpecularButton";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-transparent py-6 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* Placeholder for SVG Logo */}
        <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
          <span className="text-accent font-display font-bold text-xl leading-none">P</span>
        </div>
        <span className="font-display font-bold text-xl md:text-2xl tracking-wide text-textPrimary">
          Perceiva
        </span>
      </div>
      <SpecularButton 
        // @ts-ignore - Ignoring strict prop checking for React Bits component
        size="md"
        radius={24}
        tint="#2D4A53"
        tintOpacity={0.3}
        blur={8}
        textColor="#AFB3B7"
        lineColor="#4A9BAB"
        baseColor="#2D4A53"
        intensity={1.2}
        followMouse={true}
        autoAnimate={false}
      >
        Get Early Access
      </SpecularButton>
    </nav>
  );
}
