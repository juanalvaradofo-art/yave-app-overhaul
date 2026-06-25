import Image from 'next/image'
import { cn } from '@/lib/utils'

const POSES = {
  default: '/yave-mascot.png',
  magnifier: '/mascot/yave-mascot-magnifier.png',
  pencil: '/mascot/yave-mascot-pencil.png',
} as const

export type MascotPose = keyof typeof POSES

export function Mascot({
  className,
  size = 120,
  alt = 'Yave, tu llave amiga',
  pose = 'default',
}: {
  className?: string
  size?: number
  alt?: string
  pose?: MascotPose
}) {
  return (
    <Image
      src={POSES[pose] || POSES.default}
      width={size}
      height={size}
      alt={alt}
      className={cn('select-none object-contain', className)}
      priority
    />
  )
}

/**
 * Mascot wrapped in a circular ring whose color reflects the user's rank/tier.
 * The mascot art itself never changes color — only the surrounding border does.
 */
export function RankMascot({
  rankColor,
  size = 96,
  className,
  alt,
}: {
  rankColor: string
  size?: number
  className?: string
  alt?: string
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
      <Mascot size={size - pad * 2} alt={alt} className="drop-shadow-sm" />
    </div>
  )
}
