'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CloudUpload, FileText, Loader as Loader2, Mail, ScanFace, Smartphone, Wallet, ChevronDown, Sparkles, Target, ShieldCheck, TrendingUp } from 'lucide-react'
import { YaveLogo } from '@/components/yave-logo'
import { MascotGold } from '@/components/mascot-gold'
import { OtpInput } from '@/components/otp-input'

type Mode = 'signup' | 'application'

const SIGNUP_STEPS = ['Registro', 'Verificación'] as const
const APPLICATION_STEPS = ['Solicitud', 'Proposito', 'Documentos', 'Identidad', 'Firma'] as const

const PURPOSE_OPTIONS = [
  'Consumo',
  'Tecnología',
  'Imprevistos',
  'Negocio',
  'Comida',
  'Educación',
  'Salud',
  'Viaje',
  'Otro',
] as const

const fieldClass =
  'h-13 w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-navy outline-none transition-colors placeholder:text-muted-foreground focus:border-orange'

export function OnboardingFlow({
  mode,
  onComplete,
  onExit,
}: {
  mode: Mode
  onComplete: () => void
  onExit: () => void
}) {
  const steps = mode === 'signup' ? SIGNUP_STEPS : APPLICATION_STEPS
  const [step, setStep] = useState(0)
  const [otp, setOtp] = useState('')
  const [signOtp, setSignOtp] = useState('')
  const [studying, setStudying] = useState(false)

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const back = () => (step === 0 ? onExit() : setStep((s) => Math.max(s - 1, 0)))

  function finishSignup() {
    onComplete()
  }

  function finishApplication() {
    setStudying(true)
    setTimeout(onComplete, 3200)
  }

  if (studying) return <StudyingScreen />

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10">
      <header className="flex items-center justify-between py-4">
        <button
          type="button"
          onClick={back}
          aria-label="Volver"
          className="flex size-10 items-center justify-center rounded-full bg-card text-navy shadow-sm"
        >
          <ArrowLeft className="size-5" />
        </button>
        <YaveLogo />
        <span className="w-10" />
      </header>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm font-bold text-navy">
            Paso {step + 1} de {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">{steps[step]}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-orange"
            initial={false}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${step}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            {mode === 'signup' && step === 0 && <RegisterStep onNext={next} />}
            {mode === 'signup' && step === 1 && (
              <OtpStep
                title="Verifica tu correo"
                desc="Te enviamos un codigo de 6 digitos a tu email. Escribelo para crear tu cuenta."
                value={otp}
                onChange={setOtp}
                onNext={finishSignup}
                cta="Crear mi cuenta"
              />
            )}

            {mode === 'application' && step === 0 && <ApplicationStep onNext={next} />}
            {mode === 'application' && step === 1 && <PropositoStep onNext={next} />}
            {mode === 'application' && step === 2 && <DocumentsStep onNext={next} />}
            {mode === 'application' && step === 3 && <IdentityStep onNext={next} />}
            {mode === 'application' && step === 4 && (
              <OtpStep
                title="Firma con tu codigo"
                desc="Esta firma digital confirma tu solicitud. Ingresa el codigo que te enviamos por SMS."
                value={signOtp}
                onChange={setSignOtp}
                onNext={finishApplication}
                cta="Firmar y enviar"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function StepTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-3xl font-extrabold leading-tight text-balance text-navy">
        {title}
      </h1>
      <p className="mt-2 leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-orange font-heading text-lg font-bold text-orange-foreground transition-transform active:translate-y-px"
    >
      {children}
    </button>
  )
}

function RegisterStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <StepTitle
        title="Creemos tu cuenta"
        desc="Empecemos con lo basico. Esto toma menos de un minuto."
      />

      <button
        type="button"
        onClick={onNext}
        className="flex h-13 w-full items-center justify-center gap-3 rounded-2xl border-2 border-border bg-card py-3 font-heading font-bold text-navy transition-colors active:bg-muted"
      >
        <GoogleMark />
        Continuar con Google
      </button>

      <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />o registrate con tu correo
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <input className={fieldClass} placeholder="Nombre completo" />
        <input className={fieldClass} type="email" placeholder="Correo electronico" />
        <input className={fieldClass} type="tel" placeholder="Celular" />
        <label className="text-sm font-semibold text-navy">
          Fecha de nacimiento
          <input className={`${fieldClass} mt-1`} type="date" />
        </label>
      </div>

      <PrimaryButton onClick={onNext}>
        Continuar
        <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  )
}

