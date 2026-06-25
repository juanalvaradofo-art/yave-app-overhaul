'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, KeyRound, Coins, CreditCard, Download, X, Clock, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle } from 'lucide-react'

type NotifType = 'rank' | 'coins' | 'payment' | 'disbursement' | 'reminder' | 'approval'

const iconFor: Record<NotifType, typeof Bell> = {
  rank: KeyRound,
  coins: Coins,
  payment: CreditCard,
  disbursement: Download,
  reminder: AlertTriangle,
  approval: CheckCircle2,
}

const colorFor: Record<NotifType, string> = {
  rank: 'bg-yellow text-navy',
  coins: 'bg-yellow text-navy',
  payment: 'bg-navy text-white',
  disbursement: 'bg-green-500/20 text-green-600',
  reminder: 'bg-orange/20 text-orange',
  approval: 'bg-green-500/20 text-green-600',
}

const timeline = [
  { id: 'n0', type: 'approval' as NotifType, title: 'Solicitud en proceso', text: 'Tu solicitud fue recibida. Estamos revisando tu perfil.', time: 'Hace 10 min', dot: 'bg-orange' },
  { id: 'n1', type: 'disbursement' as NotifType, title: 'Desembolso exitoso!', text: 'Tus $800.000 ya fueron depositados en tu cuenta.', time: 'Hace 2 h', dot: 'bg-green-500' },
  { id: 'n2', type: 'reminder' as NotifType, title: 'Tu cuota vence en 3 dias', text: 'Recuerda pagar antes del 28 de julio para mantener tu racha.', time: 'Hace 1 d', dot: 'bg-orange' },
  { id: 'n3', type: 'rank' as NotifType, title: 'Alcanzaste un nuevo rango!', text: 'Felicidades! Subiste a Plata. Tu cupo aumento a $375.000.', time: 'Hace 3 d', dot: 'bg-yellow' },
  { id: 'n4', type: 'coins' as NotifType, title: 'Ganaste 300 Yave Coins', text: 'Tu pago anticipado del 12 jun sumo monedas extra a tu saldo.', time: 'Hace 5 d', dot: 'bg-yellow' },
  { id: 'n5', type: 'payment' as NotifType, title: 'Pago registrado', text: 'Recibimos tu cuota de $180.000. Vas al dia, parcero!', time: 'Hace 1 sem', dot: 'bg-navy' },
]

export function NotificationBell({ flash }: { flash?: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative">
        <button
          type="button"
          aria-label="Notificaciones"
          onClick={() => setOpen(true)}
          className="relative flex size-11 items-center justify-center rounded-full bg-card shadow-sm transition-colors hover:bg-muted"
        >
          <Bell className="size-5 text-navy" />
          <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-orange ring-2 ring-card" />
        </button>
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              className="absolute right-0 top-13 z-50 w-64 rounded-2xl bg-navy p-3 text-xs font-bold text-white shadow-xl"
            >
              <div className="absolute -top-1.5 right-4 size-3 rotate-45 bg-navy" />
              {flash}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[80vh] max-w-md overflow-y-auto rounded-t-[2rem] bg-background p-5 pb-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-navy">
                    Notificaciones
                  </h2>
                  <p className="text-sm text-muted-foreground">{timeline.length} eventos recientes</p>
                </div>
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full bg-card text-navy shadow-sm"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Timeline */}
              <div className="relative ml-3">
                {/* Vertical line */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-border" />

                <div className="flex flex-col gap-4">
                  {timeline.map((n) => {
                    const Icon = iconFor[n.type]
                    return (
                      <div key={n.id} className="relative flex gap-4 pl-6">
                        {/* Dot on line */}
                        <span className={`absolute left-[-3px] top-4 size-2 rounded-full ${n.dot} ring-2 ring-background`} />
                        <div className="flex-1 rounded-2xl bg-card p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${colorFor[n.type]}`}>
                              <Icon className="size-4" strokeWidth={2.5} />
                            </span>
                            <div className="flex-1">
                              <p className="font-heading text-sm font-bold text-navy">
                                {n.title}
                              </p>
                              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                                {n.text}
                              </p>
                              <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="size-3" />
                                {n.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
