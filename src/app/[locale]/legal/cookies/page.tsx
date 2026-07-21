import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.cookies");
  return { title: t("title") };
}

export default async function CookiesPage() {
  const t = await getTranslations("legal.cookies");
  const tLegal = await getTranslations("legal");

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-cream">
        {t("title")}
      </h1>
      <p className="text-xs text-muted-soft mt-2 uppercase tracking-wider">
        {tLegal("lastUpdated")}
      </p>

      <h2 className="text-xl font-semibold text-cream mt-10">1. ¿Qué son las cookies?</h2>
      <p className="text-muted mt-3">
        Las cookies son pequeños archivos de texto que un sitio web almacena en el dispositivo del usuario cuando visita una página web. Su finalidad es permitir el correcto funcionamiento del sitio, mejorar la experiencia de navegación, recordar determinadas preferencias y, en algunos casos, obtener información estadística sobre el uso del sitio web.
      </p>
      <p className="text-muted mt-3">
        La utilización de cookies no permite identificar personalmente al usuario, salvo que este facilite voluntariamente sus datos mediante los formularios habilitados en la web.
      </p>

      <h2 className="text-xl font-semibold text-cream mt-10">2. Titular del sitio web</h2>
      <p className="text-muted mt-3"><strong className="text-cream">Marca comercial:</strong> LexInvesta</p>
      <p className="text-muted mt-3"><strong className="text-cream">Titular:</strong> Daniel Rodríguez Sánchez-Galarraga</p>
      <p className="text-muted mt-3"><strong className="text-cream">Domicilio profesional:</strong> Calle Santa Hortensia 22, Local B, 28002 Madrid (España)</p>
      <p className="text-muted mt-3"><strong className="text-cream">Correo electrónico:</strong> <a className="text-gold underline" href="mailto:info@lexinvesta.es">info@lexinvesta.es</a></p>
      <p className="text-muted mt-3"><strong className="text-cream">Sitio web:</strong> <strong className="text-cream">www.lexinvesta.es</strong></p>

      <h2 className="text-xl font-semibold text-cream mt-10">3. Tipos de cookies utilizadas</h2>
      <p className="text-muted mt-3">En el sitio web <strong className="text-cream">www.lexinvesta.es</strong> podrán utilizarse las siguientes categorías de cookies:</p>

      <h3 className="text-base font-semibold text-cream mt-6">Cookies técnicas o necesarias</h3>
      <p className="text-muted mt-3">Son imprescindibles para el funcionamiento del sitio web y permiten, entre otras funciones:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Navegar por la página web.</li>
        <li>Solicitar una cita.</li>
        <li>Acceder a áreas seguras.</li>
        <li>Recordar preferencias de navegación.</li>
        <li>Garantizar la seguridad del sitio.</li>
      </ul>
      <p className="text-muted mt-3">Estas cookies no requieren el consentimiento del usuario.</p>

      <h3 className="text-base font-semibold text-cream mt-6">Cookies de preferencias</h3>
      <p className="text-muted mt-3">Permiten recordar determinadas configuraciones del usuario para ofrecer una experiencia de navegación personalizada.</p>
      <p className="text-muted mt-3">Estas cookies únicamente se instalarán cuando resulte necesario y conforme a la normativa aplicable.</p>

      <h3 className="text-base font-semibold text-cream mt-6">Cookies analíticas</h3>
      <p className="text-muted mt-3">Permiten conocer de forma agregada cómo utilizan los usuarios la página web con el fin de mejorar sus contenidos, rendimiento y experiencia de navegación.</p>
      <p className="text-muted mt-3">Estas cookies solo se instalarán cuando el usuario haya otorgado previamente su consentimiento.</p>

      <h3 className="text-base font-semibold text-cream mt-6">Cookies publicitarias</h3>
      <p className="text-muted mt-3">En caso de utilizar herramientas de publicidad o medición de campañas, estas cookies permitirán mostrar publicidad personalizada y medir la eficacia de las acciones publicitarias.</p>
      <p className="text-muted mt-3">Su instalación requerirá siempre el consentimiento previo del usuario.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">4. Cookies de terceros</h2>
      <p className="text-muted mt-3">En función de las herramientas que se incorporen al sitio web, podrán utilizarse cookies de terceros, tales como:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Google.</li>
        <li>Meta (Facebook e Instagram).</li>
        <li>Microsoft.</li>
        <li>Otras plataformas tecnológicas necesarias para la prestación de los servicios.</li>
      </ul>
      <p className="text-muted mt-3">Cada uno de estos proveedores tratará la información conforme a sus propias políticas de privacidad y cookies.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">5. Gestión del consentimiento</h2>
      <p className="text-muted mt-3">Al acceder por primera vez a <strong className="text-cream">www.lexinvesta.es</strong>, el usuario podrá:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Aceptar todas las cookies.</li>
        <li>Rechazar las cookies no necesarias.</li>
        <li>Configurar sus preferencias.</li>
      </ul>
      <p className="text-muted mt-3">El consentimiento podrá modificarse o retirarse en cualquier momento desde el panel de configuración de cookies disponible en el sitio web.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">6. Cómo desactivar las cookies</h2>
      <p className="text-muted mt-3">El usuario puede configurar su navegador para permitir, bloquear o eliminar las cookies instaladas.</p>
      <p className="text-muted mt-3">La desactivación de determinadas cookies podrá afectar al correcto funcionamiento de algunas funcionalidades del sitio web.</p>
      <p className="text-muted mt-3">Información sobre la gestión de cookies en los principales navegadores:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Google Chrome</li>
        <li>Mozilla Firefox</li>
        <li>Microsoft Edge</li>
        <li>Safari</li>
        <li>Opera</li>
      </ul>
      <p className="text-muted mt-3">Las instrucciones para cada navegador pueden consultarse en la documentación oficial del fabricante.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">7. Conservación de las cookies</h2>
      <p className="text-muted mt-3">Las cookies tendrán la duración necesaria para cumplir su finalidad.</p>
      <p className="text-muted mt-3">Las cookies técnicas permanecerán activas únicamente durante el tiempo imprescindible para el funcionamiento del sitio web.</p>
      <p className="text-muted mt-3">Las cookies analíticas o publicitarias se conservarán durante los plazos establecidos por sus respectivos proveedores o hasta que el usuario retire su consentimiento.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">8. Actualización de la Política de Cookies</h2>
      <p className="text-muted mt-3">LexInvesta podrá modificar la presente Política de Cookies cuando resulte necesario para adaptarla a cambios legislativos, técnicos o derivados de la incorporación de nuevos servicios o tecnologías.</p>
      <p className="text-muted mt-3">La versión vigente será siempre la publicada en <strong className="text-cream">www.lexinvesta.es</strong>.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">9. Contacto</h2>
      <p className="text-muted mt-3">Para cualquier consulta relacionada con la presente Política de Cookies puede contactar con:</p>
      <p className="text-muted mt-3">LexInvesta</p>
      <p className="text-muted mt-3">
        <strong className="text-cream">Correo electrónico:</strong> <a className="text-gold underline" href="mailto:info@lexinvesta.es">info@lexinvesta.es</a>
      </p>
    </article>
  );
}