function OtpStep({
  title,
  desc,
  value,
  onChange,
  onNext,
  cta = 'Verificar',
}: {
  title: string
  desc: string
  value: string
  onChange: (v: string) => void
  onNext: () => void
  cta?: string
}) {
  return (
    <div>
      <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-yellow text-yellow-foreground">
        <Mail className="size-7" />
      </span>
      <StepTitle title={title} desc={desc} />
      <OtpInput value={value} onChange={onChange} />
      <button type="button" className="mt-4 text-sm font-bold text-orange">
        Reenviar codigo
      </button>
      <PrimaryButton onClick={onNext}>{cta}</PrimaryButton>
    </div>
  )
}

function ApplicationStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <StepTitle
        title="Cuentanos de ti"
        desc="Con esto entendemos tu momento para darte el mejor cupo."
      />
      <div className="flex flex-col gap-3">
        <input className={fieldClass} placeholder="Ocupacion" />
        <input className={fieldClass} placeholder="Ingresos mensuales aprox." />
        <input className={fieldClass} placeholder="Direccion de residencia" />
        <input className={fieldClass} placeholder="Ciudad" />
        <div className="rounded-2xl bg-muted p-4">
          <p className="font-heading font-bold text-navy">Contacto de referencia</p>
          <div className="mt-3 flex flex-col gap-3">
            <input className={fieldClass} placeholder="Nombre del contacto" />
            <input className={fieldClass} type="tel" placeholder="Celular del contacto" />
          </div>
        </div>
      </div>
      <PrimaryButton onClick={onNext}>
        Continuar
        <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  )
}

function PropositoStep({ onNext }: { onNext: () => void }) {
  const [purpose, setPurpose] = useState('')
  const [openDropdown, setOpenDropdown] = useState(false)

  return (
    <div>
      <StepTitle
        title="Para que necesitas el dinero?"
        desc="Esto nos ayuda a entender tu situacion y ofrecerte el mejor plan."
      />

      <div className="flex flex-col gap-4">
        {/* Purpose dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex h-13 w-full items-center justify-between rounded-2xl border-2 border-border bg-card px-4 text-navy outline-none transition-colors focus:border-orange"
          >
            <span className={purpose ? 'font-semibold text-navy' : 'text-muted-foreground'}>
              {purpose || 'Selecciona una opcion'}
            </span>
            <ChevronDown
              className={`size-5 text-muted-foreground transition-transform ${openDropdown ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
              >
                {PURPOSE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setPurpose(opt)
                      setOpenDropdown(false)
                    }}
                    className="flex h-12 w-full items-center px-4 text-left text-sm font-semibold text-navy transition-colors hover:bg-muted"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Why Yave info card */}
        <div className="rounded-2xl border-2 border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-orange" />
            <h3 className="font-heading text-lg font-bold text-navy">
              Por que Yave?
            </h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nuestro modelo de credito alternativo analiza tu comportamiento de pago
            en tiempo real. No dependemos solo del buró de credito tradicional.
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            <li className="flex items-start gap-2.5 text-sm">
              <TrendingUp className="mt-0.5 size-4 shrink-0 text-orange" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-navy">Analisis conductual:</span>{' '}
                Evaluamos como pagas, no solo tu historial pasado.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm">
              <Target className="mt-0.5 size-4 shrink-0 text-orange" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-navy">Recompensas reales:</span>{' '}
                Ganas Yave Coins y subes de llave con cada pago a tiempo.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-orange" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-navy">Sin letra pequena:</span>{' '}
                Costos transparentes desde el primer momento.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <PrimaryButton onClick={onNext}>
        Continuar
        <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  )
}

