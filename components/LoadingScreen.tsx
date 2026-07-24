"use client";

import { useEffect, useState } from "react";
import anime from "animejs";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const words = ["What", "if", "your", "classroom", "could", "think?"];

  useEffect(() => {
    // Hide body overflow to prevent seeing main page content during loading
    document.body.style.overflow = "hidden";

    // Setup animation sequence
    const tl = anime.timeline({
      complete: () => {
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
      }
    });

    // Word reveal animation (left to right sweep)
    tl.add({
      targets: ".word",
      color: "#AFB3B7",
      duration: 400,
      delay: anime.stagger(150),
      easing: "easeInOutQuad"
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-background flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-display font-semibold text-2xl md:text-4xl text-center flex flex-wrap justify-center">
          {words.map((word, index) => (
            <span 
              key={index} 
              className="word inline-block mr-2 md:mr-3" 
              style={{ color: '#0D1F23' }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
        <span className="font-mono text-utility text-sm md:text-base">{progress}</span>
      </div>
    </div>
  );
}
