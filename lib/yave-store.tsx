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
export type CreditStatus = 'none' | 'pending' | 'approved' | 'accepted' | 'signed'

type YaveState = {
  userName: string
  hasCupo: boolean
  xp: number
  coins: number
  rankIndex: number
  logs: LogEntry[]
  rankUpTo: number | null
  rankDownTo: number | null
  creditStatus: CreditStatus
  flashNotification: string | null
  setHasCupo: (v: boolean) => void
  requestCupo: () => void
  setCreditStatus: (s: CreditStatus) => void
  setFlashNotification: (msg: string | null) => void
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
  const [xp, setXp] = useState(520)
  const [coins, setCoins] = useState(3450)
  const [rankUpTo, setRankUpTo] = useState<number | null>(null)
  const [rankDownTo, setRankDownTo] = useState<number | null>(null)
  const [creditStatus, setCreditStatus] = useState<CreditStatus>('none')
  const [flashNotification, setFlashNotification] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: id(), kind: 'coins', label: 'Pago a tiempo · 12 jun', delta: 200, date: '12 jun' },
    { id: id(), kind: 'xp', label: 'Pago a tiempo · 12 jun', delta: 100, date: '12 jun' },
    { id: id(), kind: 'coins', label: 'Canje · Datos moviles 5GB', delta: -800, date: '08 jun' },
    { id: id(), kind: 'xp', label: 'Pago anticipado · 28 may', delta: 150, date: '28 may' },
    { id: id(), kind: 'coins', label: 'Pago anticipado · 28 may', delta: 300, date: '28 may' },
  ])

  const rankIndex = useMemo(() => rankIndexForXp(xp), [xp])

  const requestCupo = useCallback(() => {
    setHasCupo(true)
    setCreditStatus('signed')
  }, [])

  const registerPayment = useCallback(
    (type: PaymentType, moraDays = 1) => {
      const prevIndex = rankIndexForXp(xp)
      if (type === 'mora') {
        const coinDelta = xpRules.moraPerDay.coins * moraDays
        const xpDelta = xpRules.moraPerDay.xp * moraDays
        const newXp = Math.max(0, xp + xpDelta)
        const dayLabel = `${moraDays} dia${moraDays > 1 ? 's' : ''}`
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
      creditStatus,
      flashNotification,
      setHasCupo,
      requestCupo,
      setCreditStatus,
      setFlashNotification,
      registerPayment,
      redeem,
      clearRankUp,
      clearRankDown,
    }),
    [hasCupo, xp, coins, rankIndex, logs, rankUpTo, rankDownTo, creditStatus, flashNotification, requestCupo, registerPayment, redeem, clearRankUp, clearRankDown],
  )

  return <YaveContext.Provider value={value}>{children}</YaveContext.Provider>
}

export function useYave() {
  const ctx = useContext(YaveContext)
  if (!ctx) throw new Error('useYave must be used within YaveProvider')
  return ctx
}
