const PHRASES = [
  'De una',
  'Parce',
  'Fresco',
  'Plata',
  'Yave',
  'Bacano',
  "Pa' lante",
  'Berraquera',
  'Tu llave',
  'Quiubo',
  'Coins',
  'Mi parche',
  'Dale',
  'Bien o que',
  'Sin letra pequena',
  'Credito humano',
  'Confianza',
  'Colombia',
  'Tu meta',
  'Juntos',
]

function buildTile() {
  const rows = 9
  const lineHeight = 50
  let texts = ''
  for (let r = 0; r < rows; r++) {
    const y = 26 + r * lineHeight
    const offset = (r % 2) * 90
    const p1 = PHRASES[(r * 3) % PHRASES.length]
    const p2 = PHRASES[(r * 3 + 1) % PHRASES.length]
    const p3 = PHRASES[(r * 3 + 2) % PHRASES.length]
    const size = r % 3 === 0 ? 18 : r % 3 === 1 ? 15 : 20
    texts += `<text x="${offset}" y="${y}" font-family="'Nunito Sans',sans-serif" font-size="${size}" font-weight="900" letter-spacing="2" fill="#1565C0">${p1} · ${p2} · ${p3}</text>`
  }
  // Add coin symbols scattered
  const coins = [
    { x: 40, y: 90, r: 8 },
    { x: 380, y: 170, r: 6 },
    { x: 200, y: 320, r: 7 },
    { x: 520, y: 60, r: 5 },
    { x: 100, y: 380, r: 6 },
  ]
  let coinSvg = ''
  for (const c of coins) {
    coinSvg += `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="none" stroke="#FFD600" stroke-width="1.5"/><text x="${c.x}" y="${c.y + 3}" text-anchor="middle" font-size="${c.r}" fill="#FFD600" font-weight="bold">¥</text>`
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="650" height="460" viewBox="0 0 650 460"><g transform="rotate(-12 325 230)">${texts}</g>${coinSvg}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

export function BrandPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
      style={{
        backgroundImage: buildTile(),
        backgroundRepeat: 'repeat',
        backgroundSize: '650px 460px',
      }}
    />
  )
}
