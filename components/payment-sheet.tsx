'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, Clock, Zap, X, KeyRound } from 'lucide-react'
import { useYave } from '@/lib/yave-store'

const options = [
  {
    type: 'early' as const,
    icon: Zap,
    title: 'Pagar anticipado',
    desc: '3+ días antes. La jugada maestra.',
    reward: '+150 XP · +300 coins',
    tone: 'orange' as const,
  },
  {
    type: 'timely' as const,
    icon: CalendarCheck,
    title: 'Pagar a tiempo',
    desc: 'Justo en tu fecha. Vas al día.',
    reward: '+100 XP · +200 coins',
    tone: 'navy' as const,
  },
  {
    type: 'mora' as const,
    icon: Clock,
    title: 'Reportar mora (demo)',
    desc: 'Simula un atraso de 3 días.',
    reward: '−30 coins',
    tone: 'muted' as const,
  },
]

export function PaymentSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { registerPayment } = useYave()

  function handle(type: 'timely' | 'early' | 'mora') {
    registerPayment(type, type === 'mora' ? 3 : undefined)
    onClose()
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 p-0 sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-[2rem] bg-card p-6 shadow-xl sm:rounded-[2rem]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-extrabold text-navy">
                Realiza tu pago
              </h2>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full bg-muted text-navy"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Cada pago suma XP para subir de llave y Yave Coins para canjear en
              La Bóveda. Entre más temprano pagues, más ganas.
            </p>
            <div className="flex flex-col gap-3">
              {options.map((o) => {
                const Icon = o.icon
                return (
                  <button
                    key={o.type}
                    type="button"
                    onClick={() => handle(o.type)}
                    className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-4 text-left transition-colors active:bg-muted"
                  >
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                        o.tone === 'orange'
                          ? 'bg-orange text-orange-foreground'
                          : o.tone === 'navy'
                            ? 'bg-navy text-navy-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={2.5} />
                    </span>
                    <div className="flex-1">
                      <p className="font-heading font-bold text-navy">{o.title}</p>
                      <p className="text-sm text-muted-foreground">{o.desc}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-orange">
                      <KeyRound className="size-3.5" strokeWidth={2.5} />
                      {o.reward}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
