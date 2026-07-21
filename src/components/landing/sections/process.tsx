"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function Process() {
  const t = useTranslations("process");
  const items = t.raw("items") as Array<{
    step: string;
    title: string;
    description: string;
  }>;

  return (
    <section
      id="process"
      aria-labelledby="process-title"
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
            id="process-title"
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-cream text-balance"
          >
            {t("title")}
          </h2>
        </motion.div>

        <ol className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.li
              key={item.step}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              variants={fadeUp}
              className="relative"
            >
              <div className="text-7xl font-serif font-semibold text-gold/20 leading-none">
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-cream">{item.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {item.description}
              </p>
              {i < items.length - 1 && (
                <div
                  className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-gold/30"
                  aria-hidden="true"
                />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
