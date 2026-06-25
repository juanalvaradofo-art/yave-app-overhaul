'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { KeyRound } from 'lucide-react'
import { Mascot } from '@/components/mascot'
import { ranks } from '@/lib/yave-data'
import { useYave } from '@/lib/yave-store'

export function RankUpOverlay() {
  const { rankUpTo, clearRankUp } = useYave()
  const rank = rankUpTo != null ? ranks[rankUpTo] : null

  useEffect(() => {
    if (rankUpTo == null) return
    const colors = ['#f7531f', '#ffc20e', '#1b2a6b', '#ffffff']
    const fire = (x: number) =>
      confetti({ particleCount: 90, spread: 80, startVelocity: 42, origin: { x, y: 0.4 }, colors })
    fire(0.3)
    fire(0.7)
    const t = setTimeout(() => fire(0.5), 300)
    return () => clearTimeout(t)
  }, [rankUpTo])

  return (
    <AnimatePresence>
      {rank ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/70 p-6"
          onClick={clearRankUp}
        >
          <motion.div
            initial={{ scale: 0.85, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-[2rem] bg-card p-7 text-center shadow-xl"
          >
            <p className="font-heading text-sm font-bold uppercase tracking-wide text-orange">
              ¡Subiste de llave!
            </p>
            <motion.div
              initial={{ rotate: -12, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.1 }}
              className="mt-3"
            >
              <Mascot size={140} className="mx-auto" alt="" tint={rank.tint} />
            </motion.div>
            <h2
              className="mt-2 font-heading text-4xl font-extrabold"
              style={{ color: rank.color }}
            >
              {rank.name}
            </h2>
            <div
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
              style={{ backgroundColor: `${rank.color}1f`, color: rank.color }}
            >
              <KeyRound className="size-4" strokeWidth={2.5} />
              {rank.benefit}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Cupo hasta {rank.cupo} · Frecuencia {rank.frecuencia.toLowerCase()}
            </p>
            <button
              type="button"
              onClick={clearRankUp}
              className="mt-5 h-12 w-full rounded-2xl bg-orange font-heading font-bold text-orange-foreground transition-transform active:translate-y-px"
            >
              ¡A celebrar, parcero!
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
