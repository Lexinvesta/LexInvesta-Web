"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const PHONE = "34611847163";

export function WhatsAppFloat() {
  const t = useTranslations("whatsapp");
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t("defaultMessage"))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      title={t("tooltip")}
      className={`fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
