'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, KeyRound, Vault, LifeBuoy } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/inicio', label: 'Inicio', icon: Home },
  { href: '/llaves', label: 'Llaves', icon: KeyRound },
  { href: '/boveda', label: 'Bóveda', icon: Vault },
  { href: '/ayuda', label: 'Ayuda', icon: LifeBuoy },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-bold transition-colors"
            >
              <span
                className={cn(
                  'flex size-10 items-center justify-center rounded-full transition-colors',
                  active ? 'bg-yellow text-navy' : 'text-muted-foreground',
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className={active ? 'text-navy' : 'text-muted-foreground'}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
