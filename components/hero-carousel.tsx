'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, HandCoins, Headphones, Sparkles, ShieldCheck, Users } from 'lucide-react'
import { MascotGold } from '@/components/mascot-gold'

const slides = [
  {
    badge: 'Micro-creditos con corazon',
    icon: HandCoins,
    title: 'El credito que te entiende',
    text: 'Pocos requisitos, respuesta en minutos y recompensas en cada pago. Pide tu plata sin enredos.',
    cta: 'Solicitar mi plata',
    accent: 'from-navy to-[#13365E]',
  },
  {
    badge: 'Siempre con un humano',
    icon: Headphones,
    title: 'Te atiende gente, no robots',
    text: 'Lineas de atencion de lunes a sabado. Hablas con un parcero de verdad cuando lo necesitas.',
    cta: 'Hablar con Yave',
    accent: 'from-[#0D2D4F] to-navy',
  },
  {
    badge: 'Gana mientras pagas',
    icon: Sparkles,
    title: 'Cada pago suma Yave Coins',
    text: 'Sube de llave, desbloquea La Boveda y canjea tus monedas por beneficios reales.',
    cta: 'Conocer recompensas',
    accent: 'from-navy to-[#0F2F52]',
  },
  {
    badge: 'Seguridad bancaria',
    icon: ShieldCheck,
    title: 'Tus datos estan protegidos',
    text: 'Cifrado de nivel bancario y vigilancia de la Superintendencia Financiera de Colombia.',
    cta: 'Saber mas',
    accent: 'from-[#0E2E50] to-navy',
  },
  {
    badge: 'Comunidad Yave',
    icon: Users,
    title: 'Mas de 250.000 parceros',
    text: 'Unidos por un credito justo, transparente y hecho en Colombia.',
    cta: 'Unirme ahora',
    accent: 'from-navy to-[#122F4E]',
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
    <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${slide.accent} p-6 text-white shadow-xl ring-1 ring-white/5`}>
      {/* Decorative corner accents */}
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-yellow/10" />
      <div className="absolute -left-6 bottom-20 size-20 rounded-full bg-orange/8" />

      <div className="relative min-h-[238px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-3 py-1.5 text-xs font-bold text-yellow-foreground shadow-sm">
              <Icon className="size-4" />
              {slide.badge}
            </span>
            <div className="mt-4 flex items-start justify-between gap-2">
              <h1 className="font-heading text-[2.2rem] font-extrabold leading-[1.08] text-balance">
                {slide.title}
              </h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                <MascotGold size={92} className="-mt-2 shrink-0 drop-shadow-lg" alt="" pose="default" />
              </motion.div>
            </div>
            <p className="mt-3 leading-relaxed text-white/75">{slide.text}</p>
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
              i === index ? 'w-6 bg-yellow' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
