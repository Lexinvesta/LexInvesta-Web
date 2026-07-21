import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.diagnosticTerms");
  return { title: t("title") };
}

export default async function DiagnosticTermsPage() {
  const t = await getTranslations("legal.diagnosticTerms");
  const tLegal = await getTranslations("legal");

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-cream">
        {t("title")}
      </h1>
      <p className="text-xs text-muted-soft mt-2 uppercase tracking-wider">
        {tLegal("lastUpdated")}
      </p>

      <h2 className="text-xl font-semibold text-cream mt-10">1. Objeto del servicio</h2>
      <p className="text-muted mt-3">
        El Diagnóstico Presencial de LexInvesta consiste en una reunión individual destinada a analizar la situación financiera, económica y/o jurídica del cliente, con el objetivo de valorar las posibles alternativas disponibles y determinar la viabilidad de los servicios ofrecidos por LexInvesta.
      </p>
      <p className="text-muted mt-3">El diagnóstico tiene carácter profesional y personalizado, y no supone por sí mismo la contratación de ningún servicio posterior.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">2. Reserva de la cita</h2>
      <p className="text-muted mt-3">La reserva de la cita se realizará a través de la página web <strong className="text-cream">www.lexinvesta.es</strong>.</p>
      <p className="text-muted mt-3">La cita únicamente quedará confirmada una vez realizado el pago correspondiente y recibida la confirmación por parte de LexInvesta.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">3. Precio</h2>
      <p className="text-muted mt-3">El importe del Diagnóstico Presencial es de <strong className="text-cream">125,00 € (IVA incluido)</strong>.</p>
      <p className="text-muted mt-3">El pago deberá efectuarse en el momento de realizar la reserva.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">4. Duración</h2>
      <p className="text-muted mt-3">La duración aproximada del diagnóstico será de hasta 60 minutos.</p>
      <p className="text-muted mt-3">Cuando la complejidad del caso lo requiera, LexInvesta podrá ampliar razonablemente el tiempo de atención sin coste adicional, siempre que la organización del servicio lo permita.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">5. Documentación</h2>
      <p className="text-muted mt-3">Para que el diagnóstico pueda realizarse con la máxima eficacia, el cliente deberá aportar la documentación que resulte necesaria para el estudio de su caso.</p>
      <p className="text-muted mt-3">La falta de documentación podrá limitar el alcance del análisis y de las conclusiones ofrecidas durante la reunión.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">6. Alcance del diagnóstico</h2>
      <p className="text-muted mt-3">Durante la sesión podrán analizarse, entre otros aspectos:</p>
      <ul className="list-disc pl-6 text-muted mt-2 space-y-1">
        <li>Situación financiera del cliente.</li>
        <li>Nivel de endeudamiento.</li>
        <li>Posibilidades de negociación con acreedores.</li>
        <li>Viabilidad de una refinanciación.</li>
        <li>Posibles procedimientos relacionados con la Ley de Segunda Oportunidad.</li>
        <li>Estrategias de reorganización económica.</li>
        <li>Otras alternativas que resulten adecuadas según las circunstancias del caso.</li>
      </ul>
      <p className="text-muted mt-3">Las conclusiones del diagnóstico tienen carácter orientativo y se basan en la información facilitada por el cliente en el momento de la consulta.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">7. Contratación posterior</h2>
      <p className="text-muted mt-3">La realización del diagnóstico no obliga al cliente a contratar ningún servicio adicional.</p>
      <p className="text-muted mt-3">Del mismo modo, LexInvesta se reserva el derecho de no aceptar un encargo profesional cuando, tras el análisis realizado, considere que no es posible prestar el servicio con las debidas garantías técnicas, legales o profesionales.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">8. Aplicación del importe del diagnóstico</h2>
      <p className="text-muted mt-3">Si, tras la realización del diagnóstico, el cliente contrata alguno de los servicios ofrecidos por LexInvesta dentro de los <strong className="text-cream">30 días naturales</strong> siguientes a la fecha de la consulta, el importe abonado por el diagnóstico (125,00 €) se descontará íntegramente del precio del servicio contratado.</p>
      <p className="text-muted mt-3">Transcurrido dicho plazo sin formalizar la contratación, el importe abonado no será compensable ni recuperable.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">9. Cancelaciones y cambios</h2>
      <p className="text-muted mt-3">El cliente podrá solicitar el cambio de fecha u hora con una antelación mínima de 24 horas respecto de la cita programada.</p>
      <p className="text-muted mt-3">Las cancelaciones comunicadas con menos de 24 horas de antelación, así como la no asistencia del cliente sin previo aviso, darán lugar a la pérdida del importe abonado, salvo causa de fuerza mayor debidamente acreditada y aceptada por LexInvesta.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">10. Confidencialidad</h2>
      <p className="text-muted mt-3">Toda la información y documentación facilitada por el cliente será tratada con absoluta confidencialidad, conforme a la normativa vigente en materia de protección de datos personales y a la Política de Privacidad publicada en <strong className="text-cream">www.lexinvesta.es</strong>.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">11. Responsabilidad</h2>
      <p className="text-muted mt-3">El diagnóstico constituye un servicio de análisis y valoración profesional basado en la información proporcionada por el cliente.</p>
      <p className="text-muted mt-3">Las recomendaciones efectuadas no garantizan un resultado concreto, ya que la resolución de cada asunto dependerá de las circunstancias particulares del caso, de la documentación aportada y, en su caso, de las decisiones adoptadas por terceros o por las autoridades competentes.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">12. Aceptación de las condiciones</h2>
      <p className="text-muted mt-3">La reserva y el pago del Diagnóstico Presencial implican que el cliente declara haber leído, comprendido y aceptado íntegramente las presentes Condiciones del Servicio.</p>

      <h2 className="text-xl font-semibold text-cream mt-10">13. Legislación aplicable</h2>
      <p className="text-muted mt-3">Las presentes condiciones se regirán por la legislación española.</p>
      <p className="text-muted mt-3">Cualquier controversia derivada de su interpretación o ejecución será resuelta por los Juzgados y Tribunales competentes conforme a la normativa vigente.</p>
    </article>
  );
}
