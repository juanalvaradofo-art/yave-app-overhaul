import { LifeBuoy, MessageCircle } from 'lucide-react'
import { FaqAccordion } from '@/components/faq-accordion'

export default function AyudaPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="flex items-center gap-2 font-heading text-3xl font-extrabold text-navy">
        <LifeBuoy className="size-7 text-orange" strokeWidth={2.5} />
        Preguntas frecuentes
      </h1>

      <FaqAccordion />

      <div className="rounded-[2rem] bg-navy p-6 text-navy-foreground shadow-md">
        <h2 className="font-heading text-2xl font-extrabold">
          ¿Necesitas hablar con alguien?
        </h2>
        <p className="mt-2 leading-relaxed text-white/80">
          Nuestro equipo humano te responde de lunes a sábado.
        </p>
        <a
          href="https://wa.me/573000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-yellow font-heading text-lg font-bold text-yellow-foreground transition-transform active:translate-y-px"
        >
          <MessageCircle className="size-5" />
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  )
}
