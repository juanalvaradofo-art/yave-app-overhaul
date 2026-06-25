import { LegalPageLayout } from '@/components/legal-page-layout'

export default function TasasPage() {
  return (
    <LegalPageLayout
      title="Tasas y Tarifas"
      subtitle="Costos transparentes desde el primer momento. Sin letra pequena."
    >
      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">1. Tasa de interes efectiva mensual</h2>
        <div className="mt-3 rounded-2xl bg-card p-5 shadow-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Tasa E.M.</span>
            <span className="font-heading text-3xl font-extrabold text-orange">2.2%</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Tasa de interes efectiva mensual aplicable a todos los creditos. Siempre sujeta a la 
            tasa de usura vigente establecida por la Superintendencia Financiera de Colombia. 
            La tasa se calcula sobre el saldo deudor.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">2. Comisiones y costos</h2>
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
            <div>
              <p className="font-heading font-bold text-navy">YavePass</p>
              <p className="text-sm text-muted-foreground">Membresia mensual</p>
            </div>
            <span className="font-heading text-lg font-extrabold text-navy">$12.000/mes</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
            <div>
              <p className="font-heading font-bold text-navy">Dispersion</p>
              <p className="text-sm text-muted-foreground">Transferencia a tu cuenta</p>
            </div>
            <span className="font-heading text-lg font-extrabold text-navy">Incluido</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
            <div>
              <p className="font-heading font-bold text-navy">Estudio de credito</p>
              <p className="text-sm text-muted-foreground">Primera solicitud</p>
            </div>
            <span className="font-heading text-lg font-extrabold text-navy">Incluido</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
            <div>
              <p className="font-heading font-bold text-navy">Gestion administrativa</p>
              <p className="text-sm text-muted-foreground">Por credito activo</p>
            </div>
            <span className="font-heading text-lg font-extrabold text-navy">Incluido</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">3. Intereses de mora</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          En caso de atraso en el pago de las cuotas, se aplicara un interes de mora equivalente 
          a la tasa de usura vigente para operaciones de consumo, dividida por 360 y multiplicada 
          por el numero de dias de mora. Este interes se calcula sobre el valor de la cuota vencida.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">4. Ejemplo de costo total</h2>
        <div className="mt-3 rounded-2xl bg-navy p-5 text-navy-foreground">
          <p className="text-sm text-white/70">Credito de ejemplo</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-white/80">Monto solicitado</span>
            <span className="font-heading text-xl font-extrabold">$300.000</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-white/80">Plazo</span>
            <span className="font-heading text-xl font-extrabold">3 meses</span>
          </div>
          <div className="mt-3 border-t border-white/20 pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-white/80">Total a pagar</span>
              <span className="font-heading text-2xl font-extrabold text-yellow">$343.800</span>
            </div>
            <p className="mt-1 text-xs text-white/60">
              Incluye capital, intereses (2.2% E.M.), YavePass y costos de gestion. 
              La fianza (Yave te respalda) es cubierta por Yave y no afecta tu total.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">5. Actualizacion de tasas</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Las tasas y tarifas pueden ser ajustadas periodicamente para reflejar cambios en las 
          condiciones del mercado y la normativa regulatoria. Cualquier modificacion sera 
          comunicada con al menos 15 dias de anticipacion a traves de la aplicacion y el correo 
          electronico registrado. Los creditos ya desembolsados mantendran las condiciones 
          acordadas en el momento de la firma.
        </p>
      </section>
    </LegalPageLayout>
  )
}
