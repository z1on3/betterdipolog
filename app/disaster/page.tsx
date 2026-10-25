import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import HotlinesSection from "./HotlinesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuidesSection from "./GuidesSection";
import EmergencyQuickCall from "./EmergencyQuickCall";

export const metadata: Metadata = {
  title: "Dipolog City Disaster Preparedness Hub",
  description:
    "Emergency hotlines and typhoon, flood, and earthquake preparedness guides for Dipolog City.",
};

const REFERENCES = [
  {
    title: "NDRRMC — National Disaster Risk Reduction and Management Council",
    url: "https://ndrrmc.gov.ph/",
  },
  {
    title: "PAGASA — Weather advisories and rainfall warnings",
    url: "https://www.pagasa.dost.gov.ph/",
  },
  {
    title: "Philippine Red Cross — Safety and preparedness resources",
    url: "https://redcross.org.ph/",
  },
  { title: "Dipolog City Government", url: "https://dipologcity.gov.ph/" },
];

export default function DisasterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Dipolog City Disaster Preparedness Hub",
    description:
      "Community-maintained emergency hotlines and disaster preparedness guides for Dipolog City.",
    url: "https://betterdipolog.org/disaster",
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SubpageNav href="/" text="Go Home" />
      <SubpageHero>
        <SubpageHero.Title>Disaster Preparedness</SubpageHero.Title>
        <SubpageHero.Description>
          Emergency numbers, a facilities map, and simple what-to-do guides for
          Dipolognons — all on one fast page.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto space-y-10 px-4 py-8 md:px-6">
        <EmergencyQuickCall />

        <div
          role="note"
          className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
        >
          <ShieldAlert
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
          <p>
            Community-maintained — <strong>not an official LGU channel</strong>.
            In an emergency, always follow the Dipolog City CDRRMO and your
            barangay officials. Every number lists its source and verify date.
          </p>
        </div>

        <FacilitiesSection />
        <HotlinesSection />
        <GuidesSection />

        <ReferencesFooter
          references={REFERENCES}
          disclaimer="Compiled by volunteers from publicly available sources. Verify critical information with the Dipolog City CDRRMO."
        />
      </div>
    </main>
  );
}
