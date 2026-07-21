"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Lock, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink pt-12 pb-20 sm:pt-16 sm:pb-28"
    >
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/50 to-ink"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {t("eyebrow")}
            </motion.div>

            <motion.h1
              id="hero-title"
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-cream leading-[1.05] text-balance"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl text-pretty"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#contact">
                  {t("primaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <a href="#diagnostic">{t("secondaryCta")}</a>
              </Button>
            </motion.div>

            <motion.ul
              initial="hidden"
              animate="show"
              custom={4}
              variants={fadeUp}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl"
            >
              {t.raw("trust").map((item: string) => (
                <li key={item} className="flex items-start gap-2 text-sm text-cream/80">
                  <Check className="h-4 w-4 mt-0.5 text-gold shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              initial="hidden"
              animate="show"
              custom={5}
              variants={fadeUp}
              className="mt-6 text-xs text-muted-soft italic"
            >
              {t("disclaimer")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/5 to-transparent border border-gold/20" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(184,149,66,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(184,149,66,0.3) 0%, transparent 50%)",
                  }}
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-ink via-ink/40 to-transparent rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                    <Lock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-soft">{t("card.confidentialityLabel")}</p>
                    <p className="text-sm text-cream font-medium">{t("card.confidentialityValue")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                    <MessageCircle className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-soft">{t("card.responseTimeLabel")}</p>
                    <p className="text-sm text-cream font-medium">{t("card.responseTimeValue")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                    <ShieldCheck className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-soft">{t("card.firstGuidanceLabel")}</p>
                    <p className="text-sm text-cream font-medium">{t("card.firstGuidanceValue")}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
