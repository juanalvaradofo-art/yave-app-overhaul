import { cn } from '@/lib/utils'

export type MascotPose = 'default' | 'magnifier' | 'pencil'

/* ───────────────────────────────────────────────
   YAVE — Professional Brand Character (SVG)
   A friendly, trustworthy key character with:
   • 3D-like metallic gold body via rich gradients
   • Expressive face with large, warm eyes
   • Clean, modern linework inspired by fintech leaders
   • Pose props: default, magnifier (review), pencil (sign)
   ─────────────────────────────────────────────── */

function DefaultMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none', className)}
      aria-label="Yave, tu llave amiga"
    >
      <defs>
        {/* Rich metallic gold body gradient */}
        <linearGradient id="goldBody" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#f0d878" />
          <stop offset="25%" stopColor="#e8c96a" />
          <stop offset="50%" stopColor="#d4a843" />
          <stop offset="75%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>

        {/* Lighter highlight for 3D sheen */}
        <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0e0a0" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#d4a843" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b6914" stopOpacity="0.5" />
        </linearGradient>

        {/* Darker gold for shadow/depth */}
        <linearGradient id="goldShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#6b4f10" />
        </linearGradient>

        {/* Soft glow filter for eyes */}
        <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Drop shadow for the whole character */}
        <filter id="charShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0a1628" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#charShadow)">
        {/* ═══════════════════════════════════════
            KEY BOW (head) — ornate, rounded top
           ═══════════════════════════════════════ */}
        {/* Main bow shape */}
        <ellipse cx="100" cy="52" rx="38" ry="34" fill="url(#goldBody)" />
        {/* Bow rim / outline for depth */}
        <ellipse cx="100" cy="52" rx="38" ry="34" fill="none" stroke="#8b6914" strokeWidth="2.5" />
        {/* Inner decorative ring */}
        <ellipse cx="100" cy="52" rx="30" ry="26" fill="none" stroke="#f0e0a0" strokeWidth="1.2" opacity="0.5" />
        {/* Center keyhole cutout */}
        <ellipse cx="100" cy="52" rx="14" ry="12" fill="#0a1628" opacity="0.12" />

        {/* Bow decorative circles (classic key holes) */}
        <circle cx="82" cy="40" r="5" fill="#f8f9fa" opacity="0.95" />
        <circle cx="118" cy="40" r="5" fill="#f8f9fa" opacity="0.95" />
        <circle cx="100" cy="66" r="5" fill="#f8f9fa" opacity="0.95" />

        {/* Bow 3D sheen highlight */}
        <ellipse cx="88" cy="32" rx="14" ry="8" fill="#ffffff" opacity="0.18" transform="rotate(-15 88 32)" />

        {/* ═══════════════════════════════════════
            KEY SHAFT (body) — rounded, substantial
           ═══════════════════════════════════════ */}
        <rect x="82" y="78" width="36" height="108" rx="10" fill="url(#goldBody)" />
        <rect x="82" y="78" width="36" height="108" rx="10" fill="none" stroke="#8b6914" strokeWidth="2.5" />
        {/* Shaft highlight stripe */}
        <rect x="86" y="84" width="10" height="96" rx="4" fill="url(#goldSheen)" />

        {/* ═══════════════════════════════════════
            KEY TEETH (bottom) — classic stepped cut
           ═══════════════════════════════════════ */}
        <path
          d="M82 160 L66 160 L66 168 L82 168 L82 176 L62 176 L62 184 L82 184"
          fill="url(#goldShadow)"
          stroke="#8b6914"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Teeth highlight edge */}
        <path
          d="M82 160 L66 160 L66 168 L82 168"
          fill="none"
          stroke="#f0e0a0"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* ═══════════════════════════════════════
            FACE — expressive, friendly, large eyes
           ═══════════════════════════════════════ */}
        {/* Face background panel */}
        <rect x="86" y="96" width="28" height="32" rx="8" fill="#0a1628" />
        {/* Face panel subtle border */}
        <rect x="86" y="96" width="28" height="32" rx="8" fill="none" stroke="#1a2d4a" strokeWidth="1" />

        {/* Left eye (large, warm, expressive) */}
        <ellipse cx="93" cy="106" rx="5" ry="6" fill="#ffffff" />
        <ellipse cx="94" cy="106" rx="3" ry="4" fill="#0a1628" />
        <circle cx="95" cy="104" r="1.5" fill="#ffffff" />

        {/* Right eye */}
        <ellipse cx="107" cy="106" rx="5" ry="6" fill="#ffffff" />
        <ellipse cx="106" cy="106" rx="3" ry="4" fill="#0a1628" />
        <circle cx="107" cy="104" r="1.5" fill="#ffffff" />

        {/* Eyebrows — friendly, slightly raised */}
        <path d="M89 98 Q93 95 97 98" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M103 98 Q107 95 111 98" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />

        {/* Smile — warm, confident curve */}
        <path
          d="M93 118 Q100 124 107 118"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Smile dimples */}
        <circle cx="91" cy="117" r="1.2" fill="#4ade80" opacity="0.6" />
        <circle cx="109" cy="117" r="1.2" fill="#4ade80" opacity="0.6" />

        {/* ═══════════════════════════════════════
            ARMS — small, friendly gestures
           ═══════════════════════════════════════ */}
        {/* Left arm (thumbs up gesture) */}
        <ellipse cx="58" cy="120" rx="10" ry="8" fill="url(#goldBody)" transform="rotate(-20 58 120)" />
        <ellipse cx="58" cy="120" rx="10" ry="8" fill="none" stroke="#8b6914" strokeWidth="1.5" transform="rotate(-20 58 120)" />
        {/* Thumb */}
        <ellipse cx="52" cy="112" rx="4" ry="6" fill="url(#goldBody)" transform="rotate(-10 52 112)" />
        <ellipse cx="52" cy="112" rx="4" ry="6" fill="none" stroke="#8b6914" strokeWidth="1" transform="rotate(-10 52 112)" />

        {/* Right arm (wave gesture) */}
        <ellipse cx="142" cy="118" rx="10" ry="8" fill="url(#goldBody)" transform="rotate(20 142 118)" />
        <ellipse cx="142" cy="118" rx="10" ry="8" fill="none" stroke="#8b6914" strokeWidth="1.5" transform="rotate(20 142 118)" />

        {/* ═══════════════════════════════════════
            ANTENNA — tech detail, orange tip
           ═══════════════════════════════════════ */}
        <line x1="100" y1="20" x2="100" y2="8" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="5" r="4" fill="#f26522" />
        <circle cx="100" cy="5" r="4" fill="none" stroke="#c44a10" strokeWidth="1" />
        {/* Antenna glow */}
        <circle cx="100" cy="5" r="7" fill="#f26522" opacity="0.15" />

        {/* ═══════════════════════════════════════
            FEET — small, grounding the character
           ═══════════════════════════════════════ */}
        <ellipse cx="90" cy="192" rx="10" ry="6" fill="url(#goldShadow)" />
        <ellipse cx="110" cy="192" rx="10" ry="6" fill="url(#goldShadow)" />
      </g>
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
      <defs>
        <linearGradient id="goldBodyM" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#f0d878" />
          <stop offset="25%" stopColor="#e8c96a" />
          <stop offset="50%" stopColor="#d4a843" />
          <stop offset="75%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="goldSheenM" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0e0a0" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#d4a843" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b6914" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="goldShadowM" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#6b4f10" />
        </linearGradient>
        <filter id="eyeGlowM" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="charShadowM" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0a1628" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#charShadowM)">
        {/* Bow */}
        <ellipse cx="100" cy="52" rx="38" ry="34" fill="url(#goldBodyM)" />
        <ellipse cx="100" cy="52" rx="38" ry="34" fill="none" stroke="#8b6914" strokeWidth="2.5" />
        <ellipse cx="100" cy="52" rx="30" ry="26" fill="none" stroke="#f0e0a0" strokeWidth="1.2" opacity="0.5" />
        <ellipse cx="100" cy="52" rx="14" ry="12" fill="#0a1628" opacity="0.12" />
        <circle cx="82" cy="40" r="5" fill="#f8f9fa" opacity="0.95" />
        <circle cx="118" cy="40" r="5" fill="#f8f9fa" opacity="0.95" />
        <circle cx="100" cy="66" r="5" fill="#f8f9fa" opacity="0.95" />
        <ellipse cx="88" cy="32" rx="14" ry="8" fill="#ffffff" opacity="0.18" transform="rotate(-15 88 32)" />

        {/* Shaft */}
        <rect x="82" y="78" width="36" height="108" rx="10" fill="url(#goldBodyM)" />
        <rect x="82" y="78" width="36" height="108" rx="10" fill="none" stroke="#8b6914" strokeWidth="2.5" />
        <rect x="86" y="84" width="10" height="96" rx="4" fill="url(#goldSheenM)" />

        {/* Teeth */}
        <path
          d="M82 160 L66 160 L66 168 L82 168 L82 176 L62 176 L62 184 L82 184"
          fill="url(#goldShadowM)"
          stroke="#8b6914"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Face — focused, examining expression */}
        <rect x="86" y="96" width="28" height="32" rx="8" fill="#0a1628" />
        <rect x="86" y="96" width="28" height="32" rx="8" fill="none" stroke="#1a2d4a" strokeWidth="1" />

        {/* Eyes — one slightly squinted for focus */}
        <ellipse cx="93" cy="106" rx="5" ry="6" fill="#ffffff" />
        <ellipse cx="94" cy="106" rx="3" ry="4" fill="#0a1628" />
        <circle cx="95" cy="104" r="1.5" fill="#ffffff" />

        <ellipse cx="107" cy="106" rx="4" ry="5" fill="#ffffff" />
        <ellipse cx="106.5" cy="106" rx="2.5" ry="3.5" fill="#0a1628" />
        <circle cx="107.5" cy="104.5" r="1.2" fill="#ffffff" />

        {/* Focused eyebrows */}
        <path d="M89 98 Q93 96 97 99" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M103 99 Q107 96 111 98" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />

        {/* Slight smile */}
        <path d="M94 118 Q100 122 106 118" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />

        {/* Left arm holding magnifier */}
        <ellipse cx="58" cy="120" rx="10" ry="8" fill="url(#goldBodyM)" transform="rotate(-20 58 120)" />
        <ellipse cx="58" cy="120" rx="10" ry="8" fill="none" stroke="#8b6914" strokeWidth="1.5" transform="rotate(-20 58 120)" />

        {/* Magnifying glass */}
        <g transform="translate(130, 90)">
          <circle cx="0" cy="0" r="24" fill="none" stroke="#0a1628" strokeWidth="3" />
          <circle cx="0" cy="0" r="20" fill="rgba(74,222,128,0.06)" />
          <line x1="17" y1="17" x2="32" y2="32" stroke="#0a1628" strokeWidth="4" strokeLinecap="round" />
          <line x1="14" y1="14" x2="29" y2="29" stroke="#d4a843" strokeWidth="2" strokeLinecap="round" />
          {/* Glass reflection */}
          <path d="M-12 -8 Q-6 -14 2 -12" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
        </g>

        {/* Right arm */}
        <ellipse cx="142" cy="118" rx="10" ry="8" fill="url(#goldBodyM)" transform="rotate(20 142 118)" />
        <ellipse cx="142" cy="118" rx="10" ry="8" fill="none" stroke="#8b6914" strokeWidth="1.5" transform="rotate(20 142 118)" />

        {/* Antenna */}
        <line x1="100" y1="20" x2="100" y2="8" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="5" r="4" fill="#f26522" />
        <circle cx="100" cy="5" r="4" fill="none" stroke="#c44a10" strokeWidth="1" />
        <circle cx="100" cy="5" r="7" fill="#f26522" opacity="0.15" />

        {/* Feet */}
        <ellipse cx="90" cy="192" rx="10" ry="6" fill="url(#goldShadowM)" />
        <ellipse cx="110" cy="192" rx="10" ry="6" fill="url(#goldShadowM)" />
      </g>
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
      <defs>
        <linearGradient id="goldBodyP" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#f0d878" />
          <stop offset="25%" stopColor="#e8c96a" />
          <stop offset="50%" stopColor="#d4a843" />
          <stop offset="75%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="goldSheenP" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0e0a0" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#d4a843" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b6914" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="goldShadowP" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#6b4f10" />
        </linearGradient>
        <filter id="eyeGlowP" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="charShadowP" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0a1628" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter="url(#charShadowP)">
        {/* Bow */}
        <ellipse cx="100" cy="52" rx="38" ry="34" fill="url(#goldBodyP)" />
        <ellipse cx="100" cy="52" rx="38" ry="34" fill="none" stroke="#8b6914" strokeWidth="2.5" />
        <ellipse cx="100" cy="52" rx="30" ry="26" fill="none" stroke="#f0e0a0" strokeWidth="1.2" opacity="0.5" />
        <ellipse cx="100" cy="52" rx="14" ry="12" fill="#0a1628" opacity="0.12" />
        <circle cx="82" cy="40" r="5" fill="#f8f9fa" opacity="0.95" />
        <circle cx="118" cy="40" r="5" fill="#f8f9fa" opacity="0.95" />
        <circle cx="100" cy="66" r="5" fill="#f8f9fa" opacity="0.95" />
        <ellipse cx="88" cy="32" rx="14" ry="8" fill="#ffffff" opacity="0.18" transform="rotate(-15 88 32)" />

        {/* Shaft */}
        <rect x="82" y="78" width="36" height="108" rx="10" fill="url(#goldBodyP)" />
        <rect x="82" y="78" width="36" height="108" rx="10" fill="none" stroke="#8b6914" strokeWidth="2.5" />
        <rect x="86" y="84" width="10" height="96" rx="4" fill="url(#goldSheenP)" />

        {/* Teeth */}
        <path
          d="M82 160 L66 160 L66 168 L82 168 L82 176 L62 176 L62 184 L82 184"
          fill="url(#goldShadowP)"
          stroke="#8b6914"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Face — determined, confident expression */}
        <rect x="86" y="96" width="28" height="32" rx="8" fill="#0a1628" />
        <rect x="86" y="96" width="28" height="32" rx="8" fill="none" stroke="#1a2d4a" strokeWidth="1" />

        {/* Eyes — focused, slightly narrowed */}
        <ellipse cx="93" cy="106" rx="4.5" ry="5.5" fill="#ffffff" />
        <ellipse cx="94" cy="106" rx="2.8" ry="3.5" fill="#0a1628" />
        <circle cx="95" cy="104.5" r="1.3" fill="#ffffff" />

        <ellipse cx="107" cy="106" rx="4.5" ry="5.5" fill="#ffffff" />
        <ellipse cx="106" cy="106" rx="2.8" ry="3.5" fill="#0a1628" />
        <circle cx="107" cy="104.5" r="1.3" fill="#ffffff" />

        {/* Determined eyebrows */}
        <path d="M89 98 Q93 97 97 99" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M103 99 Q107 97 111 98" fill="none" stroke="#f26522" strokeWidth="1.8" strokeLinecap="round" />

        {/* Confident smile */}
        <path d="M94 118 Q100 123 106 118" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        <circle cx="92" cy="117" r="1.2" fill="#4ade80" opacity="0.6" />
        <circle cx="108" cy="117" r="1.2" fill="#4ade80" opacity="0.6" />

        {/* Left arm */}
        <ellipse cx="58" cy="120" rx="10" ry="8" fill="url(#goldBodyP)" transform="rotate(-20 58 120)" />
        <ellipse cx="58" cy="120" rx="10" ry="8" fill="none" stroke="#8b6914" strokeWidth="1.5" transform="rotate(-20 58 120)" />

        {/* Right arm holding pencil */}
        <ellipse cx="142" cy="118" rx="10" ry="8" fill="url(#goldBodyP)" transform="rotate(20 142 118)" />
        <ellipse cx="142" cy="118" rx="10" ry="8" fill="none" stroke="#8b6914" strokeWidth="1.5" transform="rotate(20 142 118)" />

        {/* Pencil */}
        <g transform="translate(148, 78) rotate(30)">
          <rect x="-4" y="0" width="8" height="52" rx="2" fill="#f26522" />
          <rect x="-4" y="0" width="8" height="52" rx="2" fill="none" stroke="#c44a10" strokeWidth="0.8" />
          {/* Pencil wood tip */}
          <polygon points="-4,52 4,52 0,62" fill="#d4a843" />
          <polygon points="-4,52 4,52 0,62" fill="none" stroke="#8b6914" strokeWidth="0.8" />
          {/* Pencil lead */}
          <polygon points="-1.5,58 1.5,58 0,62" fill="#0a1628" />
          {/* Pencil eraser */}
          <rect x="-4" y="-6" width="8" height="6" rx="1.5" fill="#0a1628" />
          <rect x="-4" y="-6" width="8" height="6" rx="1.5" fill="none" stroke="#1a2d4a" strokeWidth="0.5" />
          {/* Pencil highlight */}
          <rect x="-2" y="2" width="2" height="48" rx="1" fill="#ffffff" opacity="0.2" />
        </g>

        {/* Antenna */}
        <line x1="100" y1="20" x2="100" y2="8" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="5" r="4" fill="#f26522" />
        <circle cx="100" cy="5" r="4" fill="none" stroke="#c44a10" strokeWidth="1" />
        <circle cx="100" cy="5" r="7" fill="#f26522" opacity="0.15" />

        {/* Feet */}
        <ellipse cx="90" cy="192" rx="10" ry="6" fill="url(#goldShadowP)" />
        <ellipse cx="110" cy="192" rx="10" ry="6" fill="url(#goldShadowP)" />
      </g>
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
