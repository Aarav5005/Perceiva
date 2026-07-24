export default function PersonaCards() {
  const personas = [
    {
      role: "PRINCIPAL",
      icon: "🏫",
      pain: "You manage outcomes but can't see inside classrooms.",
      benefit: "Term-long engagement data across every class, every teacher."
    },
    {
      role: "TEACHER",
      icon: "👩‍🏫",
      pain: "You can't watch 30 students and teach at the same time.",
      benefit: "Know who's lost before they give up. While class is happening."
    },
    {
      role: "PARENT",
      icon: "👨‍👩‍👧",
      pain: "You only hear about problems after the test.",
      benefit: "Understand your child's classroom reality, not just their marks."
    },
    {
      role: "STUDENT",
      icon: "🧑‍🎒",
      pain: "You struggle but no one notices until it's too late.",
      benefit: "Be seen. Not just graded."
    }
  ];

  return (
    <section className="w-full bg-background py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((p) => (
          <div 
            key={p.role}
            data-role={p.role.toLowerCase()}
            className="bg-surface p-8 rounded-2xl border border-midtone hover:border-accent/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl">{p.icon}</span>
              <h3 className="font-display font-bold text-xl text-pureWhite tracking-wide">
                {p.role}
              </h3>
            </div>
            
            <div className="space-y-4">
              <p className="font-body text-textPrimary/60">
                <span className="text-textPrimary/40 block mb-1 text-sm uppercase tracking-wider">Pain</span>
                {p.pain}
              </p>
              <p className="font-body text-accent">
                <span className="text-accent/50 block mb-1 text-sm uppercase tracking-wider">Benefit</span>
                {p.benefit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
