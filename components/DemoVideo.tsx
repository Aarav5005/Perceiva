export default function DemoVideo() {
  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 flex justify-center">
      <div className="relative w-full max-w-5xl aspect-video bg-surface rounded-lg border border-surface flex items-center justify-center overflow-hidden">
        
        {/* Placeholder label */}
        <div className="absolute top-6 left-6 z-10">
          <span className="font-mono text-teal text-sm tracking-wider">LIVE DEMO</span>
        </div>

        {/* Video placeholder text */}
        <p className="font-mono text-textPrimary/40 text-center px-4">
          DEMO VIDEO — perceiva_demo.mp4 goes here
        </p>

        {/* Bottom overlay text */}
        <div className="absolute bottom-6 left-0 w-full text-center z-10 px-4">
          <span className="font-body text-textPrimary/80 text-sm md:text-base bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm">
            This is real. Running now. On a ₹80k classroom PC.
          </span>
        </div>

      </div>
    </section>
  );
}
