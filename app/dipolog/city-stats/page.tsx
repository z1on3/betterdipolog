import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import CityStatsClient from "./CityStatsClient";

// 1. STATIC METADATA (Server Side)
// Because this page isn't dynamic (it's always Dipolog City), we don't need generateMetadata.
export const metadata: Metadata = {
  title: "Dipolog City Profile, Statistics & Demographics",
  description:
    "Official statistics, demographics, government, economy, land use, and infrastructure data for Dipolog City, the capital of Zamboanga del Norte and Gateway to Western Mindanao.",
};

// 2. MAIN PAGE COMPONENT (Server Side)
export default function CityStatsPage() {
  // Generate Schema.org JSON-LD specifically for a City/Place
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "City",
    name: "Dipolog City",
    alternateName: "Gateway to Western Mindanao",
    description:
      "City profile, demographics, and statistics for Dipolog City, Zamboanga del Norte, Philippines.",
    url: "https://betterdipolog.org/dipolog/city-stats",
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Zamboanga del Norte",
      containedInPlace: {
        "@type": "Country",
        name: "Philippines",
      },
    },
  };

  return (
    <>
      {/* Inject the invisible SEO script into the HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <CityStatsClient />
    </>
  );
}
