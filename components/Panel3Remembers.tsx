"use client";

export default function Panel3Remembers() {
  // Generate 32 vertical attention timeline bars with color distribution
  const timelineBars = [
    "bg-accent", "bg-accent", "bg-accent", "bg-accent", "bg-amber-400", 
    "bg-accent", "bg-accent", "bg-accent", "bg-rose-500", "bg-rose-500", 
    "bg-amber-400", "bg-accent", "bg-accent", "bg-accent", "bg-accent", 
    "bg-accent", "bg-accent", "bg-amber-400", "bg-accent", "bg-accent", 
    "bg-rose-500", "bg-accent", "bg-accent", "bg-accent", "bg-amber-400", 
    "bg-accent", "bg-accent", "bg-accent", "bg-rose-500", "bg-accent"
  ];

  return (
    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_#0D1F23_0%,_#050A0E_100%)] px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 border-t border-surface/30 md:border-none">
      
      {/* Left Content */}
      <div className="flex-1 max-w-xl">
        <span className="font-mono font-bold text-6xl md:text-8xl text-pureWhite/25 block -mb-4 tracking-tighter">
          03
        </span>
        <span className="font-mono text-pureWhite text-xs md:text-sm tracking-[0.25em] uppercase block mb-4">
          IT REMEMBERS
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite mb-6 leading-tight tracking-tight">
          A picture of every student, over time.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/80 leading-relaxed">
          Session logs, engagement trends, and attention patterns build a term-long picture — not just a snapshot.
        </p>
      </div>

      {/* Right Visual — Session Summary Dashboard Card */}
      <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center">
        <div className="relative w-full p-6 md:p-8 rounded-3xl bg-surface/30 backdrop-blur-xl border border-pureWhite/20 shadow-[0_0_50px_rgba(255,255,255,0.08)] overflow-hidden">
          
          {/* Card Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-mono text-[10px] text-utility tracking-widest uppercase block mb-1">
                SESSION SUMMARY
              </span>
              <h4 className="font-display font-bold text-pureWhite text-lg md:text-xl">
                Period 3 · Physics
              </h4>
            </div>
            <div className="px-3 py-1 rounded-full bg-surface border border-pureWhite/20 text-accent font-mono text-xs">
              42 min
            </div>
          </div>

          {/* Timeline Bar Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-[10px] font-mono text-utility mb-2">
              <span>ATTENTION TIMELINE</span>
              <span>0 → 42m</span>
            </div>
            <div className="flex items-center gap-1.5 h-10 p-1.5 bg-background/70 rounded-xl border border-surface/50 overflow-hidden">
              {timelineBars.map((colorClass, idx) => (
                <div 
                  key={idx} 
                  className={`flex-1 h-full rounded-sm opacity-90 hover:opacity-100 transition-opacity ${colorClass}`} 
                />
              ))}
            </div>
          </div>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 rounded-xl bg-background/50 border border-surface/60 text-center">
              <span className="font-mono text-[10px] text-utility block mb-1">Engaged</span>
              <span className="font-display font-bold text-lg md:text-xl text-accent">71%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-background/50 border border-surface/60 text-center">
              <span className="font-mono text-[10px] text-utility block mb-1">Drifting</span>
              <span className="font-display font-bold text-lg md:text-xl text-amber-400">18%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-background/50 border border-surface/60 text-center">
              <span className="font-mono text-[10px] text-utility block mb-1">Low</span>
              <span className="font-display font-bold text-lg md:text-xl text-rose-400">11%</span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="text-[10px] font-mono text-utility text-center">
            Sample output · illustrative session view
          </div>

        </div>
      </div>

    </div>
  );
}
