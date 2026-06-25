const PHRASES = [
  'Confianza',
  'Tu meta',
  'Responsabilidad',
  "Pa' lante",
  'Hecho en Colombia',
  'Credito humano',
  'Yave',
  'Sin letra pequena',
  'Berraquera',
  'A tu lado',
  'Yave Coins',
  'Tu llave amiga',
  'Bacano',
  'Quiubo parcero',
  'Solidaridad',
  'Dignidad',
  'Con corazon',
  'Mi parche',
  'Dale que vamos',
  'Juntos',
]

function buildTile() {
  const rows = 8
  const lineHeight = 54
  let texts = ''
  for (let r = 0; r < rows; r++) {
    const y = 30 + r * lineHeight
    const offset = (r % 2) * 80
    const phrase = PHRASES[(r * 2) % PHRASES.length]
    const phrase2 = PHRASES[(r * 2 + 1) % PHRASES.length]
    texts += `<text x="${offset}" y="${y}" font-family="'Nunito Sans', sans-serif" font-size="20" font-weight="800" letter-spacing="1" fill="#0B2545">${phrase} &middot; ${phrase2}</text>`
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="450" viewBox="0 0 620 450"><g transform="rotate(-12 310 225)">${texts}</g></svg>`
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
        backgroundSize: '620px 450px',
      }}
    />
  )
}
