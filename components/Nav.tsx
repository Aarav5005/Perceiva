export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-transparent py-6 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* Placeholder for SVG Logo */}
        <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
          <span className="text-accent font-display font-bold text-xl leading-none">P</span>
        </div>
        <span className="font-display font-bold text-xl md:text-2xl tracking-wide text-textPrimary">
          Perceiva
        </span>
      </div>
      <button className="text-sm md:text-base font-body font-medium px-4 py-2 md:px-6 md:py-3 border border-accent text-accent bg-transparent rounded-full hover:bg-accent/10 transition-colors">
        Get Early Access
      </button>
    </nav>
  );
}
