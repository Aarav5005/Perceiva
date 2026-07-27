"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

const PHRASES = [
  "What",
  "if",
  "your classroom",
  "could think?"
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Step-by-step phrase reveal with distinct dramatic pauses:
    // Step 0: "What" (0ms)
    // Step 1: "if" (600ms)
    // Step 2: "your classroom" (1200ms)
    // Step 3: "could think?" (1900ms)
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setCurrentStep(1), 600));
    timers.push(setTimeout(() => setCurrentStep(2), 1200));
    timers.push(setTimeout(() => setCurrentStep(3), 1900));

    // After final phrase appears (2500ms), run progress counter 0 -> 100
    timers.push(setTimeout(() => {
      startProgressCounter();
    }, 2500));

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const startProgressCounter = () => {
    const counterObj = { value: 0 };
    anime({
      targets: counterObj,
      value: 100,
      round: 1,
      duration: 1000,
      easing: "easeInOutQuad",
      update: () => {
        setProgress(counterObj.value);
      },
      complete: () => {
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
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 px-6 max-w-4xl text-center">
        {PHRASES.map((phrase, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: -20, filter: "blur(12px)" }}
            animate={
              idx <= currentStep
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: -20, filter: "blur(12px)" }
            }
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="font-display font-semibold text-3xl md:text-5xl text-pureWhite tracking-tight inline-block"
          >
            {phrase}
          </motion.span>
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
        <span className="font-mono text-utility text-sm md:text-base tracking-wider">{progress}</span>
      </div>
    </div>
  );
}
