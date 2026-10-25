"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Search,
  MapPin,
  Navigation,
  ExternalLink,
  Info,
  Landmark,
} from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import { cn } from "@/lib/utils";
import type {
  Attraction,
  MappedAttraction,
} from "@/validations/attractionSchema";

const REFERENCES = [
  {
    title: "City Government of Dipolog — Events",
    url: "https://dipologcity.gov.ph/events/",
  },
  {
    title: "City Government of Dipolog — Socio-Economic Profile",
    url: "https://dipologcity.gov.ph/socio-economic-profile/",
  },
  {
    title: "Wikipedia — Dipolog (Tourism)",
    url: "https://en.wikipedia.org/wiki/Dipolog",
  },
  {
    title: "Wikipedia — Dipolog Cathedral",
    url: "https://en.wikipedia.org/wiki/Dipolog_Cathedral",
  },
  {
    title: "Wikipedia — Casa Bernedo",
    url: "https://en.wikipedia.org/wiki/Casa_Bernedo",
  },
  {
    title: "Pinoy Mountaineer — Climbing the 3,003 steps up Linabo Peak",
    url: "https://www.pinoymountaineer.com/2010/08/hiking-matters-95-climbing-3003-steps.html",
  },
  {
    title: "Mindanao Pagadian Frontline (PIA) — Sungkilaw Falls (2013)",
    url: "http://pagadianfrontline.blogspot.com/2013/02/sungkilaw-falls-is-now-tourist.html",
  },
  {
    title: "OpenStreetMap contributors — attraction locations",
    url: "https://www.openstreetmap.org/copyright",
  },
];

const AttractionsMap = dynamic(() => import("./AttractionsMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] w-full animate-pulse items-center justify-center bg-slate-100 font-medium text-slate-500">
      Loading map…
    </div>
  ),
});

const CATEGORY_STYLES: Record<Attraction["category"], string> = {
  Nature: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Heritage: "bg-amber-50 text-amber-700 border-amber-100",
  Faith: "bg-violet-50 text-violet-700 border-violet-100",
  Landmark: "bg-cyan-50 text-cyan-700 border-cyan-100",
  Park: "bg-lime-50 text-lime-700 border-lime-100",
};

function isMapped(a: Attraction): a is MappedAttraction {
  return a.lat !== undefined && a.lon !== undefined;
}

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function AttractionsClient({
  attractions,
}: {
  attractions: Attraction[];
}) {
  const [query, setQuery] = useState("");

  const mapped = useMemo(() => attractions.filter(isMapped), [attractions]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return attractions;
    return attractions.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.area ?? "").toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    );
  }, [attractions, query]);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <SubpageNav href="/travel" text="Back to Travel" />
      <SubpageHero>
        <SubpageHero.Title>Attractions</SubpageHero.Title>
        <SubpageHero.Description>
          Landmarks, heritage sites, and nature spots in Dipolog City — from the
          3,003 steps of Linabo Peak to the seaside boulevard. Locations,
          photos, and directions for each.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto space-y-8 px-4 py-8 md:px-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="h-[380px] w-full">
            <AttractionsMap places={mapped} />
          </div>
        </div>

        <div className="relative max-w-md">
          <Search
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search attractions…"
            aria-label="Search attractions"
            className="w-full rounded-lg border border-slate-200 py-2.5 pr-3 pl-9 text-sm shadow-sm focus:ring-2 focus:ring-cyan-200 focus:outline-none"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <article
              key={a.name}
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-4/3 bg-cyan-50">
                {a.photo ? (
                  <Image
                    src={a.photo.url}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized={a.photo.url.startsWith(
                      "https://upload.wikimedia.org/",
                    )}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-600/70">
                    <Landmark className="h-10 w-10" aria-hidden />
                    <span className="mt-1 text-xs font-semibold">
                      Photo needed
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span
                  className={cn(
                    "mb-2 w-fit rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase",
                    CATEGORY_STYLES[a.category],
                  )}
                >
                  {a.category}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{a.name}</h2>
                {a.area && (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden /> {a.area}
                  </span>
                )}

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {a.description}
                </p>

                {a.note && (
                  <p className="mt-3 flex items-start gap-1.5 rounded-md border border-amber-100 bg-amber-50 p-2 text-xs text-amber-800">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                    {a.note}
                  </p>
                )}

                <div className="flex-1" />

                <div className="mt-4 flex flex-wrap gap-2">
                  {isMapped(a) && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${a.lat}%2C${a.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-cyan-700"
                    >
                      <Navigation className="h-3.5 w-3.5" aria-hidden />{" "}
                      Directions
                    </a>
                  )}
                  <a
                    href={a.sources[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Learn
                    more
                  </a>
                </div>

                <div className="mt-3 space-y-0.5">
                  <p className="text-[10px] text-slate-400">
                    Sources:{" "}
                    {a.sources.map((s, i) => (
                      <span key={s}>
                        {i > 0 && ", "}
                        <a
                          href={s}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-slate-600"
                        >
                          {hostLabel(s)}
                        </a>
                      </span>
                    ))}{" "}
                    · verified {a.verifiedAt}
                  </p>
                  {a.photo && (
                    <p className="text-[10px] text-slate-400">
                      Photo:{" "}
                      <a
                        href={a.photo.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-slate-600"
                      >
                        {a.photo.credit}
                      </a>{" "}
                      · {a.photo.license}
                    </p>
                  )}
                  {a.coordSource && (
                    <p className="text-[10px] text-slate-400">
                      Location:{" "}
                      <a
                        href={a.coordSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-slate-600"
                      >
                        {hostLabel(a.coordSource)}
                      </a>
                    </p>
                  )}
                  {!isMapped(a) && (
                    <p className="text-[10px] text-slate-400">
                      No verified coordinates yet — not shown on the map.
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-8 text-center text-slate-400">
            No attractions match “{query}”.
          </p>
        )}

        <ReferencesFooter
          references={REFERENCES}
          disclaimer="Descriptions are drawn from the City Government of Dipolog's published pages and the sources listed on each card. Map pins use OpenStreetMap (or Wikipedia) coordinates and are approximate; places without a verified location are listed but not pinned. Opening hours, fees, and access can change — confirm with the Dipolog City Tourism Office before travelling. Photos are from Wikimedia Commons, credited per card under their respective licenses."
        />
      </div>
    </main>
  );
}
