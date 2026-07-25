"use client";

import { useEffect, useRef } from "react";

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

      let dx = e.clientX - eyeCenterX;
      let dy = e.clientY - eyeCenterY;

      dx = dx * 0.1;
      dy = dy * 0.1;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDisplacement = 30;

      if (distance > maxDisplacement) {
        targetX = (dx / distance) * maxDisplacement;
        targetY = (dy / distance) * maxDisplacement;
      } else {
        targetX = dx;
        targetY = dy;
      }
    };

    const handleMouseLeave = () => {
      hasMouseMoved = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (!hasMouseMoved) {
        time += 0.02;
        targetX = Math.sin(time) * 20; 
        targetY = Math.sin(time * 2) * 10;
      }

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
      className="w-[260px] h-[120px] md:w-[380px] md:h-[175px] mx-auto md:mx-0 md:absolute md:top-1/2 md:left-[65%] md:-translate-y-1/2 z-20 pointer-events-none mt-12 md:mt-0"
      style={{ filter: 'drop-shadow(0 0 12px rgba(74, 155, 171, 0.25))' }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="-150 -70 300 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer eye shape */}
        {/* Top arc */}
        <path 
          d="M -150 0 Q 0 -85 150 0" 
          stroke="#AFB3B7" 
          strokeWidth="1.5"
          fill="none"
        />
        {/* Bottom arc - thicker wedge style */}
        <path 
          d="M -150 0 Q 0 85 150 0" 
          stroke="#2D4A53" 
          strokeWidth="5"
          fill="none"
        />

        {/* Left half facial landmark mesh (static) */}
        <g stroke="#4A9BAB" strokeWidth="0.6" opacity="0.35">
          <line x1="-150" y1="0" x2="-95" y2="-38" />
          <line x1="-95" y1="-38" x2="-45" y2="-62" />
          
          <line x1="-150" y1="0" x2="-95" y2="38" />
          <line x1="-95" y1="38" x2="-45" y2="62" />
          
          <line x1="-95" y1="-38" x2="-45" y2="62" />
        </g>

        {/* Landmark dots */}
        <g fill="#4A9BAB" opacity="0.7">
          <circle cx="-150" cy="0" r="2" />
          <circle cx="-95" cy="-38" r="2" />
          <circle cx="-45" cy="-62" r="2" />
          
          <circle cx="-95" cy="38" r="2" />
          <circle cx="-45" cy="62" r="2" />
        </g>

        {/* Iris and Pupil (Moving Group) */}
        <g ref={irisRef}>
          {/* Outer ring */}
          <circle cx="0" cy="0" r="32" stroke="#4A9BAB" strokeWidth="2" fill="none" />
          
          {/* Dark gap - matching the background color to look like an aperture gap */}
          <circle cx="0" cy="0" r="28" fill="#0D1F23" />
          
          {/* Inner filled circle */}
          <circle cx="0" cy="0" r="14" fill="#4A9BAB" />
        </g>
      </svg>
    </div>
  );
}
