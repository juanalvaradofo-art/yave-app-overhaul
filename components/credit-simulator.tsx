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
  BadgeDollarSign,
  CreditCard,
  Info,
} from 'lucide-react'
import { MascotGold } from '@/components/mascot-gold'

const RATE_MONTHLY = 0.022
const FIANZA_PCT = 0.12
const ADMIN_FEE_PCT = 0.05
const YAVE_PASS_FEE = 15_000

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
  const interest = amount * RATE_MONTHLY * months
  const fianza = amount * FIANZA_PCT
  const adminFee = amount * ADMIN_FEE_PCT
  const total = amount + interest + fianza + adminFee + YAVE_PASS_FEE
  const perInstallment = total / installments
  const ratePerPeriod = freq === 'mensual' ? RATE_MONTHLY : RATE_MONTHLY / 2

  const sliderPct = ((amount - 200_000) / 300_000) * 100
  const termPct = ((months - 1) / 5) * 100

  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-lg ring-1 ring-border">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="font-heading text-xl font-extrabold text-navy">
          Simula tu credito
        </h3>
        <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold text-yellow-foreground">
          Sin letra pequena
        </span>
      </div>

      {/* Amount slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Wallet className="size-4 text-navy" />
            Cuanto necesitas?
          </span>
          <span className="font-heading text-xl font-extrabold text-navy">
            {cop(amount)}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={200_000}
            max={500_000}
            step={50_000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="yave-slider"
            aria-label="Monto del credito"
            style={{
              background: `linear-gradient(to right, var(--navy) 0%, var(--navy) ${sliderPct}%, var(--muted) ${sliderPct}%, var(--muted) 100%)`,
            }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>$ 200.000</span>
          <span>$ 500.000</span>
        </div>
      </div>

      {/* Frequency toggle */}
      <div className="mb-6">
        <span className="mb-2 block text-sm font-semibold text-muted-foreground">
          Frecuencia de pago
        </span>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
          {(['mensual', 'quincenal'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFreq(f)}
              className={`rounded-xl py-2.5 font-heading text-sm font-bold capitalize transition-all ${
                freq === f
                  ? 'bg-card text-navy shadow-sm'
                  : 'text-muted-foreground hover:text-navy'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Term slider */}
      <div className="mb-6">
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
          style={{
            background: `linear-gradient(to right, var(--navy) 0%, var(--navy) ${termPct}%, var(--muted) ${termPct}%, var(--muted) 100%)`,
          }}
        />
      </div>

      {/* Result card */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-5">
        <div className="absolute -right-4 -bottom-2 opacity-15">
          <MascotGold pose="default" size={100} />
        </div>

        <div className="relative flex items-center justify-between">
          <span className="text-sm font-semibold text-white/70">
            Cuota {freq === 'mensual' ? 'mensual' : 'quincenal'}
          </span>
          <span className="font-heading text-3xl font-extrabold text-orange">
            {cop(perInstallment)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative mt-4 flex w-full items-center justify-between border-t border-white/15 pt-3 text-sm font-bold text-white"
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
              className="relative overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-4">
                {/* Monto */}
                <div className="flex items-center justify-between text-sm">
                  <dt className="text-white/60">Monto solicitado</dt>
                  <dd className="font-bold text-white">{cop(amount)}</dd>
                </div>

                {/* Interest */}
                <CostRow
                  icon={TrendingUp}
                  iconBg="bg-white/10"
                  label="Intereses"
                  sublabel={`${(ratePerPeriod * 100).toFixed(1)}% ${freq === 'mensual' ? 'E.M.' : 'por quincena'} sobre tu monto`}
                  value={cop(interest)}
                />

                {/* Fianza */}
                <CostRow
                  icon={ShieldCheck}
                  iconBg="bg-orange/20"
                  label="Fianza (Yave te respalda)"
                  sublabel="12% del monto. Garantia de respaldo obligatoria."
                  value={cop(fianza)}
                />

                {/* Admin fee */}
                <CostRow
                  icon={BadgeDollarSign}
                  iconBg="bg-white/10"
                  label="Cuota administrativa (5%)"
                  sublabel="Firma, estudio de credito y uso de plataforma."
                  value={cop(adminFee)}
                />

                {/* Yave Pass */}
                <CostRow
                  icon={CreditCard}
                  iconBg="bg-yellow/20"
                  label="Yave Pass"
                  sublabel="Acceso a beneficios y La Boveda."
                  value={cop(YAVE_PASS_FEE)}
                />
              </div>
            </motion.dl>
          ) : null}
        </AnimatePresence>

        <div className="relative mt-4 flex items-center justify-between border-t border-white/15 pt-3">
          <span className="font-heading font-bold text-white">Total a pagar</span>
          <span className="font-heading text-lg font-extrabold text-white">
            {cop(total)}
          </span>
        </div>
      </div>

      <a
        href="/onboarding"
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white shadow-lg shadow-orange/20 transition-all hover:shadow-orange/30 hover:brightness-110 active:translate-y-px active:shadow-md"
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

function CostRow({
  icon: Icon,
  iconBg,
  label,
  sublabel,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  iconBg: string
  label: string
  sublabel: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg text-white ${iconBg}`}>
        <Icon className="size-4" strokeWidth={2.5} />
      </span>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <dt className="text-sm font-bold text-white">{label}</dt>
          <dd className="text-sm font-bold text-white">{value}</dd>
        </div>
        <p className="text-xs leading-relaxed text-white/50">{sublabel}</p>
      </div>
    </div>
  )
}
