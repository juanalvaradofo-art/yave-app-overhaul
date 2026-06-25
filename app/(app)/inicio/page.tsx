'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, KeyRound, ArrowUpRight, ArrowDownLeft, ArrowRight, Download, History, Lock, Wallet, Clock, CircleCheck as CheckCircle2, Signature as FileSignature, ShieldCheck } from 'lucide-react'
import { NotificationBell } from '@/components/notification-bell'
import { Mascot, RankMascot } from '@/components/mascot'
import { MascotGold } from '@/components/mascot-gold'
import { PaymentSheet } from '@/components/payment-sheet'
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
  const [payOpen, setPayOpen] = useState(false)
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <div className="flex flex-col gap-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RankMascot size={52} rankColor={rank.color} alt="" />
          <div>
            <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
            <p className="font-heading text-lg font-extrabold text-navy">
              {userName}
            </p>
          </div>
        </div>
        <NotificationBell />
      </div>

      {/* Demo state toggle */}
      <div className="flex flex-wrap items-center gap-1 self-start rounded-full bg-muted p-1 text-xs font-bold">
        <StateToggle label="Activo" active={hasCupo && creditStatus === 'signed'} onClick={() => { setHasCupo(true); setCreditStatus('signed') }} />
        <StateToggle label="Pendiente" active={creditStatus === 'pending'} onClick={() => { setHasCupo(false); setCreditStatus('pending') }} />
        <StateToggle label="Aprobado" active={creditStatus === 'approved'} onClick={() => { setHasCupo(false); setCreditStatus('approved') }} />
        <StateToggle label="Sin cupo" active={!hasCupo && creditStatus === 'none'} onClick={() => { setHasCupo(false); setCreditStatus('none') }} />
      </div>

      {hasCupo && creditStatus === 'signed' ? (
        <ActiveState coins={coins} onPay={() => setPayOpen(true)} />
      ) : creditStatus === 'pending' ? (
        <PendingState />
      ) : creditStatus === 'approved' ? (
        <ApprovedState onAccept={() => setCreditStatus('accepted')} />
      ) : creditStatus === 'accepted' ? (
        <ContractSummary onSign={() => requestCupo()} />
      ) : (
        <EmptyState rankColor={rank.color} onApply={() => setApplyOpen(true)} />
      )}

      <PaymentSheet open={payOpen} onClose={() => setPayOpen(false)} />
      <ApplicationOverlay open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  )
}

function StateToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 transition-colors ${
        active ? 'bg-card text-navy shadow-sm' : 'text-muted-foreground'
      }`}
    >
      {label}
    </button>
  )
}

function ActiveState({ coins, onPay }: { coins: number; onPay: () => void }) {
  const paidPct = 33
  return (
    <>
      <div className="rounded-[2rem] bg-navy p-6 text-white shadow-md">
        <p className="text-sm text-white/70">Saldo actual</p>
        <p className="mt-1 font-heading text-5xl font-extrabold">$ 540.000</p>
        <div className="mt-4 flex items-center justify-between text-sm text-white/80">
          <span>Pagado $ 260.000</span>
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
        <button
          type="button"
          onClick={onPay}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 font-heading font-bold text-white transition-colors hover:bg-white/20"
        >
          <CreditCard className="size-5" />
          Realiza tu pago
        </button>
      </div>

      <Link
        href="/boveda"
        className="flex items-center gap-4 rounded-[1.75rem] bg-card p-5 shadow-sm"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-yellow text-navy">
          <KeyRound className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Yave Coins</p>
          <p className="font-heading text-2xl font-extrabold text-navy">
            {coins.toLocaleString('es-CO')}
          </p>
        </div>
        <span className="flex items-center gap-1 font-heading font-bold text-orange">
          Canjear
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-card p-5 text-left shadow-sm"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-navy">
            <Download className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-navy">
            Solicitar desembolso
          </span>
        </button>
        <Link
          href="/llaves"
          className="flex flex-col items-start gap-3 rounded-[1.75rem] bg-card p-5 shadow-sm"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-muted text-navy">
            <History className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-heading font-bold text-navy">Historial</span>
        </Link>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-navy">
            Movimientos
          </h2>
          <button type="button" className="text-sm font-bold text-orange">
            Ver todo
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {movements.map((m, i) => {
            const Icon = m.direction === 'in' ? ArrowDownLeft : ArrowUpRight
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-[1.5rem] bg-card p-4 shadow-sm"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full ${
                    m.direction === 'in'
                      ? 'bg-yellow/20 text-navy'
                      : 'bg-muted text-navy'
                  }`}
                >
                  <Icon className="size-5" strokeWidth={2.5} />
                </span>
                <div className="flex-1">
                  <p className="font-heading font-bold text-navy">{m.title}</p>
                  <p className="text-sm text-muted-foreground">{m.date}</p>
                </div>
                <span
                  className={`font-heading font-extrabold ${
                    m.direction === 'in' ? 'text-orange' : 'text-navy'
                  }`}
                >
                  {m.amount}
                </span>
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
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <MascotGold size={120} alt="" pose="magnifier" />
      </motion.div>
      <div className="flex items-center gap-2 text-orange">
        <Clock className="size-5 animate-pulse" />
        <span className="font-heading font-bold">En estudio</span>
      </div>
      <h2 className="font-heading text-2xl font-extrabold text-navy">
        Pendiente de aprobacion
      </h2>
      <p className="max-w-xs leading-relaxed text-muted-foreground">
        Estamos revisando tu solicitud. Te notificaremos apenas tengamos una
        respuesta. Esto puede tomar entre 5 minutos y 24 horas.
      </p>
      <div className="w-full rounded-2xl bg-muted p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estado</span>
          <span className="flex items-center gap-1.5 font-bold text-orange">
            <Clock className="size-3.5" />
            En revision
          </span>
        </div>
      </div>
    </div>
  )
}

