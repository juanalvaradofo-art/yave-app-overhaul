function buildDoodleTile() {
  const W = 700
  const H = 700
  const NAVY = '#003893'

  const icons = [
    // Coffee cup
    `<g><path d="M0 0h18v13a9 9 0 01-18 0z" fill="none" stroke="${NAVY}" stroke-width="1.4"/><path d="M18 4h4a4 4 0 010 8h-4" fill="none" stroke="${NAVY}" stroke-width="1.4"/><path d="M3 -4h12" stroke="${NAVY}" stroke-width="1.3" stroke-linecap="round"/><path d="M7 -7q3 -4 6 0" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linecap="round"/></g>`,
    // Key
    `<g><circle cx="8" cy="8" r="7" fill="none" stroke="${NAVY}" stroke-width="1.4"/><circle cx="8" cy="8" r="3" fill="none" stroke="${NAVY}" stroke-width="1.1"/><line x1="15" y1="8" x2="28" y2="8" stroke="${NAVY}" stroke-width="1.4"/><line x1="24" y1="8" x2="24" y2="13" stroke="${NAVY}" stroke-width="1.3"/><line x1="28" y1="8" x2="28" y2="12" stroke="${NAVY}" stroke-width="1.3"/></g>`,
    // Coin $
    `<g><circle cx="10" cy="10" r="9.5" fill="none" stroke="${NAVY}" stroke-width="1.4"/><circle cx="10" cy="10" r="7" fill="none" stroke="${NAVY}" stroke-width="0.9"/><text x="10" y="14" text-anchor="middle" font-size="11" font-weight="bold" fill="${NAVY}" font-family="sans-serif">$</text></g>`,
    // Growth chart
    `<g><polyline points="0,22 7,14 14,16 22,6 28,8" fill="none" stroke="${NAVY}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="20,5 28,5 28,13" fill="none" stroke="${NAVY}" stroke-width="1.3" stroke-linecap="round"/></g>`,
    // Briefcase
    `<g><rect x="1" y="7" width="22" height="14" rx="2.5" fill="none" stroke="${NAVY}" stroke-width="1.4"/><path d="M7 7V4.5a3.5 3.5 0 017 0V7" fill="none" stroke="${NAVY}" stroke-width="1.3"/><line x1="1" y1="13" x2="23" y2="13" stroke="${NAVY}" stroke-width="0.9"/></g>`,
    // Colombian flag
    `<g><rect x="0" y="0" width="24" height="16" rx="2" fill="none" stroke="${NAVY}" stroke-width="1.2"/><line x1="0" y1="8" x2="24" y2="8" stroke="${NAVY}" stroke-width="0.7"/><line x1="0" y1="12" x2="24" y2="12" stroke="${NAVY}" stroke-width="0.7"/></g>`,
    // Sparkle/star
    `<g><path d="M10 0L12.5 7.5 20 10 12.5 12.5 10 20 7.5 12.5 0 10 7.5 7.5z" fill="none" stroke="${NAVY}" stroke-width="1.2" stroke-linejoin="round"/></g>`,
    // Lightbulb
    `<g><path d="M10 2a8 8 0 014.5 14V19a2 2 0 01-2 2h-5a2 2 0 01-2-2v-3A8 8 0 0110 2z" fill="none" stroke="${NAVY}" stroke-width="1.3"/><line x1="7.5" y1="19" x2="12.5" y2="19" stroke="${NAVY}" stroke-width="0.9"/></g>`,
    // Handshake
    `<g><path d="M0 10h5l5 5.5 5-5.5h5" fill="none" stroke="${NAVY}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15l-5 0" fill="none" stroke="${NAVY}" stroke-width="1.3" stroke-linecap="round"/><path d="M15 15l5 0" fill="none" stroke="${NAVY}" stroke-width="1.3" stroke-linecap="round"/></g>`,
    // Phone
    `<g><rect x="2" y="0" width="14" height="24" rx="3" fill="none" stroke="${NAVY}" stroke-width="1.3"/><circle cx="9" cy="20" r="1.3" fill="${NAVY}"/><line x1="6" y1="3.5" x2="12" y2="3.5" stroke="${NAVY}" stroke-width="1" stroke-linecap="round"/></g>`,
    // Shield
    `<g><path d="M10 1L1 6v6.5c0 6 4.5 10 9 12 4.5-2 9-6 9-12V6z" fill="none" stroke="${NAVY}" stroke-width="1.3"/><polyline points="6,11.5 9,15 15,8" fill="none" stroke="${NAVY}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    // Rocket
    `<g><path d="M12 2C7 7 5 14 5 20l4-1.5 3 4 3-4 4 1.5c0-6-2-13-7-18z" fill="none" stroke="${NAVY}" stroke-width="1.3" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.5" fill="none" stroke="${NAVY}" stroke-width="1.1"/></g>`,
  ]

  const phrases = [
    'Parce', 'De una', 'Bacano', 'Camello', 'Plata',
    'Yave', 'Dale', 'Fresco', 'Berraco', 'Chimba',
    'Parcero', 'Llave', 'Severo', 'Teso', 'Quiubo',
  ]

  const gridCols = 8
  const gridRows = 8
  const cellW = W / gridCols
  const cellH = H / gridRows

  let content = ''
  let phraseIdx = 0

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const cx = col * cellW + cellW / 2
      const cy = row * cellH + cellH / 2
      const jitterX = ((col * 7 + row * 13) % 24) - 12
      const jitterY = ((col * 11 + row * 7) % 20) - 10
      const rot = ((col * 17 + row * 23) % 70) - 35
      const x = cx + jitterX
      const y = cy + jitterY

      if ((row + col) % 3 === 0) {
        const size = 12 + ((row + col) % 3) * 2
        content += `<text x="${x}" y="${y}" font-family="'Nunito Sans',sans-serif" font-size="${size}" font-weight="800" fill="${NAVY}" transform="rotate(${rot} ${x} ${y})" text-anchor="middle" dominant-baseline="middle">${phrases[phraseIdx % phrases.length]}</text>`
        phraseIdx++
      } else {
        const iconIdx = (row * gridCols + col) % icons.length
        content += `<g transform="translate(${x - 10},${y - 10}) rotate(${rot} 10 10)">${icons[iconIdx]}</g>`
      }
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
        backgroundSize: '700px 700px',
      }}
    />
  )
}
