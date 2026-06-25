'use client'

import { Vault, Lock, ArrowRight, Coins, Trophy, Gift, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { VaultGrid } from '@/components/vault-grid'
import { MascotGold } from '@/components/mascot-gold'
import { useYave } from '@/lib/yave-store'

const HOW_TO_EARN = [
  { icon: TrendingUp, label: 'Paga a tiempo', coins: '+200', color: 'text-orange' },
  { icon: Trophy, label: 'Paga anticipado', coins: '+300', color: 'text-orange' },
  { icon: Coins, label: 'Sube de llave', coins: 'Bonus', color: 'text-yellow' },
  { icon: Gift, label: 'Invita amigos', coins: '+500', color: 'text-orange' },
]

export default function BovedaPage() {
  const { hasCupo, coins } = useYave()

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="flex items-center gap-2 font-heading text-3xl font-extrabold text-navy">
          <Vault className="size-7 text-orange" strokeWidth={2.5} />
          La Boveda
        </h1>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          Canjea tus Yave Coins por beneficios reales.
        </p>
      </div>

      {/* Description card */}
      <div className="rounded-[2rem] bg-navy p-6 text-white">
        <h2 className="font-heading text-xl font-extrabold">
          Que es La Boveda?
        </h2>
        <p className="mt-2 leading-relaxed text-white/70">
          La Boveda es tu espacio de recompensas dentro de Yave. Cada pago
          que haces genera Yave Coins que puedes canjear por bonos de Rappi,
          datos moviles, descuentos en tu cuota y mas. Entre mas puntual
          seas, mas monedas ganas.
        </p>

        {hasCupo && (
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
            <Coins className="size-6 text-yellow" />
            <div>
              <p className="text-sm text-white/60">Tu saldo actual</p>
              <p className="font-heading text-2xl font-extrabold text-yellow">
                {coins.toLocaleString('es-CO')} coins
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How to earn */}
      <div>
        <h2 className="mb-3 font-heading text-xl font-extrabold text-navy">
          Como ganar Yave Coins
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {HOW_TO_EARN.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-navy">
                  <Icon className="size-5" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">{item.label}</p>
                  <p className={`font-heading text-sm font-extrabold ${item.color}`}>
                    {item.coins}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Referral CTA */}
      <Link
        href="/boveda/referidos"
        className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border transition-all hover:shadow-md active:translate-y-px"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow text-navy">
          <Gift className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="font-heading font-bold text-navy">Invita y gana 500 Coins</p>
          <p className="text-sm text-muted-foreground">Comparte tu link de referido</p>
        </div>
        <ArrowRight className="size-5 text-muted-foreground" />
      </Link>

      {hasCupo ? (
        <VaultGrid />
      ) : (
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-border bg-muted/60 p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="flex size-20 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm">
              <Lock className="size-10" strokeWidth={2} />
            </span>
            <h2 className="font-heading text-xl font-extrabold text-navy">
              Activa tu cupo para desbloquear La Boveda
            </h2>
            <p className="max-w-xs leading-relaxed text-muted-foreground">
              La Boveda se abre cuando tienes un cupo activo. Ahi podras canjear
              tus Yave Coins por bonos, datos, descuentos y mas.
            </p>
            <Link
              href="/onboarding"
              className="mt-2 flex h-13 items-center justify-center gap-2 rounded-2xl bg-orange px-8 font-heading font-bold text-white transition-transform active:translate-y-px"
            >
              Solicitar mi cupo
              <ArrowRight className="size-5" />
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <MascotGold size={100} alt="" pose="default" />
          </div>
        </div>
      )}
    </div>
  )
}
