const ADDRESS = {
  street: "Calle Santa Hortensia 22, Local B",
  postalCode: "28002",
  locality: "Madrid",
  region: "Madrid",
  country: "ES",
};

const PHONE = "+34 900 877 289";
const EMAIL = "info@lexinvesta.es";
const OWNER = "Daniel Rodríguez Sánchez-Galarraga";
const BRAND = "LexInvesta";

function organizationData() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://lexinvesta.es/#organization",
    name: BRAND,
    alternateName: "Lex Investa",
    url: "https://lexinvesta.es",
    logo: "https://lexinvesta.es/icon.svg",
    description:
      "Intermediación y resolución de conflictos financieros. Negociación de deudas, Ley de Segunda Oportunidad y reclamaciones financieras en Madrid.",
    founder: {
      "@type": "Person",
      name: OWNER,
    },
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      postalCode: ADDRESS.postalCode,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.4466162,
      longitude: -3.6753893,
    },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    serviceType: [
      "Negociación de deudas",
      "Ley de Segunda Oportunidad",
      "Reclamaciones financieras",
      "Intermediación con acreedores",
      "Diagnóstico financiero estratégico presencial",
    ],
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [],
  };
}

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData()) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Diagnóstico Presencial",
    provider: { "@id": "https://lexinvesta.es/#organization" },
    areaServed: { "@type": "Country", name: "España" },
    description:
      "Sesión privada de análisis, estrategia y orientación de hasta 60 minutos en oficina de Madrid, orientada a personas con deudas, embargos o reclamaciones.",
    offers: {
      "@type": "Offer",
      price: "125.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: "https://lexinvesta.es/#diagnostic",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
