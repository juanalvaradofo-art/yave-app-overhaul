'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CreditCard, Search, QrCode, Banknote, Smartphone, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { MascotGold } from '@/components/mascot-gold'

type Step = 'id' | 'summary' | 'methods'

const PAYMENT_METHODS = [
  { id: 'efecty', label: 'Efecty', sublabel: 'Pago en efectivo en cualquier punto', icon: Banknote, color: 'bg-yellow/20 text-yellow-foreground' },
  { id: 'epayco', label: 'ePayco', sublabel: 'Tarjeta debito o credito', icon: CreditCard, color: 'bg-navy/10 text-navy' },
  { id: 'qr', label: 'QR Bancolombia', sublabel: 'Escanea y paga desde tu app', icon: QrCode, color: 'bg-orange/10 text-orange' },
  { id: 'nequi', label: 'Nequi / Daviplata', sublabel: 'Transferencia desde tu billetera', icon: Smartphone, color: 'bg-navy/10 text-navy' },
]

export default function PagosPage() {
  const [step, setStep] = useState<Step>('id')
  const [cedula, setCedula] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('direct') === '1') {
        setStep('summary')
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Link
          href="/inicio"
          className="flex size-10 items-center justify-center rounded-full bg-card text-navy shadow-sm"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-2xl font-extrabold text-navy">
          Paga tu credito
        </h1>
      </div>

      <AnimatePresence mode="wait">
        {step === 'id' && (
          <motion.div key="id" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="rounded-[2rem] bg-card p-6 shadow-sm ring-1 ring-border">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-white">
                  <Search className="size-6" />
                </span>
                <div>
                  <h2 className="font-heading text-lg font-extrabold text-navy">Identificate</h2>
                  <p className="text-sm text-muted-foreground">Ingresa tu cedula para continuar</p>
                </div>
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Cedula de Ciudadania"
                value={cedula}
                onChange={(e) => setCedula(e.target.value.replace(/\D/g, ''))}
                className="h-14 w-full rounded-2xl border-2 border-border bg-card px-4 text-lg font-bold text-navy outline-none transition-colors placeholder:text-muted-foreground placeholder:font-normal focus:border-navy"
              />
              <button
                type="button"
                onClick={() => setStep('summary')}
                className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-navy font-heading text-lg font-bold text-white transition-all active:translate-y-px"
              >
                Buscar mi credito
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <MascotGold size={100} alt="" />
            </div>
          </motion.div>
        )}

        {step === 'summary' && (
          <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="rounded-[2rem] bg-navy p-6 text-white shadow-lg">
              <p className="text-sm text-white/60">Credito activo de</p>
              <p className="mt-1 font-heading text-lg font-bold">Valentina R.</p>
              <p className="text-sm text-white/60">CC {cedula || '1.234.567.890'}</p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                  <span className="text-sm text-white/70">Saldo pendiente</span>
                  <span className="font-heading text-2xl font-extrabold text-yellow">$ 540.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Proxima cuota</span>
                  <span className="font-heading font-bold text-white">$ 180.000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Fecha de vencimiento</span>
                  <span className="font-bold text-white">28 jul 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">Estado</span>
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400">Al dia</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('methods')}
                className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-white shadow-lg shadow-orange/25 transition-all hover:brightness-110 active:translate-y-px"
              >
                <CreditCard className="size-5" />
                Pagar $ 180.000
              </button>
            </div>
          </motion.div>
        )}

        {step === 'methods' && (
          <motion.div key="methods" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="rounded-[2rem] bg-card p-6 shadow-sm ring-1 ring-border">
              <h2 className="mb-1 font-heading text-xl font-extrabold text-navy">
                Selecciona como pagar
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Monto a pagar: <span className="font-bold text-navy">$ 180.000</span>
              </p>

              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4 text-left transition-all hover:border-navy hover:shadow-sm active:translate-y-px"
                    >
                      <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${m.color}`}>
                        <Icon className="size-6" />
                      </span>
                      <div className="flex-1">
                        <p className="font-heading font-bold text-navy">{m.label}</p>
                        <p className="text-sm text-muted-foreground">{m.sublabel}</p>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground" />
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep('id')}
                className="mt-5 text-sm font-bold text-navy"
              >
                Volver al inicio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
