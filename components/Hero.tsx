"use client";

import { motion } from "framer-motion";
import CursorEye from "./CursorEye";
import SideRays from "./SideRays";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <SideRays
          speed={2.5}
          rayColor1="#4A9BAB"
          rayColor2="#2D4A53"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.5 }}
        className="hidden md:block md:absolute md:right-[8%] md:top-1/2 md:-translate-y-1/2 z-20"
      >
        <CursorEye />
      </motion.div>

      <div className="relative z-10 max-w-4xl pt-28 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6, ease: "easeOut" }}
          className="font-mono text-xs md:text-sm text-accent tracking-[0.25em] uppercase mb-6"
        >
          In development · Interactive learning
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.8, ease: "easeOut" }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-pureWhite leading-[1.15] mb-8"
        >
          What if your classroom could think?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.0, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl text-textPrimary/80 leading-relaxed max-w-2xl mb-12"
        >
          Perceiva is being developed to turn a teacher&apos;s question into an interactive visual explanation — one students can pause, change, and explore together. The goal is to make abstract concepts easier to investigate, with simulations grounded in scientific models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.2, ease: "easeOut" }}
          className="flex flex-col items-start gap-4"
        >
          <button className="text-base md:text-lg font-body font-medium px-8 py-4 border border-accent text-accent bg-transparent rounded-full hover:bg-accent/10 transition-colors cursor-pointer" onClick={() => {
            const formElement = document.getElementById('early-access-form');
            if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
          }}>
            Join the early access list ↓
          </button>

          <span className="font-mono text-xs md:text-sm text-utility">
            In development · Seeking early-access educators
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.0 }}
        className="absolute bottom-8 right-6 md:bottom-12 md:right-12 pointer-events-none"
      >
        <span className="font-mono text-xs md:text-sm text-utility tracking-[0.2em]">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
