/**
 * Subtle, low-opacity background layer of Colombian phrases + brand words.
 * Makes the interface feel warm and close to the user without distracting.
 * Rendered as a fixed layer behind all content.
 */
const PHRASES = [
  '¡Quiubo, parcero!',
  'con cariño',
  'Yave',
  'berraquera',
  'a tu lado',
  '¡Hágale pues!',
  'plata al instante',
  'tu llave amiga',
  '¡Bacano!',
  'sin letra pequeña',
  'pa’ lante',
  'crédito humano',
  '¡Eso sí!',
  'Yave Coins',
  '¡Qué chimba!',
  'confianza',
]

function buildTile() {
  const rows = 7
  const lineHeight = 58
  let texts = ''
  for (let r = 0; r < rows; r++) {
    const y = 30 + r * lineHeight
    const offset = (r % 2) * 70
    const phrase = PHRASES[(r * 2) % PHRASES.length]
    const phrase2 = PHRASES[(r * 2 + 1) % PHRASES.length]
    texts += `<text x="${offset}" y="${y}" font-family="Poppins, sans-serif" font-size="22" font-weight="700" fill="#2438a0">${phrase} · ${phrase2}</text>`
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="420" viewBox="0 0 560 420"><g transform="rotate(-12 280 210)">${texts}</g></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function BrandPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: buildTile(),
        backgroundRepeat: 'repeat',
        backgroundSize: '560px 420px',
      }}
    />
  )
}
