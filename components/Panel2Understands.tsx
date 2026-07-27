"use client";

import { motion } from "framer-motion";

export default function Panel2Understands() {
  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_#0D1F23_0%,_#050A0E_100%)] px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 border-t border-surface/30 md:border-none">
      
      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <span className="font-mono font-bold text-6xl md:text-8xl text-accent/25 block -mb-4 tracking-tighter">
          02
        </span>
        <span className="font-mono text-accent text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
          IT UNDERSTANDS
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite mb-6 leading-tight tracking-tight">
          Focused. Drifting. Confused.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/80 leading-relaxed">
          Head orientation, gaze direction, and behavioral patterns combine into a real-time attention state per student — updated continuously.
        </p>
      </div>

      {/* Right Visual — Real-time Student State Cards */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl flex flex-col gap-5">
        
        {/* Card 1: Aarav (Focused) */}
        <div className="relative p-6 rounded-2xl bg-surface/30 backdrop-blur-xl border border-accent/30 shadow-[0_0_30px_rgba(74,155,171,0.12)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-mono font-bold text-accent text-sm">
                A
              </div>
              <div>
                <h4 className="font-display font-semibold text-pureWhite text-base">Aarav</h4>
                <span className="font-mono text-xs text-utility">Gaze locked · Head stable</span>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-xs font-medium tracking-wide">
              Focused
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-background/60 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-accent/70 to-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "86%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Card 2: Student #14 (Distracted) */}
        <div className="relative p-6 rounded-2xl bg-surface/30 backdrop-blur-xl border border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.12)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center font-mono font-bold text-rose-400 text-sm">
                S
              </div>
              <div>
                <h4 className="font-display font-semibold text-pureWhite text-base">Student #14</h4>
                <span className="font-mono text-xs text-utility">Looking away · 12s</span>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-400 font-mono text-xs font-medium tracking-wide">
              Distracted
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-background/60 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-rose-500/70 to-rose-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "24%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Telemetry pill */}
        <div className="flex justify-between items-center px-2 text-[11px] font-mono text-utility">
          <span>AI CONTEXT ENGINE v2.4</span>
          <span className="text-accent">CONTINUOUS SYNTHESIS</span>
        </div>

      </div>

    </div>
  );
}
