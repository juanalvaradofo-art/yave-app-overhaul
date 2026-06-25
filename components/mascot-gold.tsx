import { cn } from '@/lib/utils'

export type MascotPose = 'default' | 'magnifier' | 'pencil'

function DefaultMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave, tu llave amiga"
    >
      {/* Key bow (head) */}
      <ellipse cx="100" cy="54" rx="40" ry="36" fill="#FFC107" />
      <ellipse cx="100" cy="54" rx="32" ry="28" fill="none" stroke="#E5A800" strokeWidth="2" />
      <ellipse cx="100" cy="54" rx="14" ry="12" fill="#0B2545" opacity="0.08" />
      <circle cx="80" cy="42" r="5" fill="#fff" opacity="0.85" />
      <circle cx="120" cy="42" r="5" fill="#fff" opacity="0.85" />
      <circle cx="100" cy="68" r="5" fill="#fff" opacity="0.85" />

      {/* Key shaft (body) */}
      <rect x="82" y="82" width="36" height="100" rx="12" fill="#FFC107" />
      <rect x="82" y="82" width="36" height="100" rx="12" fill="none" stroke="#E5A800" strokeWidth="2" />

      {/* Key teeth */}
      <path
        d="M82 156 L64 156 L64 164 L82 164 L82 172 L60 172 L60 180 L82 180"
        fill="#E5A800"
        stroke="#CC8F00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Face panel */}
      <rect x="86" y="100" width="28" height="30" rx="8" fill="#0B2545" />

      {/* Eyes */}
      <ellipse cx="94" cy="110" rx="4.5" ry="5" fill="#fff" />
      <circle cx="95" cy="110" r="2.5" fill="#0B2545" />
      <circle cx="96" cy="108.5" r="1.2" fill="#fff" />
      <ellipse cx="106" cy="110" rx="4.5" ry="5" fill="#fff" />
      <circle cx="105" cy="110" r="2.5" fill="#0B2545" />
      <circle cx="106" cy="108.5" r="1.2" fill="#fff" />

      {/* Eyebrows */}
      <path d="M90 103 Q94 100 98 103" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M102 103 Q106 100 110 103" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />

      {/* Smile */}
      <path d="M94 121 Q100 126 106 121" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />

      {/* Arms */}
      <ellipse cx="60" cy="122" rx="10" ry="7" fill="#FFC107" stroke="#E5A800" strokeWidth="1.5" transform="rotate(-18 60 122)" />
      <ellipse cx="140" cy="120" rx="10" ry="7" fill="#FFC107" stroke="#E5A800" strokeWidth="1.5" transform="rotate(18 140 120)" />

      {/* Antenna */}
      <line x1="100" y1="20" x2="100" y2="8" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="5" r="4" fill="#f26522" />

      {/* Feet */}
      <ellipse cx="90" cy="188" rx="10" ry="5" fill="#E5A800" />
      <ellipse cx="110" cy="188" rx="10" ry="5" fill="#E5A800" />
    </svg>
  )
}

function MagnifierMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave revisando con lupa"
    >
      {/* Key bow */}
      <ellipse cx="100" cy="54" rx="40" ry="36" fill="#FFC107" />
      <ellipse cx="100" cy="54" rx="32" ry="28" fill="none" stroke="#E5A800" strokeWidth="2" />
      <ellipse cx="100" cy="54" rx="14" ry="12" fill="#0B2545" opacity="0.08" />
      <circle cx="80" cy="42" r="5" fill="#fff" opacity="0.85" />
      <circle cx="120" cy="42" r="5" fill="#fff" opacity="0.85" />
      <circle cx="100" cy="68" r="5" fill="#fff" opacity="0.85" />

      {/* Key shaft */}
      <rect x="82" y="82" width="36" height="100" rx="12" fill="#FFC107" />
      <rect x="82" y="82" width="36" height="100" rx="12" fill="none" stroke="#E5A800" strokeWidth="2" />

      {/* Key teeth */}
      <path
        d="M82 156 L64 156 L64 164 L82 164 L82 172 L60 172 L60 180 L82 180"
        fill="#E5A800"
        stroke="#CC8F00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Face panel */}
      <rect x="86" y="100" width="28" height="30" rx="8" fill="#0B2545" />

      {/* Eyes - one squinted */}
      <ellipse cx="94" cy="110" rx="4.5" ry="5" fill="#fff" />
      <circle cx="95" cy="110" r="2.5" fill="#0B2545" />
      <circle cx="96" cy="108.5" r="1.2" fill="#fff" />
      <ellipse cx="106" cy="110" rx="3.5" ry="4" fill="#fff" />
      <circle cx="105.5" cy="110" r="2" fill="#0B2545" />
      <circle cx="106.5" cy="108.5" r="1" fill="#fff" />

      {/* Focused eyebrows */}
      <path d="M90 103 Q94 101 98 104" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M102 104 Q106 101 110 103" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />

      {/* Slight smile */}
      <path d="M95 121 Q100 124 105 121" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />

      {/* Arms */}
      <ellipse cx="60" cy="122" rx="10" ry="7" fill="#FFC107" stroke="#E5A800" strokeWidth="1.5" transform="rotate(-18 60 122)" />
      <ellipse cx="140" cy="120" rx="10" ry="7" fill="#FFC107" stroke="#E5A800" strokeWidth="1.5" transform="rotate(18 140 120)" />

      {/* Magnifying glass */}
      <g transform="translate(132, 90)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#0B2545" strokeWidth="3" />
        <circle cx="0" cy="0" r="18" fill="#0B2545" opacity="0.04" />
        <line x1="15" y1="15" x2="30" y2="30" stroke="#0B2545" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Antenna */}
      <line x1="100" y1="20" x2="100" y2="8" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="5" r="4" fill="#f26522" />

      {/* Feet */}
      <ellipse cx="90" cy="188" rx="10" ry="5" fill="#E5A800" />
      <ellipse cx="110" cy="188" rx="10" ry="5" fill="#E5A800" />
    </svg>
  )
}

function PencilMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave firmando con lapiz"
    >
      {/* Key bow */}
      <ellipse cx="100" cy="54" rx="40" ry="36" fill="#FFC107" />
      <ellipse cx="100" cy="54" rx="32" ry="28" fill="none" stroke="#E5A800" strokeWidth="2" />
      <ellipse cx="100" cy="54" rx="14" ry="12" fill="#0B2545" opacity="0.08" />
      <circle cx="80" cy="42" r="5" fill="#fff" opacity="0.85" />
      <circle cx="120" cy="42" r="5" fill="#fff" opacity="0.85" />
      <circle cx="100" cy="68" r="5" fill="#fff" opacity="0.85" />

      {/* Key shaft */}
      <rect x="82" y="82" width="36" height="100" rx="12" fill="#FFC107" />
      <rect x="82" y="82" width="36" height="100" rx="12" fill="none" stroke="#E5A800" strokeWidth="2" />

      {/* Key teeth */}
      <path
        d="M82 156 L64 156 L64 164 L82 164 L82 172 L60 172 L60 180 L82 180"
        fill="#E5A800"
        stroke="#CC8F00"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Face panel */}
      <rect x="86" y="100" width="28" height="30" rx="8" fill="#0B2545" />

      {/* Eyes */}
      <ellipse cx="94" cy="110" rx="4" ry="5" fill="#fff" />
      <circle cx="95" cy="110" r="2.5" fill="#0B2545" />
      <circle cx="96" cy="108.5" r="1.2" fill="#fff" />
      <ellipse cx="106" cy="110" rx="4" ry="5" fill="#fff" />
      <circle cx="105" cy="110" r="2.5" fill="#0B2545" />
      <circle cx="106" cy="108.5" r="1.2" fill="#fff" />

      {/* Determined eyebrows */}
      <path d="M90 103 Q94 102 98 104" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M102 104 Q106 102 110 103" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />

      {/* Confident smile */}
      <path d="M94 121 Q100 126 106 121" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />

      {/* Arms */}
      <ellipse cx="60" cy="122" rx="10" ry="7" fill="#FFC107" stroke="#E5A800" strokeWidth="1.5" transform="rotate(-18 60 122)" />
      <ellipse cx="140" cy="120" rx="10" ry="7" fill="#FFC107" stroke="#E5A800" strokeWidth="1.5" transform="rotate(18 140 120)" />

      {/* Pencil */}
      <g transform="translate(148, 80) rotate(30)">
        <rect x="-3.5" y="0" width="7" height="48" rx="2" fill="#f26522" />
        <polygon points="-3.5,48 3.5,48 0,58" fill="#FFC107" />
        <polygon points="-1.5,54 1.5,54 0,58" fill="#0B2545" />
        <rect x="-3.5" y="-5" width="7" height="5" rx="1.5" fill="#0B2545" />
      </g>

      {/* Antenna */}
      <line x1="100" y1="20" x2="100" y2="8" stroke="#FFC107" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="5" r="4" fill="#f26522" />

      {/* Feet */}
      <ellipse cx="90" cy="188" rx="10" ry="5" fill="#E5A800" />
      <ellipse cx="110" cy="188" rx="10" ry="5" fill="#E5A800" />
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
