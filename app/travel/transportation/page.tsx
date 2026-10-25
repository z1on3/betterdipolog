import { Metadata } from "next";
import Image from "next/image";
import {
  Plane,
  Ship,
  BusFront,
  Bike,
  MapPin,
  Navigation,
  ExternalLink,
  Phone,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";

export const metadata: Metadata = {
  title: "Transportation",
  description:
    "How to get to and around Dipolog City — Dipolog Airport, the Port of Dipolog and Pulauan Port in Dapitan, the Land Transport Terminal, and local tricycles.",
};

const VERIFIED_AT = "2026-10-25";

type Link = { label: string; href: string };

type Hub = {
  id: string;
  icon: LucideIcon;
  kicker: string;
  name: string;
  location: string;
  lat: number;
  lon: number;
  osm: string;
  photo?: {
    url: string;
    credit: string;
    license: string;
    source: string;
  };
  facts: string[];
  operators?: { heading: string; items: Link[] };
  contact?: { label: string; tel: string; display: string };
};

const HUBS: Hub[] = [
  {
    id: "air",
    icon: Plane,
    kicker: "By Air",
    name: "Dipolog Airport (DPL)",
    location: "Barangay Minaog — about 2.5 km from the city centre",
    lat: 8.6024118,
    lon: 123.341997,
    osm: "https://www.openstreetmap.org/way/711145922",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Dipolog_Airport_%28Minaog%2C_Dipolog%2C_Zamboanga_Del_Norte%3B_10-17-2023%29.jpg",
      credit: "Patrickroque01",
      license: "CC BY-SA 4.0",
      source:
        "https://commons.wikimedia.org/wiki/File:Dipolog_Airport_(Minaog,_Dipolog,_Zamboanga_Del_Norte;_10-17-2023).jpg",
    },
    facts: [
      "Domestic airport (IATA: DPL, ICAO: RPMG) operated by the Civil Aviation Authority of the Philippines.",
      "Scheduled routes: Manila (Cebu Pacific and PAL Express) and Cebu (Cebgo).",
      "Flight times and fares change seasonally — book and check schedules directly with the airlines.",
    ],
    operators: {
      heading: "Airlines",
      items: [
        {
          label: "Cebu Pacific / Cebgo",
          href: "https://www.cebupacificair.com",
        },
        {
          label: "Philippine Airlines (PAL Express)",
          href: "https://www.philippineairlines.com",
        },
      ],
    },
  },
  {
    id: "sea-dipolog",
    icon: Ship,
    kicker: "By Sea",
    name: "Port of Dipolog (Galas Port)",
    location: "Barangay Galas",
    lat: 8.5609095,
    lon: 123.328969,
    osm: "https://www.openstreetmap.org/way/1324960840",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Port_of_Dipolog_Terminal_Building_%282020%29.jpg",
      credit: "Dipolog City Government",
      license: "Public domain",
      source:
        "https://commons.wikimedia.org/wiki/File:Port_of_Dipolog_Terminal_Building_(2020).jpg",
    },
    facts: [
      "The city's own roll-on/roll-off port, owned by the City Government and operated with the Philippine Ports Authority. Its passenger terminal was inaugurated in January 2019.",
      "Shipping lines reported to use the port include Medallion Transport (to Cebu City) and Lite Ferries (to Oslob, Cebu).",
      "Sailing days change — confirm schedules and fares with the shipping line before travelling.",
    ],
    operators: {
      heading: "Shipping lines",
      items: [
        {
          label: "Lite Shipping Corporation",
          href: "https://en.wikipedia.org/wiki/Lite_Shipping_Corporation",
        },
      ],
    },
  },
  {
    id: "sea-dapitan",
    icon: Ship,
    kicker: "By Sea",
    name: "Pulauan Port (Port of Dapitan)",
    location: "Barangay San Vicente, Dapitan City — about 11 km from Dipolog",
    lat: 8.636354,
    lon: 123.3823516,
    osm: "https://www.openstreetmap.org/way/926100642",
    facts: [
      "The main ferry port for the Dipolog–Dapitan area, owned by the Philippine Ports Authority (PMO Zamboanga del Norte).",
      "Ferries connect to Dumaguete (Negros Oriental) and Cebu.",
      "Operators serving Dapitan include the lines below — check their websites for current trips and fares.",
    ],
    operators: {
      heading: "Shipping lines",
      items: [
        {
          label: "Aleson Shipping Lines (Dapitan–Dumaguete)",
          href: "https://www.alesonshipping.com",
        },
        {
          label: "Cokaliong Shipping Lines (Dapitan–Cebu, Dapitan–Dumaguete)",
          href: "https://www.cokaliongshipping.com",
        },
        {
          label: "FastCat (Dapitan–Dumaguete)",
          href: "https://fastcat.ph",
        },
        {
          label: "Lite Shipping Corporation (Cebu–Dapitan)",
          href: "https://en.wikipedia.org/wiki/Lite_Shipping_Corporation",
        },
      ],
    },
  },
  {
    id: "land",
    icon: BusFront,
    kicker: "By Land",
    name: "Dipolog City Land Transport Terminal",
    location: "Gov. Alberto Ubay Road, Barangay Miputak",
    lat: 8.5776764,
    lon: 123.3391841,
    osm: "https://www.openstreetmap.org/way/1119516947",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Dipolog_City_Land_Transport_Terminal.jpg",
      credit: "Dipolog City Government",
      license: "Public domain",
      source:
        "https://commons.wikimedia.org/wiki/File:Dipolog_City_Land_Transport_Terminal.jpg",
    },
    facts: [
      "The city's integrated bus and jeepney terminal, run by the City Government's Land Transport Terminal office.",
      "Daily trips to towns across Zamboanga del Norte, Zamboanga del Sur, Zamboanga Sibugay and Misamis Occidental, and to cities such as Zamboanga City and Cagayan de Oro.",
      "Bus operators include Rural Transit and Super Five Transport; the City lists six bus companies serving Dipolog. Ask at the terminal for current departure times and fares.",
    ],
    contact: {
      label: "Land Transport Terminal office",
      tel: "+63652122469",
      display: "(065) 212-2469",
    },
  },
];

