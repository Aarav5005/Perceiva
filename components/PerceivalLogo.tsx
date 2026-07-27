"use client";

interface PerceivalLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export default function PerceivalLogo({ size = "md", showTagline = false, className = "" }: PerceivalLogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-base", gap: "gap-2", tagline: "text-[8px]" },
    md: { icon: 36, text: "text-xl", gap: "gap-3", tagline: "text-[9px]" },
    lg: { icon: 48, text: "text-2xl", gap: "gap-4", tagline: "text-[10px]" },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Eye + Face Mesh Icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Face mesh (left half - geometric wireframe) */}
        <g opacity="0.5">
          {/* Top vertex */}
          <circle cx="18" cy="8" r="1.5" fill="#AFB3B7" />
          {/* Upper left */}
          <circle cx="8" cy="16" r="1.5" fill="#AFB3B7" />
          {/* Upper right */}
          <circle cx="22" cy="16" r="1.2" fill="#AFB3B7" />
          {/* Mid left */}
          <circle cx="6" cy="24" r="1.5" fill="#AFB3B7" />
          {/* Center */}
          <circle cx="18" cy="24" r="1.2" fill="#AFB3B7" />
          {/* Lower left */}
          <circle cx="8" cy="32" r="1.5" fill="#AFB3B7" />
          {/* Lower right */}
          <circle cx="22" cy="32" r="1.2" fill="#AFB3B7" />
          {/* Bottom vertex */}
          <circle cx="18" cy="40" r="1.5" fill="#AFB3B7" />

          {/* Mesh lines */}
          <line x1="18" y1="8" x2="8" y2="16" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="18" y1="8" x2="22" y2="16" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="8" y1="16" x2="22" y2="16" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="8" y1="16" x2="6" y2="24" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="8" y1="16" x2="18" y2="24" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="22" y1="16" x2="18" y2="24" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="6" y1="24" x2="18" y2="24" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="6" y1="24" x2="8" y2="32" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="18" y1="24" x2="8" y2="32" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="18" y1="24" x2="22" y2="32" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="8" y1="32" x2="22" y2="32" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="8" y1="32" x2="18" y2="40" stroke="#AFB3B7" strokeWidth="0.6" />
          <line x1="22" y1="32" x2="18" y2="40" stroke="#AFB3B7" strokeWidth="0.6" />
        </g>

        {/* Eye shape */}
        <path
          d="M 16 24 Q 32 12 48 24"
          stroke="#C0C4C8"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 16 24 Q 32 36 48 24"
          stroke="#C0C4C8"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Iris */}
        <circle cx="32" cy="24" r="6.5" stroke="#4A9BAB" strokeWidth="1.8" fill="none" />

        {/* Pupil */}
        <circle cx="32" cy="24" r="2.8" fill="#4A9BAB" />

        {/* Inner pupil highlight */}
        <circle cx="33" cy="23" r="0.8" fill="#8FDCE8" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={`font-display font-semibold ${s.text} tracking-[0.12em] text-[#D8DBDF]`}
          style={{ letterSpacing: "0.12em" }}
        >
          Perceiva
        </span>
        {showTagline && (
          <span className={`${s.tagline} tracking-[0.2em] uppercase text-[#7B8086] font-mono`}>
            What if your classroom <span className="text-[#4A9BAB]">could think?</span>
          </span>
        )}
      </div>
    </div>
  );
}
