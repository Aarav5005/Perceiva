export default function Panel2Understands() {
  return (
    <div className="w-full min-h-screen bg-surface px-6 md:px-12 py-24 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-background md:border-none">
      <div className="flex-1 max-w-xl">
        <span className="font-mono text-accent text-lg md:text-xl block mb-4">02 / IT UNDERSTANDS</span>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-pureWhite mb-6 leading-tight">
          Focused. Drifting. Confused.
        </h2>
        <p className="font-body text-lg md:text-xl text-textPrimary/80 leading-relaxed">
          Head orientation, gaze direction, and behavioral patterns combine into a real-time attention state per student — updated continuously.
        </p>
      </div>
      <div className="flex-1 w-full flex justify-center">
        {/* Placeholder for Split UI Mockup */}
        <div className="w-full max-w-md aspect-square rounded-2xl border border-accent/30 bg-accent/5 flex items-center justify-center">
          <span className="font-mono text-accent/50">Split UI Mockup Visual</span>
        </div>
      </div>
    </div>
  );
}
