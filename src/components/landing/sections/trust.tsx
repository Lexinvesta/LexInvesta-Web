"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lock, UserCheck, Users, Activity } from "lucide-react";

const ICONS = [Lock, UserCheck, Users, Activity];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function Trust() {
  const t = useTranslations("trust");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-gold tracking-wider uppercase">
            {t("eyebrow")}
          </p>
          <h2
            id="trust-title"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-cream text-balance"
          >
            {t("title")}
          </h2>
        </motion.div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Lock;
            return (
              <motion.li
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="relative flex items-start gap-4 rounded-xl border border-line bg-ink-soft/40 p-6 hover:border-gold/30 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/20 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
