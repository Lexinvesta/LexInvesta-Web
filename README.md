# LexInvesta — Web Corporativa

Sitio web corporativo de LexInvesta: intermediación y resolución de conflictos financieros en Madrid.

> **Producto principal:** Diagnóstico Presencial — 125,00 € (IVA incluido), con descuento de 125 € aplicable a cualquier servicio posterior contratado en los 30 días naturales siguientes.

---

## Stack

- **[Next.js 16.2.10](https://nextjs.org)** (App Router, RSC, Turbopack por defecto, `proxy.ts` en lugar de `middleware.ts`)
- **[TypeScript](https://www.typescriptlang.org/)** estricto — `strict: true`, `noEmit`, `noUncheckedIndexedAccess`
- **[Tailwind CSS v4](https://tailwindcss.com/)** con design tokens custom en `@theme` (paleta premium: ink, cream, gold, muted)
- **[next-intl 4](https://next-intl.dev/)** i18n con `localePrefix: "as-needed"` (URLs sin prefijo para el locale por defecto)
- **[shadcn/ui](https://ui.shadcn.com/)** (Radix) — componentes accesibles copiados al proyecto, basados en [composition patterns](https://www.vercel.com/blog/composition-patterns)
- **[Framer Motion](https://www.framer.com/motion/)** para animaciones sutiles
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** para validación tipada cliente/servidor
- **[Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)** (vía `@marsidev/react-turnstile`) — protección anti-bots del formulario
- **[Resend](https://resend.com/)** — email transaccional de notificaciones de leads
- **[MDX](https://mdxjs.com/)** — preparado para blog futuro
- **[lucide-react](https://lucide.dev/)** — iconografía lineal

---

## Estructura del proyecto

```
LexInvesta-Web/
├── messages/
│   └── es.json                     # Strings de usuario (español). Claves en inglés.
├── public/                         # (vacío — icon.svg se sirve desde src/app/)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx            # Landing principal
│   │   │   └── legal/
│   │   │       ├── layout.tsx
│   │   │       ├── legal-notice/page.tsx
│   │   │       ├── privacy/page.tsx
│   │   │       ├── cookies/page.tsx
│   │   │       └── diagnostic-terms/page.tsx
│   │   ├── api/study/route.ts      # POST: rate-limit → Zod → Turnstile → Resend
│   │   ├── icon.svg                # Favicon (L monogram + gold dot)
│   │   ├── layout.tsx              # Root layout, providers, JSON-LD
│   │   ├── globals.css             # Design tokens + reset
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/                     # button, input, textarea, select, checkbox, dialog, accordion, label, calendar
│   │   ├── landing/
│   │   │   ├── site-header.tsx
│   │   │   ├── site-footer.tsx     # 3 columnas con datos reales
│   │   │   ├── whatsapp-float.tsx  # Botón flotante WhatsApp
│   │   │   └── sections/
│   │   │       ├── hero.tsx
│   │   │       ├── problem.tsx
│   │   │       ├── solutions.tsx
│   │   │       ├── process.tsx
│   │   │       ├── diagnostic.tsx  # "Próximamente" (sin email capture)
│   │   │       ├── trust.tsx
│   │   │       ├── faq.tsx
│   │   │       └── contact.tsx     # Sección de contacto + form
│   │   ├── forms/
│   │   │   └── study-form.tsx      # RHF + Zod + Turnstile widget
│   │   └── seo/
│   │       └── json-ld.tsx         # FinancialService + founder + address + GeoCoordinates
│   ├── i18n/
│   │   ├── request.ts              # getRequestConfig (next-intl 4 API)
│   │   ├── routing.ts              # defineRouting: locales=["es"], as-needed
│   │   └── navigation.ts           # Link/useRouter tipados
│   ├── lib/
│   │   ├── email/
│   │   │   └── study-notification.ts   # Resend client + HTML/text template
│   │   ├── turnstile/
│   │   │   └── verify.ts           # Server-side siteverify wrapper
│   │   ├── utils/cn.ts
│   │   └── validation/study.ts     # Zod schema + default values
│   └── proxy.ts                    # next-intl middleware (Next.js 16 renombró middleware → proxy)
├── .env.example                    # Plantilla de variables de entorno (sin secretos)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts                  # CSP estricta, headers de seguridad
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml             # onlyBuiltDependencies
├── postcss.config.mjs
└── tsconfig.json
```

---

## Comandos

| Acción | Comando |
|---|---|
| Instalar dependencias | `pnpm install` |
| Servidor de desarrollo | `pnpm dev` |
| Build de producción | `pnpm build` |
| Iniciar producción | `pnpm start` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |

> Requiere **Node.js 20+** y **pnpm 10+**.

## Variables de entorno

Copia `.env.example` a `.env` y rellena los valores reales:

```bash
cp .env.example .env
```

| Variable | Tipo | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | pública | URL canónica del sitio. Usada en `sitemap.ts`, `robots.ts`, `JSON-LD` y OpenGraph. |
| `NEXT_PUBLIC_PHONE` | pública | Teléfono en formato internacional sin `+` (p. ej. `34900877289`). Usado en `tel:` links. |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | pública | WhatsApp en formato internacional sin `+` (p. ej. `34611847163`). Botón flotante. |
| `NEXT_PUBLIC_EMAIL` | pública | Email de contacto principal. |
| `NEXT_PUBLIC_TURNSTILE_SITEKEY` | pública | Sitekey de Cloudflare Turnstile (se expone al navegador). |
| `TURNSTILE_SECRET_KEY` | **secreto** | Secret key de Cloudflare Turnstile (server-side only). |
| `RESEND_API_KEY` | **secreto** | API key de Resend para emails transaccionales. |
| `STUDY_NOTIFICATION_FROM` | secreto | Remitente del email, por defecto `LexInvesta <solicitud@estudio.lexinvesta.es>`. |
| `STUDY_NOTIFICATION_TO` | secreto | Destinatario, por defecto `info@lexinvesta.es`. |

---

## Seguridad implementada

Cabeceras HTTP aplicadas vía `next.config.ts` a todas las rutas:

- **Content-Security-Policy** estricta — `default-src 'self'`, `frame-ancestors 'none'`, sin `unsafe-eval` salvo lo necesario para Turbopack dev. Whitelist de `https://challenges.cloudflare.com` para Turnstile (script-src, frame-src, connect-src).
- **X-Frame-Options: DENY** — anti-clickjacking.
- **X-Content-Type-Options: nosniff** — anti-MIME-sniffing.
- **Referrer-Policy: strict-origin-when-cross-origin**.
- **Permissions-Policy: camera=(), microphone=(), geolocation=()** — sin APIs sensibles.
- **Strict-Transport-Security: max-age=63072000; includeSubDomains; preload** — HSTS 2 años con preload.
- **poweredByHeader: false** — sin cabecera `X-Powered-By`.

Endpoint `/api/study` (`src/app/api/study/route.ts`):

- **Rate limit** en memoria: 5 req/min por IP (extraído de `x-forwarded-for` o `x-real-ip`).
- **Validación Zod** server-side con `z.treeifyError`.
- **Verificación de Turnstile** contra `challenges.cloudflare.com/turnstile/v0/siteverify` con timeout de 5s. La restricción por dominio se configura en el widget de Cloudflare (Dashboard → Turnstile → Hostnames), no en la app.
- **Resend** con `idempotencyKey: study-lead/<id>` — evita duplicados en reintentos.
- **Escape HTML** de todos los valores interpolados en la plantilla del email.

Formulario de study (`src/components/forms/study-form.tsx`):

- **Validación RHF + Zod** en cliente.
- **Consentimiento GDPR** obligatorio antes del submit.
- **Widget Turnstile** con reset tras éxito/error (tokens de un solo uso).
- **Estados accesibles**: `role="alert"` para errores, `aria-invalid`, `aria-describedby`.
- **No persistencia de PII** en logs ni en URL.

> **Pendiente para producción a escala**: el rate limit en memoria no se comparte entre instancias serverless de Vercel (cada cold start arranca con estado vacío). Para tráfico real conviene moverlo a Upstash Redis o Vercel KV. La lógica de rate limit está aislada en `src/app/api/study/route.ts` y se puede sustituir sin tocar el resto.

---

## Rutas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Server-rendered | Landing principal |
| `/legal/legal-notice` | Server-rendered | Aviso legal |
| `/legal/privacy` | Server-rendered | Política de privacidad |
| `/legal/cookies` | Server-rendered | Política de cookies |
| `/legal/diagnostic-terms` | Server-rendered | Términos del Diagnóstico Presencial |
| `/api/study` | API (POST) | Endpoint del formulario de solicitud |
| `/icon.svg` | Static | Favicon (L monogram + gold dot) |
| `/robots.txt` | Static | robots.txt |
| `/sitemap.xml` | Static | Sitemap con `alternates.languages` |
| `/_not-found` | Server-rendered | 404 |

URLs no llevan prefijo de locale (`localePrefix: "as-needed"`) — el sitio es 100% español.

---

## i18n

- Único locale activo: `es` (default).
- Estructura preparada para añadir `en`: basta con crear `messages/en.json` y añadir `"en"` a `locales` en `src/i18n/routing.ts`. Las URLs pasarán a tener prefijo `/en/` automáticamente.
- Todas las claves en `messages/es.json` están en inglés; los valores visibles al usuario están en español.

---

## Convenciones

Resumen de las reglas del proyecto:

- Sin comentarios en código, sin emojis.
- Mobile-first, sin CSS inline salvo necesidad estricta.
- TypeScript estricto, **sin `any`**.
- Named exports, kebab-case para archivos, un componente por archivo.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`).
- **Después de cualquier cambio**: `pnpm lint` y `pnpm typecheck` antes de commit.

> Las skills de OpenCode/Claude (`.agents/skills/`, `AGENTS.md`, `CLAUDE.md`, `skills-lock.json`) son **archivos locales de desarrollo de agentes** y están listados en `.gitignore` — no forman parte del repositorio.

---

## Pendiente (futuras integraciones)

- **Stripe** para el pago de 125 € del Diagnóstico.
- **Cal.com o Google Calendar** para reservas reales (actualmente la sección "Diagnóstico" muestra "Próximamente").
- **Upstash Redis** para rate limit distribuido entre instancias serverless.
- **HubSpot o Supabase** para CRM ligero y etiquetado de leads.
- **GA4 + Meta Pixel** con Consent Mode v2 y capa de cookies con consentimiento real (no solo el checkbox de la política).
- **Blog en MDX** (la infraestructura ya está instalada pero no hay contenido).
- **@vercel/analytics** y **@vercel/speed-insights** para observabilidad.

---

## Licencia

Privado y confidencial. Todos los derechos reservados.
