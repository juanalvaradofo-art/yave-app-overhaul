'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/lib/yave-data'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [paused])

  const goTo = useCallback((dir: number) => {
    setDirection(dir)
    setIndex((i) => {
      const next = i + dir
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }, [])

  const t = testimonials[index]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, scale: 0.97 }),
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      className="relative"
    >
      <div className="relative h-[220px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex flex-col rounded-3xl bg-card p-5 shadow-sm"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-yellow text-yellow" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 leading-relaxed text-foreground">
              {`"${t.text}"`}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-navy font-heading font-bold text-navy-foreground">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-heading font-bold text-navy">
                  {t.name}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {t.city}
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Testimonio anterior"
          className="flex size-9 items-center justify-center rounded-full bg-card text-navy shadow-sm transition-colors hover:bg-muted"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Ver testimonio de ${item.name}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-orange' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Siguiente testimonio"
          className="flex size-9 items-center justify-center rounded-full bg-card text-navy shadow-sm transition-colors hover:bg-muted"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
