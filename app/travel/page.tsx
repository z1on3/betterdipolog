import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Fish,
  Landmark,
  MapPinned,
  Plane,
  Ship,
  BusFront,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";

export const metadata: Metadata = {
  title: "Explore Dipolog",
  description:
    "Visit Dipolog City, the Gateway to Western Mindanao and Zamboanga Peninsula — attractions, festivals, and how to get here and get around.",
};

const DIRECTORIES: {
  name: string;
  href: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Attractions",
    href: "/travel/attractions",
    description:
      "Linabo Peak's 3,003 steps, Dipolog Boulevard, the Cathedral, Sungkilaw Falls and more — with a map and directions.",
    icon: Landmark,
  },
  {
    name: "Festivals & Events",
    href: "/travel/festivals",
    description:
      "The city's yearly calendar — Sinulog sa Dipolog, Katkat Sakripisyo, P'gsalabuk, Adlaw sa Dipolog, Pasko sa Dipolog.",
    icon: CalendarDays,
  },
  {
    name: "Transportation",
    href: "/travel/transportation",
    description:
      "Dipolog Airport, the Port of Dipolog and Pulauan Port, the Land Transport Terminal, and local tricycles.",
    icon: MapPinned,
  },
];

const QUICK_FACTS: { icon: LucideIcon; label: string; value: string }[] = [
  {
    icon: Plane,
    label: "Dipolog Airport",
    value: "2.5 km from the city · flights to Manila and Cebu",
  },
  {
    icon: Ship,
    label: "Pulauan Port, Dapitan",
    value: "11 km away · ferries to Dumaguete and Cebu",
  },
  {
    icon: BusFront,
    label: "Land Transport Terminal",
    value: "Barangay Miputak · buses across the Zamboanga Peninsula",
  },
];

const REFERENCES = [
  {
    title: "City Government of Dipolog — Quick Facts",
    url: "https://dipologcity.gov.ph/quick-facts/",
  },
  {
    title: "City Government of Dipolog — Socio-Economic Profile",
    url: "https://dipologcity.gov.ph/socio-economic-profile/",
  },
  {
    title: "Wikipedia — Dipolog",
    url: "https://en.wikipedia.org/wiki/Dipolog",
  },
];

const HERO_PHOTO = {
  url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Dipolog_Boulevard_beach%2C_Sulu_Sea_view_%28Dipolog%2C_Zamboanga_Del_Norte%3B_10-17-2023%29.jpg",
  credit: "Patrickroque01",
  license: "CC BY-SA 4.0",
  source:
    "https://commons.wikimedia.org/wiki/File:Dipolog_Boulevard_beach,_Sulu_Sea_view_(Dipolog,_Zamboanga_Del_Norte;_10-17-2023).jpg",
};

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/" text="Go Home" />
      <SubpageHero>
        <SubpageHero.Title>Explore Dipolog</SubpageHero.Title>
        <SubpageHero.Description>
          The capital of Zamboanga del Norte, facing the Sulu Sea on the
          northwestern rim of the Zamboanga Peninsula — known as the
          &ldquo;Gateway to Western Mindanao and Zamboanga Peninsula.&rdquo;
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto space-y-12 px-4 py-8 md:px-6">
        <section className="grid gap-6 lg:grid-cols-5">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
              <Image
                src={HERO_PHOTO.url}
                alt="Dipolog Boulevard beach facing the Sulu Sea"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <figcaption className="px-4 py-2 text-[10px] text-slate-400">
              Dipolog Boulevard and the Sulu Sea. Photo:{" "}
              <a
                href={HERO_PHOTO.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600 dark:hover:text-slate-400"
              >
                {HERO_PHOTO.credit}
              </a>{" "}
              · {HERO_PHOTO.license}
            </figcaption>
          </figure>

          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Getting here
            </h2>
            <ul className="space-y-3">
              {QUICK_FACTS.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
              <div className="shrink-0 rounded-lg bg-white p-2 text-amber-600 dark:bg-slate-900 dark:text-amber-400">
                <Fish className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm text-amber-900 dark:text-amber-200">
                <strong>Pasalubong:</strong> Dipolog is called the
                &ldquo;Bottled Sardines Capital of the Philippines&rdquo; —
                bottled sardines are among the city&apos;s major products.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6 border-b border-slate-200 pb-4 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Plan your visit
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {DIRECTORIES.map(({ icon: Icon, ...item }) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
              >
                <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300">
                    {item.name}
                  </h3>
                  <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <div className="mt-1 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <ReferencesFooter
          references={REFERENCES}
          disclaimer="Distances come from the City Government of Dipolog's published profile; current routes are from Wikipedia (checked 2026-10-25). Confirm schedules with operators before travelling."
        />
      </div>
    </main>
  );
}
