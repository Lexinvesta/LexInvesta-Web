import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Hero } from "@/components/landing/sections/hero";
import { Problem } from "@/components/landing/sections/problem";
import { Solutions } from "@/components/landing/sections/solutions";
import { Diagnostic } from "@/components/landing/sections/diagnostic";
import { Process } from "@/components/landing/sections/process";
import { Trust } from "@/components/landing/sections/trust";
import { FAQ } from "@/components/landing/sections/faq";
import { Contact } from "@/components/landing/sections/contact";
import { OrganizationJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es")) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("faq");
  const faqItems = t.raw("items") as Array<{ question: string; answer: string }>;

  return (
    <>
      <OrganizationJsonLd />
      <ServiceJsonLd />
      <FaqJsonLd items={faqItems} />
      <SiteHeader />
      <main id="main" className="pt-20">
        <Hero />
        <Problem />
        <Solutions />
        <Diagnostic />
        <Process />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
