import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.legalNotice");
  return { title: t("title") };
}

export default async function LegalNoticePage() {
  const t = await getTranslations("legal.legalNotice");
  const tLegal = await getTranslations("legal");

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-cream">
        {t("title")}
      </h1>
      <p className="text-xs text-muted-soft mt-2 uppercase tracking-wider">
        {tLegal("lastUpdated")}
      </p>

      <h2 className="text-xl font-semibold text-cream mt-10">1. Información general</h2>
      <p className="text-muted mt-3">
        En cumplimiento de lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios del sitio web <strong className="text-cream">www.lexinvesta.es</strong> de los siguientes datos identificativos:
      </p>
      <p className="text-muted mt-3"><strong className="text-cream">Titular del sitio web:</strong> Daniel Rodríguez Sánchez-Galarraga</p>
      <p className="text-muted mt-3"><strong className="text-cream">Marca comercial:</strong> LexInvesta</p>
      <p className="text-muted mt-3"><strong className="text-cream">Domicilio profesional:</strong> Calle Santa Hortensia 22, Local B, 28002 Madrid (España)</p>
      <p className="text-muted mt-3"><strong className="text-cream">Correo electrónico:</strong> <a className="text-gold underline" href="mailto:info@lexinvesta.es">info@lexinvesta.es</a></p>
      <p className="text-muted mt-3"><strong className="text-cream">Sitio web:</strong> <strong className="text-cream">www.lexinvesta.es</strong></p>

      <h2 className="text-xl font-semibold text-cream mt-10">2. Objeto</h2>
      <p className="text-muted mt-3">
        El presente Aviso Legal regula el acceso, navegación y utilización del sitio web <strong className="text-cream">www.lexinvesta.es</strong>, así como las responsabilidades derivadas de la utilización de sus contenidos y servicios.
      </p>
      <p className="text-muted mt-3">El acceso a este sitio web implica la aceptación plena de las condiciones contenidas en el presente Aviso Legal.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">3. Finalidad del sitio web</h2>
      <p className="text-muted mt-3">
        LexInvesta es una marca especializada en la prestación de servicios de consultoría financiera y estratégica orientados a la negociación de deudas, reestructuración financiera, análisis de solvencia y coordinación con profesionales especializados en procedimientos relacionados con la Ley de Segunda Oportunidad y otras soluciones legales o financieras.
      </p>
      <p className="text-muted mt-3">La información publicada en este sitio web tiene carácter meramente informativo y no constituye asesoramiento jurídico individualizado.</p>
      <p className="text-muted mt-3">Cada caso será analizado de forma independiente antes de ofrecer cualquier propuesta de actuación.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">4. Condiciones de utilización</h2>
      <p className="text-muted mt-3">El usuario se compromete a utilizar el sitio web conforme a la legislación vigente, la buena fe y el presente Aviso Legal.</p>
      <p className="text-muted mt-3">Queda expresamente prohibido:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Utilizar la página web para actividades ilícitas.</li>
        <li>Introducir virus o cualquier software malicioso.</li>
        <li>Intentar acceder de forma no autorizada a sistemas o bases de datos.</li>
        <li>Alterar, dañar o inutilizar el funcionamiento del sitio web.</li>
        <li>Utilizar los contenidos con fines comerciales sin autorización expresa.</li>
      </ul>
      <p className="text-muted mt-3">El incumplimiento de estas obligaciones podrá dar lugar a las responsabilidades legalmente previstas.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">5. Propiedad intelectual e industrial</h2>
      <p className="text-muted mt-3">Todos los contenidos del sitio web, incluyendo, entre otros:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Marca LexInvesta.</li>
        <li>Nombre comercial.</li>
        <li>Logotipos.</li>
        <li>Diseño.</li>
        <li>Textos.</li>
        <li>Fotografías.</li>
        <li>Ilustraciones.</li>
        <li>Documentación.</li>
        <li>Bases de datos.</li>
        <li>Código fuente.</li>
        <li>Diseño gráfico.</li>
        <li>Material audiovisual.</li>
      </ul>
      <p className="text-muted mt-3">son propiedad de su titular o cuentan con las autorizaciones necesarias para su utilización.</p>
      <p className="text-muted mt-3">Queda prohibida su reproducción, distribución, transformación, comunicación pública o cualquier otra forma de explotación sin autorización previa y por escrito del titular.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">6. Responsabilidad</h2>
      <p className="text-muted mt-3">LexInvesta realiza sus mejores esfuerzos para mantener la información del sitio web actualizada y libre de errores.</p>
      <p className="text-muted mt-3">No obstante, no garantiza la inexistencia de errores técnicos, interrupciones del servicio o circunstancias ajenas a su control.</p>
      <p className="text-muted mt-3">Asimismo, no responderá por:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Daños derivados del uso del sitio web.</li>
        <li>Interrupciones temporales del servicio.</li>
        <li>Ataques informáticos realizados por terceros.</li>
        <li>Fallos de conexión.</li>
        <li>Errores ocasionados por causas de fuerza mayor.</li>
      </ul>

      <h2 className="text-xl font-semibold text-cream mt-10">7. Enlaces externos</h2>
      <p className="text-muted mt-3">Este sitio web podrá contener enlaces a páginas web de terceros.</p>
      <p className="text-muted mt-3">LexInvesta no asume responsabilidad alguna respecto del contenido, disponibilidad o funcionamiento de dichas páginas, cuya utilización será responsabilidad exclusiva del usuario.</p>
      <p className="text-muted mt-3">La inclusión de enlaces no implica relación comercial, aprobación o recomendación por parte de LexInvesta.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">8. Protección de datos personales</h2>
      <p className="text-muted mt-3">El tratamiento de los datos personales de los usuarios se realizará conforme a lo establecido en la Política de Privacidad publicada en este sitio web.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">9. Cookies</h2>
      <p className="text-muted mt-3">Este sitio web utiliza cookies propias y, en su caso, de terceros para mejorar la experiencia del usuario.</p>
      <p className="text-muted mt-3">Toda la información relativa a su utilización se encuentra disponible en la correspondiente Política de Cookies.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">10. Disponibilidad del sitio web</h2>
      <p className="text-muted mt-3">LexInvesta podrá modificar, suspender temporalmente o interrumpir el funcionamiento del sitio web cuando resulte necesario por motivos técnicos, de mantenimiento, seguridad o mejora de los servicios, sin que ello genere derecho a indemnización alguna.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">11. Modificaciones</h2>
      <p className="text-muted mt-3">El titular podrá modificar el presente Aviso Legal en cualquier momento para adaptarlo a cambios legislativos, técnicos o de funcionamiento del sitio web.</p>
      <p className="text-muted mt-3">Las modificaciones serán efectivas desde el momento de su publicación.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">12. Legislación aplicable y jurisdicción</h2>
      <p className="text-muted mt-3">El presente Aviso Legal se regirá por la legislación española.</p>
      <p className="text-muted mt-3">Cualquier controversia que pudiera surgir en relación con la interpretación o aplicación del presente Aviso Legal será sometida a los Juzgados y Tribunales competentes conforme a la normativa procesal española, salvo que una norma de carácter imperativo establezca otro fuero aplicable.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">13. Contacto</h2>
      <p className="text-muted mt-3">Para cualquier consulta relacionada con este Aviso Legal puede contactar con LexInvesta a través del siguiente correo electrónico:</p>
      <p className="text-muted mt-3">
        <a className="text-gold underline" href="mailto:info@lexinvesta.es">info@lexinvesta.es</a>
      </p>
    </article>
  );
}
