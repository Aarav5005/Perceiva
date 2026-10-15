"use client";

export default function Panel2Show() {
  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_#0D1F23_0%,_#050A0E_100%)] px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 border-t border-surface/30 md:border-none">

      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <span className="font-mono font-bold text-6xl md:text-8xl text-accent/25 block -mb-4 tracking-tighter">
          02
        </span>
        <span className="font-mono text-accent text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
          IT SHOWS
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite mb-6 leading-tight tracking-tight">
          A visual explanation grounded in a model.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/80 leading-relaxed">
          The intended system will select or compose an appropriate simulation from controlled components and validated scientific models — not treat an AI-generated answer as scientific proof.
        </p>
      </div>

      {/* Right Visual — trajectory comparison mock */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center">
        <div className="relative w-full p-6 md:p-8 rounded-3xl border border-accent/25 bg-surface/20 backdrop-blur-xl shadow-[0_0_50px_rgba(74,155,171,0.15)] overflow-hidden">

          {/* HUD Top Tag */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 border border-accent/30 text-[10px] font-mono text-accent tracking-widest uppercase">
            Simulation · Projectile motion
          </div>

          <div className="mt-8">
            <svg viewBox="0 0 400 230" className="w-full h-auto" role="img" aria-label="Illustrative comparison of a ball trajectory on the Moon versus Earth">
              {/* ground */}
              <line x1="10" y1="200" x2="390" y2="200" stroke="#2D4A53" strokeWidth="2" />
              {/* Moon trajectory */}
              <path d="M 30 195 Q 200 25 370 195" fill="none" stroke="#4A9BAB" strokeWidth="2.5" strokeDasharray="7 5" />
              {/* Earth trajectory */}
              <path d="M 30 195 Q 112 95 195 195" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeDasharray="7 5" />
              {/* landing balls */}
              <circle cx="370" cy="195" r="7" fill="#4A9BAB" />
              <circle cx="195" cy="195" r="7" fill="#F5A623" />
              {/* launch point */}
              <circle cx="30" cy="195" r="5" fill="#E8E6E1" />
              {/* labels */}
              <text x="300" y="120" fill="#4A9BAB" fontSize="12" fontFamily="monospace">Moon · g 1.62</text>
              <text x="118" y="105" fill="#F5A623" fontSize="12" fontFamily="monospace">Earth · g 9.81</text>
            </svg>
          </div>

          {/* Parameter chips */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <span className="px-3 py-1.5 rounded-full bg-background/70 border border-accent/40 font-mono text-[11px] text-accent">
              g = 1.62 m/s²
            </span>
            <span className="px-3 py-1.5 rounded-full bg-background/70 border border-surface/60 font-mono text-[11px] text-utility">
              g = 9.81 m/s²
            </span>
            <span className="px-3 py-1.5 rounded-full bg-background/70 border border-surface/60 font-mono text-[11px] text-utility">
              validated equations
            </span>
          </div>

          <div className="text-[10px] font-mono text-utility text-center mt-4">
            Illustrative mock
          </div>

        </div>
      </div>

    </div>
  );
}
