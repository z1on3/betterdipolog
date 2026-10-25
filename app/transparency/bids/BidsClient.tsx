"use client";

import { useMemo, useState } from "react";
import { ExternalLink, FileText, Search } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import FilterGrid from "@/components/ui/FilterGrid";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import BidCard from "@/components/BidCard";
import {
  AWARD_LABELS,
  BidsData,
  formatNoticeDate,
} from "@/validations/bidSchema";
import rawBidsData from "@/data/dipolog/bids.json";

const bidsData = rawBidsData as BidsData;

const EPROCUREMENT_URL = "https://eprocurement.dipologcity.gov.ph/";
const CHECKLIST_URL =
  "https://dipologcity.gov.ph/wp-content/uploads/2022/11/2022-dipolog-checklist.pdf";

export default function BidsClient() {
  const years = useMemo(
    () =>
      Array.from(new Set(bidsData.notices.map((n) => n.year))).sort(
        (a, b) => b - a,
      ),
    [],
  );
  const [selectedYear, setSelectedYear] = useState<number | "All">(
    years[0] ?? "All",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return bidsData.notices.filter((n) => {
      const matchesYear = selectedYear === "All" || n.year === selectedYear;
      const haystack = [
        n.date ? formatNoticeDate(n.date) : "",
        n.date ?? "",
        n.note ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return matchesYear && (query === "" || haystack.includes(query));
    });
  }, [selectedYear, searchQuery]);

  const bidsReferences = [
    bidsData.source,
    {
      title: "City Government of Dipolog — eProcurement portal",
      url: EPROCUREMENT_URL,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/transparency" text="Back to Transparency" />
      <SubpageHero>
        <SubpageHero.Title>Bids & Awards</SubpageHero.Title>
        <SubpageHero.Description>
          Invitations to bid posted by the Bids and Awards Committee (BAC) of
          the City Government of Dipolog, newest first. Each link opens the
          city&apos;s own PDF, labeled with the date shown on the city&apos;s
          Bids and Awards page.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto px-4 pt-6 md:px-6">
        <div className="group relative mx-auto mb-2 max-w-2xl">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400" />
          <input
            type="text"
            placeholder="Search by date or label (e.g. October 2026, Additional)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-base text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
        <div className="mb-4 flex justify-center">
          <div className="inline-flex flex-wrap rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
            {(["All", ...years] as const).map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${selectedYear === y ? "bg-emerald-700 text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"}`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <FilterGrid className="py-0! md:py-0!">
        <FilterGrid.Content
          title="Bid Notices"
          itemCount={filtered.length}
          hasSidebar={false}
        >
          {filtered.length > 0 ? (
            <div className="col-span-full flex flex-col gap-3">
              {filtered.map((n) => (
                <BidCard key={n.pdfUrl} bid={n} />
              ))}
            </div>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 rounded-full bg-slate-50 p-4 dark:bg-slate-950">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                No bid notices found
              </h3>
              <p className="mx-auto max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Try a different search term or year.
              </p>
            </div>
          )}
        </FilterGrid.Content>
      </FilterGrid>

      <div className="container mx-auto space-y-6 px-4 pt-8 md:px-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-100">
            Notices of Award & Notices to Proceed (2023)
          </h2>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Monthly compilations posted on the city&apos;s Bids and Awards page.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(["NOA", "NTP"] as const).map((type) => (
              <div key={type}>
                <h3 className="mb-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                  {AWARD_LABELS[type]}
                </h3>
                <ul className="space-y-2">
                  {bidsData.awards
                    .filter((a) => a.type === type)
                    .map((a) => (
                      <li key={a.pdfUrl}>
                        <a
                          href={a.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 transition-colors hover:bg-blue-50 dark:bg-slate-950 dark:hover:bg-blue-950/40"
                        >
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 dark:text-slate-300 dark:group-hover:text-blue-300">
                            {a.period}
                          </span>
                          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">
            More procurement records
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={EPROCUREMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-300"
              >
                Dipolog City eProcurement portal
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-slate-500 dark:text-slate-400">
                {" "}
                — the city&apos;s online procurement system (may be
                intermittently unavailable).
              </span>
            </li>
            <li>
              <a
                href={CHECKLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-300"
              >
                Dipolog checklist of technical and financial documents
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-slate-500 dark:text-slate-400">
                {" "}
                — for prospective bidders.
              </span>
            </li>
            <li>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                2019 BAC minutes of the meeting:
              </span>{" "}
              {bidsData.bacMinutes.map((m, idx) => (
                <span key={m.pdfUrl}>
                  <a
                    href={m.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline dark:text-blue-300"
                  >
                    {m.period.replace(` ${m.year}`, "")}
                  </a>
                  {idx < bidsData.bacMinutes.length - 1 ? ", " : ""}
                </span>
              ))}
            </li>
          </ul>
        </section>

        <ReferencesFooter
          references={bidsReferences}
          disclaimer={`Links were collected from the city's Bids and Awards page (retrieved ${bidsData.retrievedAt}) and point to the city's own PDFs; BetterDipolog does not host or edit them. Dates and labels are as shown on the city page, and a few file names on the city site do not match their labels.`}
        />
      </div>
    </main>
  );
}
