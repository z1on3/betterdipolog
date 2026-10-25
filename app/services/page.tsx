import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import ServicesClient from "./ServicesClient";

// 1. STATIC METADATA (Server Side)
export const metadata: Metadata = {
  title: "Dipolog City Services Directory",
  description:
    "Explore Dipolog City government services, Citizen's Charter requirements and procedures, and online services in one directory.",
};

// 2. MAIN PAGE COMPONENT (Server Side)
export default function ServicesDirectoryPage() {
  // Generate Schema.org JSON-LD specifically for a Directory/Collection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dipolog City Services Directory",
    description:
      "A directory of City Government of Dipolog services, application procedures, and community resources.",
    url: "https://betterdipolog.org/services",
  };

  return (
    <>
      {/* Inject the invisible SEO script into the HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <ServicesClient />
    </>
  );
}
