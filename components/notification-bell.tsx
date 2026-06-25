'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, KeyRound, Coins, CreditCard, Download, X } from 'lucide-react'
import { notifications, type YaveNotification } from '@/lib/yave-data'

const iconFor: Record<YaveNotification['type'], typeof Bell> = {
  rank: KeyRound,
  coins: Coins,
  payment: CreditCard,
  disbursement: Download,
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-label="Notificaciones"
        onClick={() => setOpen(true)}
        className="relative flex size-11 items-center justify-center rounded-full bg-card shadow-sm"
      >
        <Bell className="size-5 text-navy" />
        <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-orange ring-2 ring-card" />
      </button>

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
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-[2rem] bg-background p-5 pb-8"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-extrabold text-navy">
                  Notificaciones
                </h2>
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full bg-card text-navy shadow-sm"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {notifications.map((n) => {
                  const Icon = iconFor[n.type]
                  return (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-sm"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow text-navy">
                        <Icon className="size-5" strokeWidth={2.5} />
                      </span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-navy">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {n.text}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
