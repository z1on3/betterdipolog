import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import { allAgencies } from "@/data/government";
import DirectoryClient from "./DirectoryClient";

// 1. STATIC METADATA (Server Side)
export const metadata: Metadata = {
  title: "National Agencies in Dipolog City",
  description:
    "Find addresses, contact information, and maps for national government agencies and government corporations with offices in Dipolog City, Zamboanga del Norte.",
};

// 2. MAIN PAGE COMPONENT (Server Side)
export default function GovernmentDirectoryPage() {
  // Generate Schema.org JSON-LD specifically for a Directory/Collection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dipolog City Government Directory",
    description:
      "Directory of national agencies, GOCCs, and public offices in Dipolog City.",
    url: "https://betterdipolog.org/government/directory",
    about: {
      "@type": "City",
      name: "Dipolog City",
    },
  };

  return (
    <>
      {/* Inject the invisible SEO script into the HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Render your interactive Client UI */}
      <DirectoryClient allAgencies={allAgencies} />
    </>
  );
}
