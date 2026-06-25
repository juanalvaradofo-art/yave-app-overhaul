'use client'

import Link from 'next/link'
import { CreditCard } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function FloatingPayButton() {
  // Sticks to the right edge, vertically centered, with a gentle scroll-driven bob.
  // Stays draggable so it never blocks content.
  const scrollY = useMotionValue(0)
  const offset = useTransform(scrollY, (v) => Math.sin(v / 240) * 8)
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
      whileTap={{ scale: 0.94 }}
      whileDrag={{ scale: 1.05 }}
      className="fixed right-4 top-1/2 z-40 -translate-y-1/2 cursor-grab active:cursor-grabbing"
    >
      <Link
        href="/onboarding"
        aria-label="Realiza tu pago"
        className="flex flex-col items-center gap-1 rounded-full bg-orange px-4 py-4 font-heading text-xs font-bold text-orange-foreground shadow-lg shadow-orange/30"
      >
        <CreditCard className="size-6" />
        <span className="leading-tight [writing-mode:vertical-rl] rotate-180">
          Realiza tu pago
        </span>
      </Link>
    </motion.div>
  )
}
