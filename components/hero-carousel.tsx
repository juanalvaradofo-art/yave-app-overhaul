'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, HandCoins, Headphones, Sparkles } from 'lucide-react'
import { Mascot } from '@/components/mascot'

const slides = [
  {
    badge: 'Micro-créditos con corazón',
    icon: HandCoins,
    title: 'El crédito que te entiende',
    text: 'Pocos requisitos, respuesta en minutos y recompensas en cada pago. Pide tu plata sin enredos.',
    cta: 'Solicitar mi plata',
  },
  {
    badge: 'Siempre con un humano',
    icon: Headphones,
    title: 'Te atiende gente, no robots',
    text: 'Líneas de atención de lunes a sábado. Hablas con un parcero de verdad cuando lo necesitas.',
    cta: 'Hablar con Yave',
  },
  {
    badge: 'Gana mientras pagas',
    icon: Sparkles,
    title: 'Cada pago suma Yave Coins',
    text: 'Sube de llave, desbloquea La Bóveda y canjea tus monedas por beneficios reales.',
    cta: 'Conocer recompensas',
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
    <div className="relative overflow-hidden rounded-[2rem] bg-navy p-6 text-navy-foreground">
      <div className="relative min-h-[238px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-3 py-1.5 text-xs font-bold text-yellow-foreground">
              <Icon className="size-4" />
              {slide.badge}
            </span>
            <div className="mt-4 flex items-start justify-between gap-2">
              <h1 className="font-heading text-[2.2rem] font-extrabold leading-[1.08] text-balance">
                {slide.title}
              </h1>
              <Mascot size={92} className="-mt-2 shrink-0 drop-shadow-lg" alt="" />
            </div>
            <p className="mt-3 leading-relaxed text-white/75">{slide.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <Link
        href="/onboarding"
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-orange-foreground transition-transform active:translate-y-px"
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
              i === index ? 'w-6 bg-yellow' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
