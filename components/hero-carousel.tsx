'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, HandCoins, ChartBar as BarChart3, Sparkles, Zap } from 'lucide-react'
import { MascotGold } from '@/components/mascot-gold'

const slides = [
  {
    badge: 'Micro-creditos con corazon',
    icon: HandCoins,
    title: 'El credito que te entiende',
    text: 'Pocos requisitos, respuesta en minutos y recompensas en cada pago.',
    cta: 'Solicitar mi plata',
    bg: 'bg-navy',
    textColor: 'text-white',
    subText: 'text-white/70',
    badgeBg: 'bg-yellow text-yellow-foreground',
    layout: 'mascot' as const,
  },
  {
    badge: 'Modelo alternativo',
    icon: BarChart3,
    title: 'Estudiamos tu credito con un modelo unico y justo',
    text: 'No dependemos solo del buro. Analizamos tu comportamiento para darte una oportunidad real.',
    cta: 'Conocer mas',
    bg: 'bg-card ring-1 ring-border',
    textColor: 'text-navy',
    subText: 'text-muted-foreground',
    badgeBg: 'bg-navy text-white',
    layout: 'clean' as const,
  },
  {
    badge: 'Gana mientras pagas',
    icon: Sparkles,
    title: 'Premios, Yave Coins y un cupo que crece contigo',
    text: 'Sube de llave, desbloquea La Boveda y canjea por beneficios reales.',
    cta: 'Conocer recompensas',
    bg: 'bg-yellow',
    textColor: 'text-navy',
    subText: 'text-navy/60',
    badgeBg: 'bg-navy text-white',
    layout: 'clean' as const,
  },
  {
    badge: 'Plata rapida',
    icon: Zap,
    title: 'Plata rapida, sin papeleos infinitos',
    text: 'Solicitas desde tu celular y te respondemos en minutos. Sin filas, sin vueltas.',
    cta: 'Pedir mi plata',
    bg: 'bg-orange',
    textColor: 'text-white',
    subText: 'text-white/75',
    badgeBg: 'bg-white text-orange',
    layout: 'clean' as const,
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[index]
  const Icon = slide.icon

  return (
    <div className={`relative overflow-hidden rounded-[2rem] ${slide.bg} p-6 shadow-xl transition-colors duration-500`}>
      {/* Decorative elements */}
      {slide.layout === 'mascot' && (
        <>
          <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/8" />
          <div className="absolute -left-6 bottom-20 size-20 rounded-full bg-orange/8" />
        </>
      )}

      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className={`inline-flex items-center gap-1.5 rounded-full ${slide.badgeBg} px-3 py-1.5 text-xs font-bold shadow-sm`}>
              <Icon className="size-4" />
              {slide.badge}
            </span>

            {slide.layout === 'mascot' ? (
              <div className="mt-4 flex items-start justify-between gap-2">
                <h1 className={`font-heading text-[2.2rem] font-extrabold leading-[1.08] text-balance ${slide.textColor}`}>
                  {slide.title}
                </h1>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  <MascotGold size={92} className="-mt-2 shrink-0 drop-shadow-lg" alt="" />
                </motion.div>
              </div>
            ) : (
              <h1 className={`mt-4 font-heading text-[2rem] font-extrabold leading-[1.12] text-balance ${slide.textColor}`}>
                {slide.title}
              </h1>
            )}

            <p className={`mt-3 leading-relaxed ${slide.subText}`}>{slide.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <Link
        href="/onboarding"
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white shadow-lg shadow-orange/25 transition-all hover:brightness-110 active:translate-y-px"
      >
        {slide.cta}
        <ArrowRight className="size-5" />
      </Link>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index
                ? `w-6 ${slide.bg === 'bg-yellow' || slide.bg.includes('bg-card') ? 'bg-navy' : 'bg-yellow'}`
                : `w-2 ${slide.bg === 'bg-yellow' || slide.bg.includes('bg-card') ? 'bg-navy/30' : 'bg-white/30'}`
            }`}
          />
        ))}
      </div>
    </div>
  )
}
