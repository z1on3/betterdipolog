import { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import BudgetInteractive from "./BudgetInteractive";

import { BudgetData } from "@/validations/budgetSchema";
import rawBudgetData from "@/data/dipolog/budget.json";

// --- FORCE STATIC EXPORT TO SAVE CPU ---
export const dynamic = "force-static";

// --- BYPASS ZOD PARSING ---
const budgetData = rawBudgetData as BudgetData;

export const metadata: Metadata = {
  title: "Budget & Finances",
  description:
    "See where Dipolog City's revenue comes from and where it's spent, sourced from the Bureau of Local Government Finance's Statement of Receipts and Expenditures, plus links to the city's own budget and procurement documents.",
};

// Financial documents posted on the City Government of Dipolog website.
const CITY_DOCUMENTS = [
  {
    title:
      "Program of Appropriations for COVID-19 Related Expenses (Bayanihan Grant, ₱60,193,212.00), 2020",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2020/06/Disclosure002.pdf",
  },
  {
    title: "Bayanihan Grant (BGCM) fund utilization report, May 2020 (page 1)",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2020/06/Disclosure003.pdf",
  },
  {
    title: "Bayanihan Grant (BGCM) fund utilization report, May 2020 (page 2)",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2020/06/Disclosure004.pdf",
  },
  {
    title: "Annual Procurement Plan 2026",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2026/01/app_transmittal_postingcert_app2026.pdf",
  },
  {
    title: "Annual Procurement Plan 2025",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2025/09/Dipolog-APP-2025-.pdf",
  },
  {
    title: "Annual Procurement Plan 2023",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2023/02/LGU-Dipolog-APP-2023.pdf",
  },
  {
    title: "Annual Procurement Plan 2022",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2022/02/2022-APP.pdf",
  },
  {
    title: "Procurement Monitoring Report, 2nd Semester 2022",
    url: "https://dipologcity.gov.ph/wp-content/uploads/2023/03/PMR-2nd-Sem-2022.pdf",
  },
  {
    title: "Procurement Monitoring Reports (latest on the city site)",
    url: "https://dipologcity.gov.ph/procurement-monitoring-report/",
  },
];

export default function BudgetPage() {
  const latest = budgetData.years[budgetData.years.length - 1];

  const budgetReferences = [
    {
      title:
        "Bureau of Local Government Finance — Statement of Receipts and Expenditures by LGU (FY2022, FY2023, FY2024 Preliminary, FY2025 Preliminary), row: Region IX / Zamboanga del Norte / Dipolog City",
      url: "https://blgf.gov.ph/lgu-fiscal-data/",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <SubpageNav href="/transparency" text="Back to Transparency" />
      <SubpageHero>
        <SubpageHero.Badges>
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase">
            Public Finance · FY{latest.fiscalYear}{" "}
            {latest.status === "preliminary" && "(Preliminary)"}
          </span>
        </SubpageHero.Badges>
        <SubpageHero.Title>Budget & Finances</SubpageHero.Title>
        <SubpageHero.Description>
          What Dipolog City collected and spent each year, as reported by the
          City Treasurer to the Bureau of Local Government Finance (BLGF) in the
          Statement of Receipts and Expenditures.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-6 md:px-6 md:py-12">
        {/* --- ISOLATED CLIENT COMPONENT --- */}
        <BudgetInteractive data={budgetData} />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
          <h2 className="mb-1 text-lg font-bold text-slate-900">
            City budget & procurement documents
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Posted by the City Government of Dipolog under its disclosure pages.
            These open the city&apos;s own files.
          </p>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {CITY_DOCUMENTS.map((doc) => (
              <li key={doc.url}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 transition-colors hover:bg-blue-50"
                >
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                    {doc.title}
                  </span>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <ReferencesFooter
          references={budgetReferences}
          disclaimer="Figures are taken from BLGF's per-LGU Statement of Receipts and Expenditures files (values converted from pesos to millions and rounded). FY2024 and FY2025 are labeled preliminary by BLGF and may be revised. Expenditure here means current operating expenditures; capital outlay is shown separately."
        />
      </div>
    </main>
  );
}
