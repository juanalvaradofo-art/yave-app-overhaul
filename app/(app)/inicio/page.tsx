'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard,
  KeyRound,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Download,
  History,
  Lock,
  Wallet,
  Clock,
  CircleCheck as CheckCircle2,
  Signature as FileSignature,
  ShieldCheck,
  BadgeDollarSign,
  TrendingUp,
  PartyPopper,
  X,
} from 'lucide-react'
import { NotificationBell } from '@/components/notification-bell'
import { Mascot, RankMascot } from '@/components/mascot'
import { MascotGold } from '@/components/mascot-gold'
import { ApplicationOverlay } from '@/components/onboarding/application-overlay'
import { OtpInput } from '@/components/otp-input'
import { ranks } from '@/lib/yave-data'
import { useYave } from '@/lib/yave-store'
import type { CreditStatus } from '@/lib/yave-store'

const movements = [
  { title: 'Pago de cuota', date: '12 jun', amount: '-$ 180.000', direction: 'out' as const },
  { title: 'Desembolso aprobado', date: '02 jun', amount: '+$ 800.000', direction: 'in' as const },
  { title: 'Pago de cuota', date: '12 may', amount: '-$ 180.000', direction: 'out' as const },
]

export default function InicioPage() {
  const { userName, hasCupo, setHasCupo, coins, rankIndex, creditStatus, setCreditStatus, requestCupo } = useYave()
  const rank = ranks[rankIndex]
  const [applyOpen, setApplyOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  function handleSign() {
    requestCupo()
    setSuccessOpen(true)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RankMascot size={52} rankColor={rank.color} alt="" />
          <div>
            <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
            <p className="font-heading text-lg font-extrabold text-navy">{userName}</p>
          </div>
        </div>
        <NotificationBell />
      </div>

      {/* Demo toggle */}
      <div className="flex flex-wrap items-center gap-1 self-start rounded-full bg-muted p-1 text-xs font-bold">
        <StateToggle label="Activo" active={hasCupo && creditStatus === 'signed'} onClick={() => { setHasCupo(true); setCreditStatus('signed') }} />
        <StateToggle label="Pendiente" active={creditStatus === 'pending'} onClick={() => { setHasCupo(false); setCreditStatus('pending') }} />
        <StateToggle label="Aprobado" active={creditStatus === 'approved'} onClick={() => { setHasCupo(false); setCreditStatus('approved') }} />
        <StateToggle label="Sin cupo" active={!hasCupo && creditStatus === 'none'} onClick={() => { setHasCupo(false); setCreditStatus('none') }} />
      </div>

      {hasCupo && creditStatus === 'signed' ? (
        <ActiveState coins={coins} rankIndex={rankIndex} />
      ) : creditStatus === 'pending' ? (
        <PendingState />
      ) : creditStatus === 'approved' ? (
        <ApprovedState onAccept={() => setCreditStatus('accepted')} rankIndex={rankIndex} />
      ) : creditStatus === 'accepted' ? (
        <ContractSummary onSign={handleSign} />
      ) : (
        <EmptyState rankColor={rank.color} onApply={() => setApplyOpen(true)} />
      )}

      <ApplicationOverlay open={applyOpen} onClose={() => setApplyOpen(false)} />
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  )
}

function StateToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 transition-colors ${active ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground'}`}
    >
      {label}
    </button>
  )
}

