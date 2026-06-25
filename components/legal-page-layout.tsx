import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { YaveLogo } from '@/components/yave-logo'
import { MascotGold } from '@/components/mascot-gold'
import { RegulatoryFooter } from '@/components/regulatory-footer'

export function LegalPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-bold text-navy transition-colors hover:bg-border"
          >
            <ArrowLeft className="size-4" />
            Volver
          </Link>
          <YaveLogo />
          <span className="w-10" />
        </div>
      </header>

      <main className="mx-auto max-w-md px-5 pt-6">
        <div className="flex flex-col items-center text-center">
          <MascotGold size={100} alt="" pose="magnifier" />
          <h1 className="mt-4 font-heading text-3xl font-extrabold text-navy">
            {title}
          </h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {children}
        </div>
      </main>

      <div className="mt-12">
        <RegulatoryFooter />
      </div>
    </div>
  )
}
