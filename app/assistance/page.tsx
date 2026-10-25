import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import { assistancePrograms } from "@/data/assistance";
import AssistanceClient from "./AssistanceClient";

export const metadata: Metadata = {
  title: "Scholarships & Assistance",
  description:
    "Scholarships and financial-assistance programs open to Dipolog City residents — the city scholarship program and CSWDO crisis assistance, plus national programs from CHED, DOST-SEI, TESDA, and DSWD.",
};

export default function AssistancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Scholarships & Assistance Programs for Dipolog City",
    description:
      "Community-maintained directory of scholarships and financial-assistance programs available to Dipolog City residents.",
    url: "https://betterdipolog.org/assistance",
    itemListElement: assistancePrograms.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "GovernmentService",
        name: p.name,
        provider: { "@type": "GovernmentOrganization", name: p.provider },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <AssistanceClient programs={assistancePrograms} />
    </>
  );
}
