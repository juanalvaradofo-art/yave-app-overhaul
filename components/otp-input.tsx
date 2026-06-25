'use client'

import { useRef } from 'react'

export function OtpInput({
  value,
  onChange,
  length = 6,
}: {
  value: string
  onChange: (v: string) => void
  length?: number
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  function setDigit(i: number, digit: string) {
    const clean = digit.replace(/\D/g, '').slice(-1)
    const arr = value.split('')
    arr[i] = clean
    const next = arr.join('').slice(0, length)
    onChange(next)
    if (clean && i < length - 1) refs.current[i + 1]?.focus()
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          aria-label={`Dígito ${i + 1}`}
          className="h-14 w-full min-w-0 rounded-2xl border-2 border-border bg-card text-center font-heading text-2xl font-extrabold text-navy outline-none transition-colors focus:border-orange"
        />
      ))}
    </div>
  )
}
