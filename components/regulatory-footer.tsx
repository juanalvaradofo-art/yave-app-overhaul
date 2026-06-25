import { cn } from '@/lib/utils'

export function RegulatoryFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'border-t border-border bg-navy px-5 pb-6 pt-6 text-navy-foreground',
        className,
      )}
    >
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-white/10 p-4 text-center text-sm leading-relaxed text-white/80">
          Yave S.A.S. — NIT 901.234.567-8. Vigilada por la Superintendencia
          Financiera de Colombia. Tasa de interes sujeta a la tasa de usura
          vigente.
        </div>
        <p className="mt-4 text-center text-xs text-white/50">
          © 2026 Yave · Hecho con carino en Colombia.
        </p>
      </div>
    </footer>
  )
}
