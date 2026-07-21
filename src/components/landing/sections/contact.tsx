"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { StudyForm } from "@/components/forms/study-form";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Contact() {
  const t = useTranslations("contact");
  const highlights = t.raw("highlights") as string[];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:sticky lg:top-28"
          >
            <p className="text-sm font-medium text-gold tracking-wider uppercase">
              {t("eyebrow")}
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-cream text-balance"
            >
              {t("title")}
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed text-pretty">
              {t("intro")}
            </p>

            <ul className="mt-10 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-xl border border-line bg-ink-soft/50 p-5 space-y-3 text-sm">
              <p className="flex items-start gap-3 text-muted">
                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" aria-hidden="true" />
                <span>{t("contactInfo.address")}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a href="tel:+34900877289" className="text-muted hover:text-gold transition-colors">
                  {t("contactInfo.phone")}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@lexinvesta.es"
                  className="text-muted hover:text-gold transition-colors"
                >
                  {t("contactInfo.email")}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/34611847163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-gold transition-colors"
                >
                  +34 611 847 163
                </a>
              </p>
              <p className="flex items-center gap-3 text-muted-soft">
                <Clock className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <span>{t("contactInfo.hours")}</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <div className="rounded-2xl border border-line bg-ink-soft p-6 sm:p-8 shadow-soft">
              <StudyForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
