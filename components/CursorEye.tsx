export default function CursorEye() {
  return (
    <div className="absolute hidden md:flex items-center justify-center right-1/4 top-1/3 w-32 h-32 pointer-events-none text-accent">
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 36C28 36 8 64 8 64C8 64 28 92 64 92C100 92 120 64 120 64C120 64 100 36 64 36Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3"/>
        {/* Placeholder Iris */}
        <circle cx="64" cy="64" r="16" fill="currentColor" className="drop-shadow-[0_0_15px_rgba(74,155,171,0.5)]"/>
      </svg>
    </div>
  );
}