function ApprovedState({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-[2rem] bg-navy p-6 text-white shadow-md">
        <div className="flex items-center gap-2 text-yellow">
          <CheckCircle2 className="size-5" />
          <span className="font-heading font-bold">Aprobado</span>
        </div>
        <h2 className="mt-3 font-heading text-3xl font-extrabold">
          Tu cupo esta listo
        </h2>
        <p className="mt-2 leading-relaxed text-white/70">
          Felicitaciones! Hemos aprobado un cupo de credito para ti.
        </p>

        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Cupo aprobado</span>
            <span className="font-heading text-2xl font-extrabold text-yellow">
              $ 300.000
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-white/60">Tasa</span>
            <span className="font-bold text-white">2.2% E.M.</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-white/60">Plazo maximo</span>
            <span className="font-bold text-white">6 meses</span>
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
          <ContractRow label="Plazo" value="3 meses (3 cuotas)" />
          <ContractRow label="Interes total" value="$ 19.800" />
          <ContractRow label="Fianza (12%)" value="$ 36.000" />
          <ContractRow label="Cuota administrativa (5%)" value="$ 15.000" />
          <ContractRow label="Yave Pass" value="$ 15.000" />
          <div className="border-t border-border pt-3">
            <ContractRow label="Total a pagar" value="$ 385.800" bold />
          </div>
          <ContractRow label="Cuota mensual" value="$ 128.600" />
          <ContractRow label="Fecha primer pago" value="25 jul 2026" />
        </div>

        <div className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-navy" />
            <p>
              Al firmar, aceptas los Terminos y Condiciones, la Politica de
              Privacidad y autorizas el tratamiento de tus datos conforme a la
              politica de Habeas Data de Yave S.A.S. Tasa sujeta a la tasa de
              usura vigente. Regulado por la Superintendencia Financiera de Colombia.
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
            <h3 className="font-heading text-lg font-extrabold text-navy">
              Firma digital con OTP
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa el codigo de 6 digitos que enviamos a tu celular para confirmar.
            </p>
            <div className="mt-5">
              <OtpInput value={otpVal} onChange={setOtpVal} />
            </div>
            <button type="button" className="mt-3 text-sm font-bold text-orange">
              Reenviar codigo
            </button>
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

function ContractRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? 'font-heading font-bold text-navy' : 'text-muted-foreground'}>{label}</span>
      <span className={bold ? 'font-heading text-lg font-extrabold text-navy' : 'font-bold text-navy'}>{value}</span>
    </div>
  )
}

function EmptyState({
  rankColor,
  onApply,
}: {
  rankColor: string
  onApply: () => void
}) {
  return (
    <>
      <div className="rounded-[2rem] border border-border bg-muted p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="size-4" />
          <p className="text-sm font-semibold">Aun no tienes un cupo activo</p>
        </div>
        <p className="mt-2 font-heading text-5xl font-extrabold text-muted-foreground/60">
          $ 0
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Completa tu solicitud y desbloquea tu primer credito. Es rapido y sin
          letra pequena, parcero.
        </p>
        <button
          type="button"
          onClick={onApply}
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white transition-transform active:translate-y-px"
        >
          <Wallet className="size-5" />
          Solicitar tu cupo
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-[1.75rem] border border-border bg-muted/60 p-5">
        <span className="flex size-12 items-center justify-center rounded-full bg-card text-muted-foreground">
          <KeyRound className="size-6" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Yave Coins</p>
          <p className="font-heading text-2xl font-extrabold text-muted-foreground/60">
            0
          </p>
        </div>
        <span className="rounded-full bg-card px-3 py-1 text-xs font-bold text-muted-foreground">
          Bloqueado
        </span>
      </div>

      <div
        className="flex items-center gap-4 rounded-[1.75rem] p-5"
        style={{ backgroundColor: `${rankColor}1f` }}
      >
        <Mascot size={64} alt="" className="shrink-0" />
        <div>
          <p className="font-heading font-bold text-navy">
            Estoy listo para ayudarte
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pide tu cupo y empieza a ganar XP y Yave Coins desde tu primer pago.
          </p>
        </div>
      </div>
    </>
  )
}
