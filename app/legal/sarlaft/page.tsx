import { LegalPageLayout } from '@/components/legal-page-layout'

export default function SarlaftPage() {
  return (
    <LegalPageLayout
      title="SARLAFT"
      subtitle="Sistema de Administracion del Riesgo de Lavado de Activos y Financiacion del Terrorismo."
    >
      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">1. Compromiso institucional</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Yave S.A.S. se compromete a prevenir y combatir el lavado de activos y la financiacion del 
          terrorismo (LA/FT) en cumplimiento de la Ley 1124 de 2006, el Decreto 1068 de 2015 y las 
          circulares externas de la Superintendencia Financiera de Colombia. Nuestro sistema SARLAFT 
          esta disenado para identificar, medir, controlar y monitorear los riesgos asociados a estas 
          actividades ilicitas.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">2. Identificacion del cliente</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Como parte de nuestro proceso de conocimiento del cliente, solicitamos y verificamos la 
          siguiente informacion antes de iniciar cualquier relacion comercial: datos de identificacion 
          personal, informacion sobre la actividad economica y fuentes de ingresos, datos de contacto, 
          y, en casos especificos, informacion sobre el origen de los fondos. Esta informacion se 
          actualiza periodicamente.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">3. Clasificacion de riesgo</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Clasificamos a nuestros usuarios en categorias de riesgo (bajo, medio y alto) con base en 
          criterios objetivos como: monto de las transacciones, frecuencia de operaciones, ubicacion 
          geografica, naturaleza de la actividad economica, y comportamiento de pago. Los usuarios 
          clasificados como riesgo alto son sujetos a controles y seguimiento reforzado.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">4. Monitoreo de transacciones</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Monitoreamos de manera continua las transacciones realizadas a traves de nuestra plataforma 
          para detectar patrones inusuales o sospechosos que puedan indicar actividades de LA/FT. 
          Las operaciones que superen los umbrales establecidos o presenten caracteristicas atipicas 
          son reportadas al Area de Cumplimiento para su analisis.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">5. Reporte de operaciones sospechosas</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          En caso de identificar operaciones sospechosas, Yave S.A.S. esta obligada a reportarlas 
          a la Unidad de Informacion y Analisis Financiero (UIAF) de manera oportuna y confidencial. 
          El reporte se realiza sin notificar al usuario involucrado, de conformidad con la normativa 
          aplicable.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">6. Lista de control</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Verificamos a nuestros usuarios contra listas de control nacionales e internacionales, 
          incluyendo: listas de la OFAC (Office of Foreign Assets Control), listas de la ONU, listas 
          de la Union Europea, y listas de personas politicamente expuestas (PEP). En caso de 
          coincidencia, se suspende la relacion comercial y se reporta a las autoridades competentes.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-extrabold text-navy">7. Capacitacion y cultura de cumplimiento</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Nuestro equipo recibe capacitacion periodica en materia de prevencion de LA/FT. Promovemos 
          una cultura de cumplimiento organizacional donde todos los colaboradores entienden la 
          importancia de reportar conductas sospechosas y cumplir con los procedimientos establecidos.
        </p>
      </section>
    </LegalPageLayout>
  )
}
