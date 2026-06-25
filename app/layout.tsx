import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Baloo_2, Nunito_Sans } from 'next/font/google'
import { BrandPattern } from '@/components/brand-pattern'
import './globals.css'

const baloo = Baloo_2({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

const nunito = Nunito_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Yave — Tu llave a un crédito más humano',
  description:
    'Yave es el micro-crédito que te entiende. Pide la plata que necesitas, paga a tu ritmo y gana recompensas en el camino.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1b2a6b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable} bg-background`}>
      <body className="bg-background font-sans antialiased">
        <BrandPattern />
        <div className="relative z-10">{children}</div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
