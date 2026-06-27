'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Zap,
  WalletCards,
  Compass,
  Trophy,
  Gift,
  ShieldCheck,
  Ban,
  Smartphone,
  Sparkles,
  Banknote,
  LockKeyhole
} from 'lucide-react'
import { MascotGold } from '@/components/mascot-gold'

type Theme = {
  bg: string
  title: string
  text: string
  badgeBg: string
  dotActive: string
  dotIdle: string
  ctaBg: string
  ctaText: string
}

// Gradientes premium para los fondos
const navyTheme: Theme = {
  bg: 'bg-gradient-to-br from-navy to-[#001f54]',
  title: 'text-white',
  text: 'text-white/80',
  badgeBg: 'bg-yellow text-navy',
  dotActive: 'bg-yellow',
  dotIdle: 'bg-white/30',
  ctaBg: 'bg-orange',
  ctaText: 'text-white',
}
const yellowTheme: Theme = {
  bg: 'bg-gradient-to-br from-yellow to-[#E6B800]',
  title: 'text-navy',
  text: 'text-navy/75',
  badgeBg: 'bg-navy text-white',
  dotActive: 'bg-navy',
  dotIdle: 'bg-navy/25',
  ctaBg: 'bg-navy',
  ctaText: 'text-white',
}
const orangeTheme: Theme = {
  bg: 'bg-gradient-to-br from-orange to-[#E64A19]',
  title: 'text-white',
  text: 'text-white/90',
  badgeBg: 'bg-white text-orange',
  dotActive: 'bg-white',
  dotIdle: 'bg-white/35',
  ctaBg: 'bg-navy',
  ctaText: 'text-white',
}

const slides = [
  {
    icon: TrendingUp,
    badge: 'Segunda oportunidad',
    title: 'Construye o reconstruye tu historial crediticio',
    text: 'Tu pasado no te define. Con Yave, cada pago puntual mejora tu Yave Score y te abre puertas en el sistema.',
    cta: 'Crear historial',
    theme: navyTheme,
    visualType: 'mascot',
  },
  {
    icon: Zap,
    badge: 'Rápido y efectivo',
    title: 'Desembolsos en 4 minutos, sin excusas',
    text: '¿Necesitas la plata ya? Aprobamos y giramos tu cupo directamente a tu cuenta en tiempo récord.',
    cta: 'Pedir mi plata',
    theme: orangeTheme,
    visualType: 'lightning',
  },
  {
    icon: WalletCards,
    badge: 'Múltiples opciones',
    title: 'Recibe y paga por donde te quede más fácil',
    text: 'Giramos a Nequi, Daviplata o tu cuenta de ahorros. Y paga tu cuota fácil vía PSE o en efectivo.',
    cta: 'Ver medios de pago',
    theme: yellowTheme,
    visualType: 'wallet',
  },
  {
    icon: Compass,
    badge: 'Crédito libre destino',
    title: 'Úsalo para tu negocio, un viaje o un imprevisto',
    text: 'Nosotros te damos la plata, tú decides cómo invertirla. Sin preguntas incómodas ni papeleos.',
    cta: 'Simular crédito',
    theme: navyTheme,
    visualType: 'compass',
  },
  {
    icon: Trophy,
    badge: 'Cupo progresivo',
    title: 'Empieza con poco, escala hasta la cima',
    text: 'Inicias en Rango Bronce y, pagando a tiempo, desbloqueas automáticamente cupos de hasta $1.150.000 COP.',
    cta: 'Conocer rangos',
    theme: yellowTheme,
    visualType: 'trophy',
  },
  {
    icon: Gift,
    badge: 'La Bóveda Yave',
    title: 'Gana premios reales solo por pagar a tiempo',
    text: 'Acumula Yave Coins y canjéalas por recargas de datos, bonos de comida o giros en efectivo a tu Nequi.',
    cta: 'Ver premios',
    theme: orangeTheme,
    visualType: 'gift',
  },
  {
    icon: Sparkles,
    badge: 'Ecosistema integral',
    title: 'Mucho más que un crédito, tu parcero financiero',
    text: 'Disfruta de atención personalizada, educación financiera y un ecosistema diseñado para verte crecer.',
    cta: 'Unirme a Yave',
    theme: navyTheme,
    visualType: 'mascot',
  },
  {
    icon: ShieldCheck,
    badge: 'Protección total',
    title: 'Tus datos están blindados y seguros con nosotros',
    text: 'Usamos biometría facial de clase mundial para garantizar que nadie suplante tu identidad. Cero fraudes.',
    cta: 'Conocer más',
    theme: yellowTheme,
    visualType: 'shield',
  },
  {
    icon: Ban,
    badge: 'Cero usura',
    title: 'Dile adiós al gota a gota y a cobros sorpresa',
    text: 'Reglas claras desde el simulador. Tasa de interés justa y por debajo de la usura legal de Colombia.',
    cta: 'Simular ahora',
    theme: orangeTheme,
    visualType: 'ban',
  },
  {
    icon: Smartphone,
    badge: '100% Digital',
    title: 'Todo desde tu celular, sin ir a sucursales',
    text: 'Firma tu pagaré electrónicamente en segundos. El poder de un banco, pero en la palma de tu mano.',
    cta: 'Empezar trámite',
    theme: navyTheme,
    visualType: 'phone',
  },
]

