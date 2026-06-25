import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Mascot({
  className,
  size = 120,
  alt = 'Yave, tu llave amiga',
  tint,
}: {
  className?: string
  size?: number
  alt?: string
  /** CSS filter string (per-rank) used to recolor the bronze mascot's metal. */
  tint?: string
}) {
  return (
    <Image
      src="/yave-mascot.png"
      width={size}
      height={size}
      alt={alt}
      className={cn('select-none object-contain transition-[filter] duration-500', className)}
      style={tint ? { filter: tint } : undefined}
      priority
    />
  )
}
