export const faqs = [
  {
    q: '¿Hasta qué monto puedo tener mi cupo?',
    a: 'Tu cupo crece con tu rango Yave. Arrancas en Bronce con hasta $300.000 y, pagando a tiempo, puedes escalar hasta Maestra con $1.150.000. Entre más confianza construyes, más plata desbloqueas.',
  },
  {
    q: '¿Cómo funcionan las Yave Coins?',
    a: 'Son las monedas que ganas cada vez que pagas a tiempo. Las canjeas en La Bóveda por datos móviles, bonos, descuentos en tu cuota y más. Para canjear te enviamos un código a tu correo que confirma el beneficio.',
  },
  {
    q: '¿Qué es La Bóveda?',
    a: 'Es tu tienda de recompensas. Se abre al llegar al rango Oro y ahí cambias tus Yave Coins por beneficios reales: bonos Rappi, café, entradas de cine, descuentos en tu cuota y más.',
  },
  {
    q: '¿Cómo es el proceso de cobranza?',
    a: 'Tranquilo, parcero. Te recordamos con cariño antes de la fecha. Si se complica, escríbenos y armamos un plan que se ajuste a tu momento. Estamos para entenderte, no para presionarte.',
  },
  {
    q: '¿Cuáles son los costos generales?',
    a: 'Tasa de 2.2% E.M. (efectiva mensual) sin letra pequeña. Te mostramos el total a pagar antes de aceptar, con intereses y cuota clarísimos. Sin cobros sorpresa ni cargos ocultos.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Sí. Yave está vigilada por la Superintendencia Financiera de Colombia y protegemos tu información con cifrado de nivel bancario.',
  },
]

export type Rank = {
  name: string
  frecuencia: string
  cupo: string
  tiempo: string
  xp: string
  xpMin: number
  benefit: string
  color: string
  /** Concrete next-rank benefits shown in the "próximo rango" view. */
  perks: string[]
  /** Numeric max quota (COP) used to compute the cupo increase between ranks. */
  cupoValue: number
}

export const ranks: Rank[] = [
  { name: 'Bronce', frecuencia: 'Quincenal', cupo: '$300.000', tiempo: 'Día 0', xp: '0–599', xpMin: 0, benefit: 'Acceso básico a Yave Coins.', color: '#b5742a', cupoValue: 300000, perks: ['Acceso de entrada a Yave Coins', 'Mitigación de riesgo con amortización quincenal corta'] },
  { name: 'Plata', frecuencia: 'Quincenal', cupo: '$375.000', tiempo: '3 Meses', xp: '600', xpMin: 600, benefit: 'Incremento de cupo.', color: '#9aa3b2', cupoValue: 375000, perks: ['Incremento automático del cupo de crédito disponible'] },
  { name: 'Oro', frecuencia: 'Quincenal', cupo: '$475.000', tiempo: '6 Meses', xp: '1.200', xpMin: 1200, benefit: 'Apertura de La Bóveda.', color: '#e0a309', cupoValue: 475000, perks: ['Apertura de "La Bóveda": redime tus Yave Coins por premios', 'Catálogo de beneficios desbloqueado'] },
  { name: 'Platino', frecuencia: 'Mensual', cupo: '$600.000', tiempo: '10 Meses', xp: '2.000', xpMin: 2000, benefit: 'Hito de confort y mejores plazos.', color: '#5f7d95', cupoValue: 600000, perks: ['Hito de confort: se unifica el cobro a una sola cuota mensual'] },
  { name: 'Esmeralda', frecuencia: 'Mensual', cupo: '$750.000', tiempo: '14 Meses', xp: '2.800', xpMin: 2800, benefit: 'Tasa preferencial en Bóveda.', color: '#1f9d6b', cupoValue: 750000, perks: ['Tasa de conversión preferencial en La Bóveda para el canje de monedas'] },
  { name: 'Diamante', frecuencia: 'Mensual', cupo: '$925.000', tiempo: '19 Meses', xp: '3.800', xpMin: 3800, benefit: 'Soporte VIP y exoneración de YavePass.', color: '#3aa6c9', cupoValue: 925000, perks: ['Soporte técnico VIP prioritario con Yave', 'Exoneración del Yave Pass (1 cada 6 meses)'] },
  { name: 'Maestra', frecuencia: 'Mensual', cupo: '$1.150.000', tiempo: '25+ Meses', xp: '5.000', xpMin: 5000, benefit: 'Olimpo: multiplicador XP x2.', color: '#c0843a', cupoValue: 1150000, perks: ['El Olimpo Yave: multiplicador permanente de XP x2', 'Micro-seguro familiar gratuito'] },
]

/** XP and Yave Coin rewards/penalties per payment behavior. */
export const xpRules = {
  timely: { xp: 100, coins: 200, label: 'Pago a tiempo' },
  early: { xp: 150, coins: 300, label: 'Pago anticipado (3+ días)' },
  /** Late payment: lose XP and coins. Enough mora can demote your rank. */
  moraPerDay: { xp: -25, coins: -50, label: 'Penalización por mora' },
} as const

export const testimonials = [
  {
    name: 'Camila O.',
    city: 'Medellín',
    text: 'Necesitaba plata para surtir mi negocio y en 3 minutos ya tenía el desembolso. Sin vueltas ni papeleo.',
    rating: 5,
  },
  {
    name: 'Andrés P.',
    city: 'Bogotá',
    text: 'Me gusta que cada pago me da Yave Coins. Ya canjeé un bono y un mes de datos. Se siente justo.',
    rating: 5,
  },
  {
    name: 'Diana R.',
    city: 'Cali',
    text: 'Un día se me complicó pagar y me ayudaron sin regañarme. De verdad lo tratan a uno como parcero.',
    rating: 5,
  },
  {
    name: 'Juan M.',
    city: 'Barranquilla',
    text: 'La app es super facil de usar. Pido mi credito desde el celular y en minutos tengo la plata. No hay excusa.',
    rating: 5,
  },
  {
    name: 'Laura V.',
    city: 'Cartagena',
    text: 'Mi primer credito fue de $300.000 y ahora ya tengo cupo de $600.000. Pagar a tiempo siempre vale la pena.',
    rating: 5,
  },
  {
    name: 'Carlos T.',
    city: 'Pereira',
    text: 'Me encanta que sean transparentes con los costos. Antes de aceptar, ya se exactamente cuanto voy a pagar.',
    rating: 5,
  },
]

export type YaveNotification = {
  id: string
  type: 'rank' | 'coins' | 'payment' | 'disbursement'
  title: string
  text: string
  time: string
}

export const notifications: YaveNotification[] = [
  { id: 'n1', type: 'rank', title: '¡Subiste de llave!', text: 'Estás cerquita de Plata: te faltan 2 cuotas a tiempo.', time: 'Hace 2 h' },
  { id: 'n2', type: 'coins', title: 'Ganaste 150 Yave Coins', text: 'Tu pago del 12 jun sumó monedas a tu saldo.', time: 'Hace 1 d' },
  { id: 'n3', type: 'payment', title: 'Pago registrado', text: 'Recibimos tu cuota de $180.000. ¡Vas al día!', time: 'Hace 1 d' },
  { id: 'n4', type: 'disbursement', title: 'Desembolso aprobado', text: 'Tus $800.000 ya están en camino a tu cuenta.', time: 'Hace 3 sem' },
]