const REFERENCES = [
  {
    title:
      "City Government of Dipolog — Socio-Economic Profile (Transportation)",
    url: "https://dipologcity.gov.ph/socio-economic-profile/",
  },
  {
    title:
      "City Government of Dipolog — Chiefs of Office (Land Transport Terminal)",
    url: "https://dipologcity.gov.ph/executive/",
  },
  {
    title: "Wikipedia — Dipolog (Transportation)",
    url: "https://en.wikipedia.org/wiki/Dipolog",
  },
  {
    title: "Wikipedia — Dipolog Airport",
    url: "https://en.wikipedia.org/wiki/Dipolog_Airport",
  },
  {
    title: "Wikipedia — Port of Dipolog",
    url: "https://en.wikipedia.org/wiki/Port_of_Dipolog",
  },
  {
    title: "Wikipedia — Port of Dapitan",
    url: "https://en.wikipedia.org/wiki/Port_of_Dapitan",
  },
  {
    title: "OpenStreetMap contributors — terminal and port locations",
    url: "https://www.openstreetmap.org/copyright",
  },
];

function HubCard({ hub }: { hub: Hub }) {
  const Icon = hub.icon;
  return (
    <article
      id={hub.id}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {hub.photo && (
        <div className="relative aspect-video bg-slate-100">
          <Image
            src={hub.photo.url}
            alt={hub.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
              {hub.kicker}
            </p>
            <h3 className="text-lg leading-tight font-bold text-slate-900">
              {hub.name}
            </h3>
          </div>
        </div>

        <p className="mb-4 flex items-start gap-2 text-sm text-slate-600">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
            aria-hidden
          />
          {hub.location}
        </p>

        <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
          {hub.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {hub.operators && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
              {hub.operators.heading}
            </p>
            <div className="flex flex-wrap gap-2">
              {hub.operators.items.map((o) => (
                <a
                  key={o.href + o.label}
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {o.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1" />

        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${hub.lat}%2C${hub.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
          >
            <Navigation className="h-3.5 w-3.5" aria-hidden /> Directions
          </a>
          {hub.contact && (
            <a
              href={`tel:${hub.contact.tel}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              aria-label={`Call ${hub.contact.label}`}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {hub.contact.display}
            </a>
          )}
        </div>

        <div className="mt-3 space-y-0.5">
          {hub.photo && (
            <p className="text-[10px] text-slate-400">
              Photo:{" "}
              <a
                href={hub.photo.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                {hub.photo.credit}
              </a>{" "}
              · {hub.photo.license}
            </p>
          )}
          <p className="text-[10px] text-slate-400">
            Location:{" "}
            <a
              href={hub.osm}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              OpenStreetMap
            </a>{" "}
            · verified {VERIFIED_AT}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TransportationPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <SubpageNav href="/travel" text="Back to Travel" />
      <SubpageHero>
        <SubpageHero.Title>Transportation</SubpageHero.Title>
        <SubpageHero.Description>
          Getting to and around Dipolog — the airport, seaports, the city&apos;s
          land transport terminal, and local tricycles.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto space-y-12 px-4 py-8 md:px-6">
        <section>
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Getting to Dipolog
            </h2>
            <p className="mt-1 text-slate-500">
              Terminals, ports, and the operators that serve them.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {HUBS.map((hub) => (
              <HubCard key={hub.id} hub={hub} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Getting Around the City
            </h2>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Bike className="h-6 w-6" aria-hidden />
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                <p>
                  <strong className="text-slate-900">Tricycles</strong> (locally
                  called <em>motorcab</em>) are the main way to get around the
                  city, alongside <em>sikad</em> (bicycle-powered pedicabs) and{" "}
                  <em>habal-habal</em> (motorcycles for hire), which are also
                  the usual last-mile ride to upland spots such as Sungkilaw
                  Falls.
                </p>
                <p>
                  Jeepneys and buses to outlying barangays and nearby towns load
                  at the Land Transport Terminal in Barangay Miputak.
                </p>
              </div>
            </div>
            <p className="mt-5 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 p-3 text-xs text-amber-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Tricycle franchises and fares are regulated by the City
              Government. We have not published fares here because we could not
              find a current, official fare matrix. Agree on the fare before the
              ride, and ask the Land Transport Terminal office for the current
              rates.
            </p>
          </div>
        </section>

        <ReferencesFooter
          references={REFERENCES}
          disclaimer="Airline and shipping routes are drawn from the City Government of Dipolog and from Wikipedia articles checked on 2026-10-25, and operators' own websites. We deliberately do not publish flight, ferry, or bus timetables or fares, because they change often and we could not find current official versions. Always confirm with the operator before you travel."
        />
      </div>
    </main>
  );
}
