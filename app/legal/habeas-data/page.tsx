import { LegalPageLayout } from '@/components/legal-page-layout'

export default function HabeasDataPage() {
  return (
    <LegalPageLayout
      title="Habeas Data"
      subtitle="Autorizacion para el tratamiento de datos personales."
    >
      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">1. Autorizacion</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Al registrarte en Yave S.A.S. y utilizar nuestra plataforma, autorizas expresamente a Yave 
          S.A.S. para que recolecte, almacene, use, circule, suprima y de cualquier otra forma trate 
          tus datos personales de acuerdo con las finalidades descritas en nuestra Politica de Privacidad 
          y en los presentes terminos.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">2. Finalidades de la autorizacion</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          La autorizacion cubre las siguientes finalidades principales: evaluacion de solicitudes de 
          credito, gestion de la relacion contractual, prevencion de fraude, cumplimiento de obligaciones 
          legales y regulatorias (incluyendo SARLAFT), analisis conductual para la mejora de nuestros 
          servicios, y envio de comunicaciones comerciales relacionadas con productos y servicios de Yave.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">3. Datos sensibles</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Para ciertos procesos de validacion de identidad, podemos requerir datos biometricos (fotografia 
          facial). Estos datos sensibles seran tratados con el maximo nivel de seguridad y unicamente 
          para los fines especificos de verificacion de identidad y prevencion de fraude. Su tratamiento 
          requiere tu consentimiento expreso e informado, el cual otorgas al aceptar estos terminos.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">4. Derechos del titular</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Como titular de tus datos personales, tienes los siguientes derechos, reconocidos por la Ley 
          1581 de 2012 y el Decreto 1377 de 2013:
        </p>
        <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-muted-foreground">
          <li>Conocer, actualizar y rectificar tus datos personales.</li>
          <li>Solicitar prueba de la autorizacion otorgada.</li>
          <li>Ser informado sobre el uso que se le ha dado a tus datos.</li>
          <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
          <li>Revocar la autorizacion y/o solicitar la supresion de tus datos cuando no exista un deber legal o contractual que los obligue a conservarlos.</li>
          <li>Acceder gratuitamente a tus datos personales que hayan sido objeto de tratamiento.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">5. Ejercicio de derechos</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Para ejercer tus derechos de habeas data, puedes contactarnos a traves de los siguientes 
          canales: correo electronico privacidad@yave.co, linea de atencion al cliente, o por correo 
          fisico a nuestra direccion principal en Colombia. Responderemos tu solicitud en un termino 
          maximo de 10 dias habiles.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">6. Vigencia de la autorizacion</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          La presente autorizacion permanecera vigente durante el tiempo necesario para cumplir con 
          las finalidades del tratamiento y las obligaciones legales aplicables. Una vez finalizados 
          dichos plazos, tus datos seran eliminados de forma segura o anonimizados, salvo que exista 
          una obligacion legal que exija su conservacion por un periodo mayor.
        </p>
      </section>
    </LegalPageLayout>
  )
}