function FlagCorner() {
  return (
    <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-md shadow-sm ring-1 ring-black/5">
      <span className="h-3 w-7 bg-[#FCD116]" />
      <span className="h-1.5 w-7 bg-[#003893]" />
      <span className="h-1.5 w-7 bg-[#CE1126]" />
    </div>
  )
}

// Componente para renderizar la visual rica de cada slide
function SlideVisual({ type, theme }: { type: string, theme: Theme }) {
  const isNavy = theme === navyTheme
  const isYellow = theme === yellowTheme
  
  const iconColor = isNavy ? 'text-white/20' : isYellow ? 'text-navy/20' : 'text-white/30'
  const glowColor = isNavy ? 'text-yellow/40' : isYellow ? 'text-orange/30' : 'text-navy/20'

  if (type === 'mascot') {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
      >
        <MascotGold size={92} className="-mt-2 shrink-0 drop-shadow-2xl" alt="" />
      </motion.div>
    )
  }

  // Mapa de iconos gigantes según el tipo
  const visuals: Record<string, React.ReactNode> = {
    lightning: <Zap className={`size-24 ${glowColor} drop-shadow-2xl`} strokeWidth={1.5} />,
    wallet: <WalletCards className={`size-24 ${iconColor} drop-shadow-xl`} strokeWidth={1.5} />,
    compass: <Compass className={`size-24 ${glowColor} drop-shadow-2xl`} strokeWidth={1.5} />,
    trophy: <Trophy className={`size-24 ${iconColor} drop-shadow-xl`} strokeWidth={1.5} />,
    gift: <Gift className={`size-24 ${glowColor} drop-shadow-2xl`} strokeWidth={1.5} />,
    shield: <LockKeyhole className={`size-24 ${iconColor} drop-shadow-xl`} strokeWidth={1.5} />,
    ban: <Ban className={`size-24 ${glowColor} drop-shadow-2xl`} strokeWidth={1.5} />,
    phone: <Smartphone className={`size-24 ${glowColor} drop-shadow-2xl`} strokeWidth={1.5} />,
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
      transition={{ 
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }}
      className="relative shrink-0 -mt-2 ml-2"
    >
      {visuals[type]}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className={`absolute -inset-4 rounded-full border border-dashed ${iconColor} opacity-50`}
      />
    </motion.div>
  )
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [paused])

  function go(next: number) {
    setIndex((next + slides.length) % slides.length)
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 60
    if (info.offset.x < -threshold || info.velocity.x < -400) go(index + 1)
    else if (info.offset.x > threshold || info.velocity.x > 400) go(index - 1)
  }

  const slide = slides[index]
  const Icon = slide.icon
  const t = slide.theme

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] ${t.bg} shadow-xl transition-all duration-700`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decoración: degradados radiales para profundidad premium */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          background:
            'radial-gradient(120% 80% at 85% 0%, rgba(255,255,255,0.25), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(0,0,0,0.15), transparent 60%)',
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-8 size-28 rounded-full bg-black/10 blur-xl" />
      <FlagCorner />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative cursor-grab touch-pan-y p-6 active:cursor-grabbing"
        >
          <div className="flex items-start justify-between gap-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full ${t.badgeBg} px-3 py-1.5 text-xs font-extrabold shadow-sm`}>
              <Icon className="size-4" />
              {slide.badge}
            </span>
          </div>

          <div className="mt-5 flex items-start justify-between gap-2">
            <div className="min-w-0 pr-2">
              <h2
                className={`font-heading text-[1.65rem] font-extrabold leading-[1.15] text-balance ${t.title}`}
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              >
                {slide.title}
              </h2>
            </div>
            
            {/* Visual Dinámico según el tipo de slide */}
            <SlideVisual type={slide.visualType} theme={t} />
          </div>

          <p className={`mt-4 text-sm leading-relaxed ${t.text}`}>{slide.text}</p>

          <Link
            href="/onboarding"
            className={`mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl ${t.ctaBg} font-heading text-lg font-bold ${t.ctaText} shadow-lg transition-transform hover:scale-[1.02] active:scale-95`}
          >
            {slide.cta}
            <ArrowRight className="size-5" />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 pb-5 pt-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? `w-6 ${t.dotActive}` : `w-1.5 ${t.dotIdle}`}`}
          />
        ))}
      </div>
    </div>
  )
}
