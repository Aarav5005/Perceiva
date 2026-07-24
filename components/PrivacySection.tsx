export default function PrivacySection() {
  return (
    <section className="w-full bg-background py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-3xl w-full bg-surface p-8 md:p-12 rounded-xl border border-midtone">
        <h3 className="font-mono text-textPrimary text-lg md:text-xl mb-8">
          DATA HANDLING — PLAIN ENGLISH
        </h3>
        
        <div className="space-y-4 font-mono text-textPrimary/80 text-sm md:text-base">
          <p>No video stored.</p>
          <p>Faces converted to numbers, not images.</p>
          <p>Everything processed on your school&apos;s device.</p>
          <p>Nothing leaves the classroom without parent consent.</p>
          <p>Any student&apos;s data deleted on request, immediately.</p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-background font-mono text-textPrimary/40 text-xs md:text-sm">
          Built for DPDP Act 2023 compliance.
        </div>
      </div>
    </section>
  );
}
