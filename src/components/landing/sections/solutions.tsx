"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Handshake,
  Scale,
  FileText,
  Network
} from "lucide-react";

const ICONS = [Handshake, Scale, FileText, Network];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function Solutions() {
  const t = useTranslations("solutions");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
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
            id="solutions-title"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-cream text-balance"
          >
            {t("title")}
          </h2>
        </motion.div>

        <ul className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Handshake;
            return (
              <motion.li
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                className="group relative flex flex-col rounded-xl border border-line bg-ink-soft p-6 hover:border-gold/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 border border-gold/20 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-cream">{item.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
