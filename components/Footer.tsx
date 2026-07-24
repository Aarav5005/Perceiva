export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-surface pt-16 pb-8 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-16">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center">
            <span className="text-teal font-display font-bold text-sm leading-none">P</span>
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-textPrimary">
            Perceiva
          </span>
        </div>

        {/* Center */}
        <div className="text-center flex flex-col gap-2">
          <p className="font-body text-textPrimary/80">Built by founders at IIT Jodhpur</p>
          <a href="mailto:hello@perceiva.in" className="font-body text-teal hover:underline">hello@perceiva.in</a>
        </div>

        {/* Right */}
        <div className="text-center md:text-right flex flex-col gap-2">
          <div className="flex gap-4 justify-center md:justify-end text-textPrimary/60">
            <a href="#" className="hover:text-teal transition-colors">Twitter</a>
            <a href="#" className="hover:text-teal transition-colors">LinkedIn</a>
          </div>
          <p className="font-body text-textPrimary/40 text-sm">© 2026 Perceiva</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="w-full text-center">
        <span className="font-mono text-teal text-xs tracking-widest uppercase">
          perceiva.in is secured · Data processed in India
        </span>
      </div>
    </footer>
  );
}
