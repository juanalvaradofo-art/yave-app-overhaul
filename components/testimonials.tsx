'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/yave-data'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(t)
  }, [paused])

  const t = testimonials[index]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="relative h-[200px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col rounded-3xl bg-card p-5 shadow-sm"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-yellow text-yellow" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 leading-relaxed text-foreground">
              {`“${t.text}”`}
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

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Ver testimonio de ${item.name}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-orange' : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
