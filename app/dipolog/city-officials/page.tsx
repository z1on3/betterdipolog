import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import CityOfficialsClient from "./CityOfficialsClient";

export const metadata: Metadata = {
  title: "City Officials",
  description:
    "Meet the elected leaders of Dipolog City for 2025–2028: the City Mayor, Vice Mayor, and the members and committees of the 18th Sangguniang Panlungsod.",
};

export default function CityOfficialsPage() {
  // We use a combination of CollectionPage and GovernmentOrganization schema
  // to give Google the most accurate context about what this page represents.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dipolog City Officials Directory",
    description:
      "The elected leaders of Dipolog City comprising the Executive and Legislative branches.",
    url: "https://betterdipolog.org/dipolog/city-officials",
    about: {
      "@type": "GovernmentOrganization",
      name: "City Government of Dipolog",
      address: {
        "@type": "PostalAddress",
        streetAddress: "City Hall, Rizal Avenue",
        addressLocality: "Dipolog City",
        postalCode: "7100",
        addressRegion: "Zamboanga del Norte",
        addressCountry: "PH",
      },
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* The Client Component containing the layout grid */}
      <CityOfficialsClient />
    </>
  );
}
