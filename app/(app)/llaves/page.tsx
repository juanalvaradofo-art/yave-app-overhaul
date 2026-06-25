'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  KeyRound,
  CheckCircle2,
  Sparkles,
  Lock,
  Zap,
  CalendarCheck,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { RankMascot } from '@/components/mascot'
import { TransactionLog } from '@/components/transaction-log'
import { PaymentSheet } from '@/components/payment-sheet'
import { ranks, xpRules } from '@/lib/yave-data'
import { useYave } from '@/lib/yave-store'

export default function LlavesPage() {
  const { xp, coins, rankIndex } = useYave()
  const [payOpen, setPayOpen] = useState(false)

  const current = ranks[rankIndex]
  const next = ranks[rankIndex + 1] ?? null
  const remaining = ranks.slice(rankIndex + 2)

  const progress = next
    ? Math.min(100, Math.round(((xp - current.xpMin) / (next.xpMin - current.xpMin)) * 100))
    : 100
  const xpToNext = next ? Math.max(0, next.xpMin - xp) : 0
  const cupoIncrease = next ? next.cupoValue - current.cupoValue : 0

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 font-heading text-3xl font-extrabold text-navy">
          <Sparkles className="size-7 text-orange" strokeWidth={2.5} />
          Programa de Llaves
        </h1>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          Acumula XP pagando a tiempo y sube de llave para desbloquear mejores
          beneficios.
        </p>
      </div>

      {/* Current level */}
      <div className="rounded-[2rem] bg-card p-6 shadow-md">
        <div className="flex items-start justify-between">
          <span
            className="rounded-full px-4 py-1.5 text-sm font-bold"
            style={{ backgroundColor: `${current.color}1f`, color: current.color }}
          >
            Tu llave actual
          </span>
          <RankMascot size={60} rankColor={current.color} alt="" />
        </div>
        <p
          className="mt-2 font-heading text-4xl font-extrabold"
          style={{ color: current.color }}
        >
          {current.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {current.frecuencia} · Cupo {current.cupo} · {xp.toLocaleString('es-CO')} XP
        </p>

        {next ? (
          <>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progreso a {next.name}</span>
              <span className="font-bold text-navy">
                Faltan {xpToNext.toLocaleString('es-CO')} XP
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-orange"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </>
        ) : (
          <p className="mt-4 rounded-2xl bg-orange/10 p-3 text-sm font-semibold text-orange">
            ¡Llegaste al Olimpo! Eres llave Maestra, el rango máximo.
          </p>
        )}

        <ul className="mt-5 flex flex-col gap-2.5">
          {[
            `Cupo ${current.cupo} (${current.frecuencia.toLowerCase()})`,
            current.benefit,
            'Ganas Yave Coins en cada pago',
          ].map((perk) => (
            <li key={perk} className="flex items-center gap-2.5">
              <CheckCircle2 className="size-5 shrink-0 text-yellow" strokeWidth={2.5} />
              <span className="font-semibold text-navy">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next rank */}
      {next ? (
        <div className="rounded-[2rem] border-2 border-dashed border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-muted-foreground">
              Próxima llave
            </span>
            <span
              className="flex size-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${next.color}1f`, color: next.color }}
            >
              <KeyRound className="size-5" strokeWidth={2.5} />
            </span>
          </div>
          <p
            className="mt-2 font-heading text-2xl font-extrabold"
            style={{ color: next.color }}
          >
            {next.name}
          </p>

          {/* Cupo increase example — we show the jump, never the total */}
          {cupoIncrease > 0 ? (
            <div
              className="mt-3 flex items-center gap-2 rounded-2xl px-4 py-3"
              style={{ backgroundColor: `${next.color}1a`, color: next.color }}
            >
              <TrendingUp className="size-5 shrink-0" strokeWidth={2.5} />
              <p className="font-heading text-lg font-extrabold">
                + ${cupoIncrease.toLocaleString('es-CO')} de cupo
              </p>
            </div>
          ) : null}

          {/* Concrete perks unlocked at the next rank */}
          <p className="mt-4 text-sm font-bold text-muted-foreground">
            Lo que desbloqueas
          </p>
          <ul className="mt-2 flex flex-col gap-2.5">
            {next.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0"
                  style={{ color: next.color }}
                  strokeWidth={2.5}
                />
                <span className="text-sm font-semibold leading-snug text-navy">
                  {perk}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
            <span className="text-muted-foreground">XP requerida</span>
            <span className="font-heading font-bold text-navy">{next.xp}</span>
          </div>
        </div>
      ) : null}

      {/* Keep unlocking legend */}
      {remaining.length > 0 ? (
        <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card text-muted-foreground">
            <Lock className="size-5" />
          </span>
          <div>
            <p className="font-heading font-bold text-navy">Sigue desbloqueando</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Te esperan {remaining.map((r) => r.name).join(', ')}. Cada llave
              sube tu cupo y tus beneficios.
            </p>
          </div>
        </div>
      ) : null}

      {/* XP mechanics */}
      <div>
        <h2 className="mb-3 font-heading text-2xl font-extrabold text-navy">
          ¿Cómo ganas XP?
        </h2>
        <div className="flex flex-col gap-3">
          <MechanicRow
            icon={Zap}
            tone="orange"
            title={xpRules.early.label}
            reward={`+${xpRules.early.xp} XP · +${xpRules.early.coins} coins`}
          />
          <MechanicRow
            icon={CalendarCheck}
            tone="navy"
            title={xpRules.timely.label}
            reward={`+${xpRules.timely.xp} XP · +${xpRules.timely.coins} coins`}
          />
          <MechanicRow
            icon={Clock}
            tone="danger"
            title="Mora (pago tarde)"
            reward={`${xpRules.moraPerDay.xp} XP · ${xpRules.moraPerDay.coins} coins / día`}
          />
        </div>
        <p className="mt-2 px-1 text-xs leading-relaxed text-muted-foreground">
          Pagar tarde te resta XP y Yave Coins. Si acumulas mucha mora puedes
          bajar de llave (por ejemplo, de Plata a Bronce). Pagar a tiempo siempre
          te mantiene subiendo.
        </p>
        <button
          type="button"
          onClick={() => setPayOpen(true)}
          className="mt-4 flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-orange py-3 font-heading font-bold text-orange-foreground transition-transform active:translate-y-px"
        >
          Simular un pago
          <ArrowRight className="size-5" />
        </button>
      </div>

      {/* History */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-extrabold text-navy">
            Historial
          </h2>
          <span className="rounded-full bg-yellow px-3 py-1 text-xs font-bold text-yellow-foreground">
            {coins.toLocaleString('es-CO')} coins
          </span>
        </div>
        <TransactionLog />
      </div>

      <PaymentSheet open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  )
}

function MechanicRow({
  icon: Icon,
  tone,
  title,
  reward,
}: {
  icon: typeof Zap
  tone: 'orange' | 'navy' | 'muted' | 'danger'
  title: string
  reward: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
          tone === 'orange'
            ? 'bg-orange text-orange-foreground'
            : tone === 'navy'
              ? 'bg-navy text-navy-foreground'
              : tone === 'danger'
                ? 'bg-destructive/15 text-destructive'
                : 'bg-muted text-muted-foreground'
        }`}
      >
        <Icon className="size-5" strokeWidth={2.5} />
      </span>
      <p className="flex-1 font-heading font-bold text-navy">{title}</p>
      <span
        className={`text-sm font-bold ${tone === 'danger' ? 'text-destructive' : 'text-orange'}`}
      >
        {reward}
      </span>
    </div>
  )
}
