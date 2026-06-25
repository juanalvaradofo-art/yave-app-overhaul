'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { CreditCard } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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

  const btn = (
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
          onClick={() => setPayOpen(true)}
          aria-label="Paga aqui"
          className="flex items-center gap-2 rounded-l-full border border-r-0 border-orange/30 bg-white py-2.5 pl-4 pr-3 font-heading text-xs font-bold text-orange shadow-md transition-all hover:bg-orange hover:text-white"
        >
          <CreditCard className="size-4" strokeWidth={2.5} />
          Pagar
        </button>
      ) : (
        <a
          href="/onboarding"
          aria-label="Solicitar"
          className="flex items-center gap-2 rounded-l-full border border-r-0 border-orange/30 bg-white py-2.5 pl-4 pr-3 font-heading text-xs font-bold text-orange shadow-md transition-all hover:bg-orange hover:text-white"
        >
          <CreditCard className="size-4" strokeWidth={2.5} />
          Solicitar
        </a>
      )}
    </motion.div>
  )

  return (
    <>
      {btn}
      {isApp && <PaymentSheet open={payOpen} onClose={() => setPayOpen(false)} />}
    </>
  )
}