const docs = [
  { icon: FileText, label: 'Extracto bancario', hint: 'Ultimos 3 meses' },
  { icon: Smartphone, label: 'Pantallazo Nequi / Daviplata', hint: 'Movimientos recientes' },
  { icon: Wallet, label: 'Factura de servicios', hint: 'Para validar tu direccion' },
]

function DocumentsStep({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState<number[]>([])

  return (
    <div>
      <StepTitle
        title="Sube tus documentos"
        desc="Adjunta imagenes o PDF. Esto nos ayuda a aprobarte mas cupo."
      />
      <div className="flex flex-col gap-3">
        {docs.map((d, i) => {
          const Icon = d.icon
          const uploaded = done.includes(i)
          return (
            <button
              key={d.label}
              type="button"
              onClick={() => setDone((p) => (p.includes(i) ? p : [...p, i]))}
              className={`flex items-center gap-3 rounded-2xl border-2 border-dashed p-4 text-left transition-colors ${
                uploaded ? 'border-orange bg-orange/5' : 'border-border bg-card'
              }`}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                  uploaded ? 'bg-orange text-orange-foreground' : 'bg-muted text-navy'
                }`}
              >
                {uploaded ? <Check className="size-5" /> : <Icon className="size-5" />}
              </span>
              <div className="flex-1">
                <p className="font-heading font-bold text-navy">{d.label}</p>
                <p className="text-sm text-muted-foreground">
                  {uploaded ? 'Archivo cargado' : d.hint}
                </p>
              </div>
              {!uploaded && <CloudUpload className="size-5 text-muted-foreground" />}
            </button>
          )
        })}
      </div>
      <PrimaryButton onClick={onNext}>
        Continuar
        <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  )
}

function IdentityStep({ onNext }: { onNext: () => void }) {
  const [captured, setCaptured] = useState(false)
  return (
    <div>
      <StepTitle
        title="Validemos que eres tu"
        desc="Una foto rapida de tu rostro y tu documento. Solo unos segundos."
      />
      <div className="flex flex-col items-center rounded-3xl bg-navy p-8 text-navy-foreground">
        <motion.span
          animate={captured ? { scale: [1, 1.15, 1] } : {}}
          className={`flex size-28 items-center justify-center rounded-full ${
            captured ? 'bg-orange' : 'border-4 border-dashed border-white/40'
          }`}
        >
          {captured ? (
            <Check className="size-12" />
          ) : (
            <ScanFace className="size-12 text-white/80" />
          )}
        </motion.span>
        <p className="mt-5 text-center leading-relaxed text-white/75">
          {captured
            ? 'Identidad capturada correctamente'
            : 'Centra tu rostro en el marco y manten buena luz.'}
        </p>
      </div>
      {!captured ? (
        <PrimaryButton onClick={() => setCaptured(true)}>Tomar foto</PrimaryButton>
      ) : (
        <PrimaryButton onClick={onNext}>
          Continuar
          <ArrowRight className="size-5" />
        </PrimaryButton>
      )}
    </div>
  )
}

function StudyingScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <MascotGold size={160} alt="" />
      </motion.div>
      <div className="mt-6 flex items-center gap-2 text-orange">
        <Loader2 className="size-5 animate-spin" />
        <span className="font-heading font-bold">Estudiando tu cupo...</span>
      </div>
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-balance text-navy">
        Estamos revisando tu solicitud
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Dame un momentico. Estoy calculando el mejor cupo para ti. Te
        avisamos apenas este listo.
      </p>
    </div>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
