import { Metadata } from "next";
import { CalendarDays, Info } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import { festivals } from "@/data/travel";

export const metadata: Metadata = {
  title: "Festivals & Events",
  description:
    "Dipolog City's yearly festivals and celebrations — Sinulog sa Dipolog, Katkat Sakripisyo, P'gsalabuk, Adlaw sa Dipolog, Dahunog sa Dipolog, Pasko sa Dipolog and more.",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const REFERENCES = [
  {
    title: "City Government of Dipolog — Events",
    url: "https://dipologcity.gov.ph/events/",
  },
  {
    title:
      "City Government of Dipolog — Socio-Economic Profile (Local Festivals)",
    url: "https://dipologcity.gov.ph/socio-economic-profile/",
  },
  {
    title: "Wikipedia — Dipolog (Festivals)",
    url: "https://en.wikipedia.org/wiki/Dipolog",
  },
  {
    title:
      "Philippine News Agency (via Molave LGU) — Dipolog City marks 'Pagsalabuk Festival'",
    url: "https://www.molave.gov.ph/dipolog-city-marks-pagsalabuk-festival-source-philippine-news-agency/",
  },
];

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function FestivalsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/travel" text="Back to Travel" />
      <SubpageHero>
        <SubpageHero.Title>Festivals &amp; Events</SubpageHero.Title>
        <SubpageHero.Description>
          Dipolog&apos;s yearly calendar of fiestas, faith traditions, and civic
          celebrations, as published by the City Government. Exact dates and
          programmes are announced each year.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto px-4 py-8 md:px-6">
        <ol className="relative space-y-6 border-l-2 border-cyan-100 pl-6 md:pl-8 dark:border-cyan-900">
          {festivals.map((f) => (
            <li key={f.name} className="relative">
              <span
                className="absolute top-5 -left-[33px] h-4 w-4 rounded-full border-2 border-white bg-cyan-600 shadow md:-left-[41px]"
                aria-hidden
              />
              <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-cyan-600 px-2 py-1 text-xs font-bold tracking-wider text-white uppercase">
                    {f.monthLabel ?? MONTHS[f.month - 1]}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {f.name}
                  </h2>
                </div>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-300">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {f.schedule}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.description}
                </p>
                {f.note && (
                  <p className="mt-3 flex items-start gap-1.5 rounded-md border border-amber-100 bg-amber-50 p-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                    {f.note}
                  </p>
                )}
                <p className="mt-3 text-[10px] text-slate-400">
                  Sources:{" "}
                  {f.sources.map((s, i) => (
                    <span key={s}>
                      {i > 0 && ", "}
                      <a
                        href={s}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-slate-600 dark:hover:text-slate-400"
                      >
                        {hostLabel(s)}
                      </a>
                    </span>
                  ))}{" "}
                  · verified {f.verifiedAt}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <ReferencesFooter
          references={REFERENCES}
          disclaimer="Festival names and schedules come from the City Government of Dipolog's Events and Socio-Economic Profile pages. These list the usual timing, not this year's exact dates — watch the City Government's official announcements for each year's programme."
        />
      </div>
    </main>
  );
}
