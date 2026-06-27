'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

// Reseñas criollas, creíbles y alineadas con nuestros beneficios
const testimonials = [
  {
    name: 'Andrés M.',
    location: 'Bucaramanga',
    text: '"Me salvó de un apuro brutal. Pedí 300 lucas y me llegaron a Nequi de una. No te piden tantos papeles como en los bancos. Recomendado."',
    stars: 5,
  },
  {
    name: 'Valentina R.',
    location: 'Bogotá',
    text: '"La app es súper fácil de usar. Me gustó que te explican exactamente cuánto vas a pagar sin enredos, aunque el límite inicial es un poco bajito."',
    stars: 4,
  },
  {
    name: 'Sebastián T.',
    location: 'Medellín',
    text: '"Primera vez que saco un crédito en mi vida. Todo claro y me encanta que uno suma XP cada que paga. Ya voy para Yave de Plata."',
    stars: 5,
  },
  {
    name: 'Diana P.',
    location: 'Floridablanca',
    text: '"Son muy rápidos. El desembolso tardó como 5 minutos literal. Los usaré de nuevo para el inventario de mi negocio."',
    stars: 5,
  },
  {
    name: 'Carlos J.',
    location: 'Cali',
    text: '"Es buena opción si estás reportado por bobadas de celular. Aquí te dan la oportunidad de demostrar con hechos que sí pagas a tiempo."',
    stars: 4.5,
  },
  {
    name: 'Laura G.',
    location: 'Piedecuesta',
    text: '"Pagué a tiempo mi primer cupo y de una me subieron el límite. ¡Qué chimba de app! Y la tienda de recompensas de La Bóveda aguanta mucho."',
    stars: 5,
  },
  {
    name: 'Felipe C.',
    location: 'Barranquilla',
    text: '"El Yave Pass me pareció útil por lo de la firma rápida desde el celular. La atención por WhatsApp cuando tuve una duda fue muy buena."',
    stars: 4,
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  function go(dir: number) {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 40
    if (info.offset.x < -threshold) go(1)
    else if (info.offset.x > threshold) go(-1)
  }

  const t = testimonials[index]

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="cursor-grab rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border/50 active:cursor-grabbing"
        >
          <div className="flex gap-1 text-yellow">
            {[...Array(5)].map((_, i) => {
              const fill =
                i + 1 <= t.stars
                  ? 'fill-yellow'
                  : i + 0.5 === t.stars
                  ? 'fill-yellow/50'
                  : 'fill-transparent'
              return <Star key={i} className={`size-4 ${fill}`} strokeWidth={2} />
            })}
          </div>

          <p className="mt-4 min-h-[5rem] text-sm leading-relaxed text-navy">
            {t.text}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-sm">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-navy">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={() => go(-1)}
          aria-label="Anterior testimonio"
          className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-navy transition-colors hover:bg-muted"
        >
          <ChevronLeft className="size-4" />
        </button>
        
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir al testimonio ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-orange' : 'w-1.5 bg-border hover:bg-orange/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Siguiente testimonio"
          className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-navy transition-colors hover:bg-muted"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
