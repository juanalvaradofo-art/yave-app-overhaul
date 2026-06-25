function buildDoodleTile() {
  const W = 800
  const H = 800
  const NAVY = '#0A2540'

  const icons = [
    // Coffee cup
    `<g><path d="M0 0h14v10a7 7 0 01-14 0z" fill="none" stroke="${NAVY}" stroke-width="1.2"/><path d="M14 3h3a3 3 0 010 6h-3" fill="none" stroke="${NAVY}" stroke-width="1.2"/><path d="M2 -3h10" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/><path d="M5 -5q2 -3 4 0" fill="none" stroke="${NAVY}" stroke-width="1" stroke-linecap="round"/></g>`,
    // Key
    `<g><circle cx="6" cy="6" r="5" fill="none" stroke="${NAVY}" stroke-width="1.2"/><circle cx="6" cy="6" r="2" fill="none" stroke="${NAVY}" stroke-width="1"/><line x1="11" y1="6" x2="22" y2="6" stroke="${NAVY}" stroke-width="1.2"/><line x1="19" y1="6" x2="19" y2="10" stroke="${NAVY}" stroke-width="1.2"/><line x1="22" y1="6" x2="22" y2="9" stroke="${NAVY}" stroke-width="1.2"/></g>`,
    // Coin
    `<g><circle cx="8" cy="8" r="7.5" fill="none" stroke="${NAVY}" stroke-width="1.2"/><circle cx="8" cy="8" r="5.5" fill="none" stroke="${NAVY}" stroke-width="0.8"/><text x="8" y="11" text-anchor="middle" font-size="8" font-weight="bold" fill="${NAVY}" font-family="sans-serif">$</text></g>`,
    // Growth chart
    `<g><polyline points="0,16 5,10 10,12 16,4 20,6" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14,4 20,4 20,10" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/></g>`,
    // Briefcase (work/camello)
    `<g><rect x="1" y="5" width="16" height="11" rx="2" fill="none" stroke="${NAVY}" stroke-width="1.2"/><path d="M5 5V3a3 3 0 016 0v2" fill="none" stroke="${NAVY}" stroke-width="1.2"/><line x1="1" y1="10" x2="17" y2="10" stroke="${NAVY}" stroke-width="0.8"/></g>`,
    // Colombian flag mini
    `<g><rect x="0" y="0" width="18" height="12" rx="1.5" fill="none" stroke="${NAVY}" stroke-width="1"/><line x1="0" y1="6" x2="18" y2="6" stroke="${NAVY}" stroke-width="0.6"/><line x1="0" y1="9" x2="18" y2="9" stroke="${NAVY}" stroke-width="0.6"/></g>`,
    // Star/sparkle
    `<g><path d="M8 0L10 6 16 8 10 10 8 16 6 10 0 8 6 6z" fill="none" stroke="${NAVY}" stroke-width="1" stroke-linejoin="round"/></g>`,
    // Lightbulb
    `<g><path d="M8 2a6 6 0 013.5 10.8V15a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 014.5 15v-2.2A6 6 0 018 2z" fill="none" stroke="${NAVY}" stroke-width="1.2"/><line x1="6" y1="15" x2="10" y2="15" stroke="${NAVY}" stroke-width="0.8"/></g>`,
    // Handshake
    `<g><path d="M0 8h4l4 4 4-4h4" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 12l-4 0" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/><path d="M12 12l4 0" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/></g>`,
    // Phone/mobile
    `<g><rect x="2" y="0" width="10" height="18" rx="2" fill="none" stroke="${NAVY}" stroke-width="1.2"/><circle cx="7" cy="15" r="1" fill="${NAVY}"/><line x1="5" y1="3" x2="9" y2="3" stroke="${NAVY}" stroke-width="0.8" stroke-linecap="round"/></g>`,
    // Shield/trust
    `<g><path d="M8 1L1 5v5c0 4.5 3.5 7.5 7 9 3.5-1.5 7-4.5 7-9V5z" fill="none" stroke="${NAVY}" stroke-width="1.2"/><polyline points="5,9 7.5,12 12,6" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    // Rocket
    `<g><path d="M10 2C6 6 4 12 4 16l3-1 3 3 3-3 3 1c0-4-2-10-6-14z" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linejoin="round"/><circle cx="10" cy="9" r="2" fill="none" stroke="${NAVY}" stroke-width="1"/></g>`,
  ]

  const phrases = [
    'Parce', 'De una', 'Bacano', 'Camello', 'Plata',
    'Yave', 'Dale', 'Fresco', 'Berraco', 'Gonorrea',
    'Chimba', 'Parcero', 'Llave', 'Severo', 'Teso',
  ]

  const positions: Array<{ x: number; y: number; rot: number; iconIdx?: number; text?: string; fontSize?: number }> = []
  const gridCols = 10
  const gridRows = 10
  const cellW = W / gridCols
  const cellH = H / gridRows

  let phraseIdx = 0
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const cx = col * cellW + cellW / 2
      const cy = row * cellH + cellH / 2
      const jitterX = ((col * 7 + row * 13) % 30) - 15
      const jitterY = ((col * 11 + row * 7) % 26) - 13
      const rot = ((col * 17 + row * 23) % 90) - 45
      const x = cx + jitterX
      const y = cy + jitterY

      if ((row + col) % 3 === 0) {
        positions.push({ x, y, rot, text: phrases[phraseIdx % phrases.length], fontSize: 9 + ((row + col) % 3) * 2 })
        phraseIdx++
      } else {
        const iconIdx = (row * gridCols + col) % icons.length
        positions.push({ x, y, rot, iconIdx })
      }
    }
  }

  let content = ''
  for (const p of positions) {
    if (p.text != null) {
      content += `<text x="${p.x}" y="${p.y}" font-family="'Nunito Sans',sans-serif" font-size="${p.fontSize}" font-weight="800" fill="${NAVY}" transform="rotate(${p.rot} ${p.x} ${p.y})" text-anchor="middle" dominant-baseline="middle">${p.text}</text>`
    } else if (p.iconIdx != null) {
      content += `<g transform="translate(${p.x - 8},${p.y - 8}) rotate(${p.rot} 8 8) scale(0.9)">${icons[p.iconIdx]}</g>`
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${content}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

let cachedTile: string | null = null
function getTile() {
  if (!cachedTile) cachedTile = buildDoodleTile()
  return cachedTile
}

export function BrandPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: getTile(),
        backgroundRepeat: 'repeat',
        backgroundSize: '800px 800px',
      }}
    />
  )
}
