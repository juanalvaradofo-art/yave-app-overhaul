import { cn } from '@/lib/utils'

export type MascotPose = 'default' | 'magnifier' | 'pencil'

function DefaultMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave, tu llave amiga"
    >
      <defs>
        <linearGradient id="goldBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" />
          <stop offset="35%" stopColor="#d4a843" />
          <stop offset="70%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0e0a0" />
          <stop offset="100%" stopColor="#d4a843" />
        </linearGradient>
        <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Key bow (top circle) */}
      <circle cx="100" cy="42" r="28" fill="url(#goldBody)" stroke="#8b6914" strokeWidth="2" />
      <circle cx="100" cy="42" r="20" fill="none" stroke="#f0e0a0" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="42" r="10" fill="#0a1628" opacity="0.15" />

      {/* Key bow decorative cutouts */}
      <circle cx="88" cy="34" r="4" fill="#f8f9fa" opacity="0.9" />
      <circle cx="112" cy="34" r="4" fill="#f8f9fa" opacity="0.9" />
      <circle cx="100" cy="52" r="4" fill="#f8f9fa" opacity="0.9" />

      {/* Key shaft */}
      <rect x="86" y="66" width="28" height="88" rx="4" fill="url(#goldBody)" stroke="#8b6914" strokeWidth="2" />
      <rect x="90" y="70" width="8" height="80" rx="2" fill="url(#goldHighlight)" opacity="0.5" />

      {/* Key teeth */}
      <path
        d="M86 130 L74 130 L74 138 L86 138 L86 146 L70 146 L70 154 L86 154"
        fill="url(#goldDark)"
        stroke="#8b6914"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Face screen */}
      <rect x="92" y="82" width="16" height="14" rx="3" fill="#0a1628" />

      {/* Eyes - tech savvy, friendly */}
      <circle cx="96" cy="88" r="2.5" fill="#4ade80" filter="url(#glow)" />
      <circle cx="104" cy="88" r="2.5" fill="#4ade80" filter="url(#glow)" />
      <circle cx="96.5" cy="87.5" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="104.5" cy="87.5" r="1" fill="#ffffff" opacity="0.8" />

      {/* Smile */}
      <path
        d="M96 94 Q100 97 104 94"
        fill="none"
        stroke="#4ade80"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Antenna / tech detail */}
      <line x1="100" y1="14" x2="100" y2="6" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="4" r="3" fill="#f26522" />

      {/* Subtle shine on bow */}
      <ellipse cx="92" cy="30" rx="8" ry="5" fill="#ffffff" opacity="0.2" transform="rotate(-20 92 30)" />
    </svg>
  )
}

function MagnifierMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave revisando con lupa"
    >
      <defs>
        <linearGradient id="goldBodyM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" />
          <stop offset="35%" stopColor="#d4a843" />
          <stop offset="70%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="goldHighlightM" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0e0a0" />
          <stop offset="100%" stopColor="#d4a843" />
        </linearGradient>
        <filter id="glowM" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Key bow */}
      <circle cx="100" cy="42" r="28" fill="url(#goldBodyM)" stroke="#8b6914" strokeWidth="2" />
      <circle cx="100" cy="42" r="20" fill="none" stroke="#f0e0a0" strokeWidth="1.5" opacity="0.6" />
      <circle cx="88" cy="34" r="4" fill="#f8f9fa" opacity="0.9" />
      <circle cx="112" cy="34" r="4" fill="#f8f9fa" opacity="0.9" />
      <circle cx="100" cy="52" r="4" fill="#f8f9fa" opacity="0.9" />

      {/* Key shaft */}
      <rect x="86" y="66" width="28" height="88" rx="4" fill="url(#goldBodyM)" stroke="#8b6914" strokeWidth="2" />
      <rect x="90" y="70" width="8" height="80" rx="2" fill="url(#goldHighlightM)" opacity="0.5" />

      {/* Key teeth */}
      <path
        d="M86 130 L74 130 L74 138 L86 138 L86 146 L70 146 L70 154 L86 154"
        fill="#b8860b"
        stroke="#8b6914"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Face */}
      <rect x="92" y="82" width="16" height="14" rx="3" fill="#0a1628" />
      <circle cx="96" cy="88" r="2.5" fill="#4ade80" filter="url(#glowM)" />
      <circle cx="104" cy="88" r="2.5" fill="#4ade80" filter="url(#glowM)" />
      <circle cx="96.5" cy="87.5" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="104.5" cy="87.5" r="1" fill="#ffffff" opacity="0.8" />
      <path d="M96 94 Q100 97 104 94" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" />

      {/* Magnifying glass */}
      <circle cx="132" cy="110" r="22" fill="none" stroke="#0a1628" strokeWidth="3" />
      <circle cx="132" cy="110" r="18" fill="rgba(74,222,128,0.08)" />
      <line x1="148" y1="126" x2="162" y2="140" stroke="#0a1628" strokeWidth="4" strokeLinecap="round" />
      <line x1="145" y1="123" x2="159" y2="137" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />

      {/* Antenna */}
      <line x1="100" y1="14" x2="100" y2="6" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="4" r="3" fill="#f26522" />

      <ellipse cx="92" cy="30" rx="8" ry="5" fill="#ffffff" opacity="0.2" transform="rotate(-20 92 30)" />
    </svg>
  )
}

function PencilMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave firmando con lápiz"
    >
      <defs>
        <linearGradient id="goldBodyP" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c96a" />
          <stop offset="35%" stopColor="#d4a843" />
          <stop offset="70%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="goldHighlightP" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0e0a0" />
          <stop offset="100%" stopColor="#d4a843" />
        </linearGradient>
        <filter id="glowP" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Key bow */}
      <circle cx="100" cy="42" r="28" fill="url(#goldBodyP)" stroke="#8b6914" strokeWidth="2" />
      <circle cx="100" cy="42" r="20" fill="none" stroke="#f0e0a0" strokeWidth="1.5" opacity="0.6" />
      <circle cx="88" cy="34" r="4" fill="#f8f9fa" opacity="0.9" />
      <circle cx="112" cy="34" r="4" fill="#f8f9fa" opacity="0.9" />
      <circle cx="100" cy="52" r="4" fill="#f8f9fa" opacity="0.9" />

      {/* Key shaft */}
      <rect x="86" y="66" width="28" height="88" rx="4" fill="url(#goldBodyP)" stroke="#8b6914" strokeWidth="2" />
      <rect x="90" y="70" width="8" height="80" rx="2" fill="url(#goldHighlightP)" opacity="0.5" />

      {/* Key teeth */}
      <path
        d="M86 130 L74 130 L74 138 L86 138 L86 146 L70 146 L70 154 L86 154"
        fill="#b8860b"
        stroke="#8b6914"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Face */}
      <rect x="92" y="82" width="16" height="14" rx="3" fill="#0a1628" />
      <circle cx="96" cy="88" r="2.5" fill="#4ade80" filter="url(#glowP)" />
      <circle cx="104" cy="88" r="2.5" fill="#4ade80" filter="url(#glowP)" />
      <circle cx="96.5" cy="87.5" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="104.5" cy="87.5" r="1" fill="#ffffff" opacity="0.8" />
      <path d="M96 94 Q100 97 104 94" fill="none" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" />

      {/* Pencil */}
      <rect x="140" y="70" width="8" height="50" rx="2" fill="#f26522" transform="rotate(25 144 95)" />
      <polygon points="138,118 146,118 142,128" fill="#d4a843" transform="rotate(25 142 123)" />
      <rect x="140" y="66" width="8" height="6" rx="1" fill="#0a1628" transform="rotate(25 144 69)" />

      {/* Antenna */}
      <line x1="100" y1="14" x2="100" y2="6" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="4" r="3" fill="#f26522" />

      <ellipse cx="92" cy="30" rx="8" ry="5" fill="#ffffff" opacity="0.2" transform="rotate(-20 92 30)" />
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
  const Component =
    pose === 'magnifier'
      ? MagnifierMascot
      : pose === 'pencil'
        ? PencilMascot
        : DefaultMascot

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
      className={cn(
        'relative flex items-center justify-center rounded-full bg-card',
        className,
      )}
      style={{
        width: size,
        height: size,
        border: `${Math.max(3, Math.round(size * 0.04))}px solid ${rankColor}`,
        boxShadow: `0 0 0 ${Math.max(2, Math.round(size * 0.025))}px ${rankColor}22`,
      }}
    >
      <MascotGold
        size={size - pad * 2}
        alt={alt}
        pose={pose}
        className="drop-shadow-sm"
      />
    </div>
  )
}
