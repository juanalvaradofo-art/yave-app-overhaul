import { LegalPageLayout } from '@/components/legal-page-layout'

export default function TerminosPage() {
  return (
    <LegalPageLayout
      title="Terminos y Condiciones"
      subtitle="Las reglas claras de nuestra relacion. Leelas con calma."
    >
      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">1. Objeto del servicio</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Yave S.A.S. ofrece microcreditos y servicios financieros digitales a traves de su plataforma. 
          Nuestro objetivo es brindar acceso al credito de forma responsable, transparente y humana, 
          evaluando el comportamiento de pago de nuestros usuarios en tiempo real.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">2. Requisitos para solicitar credito</h2>
        <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground">
          <li>Ser mayor de edad (18+ anos) y residente en Colombia.</li>
          <li>Contar con un documento de identidad vigente.</li>
          <li>Tener un numero de celular activo y una cuenta bancaria o billetera digital (Nequi, Daviplata).</li>
          <li>Aceptar los terminos y condiciones y autorizar el tratamiento de datos personales.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">3. Montos y plazos</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Los montos de credito varian segun tu llave (rango) en el Programa de Llaves, desde $200.000 
          hasta $1.150.000. Los plazos pueden ser quincenales o mensuales, con un maximo de 6 meses 
          para el primer credito. La tasa de interes efectiva mensual es del 2.2% E.M., siempre 
          sujeta a la tasa de usura vigente establecida por la Superintendencia Financiera de Colombia.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">4. Costos y comisiones</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Los costos se desglosan claramente antes de aceptar cualquier credito: intereses, YavePass 
          (membresia mensual), y costos de dispersion y gestion. No existen cargos ocultos ni 
          letra pequena. La fianza (Yave te respalda) es un beneficio comercial cubierto por Yave 
          y no representa un costo para el usuario.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">5. Cobranza y mora</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          En caso de atraso en el pago, se aplicaran intereses de mora de acuerdo con la normativa 
          vigente. Yave se compromete a una cobranza etica y respetuosa, priorizando el dialogo 
          y la busqueda de soluciones que se ajusten a la situacion del usuario. La mora afecta 
          tu puntaje XP y puede resultar en la baja de tu llave actual.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">6. Uso de la plataforma</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          El usuario se compromete a proporcionar informacion veraz y actualizada. El uso fraudulento 
          de la plataforma, la suplantacion de identidad o la provision de datos falsos pueden resultar 
          en la suspension inmediata de la cuenta y las acciones legales correspondientes.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">7. Modificaciones</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Yave se reserva el derecho de modificar estos terminos en cualquier momento. Los cambios 
          seran notificados con al menos 15 dias de anticipacion a traves de la aplicacion y el 
          correo electronico registrado. El uso continuado de la plataforma despues de las modificaciones 
          implica la aceptacion de los nuevos terminos.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">8. Vigencia</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Estos terminos entran en vigencia desde el momento de su aceptacion electronica y permanecen 
          vigentes mientras el usuario mantenga una relacion activa con Yave S.A.S.
        </p>
      </section>
    </LegalPageLayout>
  )
}
