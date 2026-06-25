import { Vault } from 'lucide-react'
import { VaultGrid } from '@/components/vault-grid'

export default function BovedaPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="flex items-center gap-2 font-heading text-3xl font-extrabold text-navy">
          <Vault className="size-7 text-orange" strokeWidth={2.5} />
          La Bóveda
        </h1>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          Canjea tus Yave Coins por beneficios reales.
        </p>
      </div>

      <VaultGrid />
    </div>
  )
}
