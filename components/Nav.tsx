"use client";

import SpecularButton from "./SpecularButton";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-transparent py-6 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center">
        <svg width="64" height="38" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 14 Q 24 -4 48 14" stroke="#AFB3B7" strokeWidth="1.5" fill="none" />
          <path d="M 0 14 Q 24 32 48 14" stroke="#AFB3B7" strokeWidth="1.5" fill="none" />
          <circle cx="24" cy="14" r="7" stroke="#4A9BAB" strokeWidth="2" fill="none" />
          <circle cx="24" cy="14" r="2.5" fill="#4A9BAB" />
        </svg>
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
