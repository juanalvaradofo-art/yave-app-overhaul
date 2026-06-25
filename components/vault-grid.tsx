'use client'

import { useCallback, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bike,
  Smartphone,
  PartyPopper,
  Coffee,
  Banknote,
  Clapperboard,
  KeyRound,
  Mail,
  X,
} from 'lucide-react'
import { MascotGold } from '@/components/mascot-gold'
import { OtpInput } from '@/components/otp-input'
import { useYave } from '@/lib/yave-store'

const rewards = [
  { id: 'rappi', title: 'Bono Rappi $20.000', cost: 1200, icon: Bike, badge: 'Popular' },
  { id: 'datos', title: 'Datos móviles 5GB', cost: 800, icon: Smartphone },
  { id: 'sin-intereses', title: 'Día sin intereses', cost: 1500, icon: PartyPopper, badge: 'Top' },
  { id: 'cafe', title: 'Café gratis x1 mes', cost: 2000, icon: Coffee },
  { id: 'descuento', title: 'Descuento en cuota', cost: 2500, icon: Banknote },
  { id: 'cine', title: 'Entrada de cine 2x1', cost: 900, icon: Clapperboard },
]

type Reward = (typeof rewards)[number]

function coins(n: number) {
  return n.toLocaleString('es-CO')
}

export function VaultGrid() {
  const { coins: balance, redeem } = useYave()
  const [pending, setPending] = useState<Reward | null>(null)
  const [step, setStep] = useState<'code' | 'success'>('code')
  const [code, setCode] = useState('')

  const fireConfetti = useCallback(() => {
    const burst = (originX: number) =>
      confetti({
        particleCount: 70,
        spread: 70,
        startVelocity: 38,
        origin: { x: originX, y: 0.5 },
        colors: ['#f7531f', '#ffc20e', '#1b2a6b', '#ffffff'],
      })
    burst(0.35)
    burst(0.65)
    setTimeout(() => burst(0.5), 250)
  }, [])

  function openRedeem(reward: Reward) {
    if (balance < reward.cost) return
    setPending(reward)
    setStep('code')
    setCode('')
  }

  function confirm() {
    if (!pending) return
    redeem(pending.cost, pending.title)
    setStep('success')
    fireConfetti()
  }

  function close() {
    setPending(null)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Balance */}
      <div className="flex items-center justify-between rounded-[2rem] bg-yellow p-6">
        <div>
          <p className="text-sm font-semibold text-yellow-foreground/80">
            Tu saldo
          </p>
          <p className="font-heading text-4xl font-extrabold text-yellow-foreground">
            {coins(balance)}
          </p>
        </div>
        <span className="flex size-16 items-center justify-center rounded-full bg-navy text-navy-foreground">
          <KeyRound className="size-7" strokeWidth={2.5} />
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {rewards.map((reward) => {
          const Icon = reward.icon
          const affordable = balance >= reward.cost
          return (
            <div
              key={reward.id}
              className="flex flex-col rounded-[1.5rem] bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-muted text-navy">
                  <Icon className="size-5" strokeWidth={2.5} />
                </span>
                {reward.badge ? (
                  <span className="rounded-full bg-yellow px-2.5 py-1 text-[0.7rem] font-bold text-yellow-foreground">
                    {reward.badge}
                  </span>
                ) : null}
              </div>
              <p className="font-heading font-bold leading-tight text-navy">
                {reward.title}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <KeyRound className="size-4 text-orange" strokeWidth={2.5} />
                <span className="font-heading font-extrabold text-navy">
                  {coins(reward.cost)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openRedeem(reward)}
                disabled={!affordable}
                className="mt-3 h-11 w-full rounded-2xl bg-orange font-heading font-bold text-orange-foreground transition-transform active:translate-y-px disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                {affordable ? 'Canjear' : 'Te faltan coins'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Redeem modal */}
      <AnimatePresence>
        {pending ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-6"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-[2rem] bg-card p-6 text-center shadow-xl"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={close}
                  className="flex size-9 items-center justify-center rounded-full bg-muted text-navy"
                >
                  <X className="size-5" />
                </button>
              </div>

              {step === 'code' ? (
                <>
                  <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-yellow text-yellow-foreground">
                    <Mail className="size-7" />
                  </span>
                  <h2 className="mt-4 font-heading text-2xl font-extrabold text-navy">
                    Confirma tu canje
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    Enviamos un código a tu correo para canjear{' '}
                    <span className="font-bold text-navy">
                      {pending.title}
                    </span>
                    . Escríbelo para confirmar.
                  </p>
                  <div className="mt-5">
                    <OtpInput value={code} onChange={setCode} />
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-sm font-bold text-orange"
                  >
                    Reenviar código
                  </button>
                  <button
                    type="button"
                    onClick={confirm}
                    className="mt-4 h-12 w-full rounded-2xl bg-orange font-heading font-bold text-orange-foreground transition-transform active:translate-y-px"
                  >
                    Confirmar canje
                  </button>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0.5, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                  >
                    <Mascot size={130} className="mx-auto" alt="" />
                  </motion.div>
                  <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">
                    ¡Listo, parcero!
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    Canjeaste{' '}
                    <span className="font-bold text-navy">
                      {pending.title}
                    </span>{' '}
                    por {coins(pending.cost)} Yave Coins. Te llegará el detalle
                    a tu correo.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-5 h-12 w-full rounded-2xl bg-orange font-heading font-bold text-orange-foreground transition-transform active:translate-y-px"
                  >
                    ¡Genial!
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
