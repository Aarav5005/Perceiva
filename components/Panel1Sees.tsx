export default function Panel1Sees() {
  return (
    <div className="w-full bg-surface px-6 md:px-12 py-32 md:py-40 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
      <div className="flex-1 max-w-xl">
        <span className="font-mono text-accent text-lg md:text-xl block mb-4">01 / IT SEES</span>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-pureWhite mb-6 leading-tight">
          Every face, every frame.
        </h2>
        <p className="font-body text-lg md:text-xl text-textPrimary/80 leading-relaxed">
          A classroom camera reads attention patterns across all students simultaneously — without recording or storing any video.
        </p>
      </div>
      <div className="flex-1 w-full flex justify-center">
        {/* Placeholder for Three.js Landmark Mesh */}
        <div className="w-full max-w-lg lg:max-w-xl aspect-square rounded-2xl border border-accent/30 bg-accent/5 flex items-center justify-center">
          <span className="font-mono text-accent/50">Landmark Mesh Visual</span>
        </div>
      </div>
    </div>
  );
}
