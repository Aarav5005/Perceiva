"use client";

import { motion } from "framer-motion";

export default function Panel1Listen() {
  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_#0D1F23_0%,_#050A0E_100%)] px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">

      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <span className="font-mono font-bold text-6xl md:text-8xl text-accent/25 block -mb-4 tracking-tighter">
          01
        </span>
        <span className="font-mono text-accent text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
          IT LISTENS
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite mb-6 leading-tight tracking-tight">
          Ask in your own words.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/80 leading-relaxed">
          A teacher asks a question in natural language. Perceiva is being designed to identify the concept and what needs explaining.
        </p>
      </div>

      {/* Right Visual — question to concept mock */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center">
        <div className="relative w-full p-6 md:p-8 rounded-3xl border border-accent/25 bg-surface/20 backdrop-blur-xl shadow-[0_0_50px_rgba(74,155,171,0.15)] overflow-hidden flex flex-col gap-4">

          {/* HUD Top Tag */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 border border-accent/30 text-[10px] font-mono text-accent tracking-widest uppercase">
            Question understood
          </div>

          {/* Question bubble */}
          <div className="mt-10 p-5 rounded-2xl bg-background/70 border border-surface/60">
            <p className="font-mono text-[10px] text-utility tracking-widest uppercase mb-2">
              Teacher asks
            </p>
            <p className="font-display text-lg md:text-xl text-pureWhite leading-relaxed">
              &ldquo;What happens if we drop this ball on the Moon instead of Earth?&rdquo;
            </p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent font-mono text-lg"
            >
              &darr;
            </motion.div>
          </div>

          {/* Concept card */}
          <div className="p-5 rounded-2xl bg-accent/10 border border-accent/40">
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Concept identified
            </p>
            <p className="font-display font-semibold text-pureWhite text-base mb-1">
              Projectile motion
            </p>
            <p className="font-mono text-xs text-utility">
              Variable to explore: gravitational acceleration
            </p>
          </div>

          <div className="text-[10px] font-mono text-utility text-center">
            Illustrative mock
          </div>

        </div>
      </div>

    </div>
  );
}
