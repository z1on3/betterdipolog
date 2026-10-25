import { Metadata } from "next";

import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import ResolutionsInteractive from "./ResolutionsInteractive";

import { ResolutionsData } from "@/validations/resolutionSchema";
import rawResolutionsData from "@/data/dipolog/resolutions.json";

const resolutionsData = rawResolutionsData as ResolutionsData;

export const metadata: Metadata = {
  title: "City Ordinances & Resolutions",
  description:
    "Search the ordinances and recent resolutions of the Sangguniang Panlungsod of Dipolog City, as listed in the SP's Legislative Information System.",
};

export default function ResolutionsPage() {
  const ordinanceCount = resolutionsData.entries.filter(
    (e) => e.type === "ordinance",
  ).length;
  const resolutionCount = resolutionsData.entries.length - ordinanceCount;

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <SubpageNav href="/transparency" text="Back to Transparency" />

      <SubpageHero>
        <SubpageHero.Title>City Ordinances & Resolutions</SubpageHero.Title>
        <SubpageHero.Description>
          What the Sangguniang Panlungsod of Dipolog City has passed, from the
          SP&apos;s own Legislative Information System. Includes{" "}
          {ordinanceCount.toLocaleString("en-PH")} ordinances and the{" "}
          {resolutionCount.toLocaleString("en-PH")} resolutions listed from{" "}
          {resolutionsData.resolutionsFrom} onward; the full archive of{" "}
          {resolutionsData.totals.resolutions.toLocaleString("en-PH")}{" "}
          resolutions is on the SP site.
        </SubpageHero.Description>
      </SubpageHero>

      {/* --- 3. PASS DATA TO CLIENT COMPONENT --- */}
      <ResolutionsInteractive data={resolutionsData} />

      <div className="container mx-auto px-4 md:px-6">
        <ReferencesFooter
          references={[resolutionsData.source]}
          disclaimer={`Titles, numbers, categories and dates are copied from the SP index as of ${resolutionsData.retrievedAt}. The index does not publish the full text. Its dates are not always enactment dates: many older records carry the date they were encoded. Records with no title were left out. For certified copies, contact the Office of the SP Secretary.`}
        />
      </div>
    </main>
  );
}
