'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  KeyRound,
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  History,
  Lock,
  Wallet,
} from 'lucide-react'
import { NotificationBell } from '@/components/notification-bell'
import { Mascot } from '@/components/mascot'
import { PaymentSheet } from '@/components/payment-sheet'
import { ApplicationOverlay } from '@/components/onboarding/application-overlay'
import { ranks } from '@/lib/yave-data'
import { useYave } from '@/lib/yave-store'

const movements = [
  { title: 'Pago de cuota', date: '12 jun', amount: '-$ 180.000', direction: 'out' as const },
  { title: 'Desembolso aprobado', date: '02 jun', amount: '+$ 800.000', direction: 'in' as const },
  { title: 'Pago de cuota', date: '12 may', amount: '-$ 180.000', direction: 'out' as const },
]

export default function InicioPage() {
  const { userName, hasCupo, setHasCupo, coins, rankIndex } = useYave()
  const rank = ranks[rankIndex]
  const [payOpen, setPayOpen] = useState(false)
  const [applyOpen, setApplyOpen] = useState(false)

  // New accounts arrive via /onboarding with ?nuevo=1 and start without a cupo.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (new URLSearchParams(window.location.search).get('nuevo') === '1') {
      setHasCupo(false)
    }
  }, [setHasCupo])

  return (
    <div className="flex flex-col gap-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex size-12 items-center justify-center rounded-full border-2"
            style={{ borderColor: rank.color, backgroundColor: `${rank.color}1a` }}
          >
            <Mascot size={40} alt="" tint={rank.tint} />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
            <p className="font-heading text-lg font-extrabold text-navy">
              {userName}
            </p>
          </div>
        </div>
        <NotificationBell />
      </div>

      {/* Demo state toggle */}
      <div className="flex items-center gap-1 self-start rounded-full bg-muted p-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setHasCupo(true)}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            hasCupo ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Con cupo activo
        </button>
        <button
          type="button"
          onClick={() => setHasCupo(false)}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            !hasCupo ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Sin cupo
        </button>
      </div>

      {hasCupo ? (
        <ActiveState coins={coins} onPay={() => setPayOpen(true)} />
      ) : (
        <EmptyState rankColor={rank.color} rankTint={rank.tint} onApply={() => setApplyOpen(true)} />
      )}

      <PaymentSheet open={payOpen} onClose={() => setPayOpen(false)} />
      <ApplicationOverlay open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  )
}

function ActiveState({ coins, onPay }: { coins: number; onPay: () => void }) {
  const paidPct = 33
  return (
    <>
      {/* Balance card */}
      <div className="rounded-[2rem] bg-navy p-6 text-navy-foreground shadow-md">
        <p className="text-sm text-white/70">Saldo actual</p>
        <p className="mt-1 font-heading text-5xl font-extrabold">$ 540.000</p>
        <div className="mt-4 flex items-center justify-between text-sm text-white/80">
          <span>Pagado $ 260.000</span>
          <span>{paidPct}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${paidPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <button
          type="button"
          onClick={onPay}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-orange-foreground transition-transform active:translate-y-px"
        >
          <CreditCard className="size-5" />
          Realiza tu pago
        </button>
      </div>

      {/* Yave Coins */}
      <Link
        href="/boveda"
        className="flex items-center gap-4 rounded-[1.75rem] bg-card p-5 shadow-sm"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-yellow text-navy">
          <KeyRound className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Yave Coins</p>
          <p className="font-heading text-2xl font-extrabold text-navy">
            {coins.toLocaleString('es-CO')}
          </p>
        </div>
        <span className="flex items-center gap-1 font-heading font-bold text-orange">
          Canjear
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-card p-5 text-left shadow-sm"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-navy">
            <Download className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-navy">
            Solicitar desembolso
          </span>
        </button>
        <Link
          href="/llaves"
          className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-card p-5 shadow-sm"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-navy">
            <History className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-navy">Historial</span>
        </Link>
      </div>

      {/* Movements */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-navy">
            Movimientos
          </h2>
          <button type="button" className="text-sm font-bold text-orange">
            Ver todo
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {movements.map((m, i) => {
            const Icon = m.direction === 'in' ? ArrowDownLeft : ArrowUpRight
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-[1.5rem] bg-card p-4 shadow-sm"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full ${
                    m.direction === 'in'
                      ? 'bg-yellow/20 text-navy'
                      : 'bg-muted text-navy'
                  }`}
                >
                  <Icon className="size-5" strokeWidth={2.5} />
                </span>
                <div className="flex-1">
                  <p className="font-heading font-bold text-navy">{m.title}</p>
                  <p className="text-sm text-muted-foreground">{m.date}</p>
                </div>
                <span
                  className={`font-heading font-extrabold ${
                    m.direction === 'in' ? 'text-orange' : 'text-navy'
                  }`}
                >
                  {m.amount}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function EmptyState({
  rankColor,
  rankTint,
  onApply,
}: {
  rankColor: string
  rankTint: string
  onApply: () => void
}) {
  return (
    <>
      {/* Muted balance card */}
      <div className="rounded-[2rem] border border-border bg-muted p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="size-4" />
          <p className="text-sm font-semibold">Aún no tienes un cupo activo</p>
        </div>
        <p className="mt-2 font-heading text-5xl font-extrabold text-muted-foreground/60">
          $ 0
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Completa tu solicitud y desbloquea tu primer crédito. Es rápido y sin
          letra pequeña, parcero.
        </p>
        <button
          type="button"
          onClick={onApply}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-orange-foreground transition-transform active:translate-y-px"
        >
          <Wallet className="size-5" />
          Solicitar tu cupo
        </button>
      </div>

      {/* Muted coins */}
      <div className="flex items-center gap-4 rounded-[1.75rem] border border-border bg-muted/60 p-5">
        <span className="flex size-12 items-center justify-center rounded-full bg-card text-muted-foreground">
          <KeyRound className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Yave Coins</p>
          <p className="font-heading text-2xl font-extrabold text-muted-foreground/60">
            0
          </p>
        </div>
        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold text-muted-foreground">
          Bloqueado
        </span>
      </div>

      {/* Encouragement */}
      <div
        className="flex items-center gap-4 rounded-[1.75rem] p-5"
        style={{ backgroundColor: `${rankColor}1f` }}
      >
        <Mascot size={64} alt="" className="shrink-0" tint={rankTint} />
        <div>
          <p className="font-heading font-bold text-navy">
            Estoy listo para ayudarte
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pide tu cupo y empieza a ganar XP y Yave Coins desde tu primer pago.
          </p>
        </div>
      </div>
    </>
  )
}
