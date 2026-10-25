import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Landmark,
  MapPin,
  ScrollText,
} from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import FilterGrid from "@/components/ui/FilterGrid";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import navigation from "@/data/navigation.json";

const section = navigation.find((item) => item.href === "/dipolog");

export const metadata: Metadata = {
  title: "All About Dipolog",
  description:
    "Overview of Dipolog City, the capital of Zamboanga del Norte and Gateway to Western Mindanao — its history, culture, festivals, and key facts.",
};

const AT_A_GLANCE = [
  { label: "Province", value: "Zamboanga del Norte (capital)" },
  { label: "Region", value: "Zamboanga Peninsula (Region IX)" },
  { label: "Population", value: "136,528 (2024 POPCEN)" },
  { label: "Barangays", value: "21 (5 urban, 16 rural)" },
  { label: "Income class", value: "2nd class component city" },
  { label: "Chartered", value: "July 1, 1970 · R.A. 5520" },
];

const HISTORY = [
  {
    year: "1834",
    text: "Dipolog's earliest recorded history begins when the Spanish organized the civil government of Misamis Province, which included Dipolog as a barrio of Dapitan. Don Domingo Ruiz led the community as its first “Capitan”.",
  },
  {
    year: "1894",
    text: "The first Mass was celebrated on June 29, 1894 at what is now the Cathedral of Our Lady of the Holy Rosary, whose altar was designed by Dr. José Rizal during his exile in Dapitan.",
  },
  {
    year: "1913",
    text: "Dipolog became a municipality on July 1, 1913. The main structure and façade of the old municipal hall are preserved as part of today's City Hall.",
  },
  {
    year: "1942",
    text: "The seat of the provincial government of Zamboanga was transferred from Zamboanga City to Dipolog, making it the de facto capital of Zamboanga Province.",
  },
  {
    year: "1952",
    text: "On June 5, 1952, R.A. 711 divided Zamboanga into Zamboanga del Norte and Zamboanga del Sur, and Dipolog became the capital of Zamboanga del Norte.",
  },
  {
    year: "1970",
    text: "R.A. 5520 made Dipolog a chartered city, effective July 1, 1970 — celebrated every year as Araw ng Dipolog.",
  },
];

const FESTIVALS = [
  { name: "Sinulog sa Dipolog", when: "4th Saturday of January" },
  { name: "Katkat Sakripisyo", when: "Good Friday" },
  {
    name: "Dipolog P'gsalabuk Festival",
    when: "3rd week of April to 4th Saturday of May",
  },
  { name: "Feast of St. Vincent Ferrer", when: "3rd Saturday of May" },
  { name: "Araw ng Dipolog", when: "July 1" },
  {
    name: "Dahunog sa Dipolog",
    when: "Last week of September to October 7",
  },
  { name: "Feast of Our Lady of the Holy Rosary", when: "October 7" },
  { name: "Pasko sa Dipolog (PASADI)", when: "December" },
];

const references = [
  {
    title:
      "dipologcity.gov.ph — Socio-Economic Profile (history, charter, local festivals)",
    url: "https://dipologcity.gov.ph/socio-economic-profile/",
  },
  {
    title:
      "dipologcity.gov.ph — Quick Facts (geography, people, languages, industries)",
    url: "https://dipologcity.gov.ph/quick-facts/",
  },
  {
    title:
      "PSA — Region IX population, 2024 Census of Population (City of Dipolog: 136,528)",
    url: "https://psa.gov.ph/content/highlights-region-ix-zamboanga-peninsula-population-2024-census-population-2024-popcen",
  },
  {
    title: "BLGF — LGU income classification (DOF D.O. No. 074-2024)",
    url: "https://blgf.gov.ph/lgu-income-class/",
  },
  {
    title: "Wikipedia — Dipolog (patron saint)",
    url: "https://en.wikipedia.org/wiki/Dipolog",
  },
];

export default function DipologOverviewPage() {
  const directoryItems = (section?.dropdown ?? []).filter(
    (item) => item.href !== "/dipolog" && item.href !== "#",
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/" text="Go Home" />
      <SubpageHero>
        <SubpageHero.Badges>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            <MapPin className="h-3.5 w-3.5" /> Zamboanga del Norte
          </span>
        </SubpageHero.Badges>
        <SubpageHero.Title>All About Dipolog</SubpageHero.Title>
        <SubpageHero.Description>
          Dipolog City is the capital of Zamboanga del Norte and the “Gateway to
          Western Mindanao and Zamboanga Peninsula” — a coastal city facing the
          Sulu Sea at the northwestern tip of the Zamboanga Peninsula, and the
          province&apos;s center of services and trade.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
        {/* At a glance */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />{" "}
            At a glance
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AT_A_GLANCE.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {fact.label}
                </p>
                <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            The Subanen were Dipolog&apos;s original inhabitants, later joined
            by Muslim traders and migrants from Luzon and the Visayas, with
            Chinese and Spanish among the first foreign settlers. Today
            Dipolognons speak mainly Cebuano, with English and Filipino widely
            understood and Subanon still used in the highlands. The city&apos;s
            economy is rooted in agriculture and fishing — coconut, rice, corn,
            fish, and its well-known bottled sardines — alongside construction,
            trade, and services.{" "}
            <Link
              href="/dipolog/city-stats"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              See the full city profile →
            </Link>
          </p>
        </section>

        {/* History */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            <ScrollText className="h-6 w-6 text-blue-600 dark:text-blue-400" />{" "}
            History
          </h2>
          <ol className="relative space-y-5 border-l-2 border-blue-100 pl-6 dark:border-blue-900">
            {HISTORY.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute top-1 -left-7.75 h-3 w-3 rounded-full border-2 border-white bg-blue-600 ring-2 ring-blue-100 dark:ring-blue-800" />
                <p className="text-sm font-black text-blue-700 dark:text-blue-300">
                  {entry.year}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {entry.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Culture & festivals */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />{" "}
            Culture & festivals
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Dipolog is predominantly Roman Catholic, and much of its calendar
            follows the faith — from the Sinulog in January to the feast of the
            city&apos;s patroness, Our Lady of the Holy Rosary, every October 7.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FESTIVALS.map((festival) => (
              <div
                key={festival.name}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="shrink-0 rounded-lg bg-amber-50 p-2 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                  <Landmark className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    {festival.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {festival.when}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Directory of Dipolog pages */}
      {directoryItems.length > 0 && (
        <FilterGrid>
          <FilterGrid.Content
            title="Explore Dipolog"
            itemCount={directoryItems.length}
            columns={2}
            hasSidebar={false}
          >
            {directoryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
              >
                <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
                  <Building2 className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-1 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </FilterGrid.Content>
        </FilterGrid>
      )}

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ReferencesFooter references={references} />
      </div>
    </main>
  );
}
