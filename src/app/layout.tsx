import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { WhatsAppFloat } from "@/components/landing/whatsapp-float";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    metadataBase: new URL("https://lexinvesta.es"),
    title: {
      default: t("title"),
      template: `%s — LexInvesta`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "LexInvesta" }],
    creator: "LexInvesta",
    publisher: "LexInvesta",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: "https://lexinvesta.es",
      siteName: t("siteName"),
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://lexinvesta.es",
    },
    verification: {
      google: "t-ehf5490GbJsVA5mEmnDMa3VjEMVoNRZtoLsJpq6bk",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  if (!routing.locales.includes(locale as "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink text-cream antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
