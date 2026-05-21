export default function Logo({ className = "", size = 36 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LawdMemory logo"
    >
      <defs>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#logo-glow)"
      >
        {/* Outer hexagon */}
        <path d="M50 3 L93 27 L93 76 L50 100 L7 76 L7 27 Z" />
        {/* Inner C (opens right) */}
        <path d="M75 22 L38 22 L22 51 L38 80 L75 80" />
        {/* L vertical */}
        <path d="M22 22 L22 80" />
        {/* M inside C */}
        <path d="M63 30 L63 72 M63 30 L76 51 L89 30 M89 30 L89 72" />
      </g>
    </svg>
  );
}
