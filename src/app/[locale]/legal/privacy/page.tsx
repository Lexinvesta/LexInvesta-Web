import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.privacy");
  return { title: t("title") };
}

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");
  const tLegal = await getTranslations("legal");

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-cream">
        {t("title")}
      </h1>
      <p className="text-xs text-muted-soft mt-2 uppercase tracking-wider">
        {tLegal("lastUpdated")}
      </p>

      <h2 className="text-xl font-semibold text-cream mt-10">1. Responsable del tratamiento</h2>
      <p className="text-muted mt-3">
        En cumplimiento del Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos – RGPD) y de la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa a los usuarios de que los datos personales facilitados a través del sitio web <strong className="text-cream">www.lexinvesta.es</strong> serán tratados por:
      </p>
      <p className="text-muted mt-3">
        <strong className="text-cream">Responsable:</strong> Daniel Rodríguez Sánchez-Galarraga (Titular de la marca comercial LexInvesta)
      </p>
      <p className="text-muted mt-3">
        <strong className="text-cream">Domicilio profesional:</strong> Calle Santa Hortensia 22, Local B, 28002 Madrid (España)
      </p>
      <p className="text-muted mt-3">
        <strong className="text-cream">Correo electrónico de contacto:</strong> <a className="text-gold underline" href="mailto:info@lexinvesta.es">info@lexinvesta.es</a>
      </p>

      <h2 className="text-xl font-semibold text-cream mt-10">2. Finalidad del tratamiento</h2>
      <p className="text-muted mt-3">Los datos personales facilitados por los usuarios serán tratados con las siguientes finalidades:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Gestionar las solicitudes de cita realizadas a través de la página web.</li>
        <li>Atender consultas, solicitudes de información y comunicaciones enviadas por los usuarios.</li>
        <li>Analizar la situación financiera y jurídica del interesado para valorar la viabilidad de los servicios ofrecidos por LexInvesta.</li>
        <li>Gestionar la relación profesional con los clientes.</li>
        <li>Elaborar presupuestos, propuestas de actuación o estudios preliminares.</li>
        <li>Cumplir las obligaciones legales derivadas de la prestación de los servicios.</li>
        <li>Enviar información relacionada con los servicios solicitados o con la evolución del expediente.</li>
        <li>Enviar comunicaciones comerciales únicamente cuando el usuario haya prestado su consentimiento o exista otra base legal que lo permita.</li>
      </ul>

      <h2 className="text-xl font-semibold text-cream mt-10">3. Datos personales tratados</h2>
      <p className="text-muted mt-3">LexInvesta podrá tratar, entre otros, los siguientes datos personales:</p>
      <p className="text-muted mt-3"><strong className="text-cream">Datos identificativos</strong></p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Nombre y apellidos.</li>
      </ul>
      <p className="text-muted mt-3"><strong className="text-cream">Datos de contacto</strong></p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Correo electrónico.</li>
        <li>Número de teléfono.</li>
      </ul>
      <p className="text-muted mt-3">
        <strong className="text-cream">Documentación aportada por el usuario</strong>
      </p>
      <p className="text-muted mt-3">
        Cuando resulte necesario para el estudio o gestión del expediente, el usuario podrá facilitar documentación relacionada con su situación económica, patrimonial o jurídica, incluyendo, entre otros:
      </p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Contratos.</li>
        <li>Reclamaciones judiciales o extrajudiciales.</li>
        <li>Requerimientos de pago.</li>
        <li>Documentación bancaria.</li>
        <li>Información económica o financiera.</li>
        <li>Documentación necesaria para la negociación de deudas o procedimientos relacionados con la Ley de Segunda Oportunidad.</li>
        <li>Cualquier otra documentación aportada voluntariamente por el interesado para la correcta prestación del servicio.</li>
      </ul>
      <p className="text-muted mt-3">LexInvesta únicamente solicitará aquella documentación que resulte necesaria para la finalidad correspondiente.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">4. Legitimación para el tratamiento</h2>
      <p className="text-muted mt-3">La base jurídica del tratamiento será una o varias de las siguientes:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>El consentimiento otorgado por el usuario.</li>
        <li>La aplicación de medidas precontractuales solicitadas por el interesado.</li>
        <li>La ejecución de un contrato cuando exista una relación profesional.</li>
        <li>El cumplimiento de obligaciones legales.</li>
        <li>El interés legítimo del responsable cuando resulte aplicable conforme al RGPD.</li>
      </ul>

      <h2 className="text-xl font-semibold text-cream mt-10">5. Comunicación de datos a terceros</h2>
      <p className="text-muted mt-3">Los datos personales podrán ser comunicados únicamente cuando resulte necesario para la correcta prestación de los servicios contratados.</p>
      <p className="text-muted mt-3">En particular, podrán comunicarse a:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Despachos de abogados colaboradores.</li>
        <li>Procuradores.</li>
        <li>Graduados sociales.</li>
        <li>Economistas.</li>
        <li>Peritos.</li>
        <li>Entidades financieras.</li>
        <li>Administraciones Públicas.</li>
        <li>Juzgados y Tribunales.</li>
        <li>Otros colaboradores profesionales cuya intervención resulte necesaria para la defensa o gestión del expediente del cliente.</li>
      </ul>
      <p className="text-muted mt-3">
        Asimismo, determinados proveedores tecnológicos podrán acceder a la información únicamente para prestar servicios al responsable del tratamiento, actuando siempre como encargados del tratamiento conforme al artículo 28 del RGPD.
      </p>
      <p className="text-muted mt-3">En ningún caso los datos personales serán vendidos a terceros.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">6. Conservación de los datos</h2>
      <p className="text-muted mt-3">Los datos personales serán conservados durante el tiempo necesario para cumplir la finalidad para la que fueron recabados.</p>
      <p className="text-muted mt-3">Una vez finalizada la relación profesional, podrán mantenerse debidamente bloqueados durante los plazos establecidos por la legislación vigente para atender posibles responsabilidades legales, fiscales o administrativas.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">7. Seguridad y confidencialidad</h2>
      <p className="text-muted mt-3">LexInvesta aplica medidas técnicas y organizativas adecuadas para garantizar la seguridad, confidencialidad e integridad de los datos personales tratados.</p>
      <p className="text-muted mt-3">Toda la documentación facilitada por los clientes será tratada con estricta confidencialidad y únicamente será accesible por las personas cuya intervención resulte necesaria para la prestación del servicio.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">8. Derechos de los usuarios</h2>
      <p className="text-muted mt-3">El interesado podrá ejercer en cualquier momento los siguientes derechos:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Derecho de acceso.</li>
        <li>Derecho de rectificación.</li>
        <li>Derecho de supresión.</li>
        <li>Derecho de oposición.</li>
        <li>Derecho a la limitación del tratamiento.</li>
        <li>Derecho a la portabilidad de los datos.</li>
        <li>Derecho a retirar el consentimiento cuando el tratamiento se base en el mismo.</li>
      </ul>
      <p className="text-muted mt-3">Para ejercer cualquiera de estos derechos podrá enviar una solicitud a:</p>
      <p className="text-muted mt-3">
        <a className="text-gold underline" href="mailto:info@lexinvesta.es">info@lexinvesta.es</a>
      </p>
      <p className="text-muted mt-3">La solicitud deberá permitir acreditar la identidad del interesado cuando resulte necesario.</p>
      <p className="text-muted mt-3">Asimismo, si considera que el tratamiento de sus datos personales vulnera la normativa vigente, podrá presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>

      <h2 className="text-xl font-semibold text-cream mt-10">9. Comunicaciones comerciales</h2>
      <p className="text-muted mt-3">LexInvesta únicamente enviará comunicaciones comerciales cuando exista consentimiento expreso del usuario o cuando la legislación permita dicho envío.</p>
      <p className="text-muted mt-3">El usuario podrá solicitar en cualquier momento dejar de recibir dichas comunicaciones.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">10. Menores de edad</h2>
      <p className="text-muted mt-3">Los servicios ofrecidos por LexInvesta están dirigidos exclusivamente a personas mayores de edad con capacidad legal suficiente para contratar.</p>
      <p className="text-muted mt-3">No se recopilan deliberadamente datos personales de menores de 18 años.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">11. Modificaciones de la Política de Privacidad</h2>
      <p className="text-muted mt-3">LexInvesta podrá modificar la presente Política de Privacidad cuando resulte necesario para adaptarla a cambios legislativos, criterios de las autoridades de control o modificaciones en la prestación de los servicios.</p>
      <p className="text-muted mt-3">La versión vigente será siempre la publicada en el sitio web <strong className="text-cream">www.lexinvesta.es</strong>.</p>
    </article>
  );
}
