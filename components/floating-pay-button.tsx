'use client'

import Link from 'next/link'
import { CreditCard } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function FloatingPayButton() {
  // A "gotica" (drop/pill) tab anchored to the right edge, vertically centered,
  // with a gentle scroll-driven bob. Stays draggable so it never blocks content.
  const scrollY = useMotionValue(0)
  const offset = useTransform(scrollY, (v) => Math.sin(v / 240) * 6)
  const y = useSpring(offset, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollY])

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.15}
      style={{ y }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.05 }}
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2 cursor-grab active:cursor-grabbing"
    >
      <Link
        href="/onboarding"
        aria-label="Paga aquí"
        className="flex items-center gap-2 rounded-l-full bg-orange py-3 pl-5 pr-4 font-heading text-sm font-extrabold text-orange-foreground shadow-lg shadow-orange/40 ring-1 ring-orange/20 transition-transform"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
          <CreditCard className="size-4" strokeWidth={2.5} />
        </span>
        Paga aquí
      </Link>
    </motion.div>
  )
}
