"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section
      aria-labelledby="problem-title"
      className="relative py-20 sm:py-28 bg-ink-soft"
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
            id="problem-title"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-cream text-balance"
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed text-pretty">
            {t("intro")}
          </p>
        </motion.div>

        <ul className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              variants={fadeUp}
              className="group relative rounded-xl border border-line bg-ink/50 p-6 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/20 text-gold">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={items.length}
          variants={fadeUp}
          className="mt-12 text-base text-cream/80 italic max-w-3xl text-pretty"
        >
          {t("outro")}
        </motion.p>
      </div>
    </section>
  );
}
