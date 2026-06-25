'use client'

import { Vault, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { VaultGrid } from '@/components/vault-grid'
import { MascotGold } from '@/components/mascot-gold'
import { useYave } from '@/lib/yave-store'

export default function BovedaPage() {
  const { hasCupo } = useYave()

  if (!hasCupo) {
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

        <LockedState
          title="Activa tu cupo para desbloquear La Boveda"
          description="La Boveda se abre cuando tienes un cupo activo. Ahi podras canjear tus Yave Coins por bonos, datos, descuentos y mas beneficios."
        />
      </div>
    )
  }

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

      <VaultGrid />
    </div>
  )
}

function LockedState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-border bg-muted/60 p-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <span className="flex size-20 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm">
          <Lock className="size-10" strokeWidth={2} />
        </span>
        <h2 className="font-heading text-xl font-extrabold text-navy">{title}</h2>
        <p className="max-w-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
        <Link
          href="/onboarding"
          className="mt-2 flex h-13 items-center justify-center gap-2 rounded-2xl bg-orange px-8 font-heading font-bold text-orange-foreground transition-transform active:translate-y-px"
        >
          Solicitar mi cupo
          <ArrowRight className="size-5" />
        </Link>
      </div>
      <div className="mt-6 flex justify-center">
        <MascotGold size={100} alt="" pose="default" />
      </div>
    </div>
  )
}
