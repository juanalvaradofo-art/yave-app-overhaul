import type { ReactNode } from 'react'
import { AppHeader } from '@/components/app-header'
import { BottomNav } from '@/components/bottom-nav'
import { YaveProvider } from '@/lib/yave-store'
import { RankUpOverlay } from '@/components/rank-up-overlay'
import { RankDownOverlay } from '@/components/rank-down-overlay'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <YaveProvider>
      <div className="min-h-screen">
        <AppHeader />
        <main className="mx-auto max-w-md px-5 pb-28 pt-5">{children}</main>
        <BottomNav />
        <RankUpOverlay />
        <RankDownOverlay />
      </div>
    </YaveProvider>
  )
}
