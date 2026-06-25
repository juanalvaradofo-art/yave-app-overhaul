'use client'

import { useState } from 'react'
import { ArrowLeft, Copy, Check, Users, Gift, Share2, Coins } from 'lucide-react'
import Link from 'next/link'
import { MascotGold } from '@/components/mascot-gold'

const STEPS = [
  { icon: Share2, title: 'Comparte tu link', desc: 'Envia tu link de referido a tus amigos y familia.' },
  { icon: Users, title: 'Se registran', desc: 'Tu referido crea su cuenta y solicita su primer cupo.' },
  { icon: Coins, title: 'Ganan ambos', desc: 'Tu ganas 500 Yave Coins y tu referido arranca con 200 Coins de bienvenida.' },
]

export default function ReferidosPage() {
  const [copied, setCopied] = useState(false)
  const link = 'yave.co/ref/valentina-r'

  function copyLink() {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`https://${link}`).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Link
          href="/boveda"
          className="flex size-10 items-center justify-center rounded-full bg-card text-navy shadow-sm"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-2xl font-extrabold text-navy">Referidos</h1>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-navy p-6 text-white">
        <div className="absolute -right-4 -top-4 opacity-15">
          <MascotGold size={120} />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 text-yellow">
            <Gift className="size-5" />
            <span className="font-heading font-bold">Invita y gana</span>
          </div>
          <h2 className="mt-2 font-heading text-3xl font-extrabold">
            500 Yave Coins por cada referido
          </h2>
          <p className="mt-2 leading-relaxed text-white/70">
            Invita a tus parceros a Yave. Cuando se registren y activen su cupo,
            tu recibes 500 Coins y ellos arrancan con 200 de bienvenida.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="mb-3 font-heading text-xl font-extrabold text-navy">Como funciona</h2>
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="flex items-start gap-4 rounded-2xl bg-card p-4 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow text-navy font-heading font-extrabold text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-heading font-bold text-navy">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Link generator */}
      <div className="rounded-[2rem] bg-card p-6 shadow-sm ring-1 ring-border">
        <h2 className="mb-1 font-heading text-lg font-extrabold text-navy">
          Tu link de referido
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Copia y comparte este link con tus amigos.
        </p>

        <div className="flex items-center gap-2 rounded-2xl bg-muted p-3">
          <span className="flex-1 truncate text-sm font-bold text-navy">{link}</span>
          <button
            type="button"
            onClick={copyLink}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-heading text-sm font-bold transition-all ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-navy text-white active:translate-y-px'
            }`}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-muted p-4 text-center">
            <p className="font-heading text-2xl font-extrabold text-navy">3</p>
            <p className="text-sm text-muted-foreground">Referidos activos</p>
          </div>
          <div className="rounded-2xl bg-muted p-4 text-center">
            <p className="font-heading text-2xl font-extrabold text-orange">1.500</p>
            <p className="text-sm text-muted-foreground">Coins ganados</p>
          </div>
        </div>
      </div>
    </div>
  )
}
