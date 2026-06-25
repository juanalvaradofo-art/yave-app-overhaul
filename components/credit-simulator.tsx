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
  Ticket,
  Layers,
  Info,
} from 'lucide-react'

const RATE_MONTHLY = 0.022 // 2.2% E.M. — Ganancia de Yave
const FIANZA_PCT = 0.12 // Yave te respalda (cubierto por Yave)
const OTHERS_PCT = 0.05 // Dispersión, estudio de crédito y gestión
const YAVEPASS_MONTH = 12_000

function cop(n: number) {
  return '$ ' + Math.round(n).toLocaleString('es-CO')
}

type Freq = 'mensual' | 'quincenal'

export function CreditSimulator() {
  const [amount, setAmount] = useState(300_000)
  const [months, setMonths] = useState(3)
  const [freq, setFreq] = useState<Freq>('mensual')
  const [open, setOpen] = useState(false)

  const installments = freq === 'mensual' ? months : months * 2

  // Cost components
  const interest = amount * RATE_MONTHLY * months // Ganancia de Yave
  const fianza = amount * FIANZA_PCT // Yave te respalda (cubierto)
  const yavePass = YAVEPASS_MONTH * months // proporcional al plazo
  const others = amount * OTHERS_PCT // Otros costos

  const total = amount + interest + yavePass + others // fianza cubierta, no se cobra
  const perInstallment = total / installments

  const ratePerPeriod = freq === 'mensual' ? RATE_MONTHLY : RATE_MONTHLY / 2
  const passPerPeriod = freq === 'mensual' ? YAVEPASS_MONTH : YAVEPASS_MONTH / 2

  const lines = [
    {
      icon: TrendingUp,
      label: 'Ganancia de Yave',
      value: cop(interest),
      note: `Interés del ${(ratePerPeriod * 100).toFixed(1)}% ${freq === 'mensual' ? 'E.M.' : 'por quincena'} sobre tu monto.`,
      tone: 'navy' as const,
    },
    {
      icon: ShieldCheck,
      label: 'Yave te respalda',
      value: 'Lo cubre Yave',
      strike: cop(fianza),
      note: 'Es el respaldo (fianza) de tu crédito. No lo pagas tú: lo asume Yave como beneficio comercial y no se suma a tu total.',
      tone: 'green' as const,
    },
    {
      icon: Ticket,
      label: 'YavePass',
      value: cop(yavePass),
      note: `${cop(passPerPeriod)} por ${freq === 'mensual' ? 'mes' : 'quincena'}. Cubre tu membresía y beneficios.`,
      tone: 'navy' as const,
    },
    {
      icon: Layers,
      label: 'Otros costos',
      value: cop(others),
      note: '5%: dispersión, estudio de crédito y gestión.',
      tone: 'navy' as const,
    },
  ]

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

      {/* Result */}
      <div className="rounded-2xl bg-muted p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-muted-foreground">
            Cuota {freq === 'mensual' ? 'mensual' : 'quincenal'}
          </span>
          <span className="font-heading text-3xl font-extrabold text-orange">
            {cop(perInstallment)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-4 flex w-full items-center justify-between border-t border-border pt-3 text-sm font-bold text-navy"
          aria-expanded={open}
        >
          <span className="flex items-center gap-1.5">
            <Info className="size-4 text-orange" />
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
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">Monto solicitado</dt>
                  <dd className="font-bold text-navy">{cop(amount)}</dd>
                </div>
                {lines.map((l) => {
                  const Icon = l.icon
                  return (
                    <div key={l.label} className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${
                          l.tone === 'green'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-card text-navy'
                        }`}
                      >
                        <Icon className="size-4" strokeWidth={2.5} />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <dt className="text-sm font-bold text-navy">
                            {l.label}
                          </dt>
                          <dd className="text-sm font-bold">
                            {l.strike ? (
                              <span className="mr-1.5 text-muted-foreground line-through">
                                {l.strike}
                              </span>
                            ) : null}
                            <span
                              className={
                                l.tone === 'green'
                                  ? 'text-emerald-700'
                                  : 'text-navy'
                              }
                            >
                              {l.value}
                            </span>
                          </dd>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {l.note}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.dl>
          ) : null}
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="font-heading font-bold text-navy">Total a pagar</span>
          <span className="font-heading text-lg font-extrabold text-navy">
            {cop(total)}
          </span>
        </div>
      </div>

      <a
        href="/onboarding"
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-orange-foreground transition-transform active:translate-y-px"
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
