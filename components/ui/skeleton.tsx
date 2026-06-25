import { cn } from '@/lib/utils'

export function Skeleton({
  className,
  variant = 'rect',
}: {
  className?: string
  variant?: 'rect' | 'circle' | 'text' | 'card'
}) {
  const base = 'animate-pulse bg-muted'
  const shapes = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded-md',
    card: 'rounded-2xl',
  }
  return <div className={cn(base, shapes[variant], className)} />
}

export function SkeletonText({
  lines = 1,
  className,
  lastLineWidth = 'w-full',
}: {
  lines?: number
  className?: string
  lastLineWidth?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 ? lastLineWidth : 'w-full',
          )}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl bg-card p-5 shadow-sm', className)}>
      <Skeleton variant="rect" className="mb-3 h-6 w-1/2" />
      <SkeletonText lines={3} lastLineWidth="w-3/4" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="size-12" />
          <div className="flex flex-col gap-1.5">
            <Skeleton variant="text" className="h-3.5 w-20" />
            <Skeleton variant="text" className="h-5 w-32" />
          </div>
        </div>
        <Skeleton variant="circle" className="size-10" />
      </div>
      <Skeleton variant="card" className="h-48" />
      <Skeleton variant="card" className="h-20" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton variant="card" className="h-28" />
        <Skeleton variant="card" className="h-28" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton variant="card" className="h-16" key={i} />
        ))}
      </div>
    </div>
  )
}

export function BovedaSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between rounded-[2rem] bg-yellow p-6">
        <div className="flex flex-col gap-2">
          <Skeleton variant="text" className="h-4 w-24" />
          <Skeleton variant="text" className="h-10 w-36" />
        </div>
        <Skeleton variant="circle" className="size-16" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton variant="card" className="h-40" key={i} />
        ))}
      </div>
    </div>
  )
}

export function LlavesSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton variant="card" className="h-64" />
      <Skeleton variant="card" className="h-48" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton variant="card" className="h-16" key={i} />
        ))}
      </div>
    </div>
  )
}
