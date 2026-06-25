import { LegalPageLayout } from '@/components/legal-page-layout'

export default function PrivacidadPage() {
  return (
    <LegalPageLayout
      title="Politica de Privacidad"
      subtitle="Tu informacion esta segura. Te explicamos como la cuidamos."
    >
      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">1. Responsable del tratamiento</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Yave S.A.S., identificada con NIT 901.234.567-8, con domicilio en Colombia, es la responsable 
          del tratamiento de los datos personales recolectados a traves de nuestra plataforma digital.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">2. Datos que recolectamos</h2>
        <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground">
          <li>Datos de identificacion: nombre, numero de documento, fecha de nacimiento.</li>
          <li>Datos de contacto: correo electronico, numero de celular, direccion de residencia.</li>
          <li>Datos financieros: ingresos, movimientos bancarios, historial de pagos con Yave.</li>
          <li>Datos biometricos: fotografia facial para validacion de identidad (solo con consentimiento expreso).</li>
          <li>Datos de navegacion: direccion IP, tipo de dispositivo, patrones de uso de la app.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">3. Finalidad del tratamiento</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Los datos personales se utilizan para: evaluar solicitudes de credito, gestionar la relacion 
          contractual, prevenir fraudes, cumplir con obligaciones legales y regulatorias (incluyendo 
          SARLAFT), mejorar nuestros servicios mediante analisis conductual, y enviar comunicaciones 
          relevantes sobre tu cuenta y beneficios del Programa de Llaves.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">4. Derechos del titular</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Como titular de tus datos personales, tienes derecho a: conocer, actualizar, rectificar y 
          suprimir tus datos; revocar la autorizacion otorgada; acceder a tus datos de forma gratuita; 
          y presentar quejas ante la Superintendencia de Industria y Comercio. Para ejercer estos 
          derechos, escribenos a privacidad@yave.co.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">5. Seguridad de la informacion</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Implementamos medidas tecnicas, administrativas y fisicas para proteger tus datos personales 
          contra acceso no autorizado, perdida, alteracion o destruccion. Utilizamos cifrado de nivel 
          bancario (TLS 1.3) para la transmision de datos y almacenamiento seguro en la nube.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">6. Compartir informacion con terceros</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          No vendemos ni alquilamos tus datos personales. Solo compartimos informacion con terceros 
          cuando es estrictamente necesario para la prestacion del servicio (por ejemplo, entidades 
          bancarias para la dispersion de fondos) o cuando la ley asi lo exige. En todos los casos, 
          exigimos a nuestros proveedores el mismo nivel de proteccion de datos.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">7. Conservacion de datos</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades 
          del tratamiento y las obligaciones legales aplicables. Una vez finalizada la relacion contractual 
          y cumplidos los plazos legales, tus datos seran eliminados de forma segura o anonimizados.
        </p>
      </section>
    </LegalPageLayout>
  )
}
