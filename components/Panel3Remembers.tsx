export default function Panel3Remembers() {
  return (
    <div className="w-full min-h-screen bg-surface px-6 md:px-12 py-24 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-background md:border-none">
      <div className="flex-1 max-w-xl">
        <span className="font-mono text-pureWhite text-lg md:text-xl block mb-4">03 / IT REMEMBERS</span>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-pureWhite mb-6 leading-tight">
          A picture of every student, over time.
        </h2>
        <p className="font-body text-lg md:text-xl text-textPrimary/80 leading-relaxed">
          Session logs, engagement trends, and attention patterns build a term-long picture — not just a snapshot.
        </p>
      </div>
      <div className="flex-1 w-full flex justify-center">
        {/* Placeholder for Timeline Bar */}
        <div className="w-full max-w-md aspect-square rounded-2xl border border-pureWhite/30 bg-pureWhite/5 flex items-center justify-center">
          <span className="font-mono text-pureWhite/50">Timeline Bar Visual</span>
        </div>
      </div>
    </div>
  );
}
