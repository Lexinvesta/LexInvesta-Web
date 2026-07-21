import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-2xl font-serif font-semibold mb-4">
              Lex<span className="text-gold">Investa</span>
            </p>
            <p className="text-sm text-muted leading-relaxed">{t("disclaimer")}</p>
            <p className="mt-4 text-xs text-muted-soft italic">{t("noPromises")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cream mb-4 tracking-wider uppercase">
              {t("legal")}
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <Link
                  href="/legal/legal-notice"
                  className="hover:text-gold transition-colors"
                >
                  {t("legalNotice")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="hover:text-gold transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="hover:text-gold transition-colors"
                >
                  {t("cookies")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/diagnostic-terms"
                  className="hover:text-gold transition-colors"
                >
                  {t("diagnosticTerms")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-cream mb-4 tracking-wider uppercase">
              {t("contact")}
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" aria-hidden="true" />
                <span>
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a href="tel:+34900877289" className="hover:text-gold transition-colors">
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/34611847163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {t("whatsapp")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
                <a href="mailto:info@lexinvesta.es" className="hover:text-gold transition-colors">
                  info@lexinvesta.es
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line text-xs text-muted-soft text-center">
          {t("rights", { year })}
        </div>
      </div>
    </footer>
  );
}
