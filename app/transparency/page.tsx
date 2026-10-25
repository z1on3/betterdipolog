import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Gavel,
  HardHat,
  Landmark,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import FilterGrid from "@/components/ui/FilterGrid";

export const metadata: Metadata = {
  title: "Transparency & Open Data",
  description:
    "Dipolog City's budget and finances, bids and awards, ordinances and resolutions, plus links to the city's disclosure documents and online procurement and financial portals.",
};

const DIRECTORIES = [
  {
    name: "Budget & Finances",
    href: "/transparency/budget",
    description:
      "Income and spending from BLGF's Statement of Receipts and Expenditures (FY2022 to FY2025), plus the city's appropriation and procurement plan documents.",
    icon: Wallet,
  },
  {
    name: "Projects",
    href: "/transparency/projects",
    description:
      "Infrastructure and social projects in Dipolog City from the DPWH transparency portal and the city's procurement reports and plans, each with its source and as-of date.",
    icon: HardHat,
  },
  {
    name: "Bids & Awards",
    href: "/transparency/bids",
    description:
      "Invitations to bid, notices of award and notices to proceed posted by the City's Bids and Awards Committee.",
    icon: Gavel,
  },
  {
    name: "Ordinances & Resolutions",
    href: "/transparency/resolutions",
    description:
      "Searchable ordinances and recent resolutions of the Sangguniang Panlungsod of Dipolog City.",
    icon: Landmark,
  },
];

const CITY_LINKS = [
  {
    name: "Philippine Transparency Seal",
    href: "https://dipologcity.gov.ph/philippine-transparency-seal/",
    description: "The city's Transparency Seal page on dipologcity.gov.ph.",
  },
  {
    name: "Citizen's Charter",
    href: "https://dipologcity.gov.ph/charter/",
    description:
      "Requirements, fees and processing times for city government services.",
  },
  {
    name: "Procurement Monitoring Reports",
    href: "https://dipologcity.gov.ph/procurement-monitoring-report/",
    description: "Semestral procurement monitoring reports (PMR).",
  },
  {
    name: "Annual Procurement Plan 2026",
    href: "https://dipologcity.gov.ph/wp-content/uploads/2026/01/app_transmittal_postingcert_app2026.pdf",
    description:
      "The city's 2026 APP with transmittal and posting certificate.",
  },
  {
    name: "Balanced Scorecard",
    href: "https://dipologcity.gov.ph/balanced-scorecard/",
    description: "The city government's performance scorecard.",
  },
  {
    name: "eProcurement Portal",
    href: "https://eprocurement.dipologcity.gov.ph/",
    description:
      "The City Government of Dipolog's online procurement system (may be intermittently unavailable).",
  },
  {
    name: "eFMIS Portal",
    href: "https://efmis.dipologcity.gov.ph/",
    description:
      "The city's electronic Financial Management Information System portal (may be intermittently unavailable).",
  },
  {
    name: "SP Legislative Information System",
    href: "https://spdipolog.net/",
    description:
      "The Sangguniang Panlungsod's full index of ordinances and resolutions.",
  },
];

export default function TransparencyDirectory() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/" text="Go Home" />
      <SubpageHero>
        <SubpageHero.Badges>
          <span className="inline-flex items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" /> Fiscal Accountability
          </span>
        </SubpageHero.Badges>
        <SubpageHero.Title>Transparency</SubpageHero.Title>
        <SubpageHero.Description>
          Public finance, procurement and legislative records for Dipolog City,
          gathered from the City Government, the Sangguniang Panlungsod and the
          Bureau of Local Government Finance.
        </SubpageHero.Description>
      </SubpageHero>

      <FilterGrid>
        <FilterGrid.Content
          title="Directories"
          itemCount={DIRECTORIES.length}
          columns={2}
          hasSidebar={false}
        >
          {DIRECTORIES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
              >
                <div className="shrink-0 rounded-xl bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-300">
                    {item.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <div className="mt-1 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            );
          })}
        </FilterGrid.Content>
      </FilterGrid>

      <FilterGrid className="pt-0! md:pt-0!">
        <FilterGrid.Content
          title="City Disclosure Documents & Portals"
          itemCount={CITY_LINKS.length}
          columns={2}
          hasSidebar={false}
        >
          {CITY_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
            >
              <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300">
                  {item.name}
                </h3>
                <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
              <div className="mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </FilterGrid.Content>
      </FilterGrid>
    </main>
  );
}
