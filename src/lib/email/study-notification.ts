import { Resend } from "resend";

export interface StudyLead {
  name: string;
  phone: string;
  email: string;
  province: string;
  debt: string;
  debtType: string;
  situation: string;
  message?: string;
}

let cachedResend: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!cachedResend) cachedResend = new Resend(key);
  return cachedResend;
}

const FROM = process.env.STUDY_NOTIFICATION_FROM ?? "LexInvesta <solicitud@estudio.lexinvesta.es>";
const TO = process.env.STUDY_NOTIFICATION_TO ?? "info@lexinvesta.es";

const DEBT_TYPE_LABELS: Record<string, string> = {
  personalLoans: "Préstamos personales",
  creditCards: "Tarjetas de crédito",
  microloans: "Microcréditos",
  taxAgency: "Hacienda / Seguridad Social",
  mortgages: "Préstamos hipotecarios",
  mixed: "Varios tipos (mixto)",
  other: "Otros",
};

const SITUATION_LABELS: Record<string, string> = {
  current: "Al día con los pagos",
  missedPayments: "Con algunos impagos",
  garnishments: "Con embargos",
  lawsuit: "Con demanda judicial",
  creditBureau: "En ficheros de morosidad (ASNEF, etc.)",
  other: "Otra situación",
};

function labelFor(value: string, map: Record<string, string>): string {
  return map[value] ?? value;
}

function escape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(data: StudyLead): string {
  const rows: Array<[string, string]> = [
    ["Nombre", data.name],
    ["Teléfono", data.phone],
    ["Email", data.email],
    ["Provincia", data.province],
    ["Importe aproximado de deuda", data.debt],
    ["Tipo de deuda", labelFor(data.debtType, DEBT_TYPE_LABELS)],
    ["Situación actual", labelFor(data.situation, SITUATION_LABELS)],
  ];
  if (data.message) rows.push(["Mensaje", data.message]);

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #2a2a2a;color:#9a9a9a;font-size:13px;width:40%;vertical-align:top;">${escape(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #2a2a2a;color:#f4f1ea;font-size:14px;vertical-align:top;">${escape(value)}</td>
        </tr>`,
    )
    .join("");

  const date = new Date().toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8"><title>Nueva solicitud de estudio</title></head>
  <body style="margin:0;padding:0;background-color:#111111;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#f4f1ea;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;border-bottom:1px solid #2a2a2a;">
                <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#b89542;">LexInvesta</p>
                <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#f4f1ea;font-family:Manrope,Inter,sans-serif;letter-spacing:-0.02em;">Nueva solicitud de estudio</h1>
                <p style="margin:8px 0 0;font-size:13px;color:#9a9a9a;">Recibida el ${escape(date)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 8px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 12px;">
                  <tbody>${rowsHtml}</tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;border-top:1px solid #2a2a2a;font-size:12px;color:#9a9a9a;">
                Este mensaje se ha enviado automáticamente desde el formulario de la web de LexInvesta.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText(data: StudyLead): string {
  const lines = [
    `Nueva solicitud de estudio — LexInvesta`,
    ``,
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    `Email: ${data.email}`,
    `Provincia: ${data.province}`,
    `Importe aproximado de deuda: ${data.debt}`,
    `Tipo de deuda: ${labelFor(data.debtType, DEBT_TYPE_LABELS)}`,
    `Situación actual: ${labelFor(data.situation, SITUATION_LABELS)}`,
  ];
  if (data.message) lines.push(`Mensaje: ${data.message}`);
  lines.push(``);
  lines.push(`Recibido: ${new Date().toISOString()}`);
  return lines.join("\n");
}

export async function sendStudyNotification(
  data: StudyLead,
  leadId: string,
): Promise<{ ok: true; messageId: string } | { ok: false; error: string }> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, error: "missing-resend-api-key" };
  }

  const { data: result, error } = await resend.emails.send(
    {
      from: FROM,
      to: [TO],
      replyTo: data.email,
      subject: `Nueva solicitud de estudio — ${data.name}`,
      html: buildHtml(data),
      text: buildText(data),
      tags: [
        { name: "source", value: "lexinvesta-web" },
        { name: "form", value: "study" },
      ],
    },
    { idempotencyKey: `study-lead/${leadId}` },
  );

  if (error) {
    return { ok: false, error: error.message };
  }
  if (!result?.id) {
    return { ok: false, error: "no-message-id" };
  }
  return { ok: true, messageId: result.id };
}
