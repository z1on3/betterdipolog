import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import BarangaysClient from "./BarangaysClient";

export const metadata: Metadata = {
  title: "Barangay Directory",
  description:
    "Explore the directory of Dipolog City's 21 barangays, including Punong Barangays, barangay officials, urban/rural classification, and 2020 census population.",
};

export default function BarangaysPage() {
  // Injecting a CollectionPage schema tells Google this page is a directory/list
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dipolog City Barangay Directory",
    description:
      "Directory of Dipolog City's 21 barangays, including Punong Barangays and barangay officials.",
    url: "https://betterdipolog.org/dipolog/barangays",
    isPartOf: {
      "@type": "WebSite",
      name: "BetterDipolog",
      url: "https://betterdipolog.org/",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data Injection for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <BarangaysClient />
    </>
  );
}
