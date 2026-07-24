export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="font-display font-semibold text-2xl md:text-4xl text-textPrimary text-center">
          What if your classroom could think?
        </h1>
        <div className="text-muted font-display font-bold text-xl tracking-wide">
          Perceiva
        </div>
      </div>
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
        <span className="font-mono text-utility text-sm md:text-base">0</span>
      </div>
    </div>
  );
}
