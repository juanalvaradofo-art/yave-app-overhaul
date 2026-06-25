'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Wallet,
  CalendarDays,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  Info,
} from 'lucide-react'
import { MascotGold } from '@/components/mascot-gold'

const RATE_MONTHLY = 0.022 // 2.2% E.M.
const FIANZA_PCT = 0.12

function cop(n: number) {
  return '$ ' + Math.round(n).toLocaleString('es-CO')
}

type Freq = 'mensual' | 'quincenal'

export function CreditSimulator() {
  const [amount, setAmount] = useState(300_000)
  const [months, setMonths] = useState(3)
  const [freq, setFreq] = useState<Freq>('mensual')
  const [open, setOpen] = useState(false)
  const [showFianzaTip, setShowFianzaTip] = useState(false)

  const installments = freq === 'mensual' ? months : months * 2

  const interest = amount * RATE_MONTHLY * months
  const fianza = amount * FIANZA_PCT

  // Audit: Total = Amount + Interest. Fianza is covered by Yave (0 cost to user). No hidden fees.
  const total = amount + interest
  const perInstallment = total / installments

  const ratePerPeriod = freq === 'mensual' ? RATE_MONTHLY : RATE_MONTHLY / 2

  console.log(
    `[CreditSimulator] amount=${amount}, interest=${interest.toFixed(0)}, fianza=${fianza.toFixed(0)} (covered), total=${total.toFixed(0)}, installment=${perInstallment.toFixed(0)}`
  )

  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-heading text-xl font-extrabold text-navy">
          Simula tu crédito
        </h3>
        <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold text-yellow-foreground">
          Sin letra pequeña
        </span>
      </div>

      {/* Amount */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Wallet className="size-4 text-navy" />
            ¿Cuánto necesitas?
          </span>
          <span className="font-heading text-lg font-extrabold text-navy">
            {cop(amount)}
          </span>
        </div>
        <input
          type="range"
          min={200_000}
          max={500_000}
          step={50_000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="yave-slider"
          aria-label="Monto del crédito"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>$ 200.000</span>
          <span>$ 500.000</span>
        </div>
      </div>

      {/* Frequency */}
      <div className="mb-5">
        <span className="mb-2 block text-sm font-semibold text-muted-foreground">
          Frecuencia de pago
        </span>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
          {(['mensual', 'quincenal'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFreq(f)}
              className={`rounded-xl py-2.5 font-heading text-sm font-bold capitalize transition-colors ${
                freq === f
                  ? 'bg-card text-navy shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Term */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CalendarDays className="size-4 text-navy" />
            Plazo
          </span>
          <span className="font-heading text-lg font-extrabold text-navy">
            {months} {months === 1 ? 'mes' : 'meses'} · {installments} cuotas
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={6}
          step={1}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="yave-slider"
          aria-label="Plazo en meses"
        />
      </div>

      {/* Result card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0a1628] p-5">
        <div className="absolute -right-4 -bottom-2 opacity-20">
          <MascotGold pose="default" size={110} />
        </div>

        <div className="relative flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">
            Cuota {freq === 'mensual' ? 'mensual' : 'quincenal'}
          </span>
          <span className="font-heading text-3xl font-extrabold text-[#f26522]">
            {cop(perInstallment)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative mt-4 flex w-full items-center justify-between border-t border-slate-700 pt-3 text-sm font-bold text-white"
          aria-expanded={open}
        >
          <span className="flex items-center gap-1.5">
            <Info className="size-4 text-[#f26522]" />
            Ver desglose de costos
          </span>
          <ChevronDown
            className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.dl
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-4">
                {/* Monto */}
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-slate-400">Monto solicitado</dt>
                  <dd className="font-bold text-white">{cop(amount)}</dd>
                </div>

                {/* Interest */}
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white">
                    <TrendingUp className="size-4" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm font-bold text-white">
                        Ganancia de Yave
                      </dt>
                      <dd className="text-sm font-bold text-white">
                        {cop(interest)}
                      </dd>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Interés del {(ratePerPeriod * 100).toFixed(1)}%{' '}
                      {freq === 'mensual' ? 'E.M.' : 'por quincena'} sobre tu
                      monto.
                    </p>
                  </div>
                </div>

                {/* Fianza — covered by Yave */}
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-900/60 text-emerald-400">
                    <ShieldCheck className="size-4" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1.5 text-sm font-bold text-white">
                        Yave te respalda
                        <button
                          type="button"
                          aria-label="Información sobre la fianza"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowFianzaTip((v) => !v)
                          }}
                          className="text-slate-400 transition-colors hover:text-emerald-400"
                        >
                          <Info className="size-3.5" />
                        </button>
                      </dt>
                      <dd className="flex items-center gap-2 text-sm font-bold">
                        <span className="text-slate-500 line-through">
                          {cop(fianza)}
                        </span>
                        <span className="rounded-full bg-emerald-900/60 px-2 py-0.5 text-xs font-bold text-emerald-400">
                          Lo cubre Yave
                        </span>
                      </dd>
                    </div>
                    <AnimatePresence>
                      {showFianzaTip && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden text-xs leading-relaxed text-emerald-400"
                        >
                          Este respaldo es un beneficio comercial de Yave. No
                          afecta tu bolsillo.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.dl>
          ) : null}
        </AnimatePresence>

        <div className="relative mt-4 flex items-center justify-between border-t border-slate-700 pt-3">
          <span className="font-heading font-bold text-white">
            Total a pagar
          </span>
          <span className="font-heading text-lg font-extrabold text-white">
            {cop(total)}
          </span>
        </div>
      </div>

      <a
        href="/onboarding"
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f26522] font-heading text-lg font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:brightness-110 active:translate-y-px active:shadow-md"
      >
        Solicitar mi plata
        <ArrowRight className="size-5" />
      </a>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Respuesta en minutos. Tu primera consulta no afecta tu historial.
      </p>
    </div>
  )
}