function ActiveState({ coins, rankIndex }: { coins: number; rankIndex: number }) {
  const paidPct = 33
  const paidAmount = 260_000
  const totalQuotas = 6
  const paidQuotas = 2
  const remainingQuotas = totalQuotas - paidQuotas

  return (
    <>
      <div className="rounded-[2rem] bg-navy p-6 text-white shadow-lg">
        <p className="text-sm text-white/60">Saldo actual</p>
        <p className="mt-1 font-heading text-5xl font-extrabold">$ 540.000</p>
        <div className="mt-4 flex items-center justify-between text-sm text-white/80">
          <span>Has pagado $ {paidAmount.toLocaleString('es-CO')}</span>
          <span>{paidPct}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${paidPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-2 text-xs text-white/50">
          {paidQuotas} de {totalQuotas} cuotas pagadas · Te faltan {remainingQuotas} cuotas
        </p>

        <Link
          href="/pagos"
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white shadow-lg shadow-orange/25 transition-all hover:brightness-110 active:translate-y-px"
        >
          <CreditCard className="size-5" />
          Paga tu credito
        </Link>
      </div>

      <Link href="/boveda" className="flex items-center gap-4 rounded-[1.75rem] bg-card p-5 shadow-sm">
        <span className="flex size-12 items-center justify-center rounded-full bg-yellow text-navy">
          <KeyRound className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Yave Coins</p>
          <p className="font-heading text-2xl font-extrabold text-navy">{coins.toLocaleString('es-CO')}</p>
        </div>
        <span className="flex items-center gap-1 font-heading font-bold text-orange">
          Canjear <ArrowUpRight className="size-4" />
        </span>
      </Link>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-card p-5 text-left shadow-sm">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-navy">
            <Download className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-navy">Solicitar desembolso</span>
        </button>
        <Link href="/llaves" className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-card p-5 shadow-sm">
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-navy">
            <History className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-navy">Historial</span>
        </Link>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-navy">Movimientos</h2>
          <button type="button" className="text-sm font-bold text-orange">Ver todo</button>
        </div>
        <div className="flex flex-col gap-3">
          {movements.map((m, i) => {
            const Icon = m.direction === 'in' ? ArrowDownLeft : ArrowUpRight
            return (
              <div key={i} className="flex items-center gap-3 rounded-[1.5rem] bg-card p-4 shadow-sm">
                <span className={`flex size-10 items-center justify-center rounded-full ${m.direction === 'in' ? 'bg-yellow/20 text-navy' : 'bg-muted text-navy'}`}>
                  <Icon className="size-5" strokeWidth={2.5} />
                </span>
                <div className="flex-1">
                  <p className="font-heading font-bold text-navy">{m.title}</p>
                  <p className="text-sm text-muted-foreground">{m.date}</p>
                </div>
                <span className={`font-heading font-extrabold ${m.direction === 'in' ? 'text-orange' : 'text-navy'}`}>{m.amount}</span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function PendingState() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-card p-8 text-center shadow-sm">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
        <MascotGold size={120} alt="" pose="magnifier" />
      </motion.div>
      <div className="flex items-center gap-2 text-orange">
        <Clock className="size-5 animate-pulse" />
        <span className="font-heading font-bold">En estudio</span>
      </div>
      <h2 className="font-heading text-2xl font-extrabold text-navy">Pendiente de aprobacion</h2>
      <p className="max-w-xs leading-relaxed text-muted-foreground">
        Estamos revisando tu solicitud. Te notificaremos apenas tengamos una respuesta.
      </p>
      <div className="w-full rounded-2xl bg-muted p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estado</span>
          <span className="flex items-center gap-1.5 font-bold text-orange">
            <Clock className="size-3.5" /> En revision
          </span>
        </div>
      </div>
    </div>
  )
}

function ApprovedState({ onAccept, rankIndex }: { onAccept: () => void; rankIndex: number }) {
  const rank = ranks[rankIndex]
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-[2rem] bg-navy p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 text-yellow">
          <CheckCircle2 className="size-5" />
          <span className="font-heading font-bold">Cupo Aprobado!</span>
        </div>
        <h2 className="mt-2 font-heading text-2xl font-extrabold">Selecciona tus condiciones</h2>
        <p className="mt-2 leading-relaxed text-white/70">
          Tu credito fue aprobado. Elige el monto y plazo que mas te convenga segun tu rango {rank.name}.
        </p>

        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Cupo aprobado</span>
            <span className="font-heading text-2xl font-extrabold text-yellow">{rank.cupo}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-white/60">Modalidad</span>
            <span className="font-bold text-white">{rank.frecuencia}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-white/60">Tasa</span>
            <span className="font-bold text-white">2.2% E.M.</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onAccept}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white shadow-lg shadow-orange/25 transition-all hover:brightness-110 active:translate-y-px"
        >
          <FileSignature className="size-5" />
          Si, quiero mi cupo
        </button>
      </div>
    </div>
  )
}

function ContractSummary({ onSign }: { onSign: () => void }) {
  const [otpVal, setOtpVal] = useState('')
  const [showOtp, setShowOtp] = useState(false)

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[2rem] bg-card p-6 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-2 text-navy">
          <FileSignature className="size-5" />
          <h2 className="font-heading text-xl font-extrabold">Resumen del contrato</h2>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <ContractRow label="Monto aprobado" value="$ 300.000" />
          <ContractRow label="Tasa de interes" value="2.2% E.M." />
          <ContractRow label="Plazo" value="4 quincenas (2 meses)" />
          <ContractRow label="Interes total" value="$ 13.200" />
          <ContractRow icon={ShieldCheck} label="Fianza (12%)" value="$ 36.000" />
          <ContractRow icon={BadgeDollarSign} label="Cuota administrativa (5%)" value="$ 15.000" />
          <ContractRow icon={CreditCard} label="Yave Pass" value="$ 15.000" />
          <div className="border-t border-border pt-3">
            <ContractRow label="Total a pagar" value="$ 394.200" bold />
          </div>
          <ContractRow label="Cuota quincenal" value="$ 98.550" />
          <ContractRow label="Fecha primer pago" value="10 jul 2026" />
          <ContractRow label="Fecha ultimo pago" value="25 ago 2026" />
          <ContractRow label="Reporta a centrales" value="Si - DataCredito" />
        </div>

        <div className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-navy" />
            <p>
              Al firmar, aceptas los Terminos y Condiciones, la Politica de Privacidad
              y autorizas el tratamiento de datos conforme a Habeas Data de Yave S.A.S.
              Tasa sujeta a la tasa de usura vigente. Vigilados por la Superintendencia
              Financiera de Colombia. Se reportara a centrales de riesgo (DataCredito/TransUnion).
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showOtp ? (
          <motion.button
            key="sign-btn"
            type="button"
            onClick={() => setShowOtp(true)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white shadow-lg shadow-orange/25 transition-all hover:brightness-110 active:translate-y-px"
          >
            <FileSignature className="size-5" />
            Firmar contrato
          </motion.button>
        ) : (
          <motion.div
            key="otp-section"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-card p-6 shadow-sm ring-1 ring-border"
          >
            <h3 className="font-heading text-lg font-extrabold text-navy">Firma digital con OTP</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa el codigo de 6 digitos que enviamos a tu celular.
            </p>
            <div className="mt-5">
              <OtpInput value={otpVal} onChange={setOtpVal} />
            </div>
            <button type="button" className="mt-3 text-sm font-bold text-orange">Reenviar codigo</button>
            <button
              type="button"
              onClick={onSign}
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-navy font-heading text-lg font-bold text-white transition-all active:translate-y-px"
            >
              Confirmar firma
              <ArrowRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ContractRow({ label, value, bold, icon: Icon }: { label: string; value: string; bold?: boolean; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={`flex items-center gap-1.5 ${bold ? 'font-heading font-bold text-navy' : 'text-muted-foreground'}`}>
        {Icon && <Icon className="size-3.5" />}
        {label}
      </span>
      <span className={bold ? 'font-heading text-lg font-extrabold text-navy' : 'font-bold text-navy'}>{value}</span>
    </div>
  )
}

function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-sm -translate-y-1/2 overflow-hidden rounded-[2rem] bg-card p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-muted text-navy"
            >
              <X className="size-4" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <MascotGold size={120} alt="" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mt-4 flex items-center justify-center gap-2 text-orange">
                <PartyPopper className="size-5" />
                <span className="font-heading font-bold">Felicitaciones!</span>
              </div>
              <h2 className="mt-2 font-heading text-2xl font-extrabold text-navy">
                Tu credito fue aprobado
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                A tu correo llegaran los documentos de tu credito.
                En las proximas horas recibiras tu desembolso.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-navy font-heading text-lg font-bold text-white transition-all active:translate-y-px"
              >
                Ir a mi dashboard
                <ArrowRight className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function EmptyState({ rankColor, onApply }: { rankColor: string; onApply: () => void }) {
  return (
    <>
      <div className="rounded-[2rem] border border-border bg-muted p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="size-4" />
          <p className="text-sm font-semibold">Aun no tienes un cupo activo</p>
        </div>
        <p className="mt-2 font-heading text-5xl font-extrabold text-muted-foreground/60">$ 0</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Completa tu solicitud y desbloquea tu primer credito. Es rapido y sin letra pequena, parcero.
        </p>
        <button
          type="button"
          onClick={onApply}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white transition-transform active:translate-y-px"
        >
          <Wallet className="size-5" /> Solicitar tu cupo
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-[1.75rem] border border-border bg-muted/60 p-5">
        <span className="flex size-12 items-center justify-center rounded-full bg-card text-muted-foreground">
          <KeyRound className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Yave Coins</p>
          <p className="font-heading text-2xl font-extrabold text-muted-foreground/60">0</p>
        </div>
        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold text-muted-foreground">Bloqueado</span>
      </div>

      <div className="flex items-center gap-4 rounded-[1.75rem] p-5" style={{ backgroundColor: `${rankColor}1f` }}>
        <Mascot size={64} alt="" className="shrink-0" />
        <div>
          <p className="font-heading font-bold text-navy">Estoy listo para ayudarte</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pide tu cupo y empieza a ganar XP y Yave Coins desde tu primer pago.
          </p>
        </div>
      </div>
    </>
  )
}
