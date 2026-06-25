import { KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'

export function YaveLogo({
  className,
  textClassName,
}: {
  className?: string
  textClassName?: string
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex size-9 items-center justify-center rounded-full bg-yellow text-navy">
        <KeyRound className="size-5" strokeWidth={2.5} />
      </span>
      <span
        className={cn(
          'font-heading text-2xl font-extrabold tracking-tight text-navy',
          textClassName,
        )}
      >
        Yave
      </span>
    </div>
  )
}
