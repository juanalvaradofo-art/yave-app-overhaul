'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ranks, xpRules } from '@/lib/yave-data'

export type LogEntry = {
  id: string
  kind: 'xp' | 'coins'
  label: string
  delta: number
  date: string
}

type PaymentType = 'timely' | 'early' | 'mora'

type YaveState = {
  userName: string
  hasCupo: boolean
  xp: number
  coins: number
  rankIndex: number
  logs: LogEntry[]
  /** Set when a payment pushes XP past the next threshold; drives the celebration overlay. */
  rankUpTo: number | null
  /** Set when a late payment drops the user below their previous rank. */
  rankDownTo: number | null
  setHasCupo: (v: boolean) => void
  requestCupo: () => void
  registerPayment: (type: PaymentType, moraDays?: number) => void
  redeem: (cost: number, label: string) => void
  clearRankUp: () => void
  clearRankDown: () => void
}

const YaveContext = createContext<YaveState | null>(null)

function rankIndexForXp(xp: number) {
  let idx = 0
  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i].xpMin) idx = i
  }
  return idx
}

function today() {
  return new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
}

let counter = 0
function id() {
  counter += 1
  return `log-${Date.now()}-${counter}`
}

export function YaveProvider({ children }: { children: ReactNode }) {
  const [hasCupo, setHasCupo] = useState(true)
  const [xp, setXp] = useState(520) // Bronce, close to Plata (600)
  const [coins, setCoins] = useState(3450)
  const [rankUpTo, setRankUpTo] = useState<number | null>(null)
  const [rankDownTo, setRankDownTo] = useState<number | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: id(), kind: 'coins', label: 'Pago a tiempo · 12 jun', delta: 200, date: '12 jun' },
    { id: id(), kind: 'xp', label: 'Pago a tiempo · 12 jun', delta: 100, date: '12 jun' },
    { id: id(), kind: 'coins', label: 'Canje · Datos móviles 5GB', delta: -800, date: '08 jun' },
    { id: id(), kind: 'xp', label: 'Pago anticipado · 28 may', delta: 150, date: '28 may' },
    { id: id(), kind: 'coins', label: 'Pago anticipado · 28 may', delta: 300, date: '28 may' },
  ])

  const rankIndex = useMemo(() => rankIndexForXp(xp), [xp])

  const requestCupo = useCallback(() => setHasCupo(true), [])

  const registerPayment = useCallback(
    (type: PaymentType, moraDays = 1) => {
      const prevIndex = rankIndexForXp(xp)
      if (type === 'mora') {
        const coinDelta = xpRules.moraPerDay.coins * moraDays
        const xpDelta = xpRules.moraPerDay.xp * moraDays
        const newXp = Math.max(0, xp + xpDelta)
        const dayLabel = `${moraDays} día${moraDays > 1 ? 's' : ''}`
        setXp(newXp)
        setCoins((c) => Math.max(0, c + coinDelta))
        setLogs((l) => [
          { id: id(), kind: 'coins', label: `${xpRules.moraPerDay.label} (${dayLabel})`, delta: coinDelta, date: today() },
          { id: id(), kind: 'xp', label: `${xpRules.moraPerDay.label} (${dayLabel})`, delta: xpDelta, date: today() },
          ...l,
        ])
        const newIndex = rankIndexForXp(newXp)
        if (newIndex < prevIndex) setRankDownTo(newIndex)
        return
      }
      const rule = xpRules[type]
      const newXp = xp + rule.xp
      setXp(newXp)
      setCoins((c) => c + rule.coins)
      setLogs((l) => [
        { id: id(), kind: 'coins', label: `${rule.label} · ${today()}`, delta: rule.coins, date: today() },
        { id: id(), kind: 'xp', label: `${rule.label} · ${today()}`, delta: rule.xp, date: today() },
        ...l,
      ])
      const newIndex = rankIndexForXp(newXp)
      if (newIndex > prevIndex) setRankUpTo(newIndex)
    },
    [xp],
  )

  const redeem = useCallback((cost: number, label: string) => {
    setCoins((c) => c - cost)
    setLogs((l) => [
      { id: id(), kind: 'coins', label: `Canje · ${label}`, delta: -cost, date: today() },
      ...l,
    ])
  }, [])

  const clearRankUp = useCallback(() => setRankUpTo(null), [])
  const clearRankDown = useCallback(() => setRankDownTo(null), [])

  const value = useMemo<YaveState>(
    () => ({
      userName: 'Valentina R.',
      hasCupo,
      xp,
      coins,
      rankIndex,
      logs,
      rankUpTo,
      rankDownTo,
      setHasCupo,
      requestCupo,
      registerPayment,
      redeem,
      clearRankUp,
      clearRankDown,
    }),
    [hasCupo, xp, coins, rankIndex, logs, rankUpTo, rankDownTo, requestCupo, registerPayment, redeem, clearRankUp, clearRankDown],
  )

  return <YaveContext.Provider value={value}>{children}</YaveContext.Provider>
}

export function useYave() {
  const ctx = useContext(YaveContext)
  if (!ctx) throw new Error('useYave must be used within YaveProvider')
  return ctx
}
