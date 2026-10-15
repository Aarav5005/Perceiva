"use client";

export default function Panel3Adapt() {
  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_#0D1F23_0%,_#050A0E_100%)] px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 border-t border-surface/30 md:border-none">

      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <span className="font-mono font-bold text-6xl md:text-8xl text-pureWhite/25 block -mb-4 tracking-tighter">
          03
        </span>
        <span className="font-mono text-pureWhite text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
          IT ADAPTS
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite mb-6 leading-tight tracking-tight">
          Change it. Question it. Explore again.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/80 leading-relaxed">
          The goal is to let a class change variables, observe how the model responds, ask follow-up questions, and use a short comprehension check.
        </p>
      </div>

      {/* Right Visual — parameter controls + comprehension check mock */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center">
        <div className="relative w-full p-6 md:p-8 rounded-3xl bg-surface/30 backdrop-blur-xl border border-pureWhite/20 shadow-[0_0_50px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col gap-5">

          {/* HUD Top Tag */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 border border-pureWhite/20 text-[10px] font-mono text-utility tracking-widest uppercase">
            Live parameters
          </div>

          {/* Gravity slider mock */}
          <div className="mt-8 p-5 rounded-2xl bg-background/60 border border-surface/60">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] text-utility tracking-widest uppercase">
                Gravitational acceleration
              </span>
              <span className="font-mono text-xs text-accent">1.62 m/s²</span>
            </div>
            <div className="relative h-2 rounded-full bg-surface">
              <div className="absolute left-0 top-0 h-full w-[18%] rounded-full bg-accent" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[18%] w-5 h-5 rounded-full bg-accent border-2 border-background shadow-[0_0_12px_rgba(74,155,171,0.8)]" />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-utility">
              <span>Moon</span>
              <span>Earth</span>
            </div>
          </div>

          {/* Angle slider mock */}
          <div className="p-5 rounded-2xl bg-background/60 border border-surface/60">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[10px] text-utility tracking-widest uppercase">
                Launch angle
              </span>
              <span className="font-mono text-xs text-accent">45°</span>
            </div>
            <div className="relative h-2 rounded-full bg-surface">
              <div className="absolute left-0 top-0 h-full w-[50%] rounded-full bg-accent/70" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-5 h-5 rounded-full bg-pureWhite border-2 border-background" />
            </div>
          </div>

          {/* Comprehension check mock */}
          <div className="p-5 rounded-2xl bg-accent/10 border border-accent/40">
            <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">
              Comprehension check
            </p>
            <p className="font-body text-sm text-textPrimary/85 leading-relaxed">
              &ldquo;If gravity were doubled, where would the ball land?&rdquo; — ready when the teacher is.
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
