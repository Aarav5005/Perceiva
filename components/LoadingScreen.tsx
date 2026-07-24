"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import BlurText from "./BlurText";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hide body overflow to prevent seeing main page content during loading
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAnimationComplete = () => {
    
    // After words animate, counter goes 0 -> 100
    const counterObj = { value: 0 };
    anime({
      targets: counterObj,
      value: 100,
      round: 1,
      duration: 1000,
      easing: "linear",
      update: () => {
        setProgress(counterObj.value);
      },
      complete: () => {
        // Start fading out after counter reaches 100
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 800);
      }
    });
  };

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-in-out bg-black ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-6">
        <BlurText
          text="What if your classroom could think?"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="font-display font-semibold text-2xl md:text-4xl text-textPrimary text-center"
        />
      </div>
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
        <span className="font-mono text-utility text-sm md:text-base">{progress}</span>
      </div>
    </div>
  );
}
