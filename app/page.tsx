import Link from 'next/link'
import { ArrowRight, Zap, Heart, Sparkles, LifeBuoy } from 'lucide-react'
import { YaveLogo } from '@/components/yave-logo'
import { Mascot } from '@/components/mascot'
import { HeroCarousel } from '@/components/hero-carousel'
import { CreditSimulator } from '@/components/credit-simulator'
import { Testimonials } from '@/components/testimonials'
import { FaqAccordion } from '@/components/faq-accordion'
import { FloatingPayButton } from '@/components/floating-pay-button'

const stats = [
  { value: '+250k', label: 'colombianos' },
  { value: '4.8★', label: 'en tiendas' },
  { value: '2 min', label: 'respuesta' },
]

const reasons = [
  {
    icon: Zap,
    title: 'Aprobación en minutos',
    text: 'Sin filas, sin papeleo eterno. Solicitas y te respondemos rapidísimo.',
  },
  {
    icon: Heart,
    title: 'Tasas con empatía',
    text: 'Entendemos tu momento. Tasas justas y planes que se ajustan a ti.',
  },
  {
    icon: Sparkles,
    title: 'Ganas recompensas',
    text: 'Cada pago suma Yave Coins que canjeas por beneficios reales.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen pb-28">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3">
          <YaveLogo />
          <Link
            href="/inicio"
            className="rounded-full bg-navy px-6 py-2.5 text-sm font-extrabold tracking-wide text-navy-foreground shadow-md shadow-navy/20 ring-1 ring-navy/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/25 active:translate-y-0"
          >
            Ingresar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-5">
        {/* Hero carousel */}
        <section className="pt-6">
          <HeroCarousel />
          <div className="mt-5 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-card px-2 py-3 text-center shadow-sm"
              >
                <p className="font-heading text-lg font-extrabold text-navy">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Simulator */}
        <section className="pt-10">
          <h2 className="mb-1 font-heading text-3xl font-extrabold text-navy">
            Micro-créditos con corazón
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Tú tienes el control. Simula tu crédito sin letra pequeña.
          </p>
          <CreditSimulator />
        </section>

        {/* Why Yave */}
        <section className="pt-10">
          <h2 className="mb-4 font-heading text-3xl font-extrabold text-navy">
            ¿Por qué Yave?
          </h2>
          <div className="flex flex-col gap-3">
            {reasons.map((r) => {
              const Icon = r.icon
              return (
                <div
                  key={r.title}
                  className="flex items-start gap-4 rounded-3xl bg-card p-5 shadow-sm"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-yellow text-navy">
                    <Icon className="size-5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">
                      {r.title}
                    </h3>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">
                      {r.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="pt-10">
          <h2 className="mb-4 font-heading text-3xl font-extrabold text-navy">
            Lo dicen los parceros
          </h2>
          <Testimonials />
        </section>

        {/* Mascot CTA */}
        <section className="pt-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-yellow p-6">
            <div className="max-w-[62%]">
              <h2 className="font-heading text-3xl font-extrabold leading-tight text-navy">
                Tu llave a un crédito más humano
              </h2>
              <Link
                href="/onboarding"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-heading font-bold text-navy-foreground transition-transform active:translate-y-px"
              >
                Crear mi cuenta
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <Mascot size={150} className="absolute -bottom-2 -right-2" alt="" />
          </div>
        </section>

        {/* FAQ */}
        <section className="pt-10">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-3xl font-extrabold text-navy">
            <LifeBuoy className="size-7 text-orange" strokeWidth={2.5} />
            Preguntas frecuentes
          </h2>
          <FaqAccordion />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-navy px-5 pb-10 pt-8 text-navy-foreground">
        <div className="mx-auto max-w-md">
          <YaveLogo textClassName="text-white" />
          <p className="mt-4 max-w-xs leading-relaxed text-white/70">
            El crédito que te entiende. Micro-créditos con corazón para
            Colombia.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-y-3 text-sm font-semibold">
            {[
              { label: 'Habeas Data', href: '/legal/habeas-data' },
              { label: 'Términos y Condiciones', href: '/legal/terminos' },
              { label: 'Política de Privacidad', href: '/legal/privacidad' },
              { label: 'Tasas y Tarifas', href: '/legal/tasas' },
              { label: 'SARLAFT', href: '/legal/sarlaft' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/80 transition-colors hover:text-yellow"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/80">
            Yave S.A.S. — NIT 901.234.567-8. Vigilada por la Superintendencia
            Financiera de Colombia. Tasa de interés sujeta a la tasa de usura
            vigente. Esto es un prototipo de demostración.
          </div>

          <p className="mt-6 text-center text-sm text-white/60">
            © 2026 Yave · Hecho con cariño en Colombia.
          </p>
        </div>
      </footer>

      {/* Floating, scroll-following pay button */}
      <FloatingPayButton />
    </div>
  )
}
