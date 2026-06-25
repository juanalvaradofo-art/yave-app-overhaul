'use client'

import { useState } from 'react'
import { Sparkles, KeyRound } from 'lucide-react'
import { useYave } from '@/lib/yave-store'

type Tab = 'all' | 'xp' | 'coins'

export function TransactionLog({
  tabs = true,
  only,
}: {
  /** Show XP/Coins filter tabs. */
  tabs?: boolean
  /** Force a single kind (used in La Bóveda for coins only). */
  only?: 'xp' | 'coins'
}) {
  const { logs } = useYave()
  const [tab, setTab] = useState<Tab>(only ?? 'all')

  const filtered = logs.filter((l) => (tab === 'all' ? true : l.kind === tab))

  return (
    <div>
      {tabs && !only ? (
        <div className="mb-3 grid grid-cols-3 gap-1 rounded-full bg-muted p-1 text-sm font-bold">
          {([
            ['all', 'Todo'],
            ['xp', 'XP'],
            ['coins', 'Coins'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full py-2 transition-colors ${
                tab === key ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <p className="rounded-2xl bg-card p-5 text-center text-sm text-muted-foreground shadow-sm">
            Aún no hay movimientos. ¡Tu próximo pago aparecerá aquí!
          </p>
        ) : (
          filtered.map((l) => {
            const isXp = l.kind === 'xp'
            const positive = l.delta > 0
            return (
              <div
                key={l.id}
                className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                    isXp ? 'bg-navy/10 text-navy' : 'bg-yellow/20 text-navy'
                  }`}
                >
                  {isXp ? (
                    <Sparkles className="size-5" strokeWidth={2.5} />
                  ) : (
                    <KeyRound className="size-5" strokeWidth={2.5} />
                  )}
                </span>
                <div className="flex-1">
                  <p className="font-heading text-sm font-bold text-navy">
                    {l.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isXp ? 'Experiencia' : 'Yave Coins'} · {l.date}
                  </p>
                </div>
                <span
                  className={`font-heading font-extrabold ${
                    positive ? 'text-orange' : 'text-muted-foreground'
                  }`}
                >
                  {positive ? '+' : ''}
                  {l.delta.toLocaleString('es-CO')}
                  {isXp ? ' XP' : ''}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
