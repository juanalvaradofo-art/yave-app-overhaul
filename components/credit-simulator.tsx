'use client'

import { useState, useMemo } from 'react'
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
  KeyRound,
} from 'lucide-react'
import { ranks } from '@/lib/yave-data'

const RATE_MONTHLY = 0.022
const FIANZA_PCT = 0.12
const ADMIN_FEE_PCT = 0.05
const YAVE_PASS_FEE = 15_000

function cop(n: number) {
  return '$ ' + Math.round(n).toLocaleString('es-CO')
}

function getTierRules(rankIndex: number) {
  const r = ranks[rankIndex]
  if (rankIndex <= 2) {
    return { freq: 'quincenal' as const, maxPeriods: 4, periodLabel: 'quincenas', freqLabel: 'Quincenal' }
  }
  if (rankIndex <= 4) {
    return { freq: 'mensual' as const, maxPeriods: 3, periodLabel: 'meses', freqLabel: 'Mensual' }
  }
  return { freq: 'mensual' as const, maxPeriods: 4, periodLabel: 'meses', freqLabel: 'Mensual' }
}

export function CreditSimulator({ rankIndex = 0 }: { rankIndex?: number }) {
  const tier = useMemo(() => getTierRules(rankIndex), [rankIndex])
  const maxAmount = ranks[rankIndex].cupoValue
  const minAmount = 200_000

  const [amount, setAmount] = useState(Math.min(300_000, maxAmount))
  const [periods, setPeriods] = useState(Math.min(3, tier.maxPeriods))
  const [open, setOpen] = useState(false)

  const months = tier.freq === 'quincenal' ? periods * 0.5 : periods
  const installments = periods
  const interest = amount * RATE_MONTHLY * months
  const fianza = amount * FIANZA_PCT
  const adminFee = amount * ADMIN_FEE_PCT
  const total = amount + interest + fianza + adminFee + YAVE_PASS_FEE
  const perInstallment = total / installments
  const ratePerPeriod = tier.freq === 'mensual' ? RATE_MONTHLY : RATE_MONTHLY / 2

  const sliderPct = ((amount - minAmount) / (maxAmount - minAmount)) * 100
  const termPct = ((periods - 1) / (tier.maxPeriods - 1)) * 100

  const rank = ranks[rankIndex]

  return (
    <div className="rounded-[2rem] bg-card p-6 shadow-lg ring-1 ring-border">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h3 className="font-heading text-xl font-extrabold text-navy">
          Simula tu credito
        </h3>
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: `${rank.color}20`, color: rank.color }}
        >
          <KeyRound className="size-3.5" />
          {rank.name}
        </span>
      </div>

      {/* Tier info */}
      <div className="mb-5 rounded-xl bg-muted/60 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Modalidad:</span>
          <span className="font-bold text-navy">{tier.freqLabel}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-muted-foreground">Maximo {tier.periodLabel}:</span>
          <span className="font-bold text-navy">{tier.maxPeriods}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-muted-foreground">Cupo maximo:</span>
          <span className="font-bold text-navy">{cop(maxAmount)}</span>
        </div>
      </div>

      {/* Amount */}
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
        <input
          type="range"
          min={minAmount}
          max={maxAmount}
          step={50_000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="yave-slider"
          aria-label="Monto del credito"
          style={{
            background: `linear-gradient(to right, var(--navy) 0%, var(--navy) ${sliderPct}%, var(--muted) ${sliderPct}%, var(--muted) 100%)`,
          }}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{cop(minAmount)}</span>
          <span>{cop(maxAmount)}</span>
        </div>
      </div>

      {/* Term */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CalendarDays className="size-4 text-navy" />
            Plazo
          </span>
          <span className="font-heading text-lg font-extrabold text-navy">
            {periods} {tier.periodLabel} · {installments} cuotas
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={tier.maxPeriods}
          step={1}
          value={periods}
          onChange={(e) => setPeriods(Number(e.target.value))}
          className="yave-slider"
          aria-label="Plazo"
          style={{
            background: `linear-gradient(to right, var(--navy) 0%, var(--navy) ${termPct}%, var(--muted) ${termPct}%, var(--muted) 100%)`,
          }}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>1</span>
          <span>{tier.maxPeriods} {tier.periodLabel}</span>
        </div>
      </div>

      {/* Result */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-5">
        <div className="relative flex items-center justify-between">
          <span className="text-sm font-semibold text-white/70">
            Cuota {tier.freq === 'mensual' ? 'mensual' : 'quincenal'}
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
          <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.dl
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-4">
                <CostRow icon={Wallet} iconBg="bg-white/10" label="Monto solicitado" value={cop(amount)} />
                <CostRow
                  icon={TrendingUp}
                  iconBg="bg-white/10"
                  label="Intereses"
                  sublabel={`${(ratePerPeriod * 100).toFixed(1)}% ${tier.freq === 'mensual' ? 'E.M.' : 'por quincena'}`}
                  value={cop(interest)}
                />
                <CostRow
                  icon={ShieldCheck}
                  iconBg="bg-orange/20"
                  label="Fianza (12%)"
                  sublabel="Garantia de respaldo obligatoria"
                  value={cop(fianza)}
                />
                <CostRow
                  icon={BadgeDollarSign}
                  iconBg="bg-white/10"
                  label="Cuota administrativa (5%)"
                  sublabel="Firma, estudio y plataforma"
                  value={cop(adminFee)}
                />
                <CostRow
                  icon={CreditCard}
                  iconBg="bg-yellow/20"
                  label="Yave Pass"
                  sublabel="Acceso a beneficios"
                  value={cop(YAVE_PASS_FEE)}
                />
              </div>
            </motion.dl>
          )}
        </AnimatePresence>

        <div className="relative mt-4 flex items-center justify-between border-t border-white/15 pt-3">
          <span className="font-heading font-bold text-white">Total a pagar</span>
          <span className="font-heading text-lg font-extrabold text-white">{cop(total)}</span>
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
  sublabel?: string
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
        {sublabel && <p className="text-xs leading-relaxed text-white/50">{sublabel}</p>}
      </div>
    </div>
  )
}
