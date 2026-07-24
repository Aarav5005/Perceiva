"use client";

import BorderGlow from "./BorderGlow";

export default function PersonaCards() {
  const personas = [
    {
      role: "PRINCIPAL",
      abbr: "PR",
      pain: "You manage outcomes but can't see inside classrooms.",
      benefit: "Term-long engagement data across every class, every teacher."
    },
    {
      role: "TEACHER",
      abbr: "TE",
      pain: "You can't watch 30 students and teach at the same time.",
      benefit: "Know who's lost before they give up. While class is happening."
    },
    {
      role: "PARENT",
      abbr: "PA",
      pain: "You only hear about problems after the test.",
      benefit: "Understand your child's classroom reality, not just their marks."
    },
    {
      role: "STUDENT",
      abbr: "ST",
      pain: "You struggle but no one notices until it's too late.",
      benefit: "Be seen. Not just graded."
    }
  ];

  const handleCardClick = (role: string) => {
    // Capitalize first letter to match form format
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    window.dispatchEvent(new CustomEvent('select-role', { detail: { role: formattedRole } }));
    
    const formElement = document.getElementById('early-access-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-background py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((p) => (
          <div 
            key={p.role}
            data-role={p.role.toLowerCase()}
            onClick={() => handleCardClick(p.role)}
            className="rounded-2xl transition-transform hover:-translate-y-1 cursor-pointer"
          >
            <BorderGlow
              glowColor="185 35 53"
              backgroundColor="#132E35"
              borderRadius={16}
              glowRadius={30}
              glowIntensity={0.8}
              animated={false}
              colors={['#4A9BAB', '#2D4A53', '#69818D']}
              className="h-full"
            >
              <div className="flex flex-col h-full w-full relative z-10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-surface border border-midtone flex items-center justify-center shrink-0">
                    <span className="font-mono text-accent text-sm font-bold tracking-wider">{p.abbr}</span>
                  </div>
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
            </BorderGlow>
          </div>
        ))}
      </div>
    </section>
  );
}
