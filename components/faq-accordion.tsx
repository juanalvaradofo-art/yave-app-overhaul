'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { faqs } from '@/lib/yave-data'

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i
        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-3xl bg-card shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-heading text-base font-bold text-navy">
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  'size-5 shrink-0 text-orange transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300',
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
