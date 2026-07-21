"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Bell, Check, Clock, MapPin, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function Diagnostic() {
  const t = useTranslations("diagnostic");
  const includes = t.raw("includes.items") as string[];
  const terms = t.raw("terms.items") as string[];

  return (
    <section
      id="diagnostic"
      aria-labelledby="diagnostic-title"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-ink to-ink" />
      <div
        className="absolute inset-0 bg-grid opacity-30"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                {t("eyebrow")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                <Bell className="h-3 w-3" />
                {t("comingSoonBadge")}
              </span>
            </div>
            <h2
              id="diagnostic-title"
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-cream text-balance"
            >
              {t("title")}
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed text-pretty">
              {t("intro")}
            </p>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-ink-soft to-ink p-8 shadow-gold">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-soft uppercase tracking-wider">
                  {t("priceLabel")}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {t("comingSoonBadge")}
                </span>
              </div>
              <p className="mt-2 text-6xl font-serif font-semibold gold-gradient bg-clip-text text-transparent">
                {t("price")}
              </p>
              <p className="mt-3 text-xs text-muted-soft">{t("priceNote")}</p>

              <div className="mt-6 space-y-3 text-sm text-cream/80">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gold" />
                  <span>{t("duration")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>{t("location")}</span>
                </div>
              </div>

              <div
                className="mt-8 flex items-center justify-center gap-2 rounded-md border border-gold/30 bg-gold/5 px-4 py-3 text-sm font-medium text-gold"
                role="status"
              >
                <Bell className="h-4 w-4" />
                <span>{t("availabilityNote")}</span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <h3 className="text-xl font-semibold text-cream mb-6">
                {t("includes.title")}
              </h3>
              <ul className="space-y-4">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                      <Check className="h-3 w-3 text-gold" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="rounded-xl border border-line bg-ink-soft/50 p-6"
            >
              <h3 className="text-base font-semibold text-cream mb-4">
                {t("terms.title")}
              </h3>
              <ul className="space-y-3 text-xs text-muted leading-relaxed">
                {terms.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
