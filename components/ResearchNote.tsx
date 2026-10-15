export default function ResearchNote() {
  return (
    <section className="w-full bg-background py-20 md:py-28 px-6 md:px-12 flex justify-center">
      <div className="max-w-3xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-surface/60 bg-surface/20 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-utility animate-pulse" />
          <span>Also exploring — classroom intelligence</span>
        </div>

        <p className="font-body text-base md:text-lg text-textPrimary/75 leading-relaxed mb-6">
          Separately, we&apos;re researching whether privacy-conscious classroom signals could help teachers notice when students might need support before it shows in grades. Such signals can be uncertain and should never be treated as a definitive measure of attention or understanding. The intended approach is to surface tentative context for a teacher to interpret — not to make decisions about students automatically.
        </p>

        <p className="font-mono text-xs text-utility tracking-widest uppercase">
          Status: research direction, not a finished product.
        </p>
      </div>
    </section>
  );
}
