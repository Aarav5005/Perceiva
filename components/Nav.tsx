"use client";

import Image from "next/image";
import SpecularButton from "./SpecularButton";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-transparent py-6 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center">
        <Image 
          src="/logo/perceiva-logo.svg" 
          alt="Perceiva Logo" 
          width={150} 
          height={40} 
          className="w-auto h-8 md:h-10 object-contain"
          priority
        />
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
