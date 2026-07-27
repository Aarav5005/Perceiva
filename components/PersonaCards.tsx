"use client";

import { useState } from "react";

export default function PersonaCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const personas = [
    {
      role: "PRINCIPAL",
      code: "01",
      pain: "You manage outcomes but can't see inside classrooms.",
      benefit: "Term-long engagement data across every class, every teacher.",
      accent: "#4A9BAB",
    },
    {
      role: "TEACHER",
      code: "02",
      pain: "You can't watch 30 students and teach at the same time.",
      benefit: "Know who's lost before they give up. While class is happening.",
      accent: "#8B5CF6",
    },
    {
      role: "PARENT",
      code: "03",
      pain: "You only hear about problems after the test.",
      benefit: "Understand your child's classroom reality, not just their marks.",
      accent: "#F59E0B",
    },
    {
      role: "STUDENT",
      code: "04",
      pain: "You struggle but no one notices until it's too late.",
      benefit: "Be seen. Not just graded.",
      accent: "#F43F5E",
    },
  ];

  const handleCardClick = (role: string) => {
    const formattedRole =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    window.dispatchEvent(
      new CustomEvent("select-role", { detail: { role: formattedRole } })
    );
    const formElement = document.getElementById("early-access-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-background py-28 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,155,171,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,155,171,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-surface/30 backdrop-blur-md text-utility text-xs font-mono tracking-widest uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Built For Everyone</span>
        </div>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-pureWhite tracking-tight leading-tight">
          One system. Every stakeholder.
        </h2>
        <p className="font-body text-base md:text-lg text-textPrimary/60">
          Perceiva delivers personalized insights to every person who shapes the
          classroom experience.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((p, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={p.role}
              data-role={p.role.toLowerCase()}
              onClick={() => handleCardClick(p.role)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              {/* Outer glow */}
              <div
                className="absolute -inset-[1px] rounded-2xl transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${p.accent}50, transparent 50%, transparent 50%, ${p.accent}30)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Card body */}
              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: isHovered
                    ? "rgba(19, 46, 53, 0.9)"
                    : "rgba(19, 46, 53, 0.5)",
                  boxShadow: isHovered
                    ? `0 20px 60px ${p.accent}15, 0 0 40px ${p.accent}08`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-[2px] w-full transition-all duration-500"
                  style={{
                    background: isHovered
                      ? `linear-gradient(90deg, transparent, ${p.accent}, transparent)`
                      : `linear-gradient(90deg, transparent, ${p.accent}30, transparent)`,
                  }}
                />

                {/* HUD corners */}
                <div
                  className="absolute top-3 left-3 w-3 h-3 border-t border-l transition-colors duration-500"
                  style={{ borderColor: isHovered ? p.accent : "rgba(105,129,141,0.3)" }}
                />
                <div
                  className="absolute top-3 right-3 w-3 h-3 border-t border-r transition-colors duration-500"
                  style={{ borderColor: isHovered ? p.accent : "rgba(105,129,141,0.3)" }}
                />
                <div
                  className="absolute bottom-3 left-3 w-3 h-3 border-b border-l transition-colors duration-500"
                  style={{ borderColor: isHovered ? p.accent : "rgba(105,129,141,0.3)" }}
                />
                <div
                  className="absolute bottom-3 right-3 w-3 h-3 border-b border-r transition-colors duration-500"
                  style={{ borderColor: isHovered ? p.accent : "rgba(105,129,141,0.3)" }}
                />

                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-3xl font-bold transition-colors duration-500"
                        style={{
                          color: isHovered ? p.accent : "rgba(74,155,171,0.25)",
                        }}
                      >
                        {p.code}
                      </span>
                      <h3
                        className="font-display font-bold text-xl tracking-[0.15em] transition-colors duration-500"
                        style={{ color: isHovered ? "#FFFFFF" : "#C0C4C8" }}
                      >
                        {p.role}
                      </h3>
                    </div>
                    {/* Status indicator */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: isHovered ? p.accent : "rgba(105,129,141,0.4)",
                          boxShadow: isHovered ? `0 0 8px ${p.accent}` : "none",
                        }}
                      />
                      <span
                        className="font-mono text-[10px] tracking-widest transition-colors duration-500"
                        style={{ color: isHovered ? p.accent : "rgba(105,129,141,0.4)" }}
                      >
                        {isHovered ? "ACTIVE" : "STANDBY"}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="h-px mb-6 transition-all duration-500"
                    style={{
                      background: isHovered
                        ? `linear-gradient(90deg, ${p.accent}60, transparent)`
                        : "rgba(105,129,141,0.15)",
                    }}
                  />

                  {/* Pain */}
                  <div className="mb-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-textPrimary/30 block mb-2">
                      ▸ Without Perceiva
                    </span>
                    <p className="font-body text-textPrimary/60 text-[15px] leading-relaxed">
                      {p.pain}
                    </p>
                  </div>

                  {/* Benefit */}
                  <div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-2 transition-colors duration-500"
                      style={{ color: isHovered ? p.accent : "rgba(74,155,171,0.5)" }}
                    >
                      ▸ With Perceiva
                    </span>
                    <p
                      className="font-body text-[15px] leading-relaxed font-medium transition-colors duration-500"
                      style={{ color: isHovered ? "#E8EAED" : "#9BA1A8" }}
                    >
                      {p.benefit}
                    </p>
                  </div>

                  {/* CTA on hover */}
                  <div
                    className="mt-6 pt-4 border-t flex items-center justify-between transition-all duration-500"
                    style={{
                      borderColor: isHovered ? `${p.accent}30` : "transparent",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    <span
                      className="font-mono text-xs tracking-wider"
                      style={{ color: p.accent }}
                    >
                      JOIN AS {p.role}
                    </span>
                    <span
                      className="font-mono text-sm"
                      style={{ color: p.accent }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
