"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(64);
  const mouseY = useMotionValue(64);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const irisX = useSpring(mouseX, springConfig);
  const irisY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 500);
      
      const maxRadius = 12; // Max distance iris can move from center
      const movementRadius = (distance / 500) * maxRadius;
      
      mouseX.set(64 + Math.cos(angle) * movementRadius);
      mouseY.set(64 + Math.sin(angle) * movementRadius);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={eyeRef} className="absolute hidden md:flex items-center justify-center right-1/4 top-1/3 w-32 h-32 pointer-events-none text-accent z-20">
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 36C28 36 8 64 8 64C8 64 28 92 64 92C100 92 120 64 120 64C120 64 100 36 64 36Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/>
        <motion.circle 
          cx={irisX} 
          cy={irisY} 
          r="16" 
          fill="currentColor" 
          className="drop-shadow-[0_0_15px_rgba(74,155,171,0.5)]"
        />
      </svg>
    </div>
  );
}
