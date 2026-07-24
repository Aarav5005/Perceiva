export default function CursorEye() {
  return (
    <div className="absolute hidden md:flex items-center justify-center right-1/4 top-1/3 w-32 h-32 rounded-full border border-teal/20 pointer-events-none">
      {/* Placeholder Iris */}
      <div className="w-12 h-12 rounded-full bg-teal shadow-[0_0_20px_rgba(94,234,212,0.4)]"></div>
    </div>
  );
}
