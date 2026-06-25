import { cn } from '@/lib/utils'

export type MascotPose = 'default' | 'magnifier' | 'pencil'

export function Mascot({
  className,
  size = 120,
  alt = 'Yave, tu llave amiga',
  pose: _pose = 'default',
}: {
  className?: string
  size?: number
  alt?: string
  pose?: MascotPose
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/mascot/yave-mascot.png"
      width={size}
      height={size}
      alt={alt}
      className={cn('select-none object-contain', className)}
      draggable={false}
    />
  )
}

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
