'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { TrendingDown } from 'lucide-react'
import { RankMascot } from '@/components/mascot'
import { ranks } from '@/lib/yave-data'
import { useYave } from '@/lib/yave-store'

export function RankDownOverlay() {
  const { rankDownTo, clearRankDown } = useYave()
  const rank = rankDownTo != null ? ranks[rankDownTo] : null

  return (
    <AnimatePresence>
      {rank ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/70 p-6"
          onClick={clearRankDown}
        >
          <motion.div
            initial={{ scale: 0.85, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-[2rem] bg-card p-7 text-center shadow-xl"
          >
            <p className="flex items-center justify-center gap-1.5 font-heading text-sm font-bold uppercase tracking-wide text-destructive">
              <TrendingDown className="size-4" strokeWidth={2.5} />
              Bajaste de llave
            </p>
            <div className="mt-3">
              <RankMascot size={140} rankColor={rank.color} className="mx-auto" alt="" />
            </div>
            <h2 className="mt-2 font-heading text-4xl font-extrabold" style={{ color: rank.color }}>
              {rank.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              La mora te restó XP y Yave Coins, parcero. Tranqui: pagando a tiempo
              vuelves a subir y recuperas tus beneficios.
            </p>
            <button
              type="button"
              onClick={clearRankDown}
              className="mt-5 h-12 w-full rounded-2xl bg-navy font-heading font-bold text-navy-foreground transition-transform active:translate-y-px"
            >
              Entendido, a recuperarme
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
