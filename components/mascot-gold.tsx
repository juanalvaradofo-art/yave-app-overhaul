import { cn } from '@/lib/utils'

export type MascotPose = 'default' | 'magnifier' | 'pencil'

function DefaultMascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className={cn('select-none', className)} aria-label="Yave, tu llave amiga">
      {/* Cap */}
      <ellipse cx="90" cy="28" rx="36" ry="10" fill="#f26522" />
      <path d="M54 28 Q54 10 90 10 Q126 10 126 28" fill="#f26522" />
      <rect x="86" y="4" width="8" height="10" rx="4" fill="#f26522" />
      <path d="M60 24 Q90 18 120 24" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />

      {/* Key bow (head) */}
      <ellipse cx="90" cy="56" rx="36" ry="32" fill="#FFD600" />
      <ellipse cx="90" cy="56" rx="28" ry="24" fill="none" stroke="#E5B800" strokeWidth="2" />
      <circle cx="90" cy="56" r="10" fill="#1565C0" opacity="0.08" />
      <circle cx="73" cy="46" r="4.5" fill="#fff" opacity="0.8" />
      <circle cx="107" cy="46" r="4.5" fill="#fff" opacity="0.8" />
      <circle cx="90" cy="70" r="4.5" fill="#fff" opacity="0.8" />

      {/* Face panel */}
      <rect x="76" y="46" width="28" height="24" rx="8" fill="#1a2744" />

      {/* Eyes - big, friendly, cartoonish */}
      <ellipse cx="84" cy="54" rx="5" ry="6" fill="#fff" />
      <circle cx="85.5" cy="54" r="3" fill="#1a2744" />
      <circle cx="86.5" cy="52.5" r="1.5" fill="#fff" />
      <ellipse cx="96" cy="54" rx="5" ry="6" fill="#fff" />
      <circle cx="94.5" cy="54" r="3" fill="#1a2744" />
      <circle cx="95.5" cy="52.5" r="1.5" fill="#fff" />

      {/* Big happy smile */}
      <path d="M83 63 Q90 70 97 63" fill="#f26522" stroke="#d4520e" strokeWidth="0.5" />
      <path d="M85 63 Q90 67 95 63" fill="#fff" />

      {/* Eyebrows */}
      <path d="M79 47 Q84 44 89 47" fill="none" stroke="#1a2744" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M91 47 Q96 44 101 47" fill="none" stroke="#1a2744" strokeWidth="1.8" strokeLinecap="round" />

      {/* Key shaft (body) */}
      <rect x="76" y="82" width="28" height="88" rx="10" fill="#FFD600" />
      <rect x="76" y="82" width="28" height="88" rx="10" fill="none" stroke="#E5B800" strokeWidth="2" />

      {/* Key teeth */}
      <path d="M76 142 L60 142 L60 150 L76 150 L76 158 L56 158 L56 166 L76 166" fill="#E5B800" stroke="#CCA200" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Left arm - thumbs up */}
      <g transform="translate(48, 104) rotate(-15)">
        <ellipse cx="0" cy="0" rx="10" ry="7" fill="#FFD600" stroke="#E5B800" strokeWidth="1.5" />
        {/* Glove */}
        <circle cx="-8" cy="-6" r="5" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
        <ellipse cx="-10" cy="-12" rx="3" ry="5" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      </g>

      {/* Right arm - wave */}
      <g transform="translate(132, 102) rotate(15)">
        <ellipse cx="0" cy="0" rx="10" ry="7" fill="#FFD600" stroke="#E5B800" strokeWidth="1.5" />
        <circle cx="8" cy="-4" r="5" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      </g>

      {/* Feet - sneaker style */}
      <ellipse cx="82" cy="176" rx="12" ry="6" fill="#1565C0" />
      <ellipse cx="98" cy="176" rx="12" ry="6" fill="#1565C0" />
      <ellipse cx="82" cy="175" rx="10" ry="4" fill="#1976D2" />
      <ellipse cx="98" cy="175" rx="10" ry="4" fill="#1976D2" />
    </svg>
  )
}

function MagnifierMascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className={cn('select-none', className)} aria-label="Yave revisando">
      {/* Cap */}
      <ellipse cx="90" cy="28" rx="36" ry="10" fill="#f26522" />
      <path d="M54 28 Q54 10 90 10 Q126 10 126 28" fill="#f26522" />
      <rect x="86" y="4" width="8" height="10" rx="4" fill="#f26522" />

      {/* Key bow */}
      <ellipse cx="90" cy="56" rx="36" ry="32" fill="#FFD600" />
      <ellipse cx="90" cy="56" rx="28" ry="24" fill="none" stroke="#E5B800" strokeWidth="2" />
      <circle cx="90" cy="56" r="10" fill="#1565C0" opacity="0.08" />
      <circle cx="73" cy="46" r="4.5" fill="#fff" opacity="0.8" />
      <circle cx="107" cy="46" r="4.5" fill="#fff" opacity="0.8" />
      <circle cx="90" cy="70" r="4.5" fill="#fff" opacity="0.8" />

      {/* Face */}
      <rect x="76" y="46" width="28" height="24" rx="8" fill="#1a2744" />
      <ellipse cx="84" cy="54" rx="5" ry="6" fill="#fff" />
      <circle cx="85.5" cy="54" r="3" fill="#1a2744" />
      <circle cx="86.5" cy="52.5" r="1.5" fill="#fff" />
      <ellipse cx="96" cy="54" rx="4" ry="5" fill="#fff" />
      <circle cx="95" cy="54" r="2.5" fill="#1a2744" />
      <circle cx="95.5" cy="52.5" r="1" fill="#fff" />
      <path d="M84 63 Q90 68 96 63" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />

      {/* Body */}
      <rect x="76" y="82" width="28" height="88" rx="10" fill="#FFD600" />
      <rect x="76" y="82" width="28" height="88" rx="10" fill="none" stroke="#E5B800" strokeWidth="2" />
      <path d="M76 142 L60 142 L60 150 L76 150 L76 158 L56 158 L56 166 L76 166" fill="#E5B800" stroke="#CCA200" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Arms */}
      <ellipse cx="52" cy="108" rx="10" ry="7" fill="#FFD600" stroke="#E5B800" strokeWidth="1.5" transform="rotate(-15 52 108)" />
      <ellipse cx="128" cy="106" rx="10" ry="7" fill="#FFD600" stroke="#E5B800" strokeWidth="1.5" transform="rotate(15 128 106)" />

      {/* Magnifying glass */}
      <g transform="translate(128, 80)">
        <circle cx="0" cy="0" r="18" fill="none" stroke="#1a2744" strokeWidth="3" />
        <circle cx="0" cy="0" r="14" fill="#1565C0" opacity="0.05" />
        <line x1="13" y1="13" x2="26" y2="26" stroke="#1a2744" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Feet */}
      <ellipse cx="82" cy="176" rx="12" ry="6" fill="#1565C0" />
      <ellipse cx="98" cy="176" rx="12" ry="6" fill="#1565C0" />
    </svg>
  )
}

