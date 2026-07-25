import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-midtone pt-16 pb-8 px-6 md:px-12 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-16">
        
        {/* Left */}
        <div className="flex items-center">
          <Image 
            src="/logo/perceiva-logo.svg" 
            alt="Perceiva Logo" 
            width={120} 
            height={32} 
            className="w-auto h-6 object-contain"
          />
        </div>

        {/* Center */}
        <div className="text-center flex flex-col gap-2">
          <p className="font-body text-textPrimary/80">Built by founders at IIT Jodhpur</p>
          <a href="mailto:hello@perceiva.in" className="font-body text-accent hover:underline">hello@perceiva.in</a>
        </div>

        {/* Right */}
        <div className="text-center md:text-right flex flex-col gap-2">
          <div className="flex gap-4 justify-center md:justify-end text-utility">
            <a href="#" className="hover:text-accent transition-colors">Twitter</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
          <p className="font-body text-utility text-sm">© 2026 Perceiva</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="w-full text-center">
        <span className="font-mono text-accent text-xs tracking-widest uppercase">
          perceiva.in is secured · Data processed in India
        </span>
      </div>
    </footer>
  );
}
