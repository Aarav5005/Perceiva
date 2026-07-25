"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorEye() {
  const irisRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMouseMoved = false;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      hasMouseMoved = true;
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // Calculate vector from eye center to mouse
      let dx = e.clientX - eyeCenterX;
      let dy = e.clientY - eyeCenterY;

      // Scale down the movement so it stays within the eye
      // Using a factor to make it feel natural before clamping
      dx = dx * 0.1;
      dy = dy * 0.1;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDisplacement = 35;

      if (distance > maxDisplacement) {
        targetX = (dx / distance) * maxDisplacement;
        targetY = (dy / distance) * maxDisplacement;
      } else {
        targetX = dx;
        targetY = dy;
      }
    };

    // If mouse leaves window, reset to center and resume wandering
    const handleMouseLeave = () => {
      hasMouseMoved = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (!hasMouseMoved) {
        // Slow figure-8 pattern for mobile or idle state
        time += 0.02;
        targetX = Math.sin(time) * 25; // max 25px horizontal
        targetY = Math.sin(time * 2) * 12; // max 12px vertical
      }

      // Lerp
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (irisRef.current) {
        irisRef.current.setAttribute("transform", `translate(${currentX}, ${currentY})`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      // Desktop: 60% from left, 320x180. Mobile: centered, 240x135.
      className="absolute left-1/2 md:left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none w-[240px] h-[135px] md:w-[320px] md:h-[180px]"
      style={{ filter: 'drop-shadow(0 0 20px rgba(74, 155, 171, 0.3))' }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="-140 -80 280 160" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer eye shape */}
        {/* Top arc curves to -55, bottom arc curves to 55 */}
        <path 
          d="M -120 0 Q -60 -80 0 -55 Q 60 -30 120 0 Q 60 30 0 55 Q -60 80 -120 0 Z" 
          fill="#AFB3B7" 
          stroke="#2D4A53" 
          strokeWidth="2"
        />

        {/* Eyelid bold stroke on the right half */}
        <path 
          d="M 0 -55 Q 60 -30 120 0" 
          fill="none"
          stroke="#0D1F23" 
          strokeWidth="6" 
          strokeLinecap="round"
        />

        {/* Vertical dividing line */}
        <line x1="0" y1="-70" x2="0" y2="70" stroke="#4A9BAB" strokeWidth="1" opacity="0.2" />

        {/* Left half facial landmark mesh (static) */}
        <g stroke="#4A9BAB" strokeWidth="0.8" opacity="0.5">
          <line x1="-120" y1="0" x2="-80" y2="-35" />
          <line x1="-80" y1="-35" x2="-40" y2="-45" />
          <line x1="-40" y1="-45" x2="0" y2="-55" />
          
          <line x1="-120" y1="0" x2="-80" y2="35" />
          <line x1="-80" y1="35" x2="-40" y2="45" />
          <line x1="-40" y1="45" x2="0" y2="55" />

          <line x1="-80" y1="-35" x2="-50" y2="-15" />
          <line x1="-50" y1="-15" x2="-40" y2="-45" />

          <line x1="-80" y1="35" x2="-50" y2="15" />
          <line x1="-50" y1="15" x2="-40" y2="45" />

          <line x1="-50" y1="-15" x2="-20" y2="-20" />
          <line x1="-50" y1="15" x2="-20" y2="20" />
          <line x1="-20" y1="-20" x2="-20" y2="20" />
        </g>

        {/* Landmark dots */}
        <g fill="#4A9BAB">
          <circle cx="-120" cy="0" r="2.5" />
          <circle cx="-80" cy="-35" r="2.5" />
          <circle cx="-40" cy="-45" r="2.5" />
          <circle cx="0" cy="-55" r="2.5" />
          <circle cx="-80" cy="35" r="2.5" />
          <circle cx="-40" cy="45" r="2.5" />
          <circle cx="0" cy="55" r="2.5" />
          <circle cx="-50" cy="-15" r="2.5" />
          <circle cx="-50" cy="15" r="2.5" />
          <circle cx="-20" cy="-20" r="2.5" />
          <circle cx="-20" cy="20" r="2.5" />
        </g>

        {/* Iris and Pupil (Moving Group) */}
        <g ref={irisRef}>
          {/* Iris */}
          <circle cx="0" cy="0" r="28" fill="#4A9BAB" />
          {/* Pupil */}
          <circle cx="0" cy="0" r="10" fill="#0D1F23" />
        </g>
      </svg>
    </div>
  );
}
