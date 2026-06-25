import { cn } from '@/lib/utils'

export type MascotPose = 'default' | 'magnifier' | 'pencil'

export function MascotGold({
  className,
  size = 120,
  alt = 'Yave, tu llave amiga',
  pose: _pose = 'default' as MascotPose,
}: {
  className?: string
  size?: number
  alt?: string
  pose?: MascotPose
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn('inline-flex items-center justify-center', className)}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mascot/yave-mascot.png"
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-contain select-none"
        draggable={false}
      />
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
