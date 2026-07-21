"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { key: "solutions", href: "#solutions" },
  { key: "diagnostic", href: "#diagnostic" },
  { key: "process", href: "#process" },
  { key: "method", href: "#trust" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label={t("homeAriaLabel")}
          >
            <span className="text-2xl font-serif font-semibold tracking-tight text-cream group-hover:text-gold transition-colors">
              Lex<span className="text-gold">Investa</span>
            </span>
          </Link>

          <nav
            aria-label={t("primaryNav")}
            className="hidden lg:flex items-center gap-8"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm text-cream/70 hover:text-gold transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-cream/80">
              <a href="#contact">{t("studyCta")}</a>
            </Button>
            <Button asChild size="sm">
              <a href="#diagnostic">{t("bookCta")}</a>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-cream hover:bg-cream/5"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-line bg-ink-soft"
        >
          <nav
            aria-label={t("mobileNav")}
            className="flex flex-col px-4 py-6 space-y-1"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-base text-cream/80 hover:text-gold hover:bg-cream/5 rounded-md transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button asChild variant="secondary" className="w-full">
                <a href="#contact" onClick={() => setOpen(false)}>
                  {t("studyCta")}
                </a>
              </Button>
              <Button asChild className="w-full">
                <a href="#diagnostic" onClick={() => setOpen(false)}>
                  {t("bookCta")}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
