'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CreditCard } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { PaymentSheet } from '@/components/payment-sheet'

export function FloatingPayButton() {
  const pathname = usePathname()
  const [payOpen, setPayOpen] = useState(false)
  const isApp = pathname.startsWith('/inicio') || pathname.startsWith('/llaves') || pathname.startsWith('/boveda') || pathname.startsWith('/ayuda')

  const scrollY = useMotionValue(0)
  const offset = useTransform(scrollY, (v) => Math.sin(v / 240) * 6)
  const y = useSpring(offset, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollY])

  const handleClick = () => {
    if (isApp) {
      setPayOpen(true)
    }
  }

  const content = (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.15}
      style={{ y }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.05 }}
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2 cursor-grab active:cursor-grabbing"
    >
      {isApp ? (
        <button
          type="button"
          onClick={handleClick}
          aria-label="Paga aqui"
          className="flex items-center gap-2.5 rounded-l-full bg-orange py-3.5 pl-6 pr-5 font-heading text-sm font-extrabold text-orange-foreground shadow-xl shadow-orange/30 ring-1 ring-orange/20 transition-transform hover:shadow-orange/40"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
            <CreditCard className="size-4" strokeWidth={2.5} />
          </span>
          Paga aqui
        </button>
      ) : (
        <a
          href="/onboarding"
          aria-label="Paga aqui"
          className="flex items-center gap-2.5 rounded-l-full bg-orange py-3.5 pl-6 pr-5 font-heading text-sm font-extrabold text-orange-foreground shadow-xl shadow-orange/30 ring-1 ring-orange/20 transition-transform hover:shadow-orange/40"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/20">
            <CreditCard className="size-4" strokeWidth={2.5} />
          </span>
          Paga aqui
        </a>
      )}
    </motion.div>
  )

  return (
    <>
      {content}
      {isApp && <PaymentSheet open={payOpen} onClose={() => setPayOpen(false)} />}
    </>
  )
}
