import CursorEye from "./CursorEye";
import SideRays from "./SideRays";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col justify-center px-6 md:px-12 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] overflow-hidden">
      <div className="absolute inset-0 z-0">
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
      </div>
      <CursorEye />
      
      <div className="relative z-10 max-w-4xl pt-20">
        <h1 className="font-display font-bold text-5xl md:text-6xl text-pureWhite leading-tight mb-8">
          What if your classroom could think?
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-textPrimary/80 leading-relaxed max-w-2xl mb-12">
          Perceiva reads attention, detects struggle, and understands every student — in real time.
        </p>
        
        <div className="flex flex-col items-start gap-4">
          <button className="text-base md:text-lg font-body font-medium px-8 py-4 border border-accent text-accent bg-transparent rounded-full hover:bg-accent/10 transition-colors">
            Join the early access list ↓
          </button>
          
          <span className="font-mono text-xs md:text-sm text-utility">
            Currently building with founding schools · IIT Jodhpur
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12">
        <span className="font-mono text-xs md:text-sm text-utility tracking-[0.2em]">
          SCROLL
        </span>
      </div>
    </section>
  );
}