function PencilMascot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className={cn('select-none', className)} aria-label="Yave firmando">
      {/* Cap */}
      <ellipse cx="90" cy="28" rx="36" ry="10" fill="#f26522" />
      <path d="M54 28 Q54 10 90 10 Q126 10 126 28" fill="#f26522" />
      <rect x="86" y="4" width="8" height="10" rx="4" fill="#f26522" />

      {/* Key bow */}
      <ellipse cx="90" cy="56" rx="36" ry="32" fill="#FFD600" />
      <ellipse cx="90" cy="56" rx="28" ry="24" fill="none" stroke="#E5B800" strokeWidth="2" />
      <circle cx="90" cy="56" r="10" fill="#1565C0" opacity="0.08" />
      <circle cx="73" cy="46" r="4.5" fill="#fff" opacity="0.8" />
      <circle cx="107" cy="46" r="4.5" fill="#fff" opacity="0.8" />
      <circle cx="90" cy="70" r="4.5" fill="#fff" opacity="0.8" />

      {/* Face - determined */}
      <rect x="76" y="46" width="28" height="24" rx="8" fill="#1a2744" />
      <ellipse cx="84" cy="54" rx="4.5" ry="5.5" fill="#fff" />
      <circle cx="85" cy="54" r="2.8" fill="#1a2744" />
      <circle cx="86" cy="52.5" r="1.2" fill="#fff" />
      <ellipse cx="96" cy="54" rx="4.5" ry="5.5" fill="#fff" />
      <circle cx="95" cy="54" r="2.8" fill="#1a2744" />
      <circle cx="96" cy="52.5" r="1.2" fill="#fff" />
      <path d="M84 63 Q90 69 96 63" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />

      {/* Body */}
      <rect x="76" y="82" width="28" height="88" rx="10" fill="#FFD600" />
      <rect x="76" y="82" width="28" height="88" rx="10" fill="none" stroke="#E5B800" strokeWidth="2" />
      <path d="M76 142 L60 142 L60 150 L76 150 L76 158 L56 158 L56 166 L76 166" fill="#E5B800" stroke="#CCA200" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Arms */}
      <ellipse cx="52" cy="108" rx="10" ry="7" fill="#FFD600" stroke="#E5B800" strokeWidth="1.5" transform="rotate(-15 52 108)" />
      <ellipse cx="128" cy="106" rx="10" ry="7" fill="#FFD600" stroke="#E5B800" strokeWidth="1.5" transform="rotate(15 128 106)" />

      {/* Pencil in right hand */}
      <g transform="translate(136, 72) rotate(30)">
        <rect x="-3" y="0" width="6" height="42" rx="2" fill="#f26522" />
        <polygon points="-3,42 3,42 0,50" fill="#FFD600" />
        <polygon points="-1.5,46 1.5,46 0,50" fill="#1a2744" />
        <rect x="-3" y="-4" width="6" height="4" rx="1.5" fill="#1a2744" />
      </g>

      {/* Feet */}
      <ellipse cx="82" cy="176" rx="12" ry="6" fill="#1565C0" />
      <ellipse cx="98" cy="176" rx="12" ry="6" fill="#1565C0" />
    </svg>
  )
}

export function MascotGold({
  className,
  size = 120,
  alt = 'Yave, tu llave amiga',
  pose = 'default' as MascotPose,
}: {
  className?: string
  size?: number
  alt?: string
  pose?: MascotPose
}) {
  const Component = pose === 'magnifier' ? MagnifierMascot : pose === 'pencil' ? PencilMascot : DefaultMascot
  return (
    <div
      style={{ width: size, height: size }}
      className={cn('inline-flex items-center justify-center', className)}
      role="img"
      aria-label={alt}
    >
      <Component className="h-full w-full" />
    </div>
  )
}

export function RankMascot({
  rankColor,
  size = 96,
  className,
  alt,
  pose = 'default' as MascotPose,
}: {
  rankColor: string
  size?: number
  className?: string
  alt?: string
  pose?: MascotPose
}) {
  const pad = Math.round(size * 0.12)
  return (
    <div
      className={cn('relative flex items-center justify-center rounded-full bg-card', className)}
      style={{
        width: size,
        height: size,
        border: `${Math.max(3, Math.round(size * 0.04))}px solid ${rankColor}`,
        boxShadow: `0 0 0 ${Math.max(2, Math.round(size * 0.025))}px ${rankColor}22`,
      }}
    >
      <MascotGold size={size - pad * 2} alt={alt} pose={pose} className="drop-shadow-sm" />
    </div>
  )
}
