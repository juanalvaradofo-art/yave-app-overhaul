import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { YaveLogo } from '@/components/yave-logo'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3">
        <YaveLogo />
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-bold text-navy transition-colors hover:bg-border"
        >
          <LogOut className="size-4" />
          Salir
        </Link>
      </div>
    </header>
  )
}
