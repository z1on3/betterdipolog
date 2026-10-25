import Link from "next/link";
import {
  Building2,
  MapPin,
  CalendarDays,
  Users,
  Banknote,
  Landmark,
  Calendar,
  PieChart,
  Mountain,
  GraduationCap,
  Stethoscope,
  Zap,
  Anchor,
  Droplets,
  Plane,
  Route,
  Wifi,
  Info,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import CityTabs from "./CityTabs"; // <-- Imported your new client component

import {
  CityProfileSchema,
  type FacilityIcon,
  type KeyValueRow,
} from "@/validations/cityProfileSchema";
import rawCityData from "@/data/dipolog/city-profile.json";

export const dynamic = "force-static";

// Validated at import time (server component) so bad data fails the build.
const cityData = CityProfileSchema.parse(rawCityData);

const FACILITY_ICONS: Record<FacilityIcon, LucideIcon> = {
  GraduationCap,
  Stethoscope,
  Zap,
  Droplets,
  Plane,
  Anchor,
  Route,
};

function KeyValueRows({ rows }: { rows: KeyValueRow[] }) {
  return (
    <>
      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between gap-3 py-1.5 ${idx !== rows.length - 1 ? "border-b border-[#E6F1FB] dark:border-blue-950" : ""}`}
        >
          <span className="text-[13px] text-slate-500 dark:text-slate-400">
            {row.key}
          </span>
          <span className="max-w-[60%] text-right text-[13px] font-medium text-[#0C447C] dark:text-blue-300">
            {row.value}
          </span>
        </div>
      ))}
    </>
  );
}

export default function CityStatsFullPage() {
  return (
    <main className="min-h-screen scroll-mt-0 bg-slate-50 font-sans dark:bg-slate-950">
      <h2 className="sr-only">
        Dipolog City official profile — demographics, government, economy,
        environment, and infrastructure.
      </h2>

      {/* --- HERO SECTION --- */}
      <SubpageHero className="from-primary-700 to-primary-600 rounded-b-3xl bg-linear-to-r">
        <SubpageHero.Badges>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#185FA5] bg-[#0C447C] px-2.5 py-0.5 text-[11px] font-medium text-[#85B7EB]">
            <Building2 className="h-3 w-3" /> {cityData.header.classification}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#185FA5] bg-[#0C447C] px-2.5 py-0.5 text-[11px] font-medium text-[#85B7EB]">
            <MapPin className="h-3 w-3" /> {cityData.header.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#185FA5] bg-[#0C447C] px-2.5 py-0.5 text-[11px] font-medium text-[#85B7EB]">
            <CalendarDays className="h-3 w-3" /> {cityData.header.foundedBadge}
          </span>
        </SubpageHero.Badges>
        <SubpageHero.Title className="text-white">
          {cityData.header.name}
        </SubpageHero.Title>
        <SubpageHero.Description className="text-[#85B7EB]!">
          {cityData.header.description}{" "}
          <span className="font-medium text-[#B5D4F4]">
            {cityData.header.highlight}
          </span>
          {cityData.header.descriptionEnd}
        </SubpageHero.Description>

        <div className="mt-5 grid grid-cols-2 gap-0 border-t border-[#185FA5] pt-5 sm:grid-cols-3 md:grid-cols-6">
          {cityData.quickStats.map((stat, idx) => (
            <div key={idx} className="px-2 py-2.5">
              <div className="mb-0.5 text-[10px] font-medium tracking-wider text-[#378ADD] uppercase">
                {stat.label}
              </div>
              <div className="text-[14px] leading-snug font-medium text-white">
                {stat.value}
              </div>
              <div className="mt-px text-[10px] text-[#85B7EB]">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </SubpageHero>

      {/* --- SECTIONS via CityTabs --- */}
      <Section className="max-sm:pt-0 max-sm:pb-8">
        <CityTabs
          sections={{
            all: (
              <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                {(
                  [
                    {
                      title: "Population",
                      Icon: Users,
                      card: cityData.summary.population,
                    },
                    {
                      title: "Economy",
                      Icon: Banknote,
                      card: cityData.summary.economy,
                    },
                  ] as const
                ).map(({ title, Icon, card }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900"
                  >
                    <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                      <Icon className="h-3.5 w-3.5 text-[#378ADD]" /> {title}
                    </div>
                    <div className="text-[22px] leading-tight font-bold text-slate-900 dark:text-slate-100">
                      {card.value}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {card.subtext}
                    </div>
                    <hr className="my-3 border-t border-[#E6F1FB] dark:border-blue-950" />
                    <KeyValueRows rows={card.rows} />
                  </div>
                ))}
                <div className="col-span-1 grid grid-cols-2 gap-2.5 md:col-span-2 md:grid-cols-4 lg:grid-cols-8">
                  {cityData.keyFigures.map((figure, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#B5D4F4] bg-[#E6F1FB] p-4 text-center dark:border-blue-900 dark:bg-blue-950/40"
                    >
                      <div className="text-[26px] leading-none font-bold text-[#042C53] dark:text-blue-200">
                        {figure.value}
                      </div>
                      <div className="mt-1.5 text-[12px] text-[#185FA5] dark:text-blue-400">
                        {figure.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
            demographics: (
              <>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {cityData.demographics.grid.map((stat, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900"
                    >
                      <div className="mb-0.5 text-[11px] font-medium text-[#185FA5] dark:text-blue-400">
                        {stat.label}
                      </div>
                      <div className="text-[22px] leading-tight font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {stat.subtext}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <Info className="h-3.5 w-3.5 text-[#378ADD]" /> General info
                  </div>
                  {cityData.demographics.generalInfo.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-1.5 ${idx !== cityData.demographics.generalInfo.length - 1 ? "border-b border-[#E6F1FB] dark:border-blue-950" : ""}`}
                    >
                      <span className="text-[13px] text-slate-500 dark:text-slate-400">
                        {row.key}
                      </span>
                      <span className="max-w-[55%] text-right text-[13px] font-medium text-[#0C447C] dark:text-blue-300">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ),
            government: (
              <>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <Landmark className="h-3.5 w-3.5 text-[#378ADD]" /> Local
                    government
                  </div>
                  {cityData.government.local.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-1.5 ${idx !== cityData.government.local.length - 1 ? "border-b border-[#E6F1FB] dark:border-blue-950" : ""}`}
                    >
                      <span className="text-[13px] text-slate-500 dark:text-slate-400">
                        {row.key}
                      </span>
                      <span className="max-w-[55%] text-right text-[13px] font-medium text-[#0C447C] dark:text-blue-300">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <Calendar className="h-3.5 w-3.5 text-[#378ADD]" /> History
                    & classification
                  </div>
                  {cityData.government.history.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-1.5 ${idx !== cityData.government.history.length - 1 ? "border-b border-[#E6F1FB] dark:border-blue-950" : ""}`}
                    >
                      <span className="text-[13px] text-slate-500 dark:text-slate-400">
                        {row.key}
                      </span>
                      <span className="max-w-[55%] text-right text-[13px] font-medium text-[#0C447C] dark:text-blue-300">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ),
            economy: (
              <>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {cityData.economy.grid.map((stat, idx) => (
                    <Link
                      key={idx}
                      href={stat.href ? stat.href : "#"}
                      className={`block border border-[#B5D4F4] bg-white dark:border-blue-900 dark:bg-slate-900 ${stat.href ? "cursor-pointer transition-colors hover:border-[#185FA5]" : "cursor-default"} rounded-2xl p-4 md:p-5`}
                    >
                      <div className="mb-0.5 text-[11px] font-medium text-[#185FA5] dark:text-blue-400">
                        {stat.label}
                      </div>
                      <div className="text-[22px] leading-tight font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </div>
                      {stat.subtext && (
                        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                          {stat.subtext}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <PieChart className="h-3.5 w-3.5 text-[#378ADD]" /> Commerce
                    & services
                  </div>
                  {cityData.economy.commerce.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-1.5 ${idx !== cityData.economy.commerce.length - 1 ? "border-b border-[#E6F1FB] dark:border-blue-950" : ""}`}
                    >
                      <span className="text-[13px] text-slate-500 dark:text-slate-400">
                        {row.key}
                      </span>
                      <span className="max-w-[55%] text-right text-[13px] font-medium text-[#0C447C] dark:text-blue-300">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ),
            environment: (
              <>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <PieChart className="h-3.5 w-3.5 text-[#378ADD]" /> Land use
                    (hectares)
                  </div>
                  <KeyValueRows rows={cityData.environment.landUse} />
                </div>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <Mountain className="h-3.5 w-3.5 text-[#378ADD]" />{" "}
                    Geography & climate
                  </div>
                  {cityData.environment.geography.map((row, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-1.5 ${idx !== cityData.environment.geography.length - 1 ? "border-b border-[#E6F1FB] dark:border-blue-950" : ""}`}
                    >
                      <span className="text-[13px] text-slate-500 dark:text-slate-400">
                        {row.key}
                      </span>
                      <span className="max-w-[55%] text-right text-[13px] font-medium text-[#0C447C] dark:text-blue-300">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ),
            infrastructure: (
              <>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {cityData.infrastructure.facilities.map((infra, idx) => {
                    const IconComp = FACILITY_ICONS[infra.icon];

                    return (
                      <Link
                        href={infra.href ? infra.href : "#"}
                        key={idx}
                        className={`cursor-default border border-[#B5D4F4] bg-white dark:border-blue-900 dark:bg-slate-900 ${infra.href && "group cursor-pointer transition-colors duration-100 hover:border-[#185FA5] hover:bg-[#185FA5]"} flex items-start gap-3 rounded-2xl p-4`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E6F1FB] text-[#185FA5] dark:bg-blue-950/40 dark:text-blue-400">
                          <IconComp className="h-[18px] w-[18px]" />
                        </div>
                        <div>
                          <div className="mb-0.5 text-[11px] font-medium text-[#185FA5] group-hover:text-white dark:text-blue-400">
                            {infra.label}
                          </div>
                          <div className="my-0.5 text-[20px] font-bold text-slate-900 group-hover:text-white dark:text-slate-100">
                            {infra.value}
                          </div>
                          <div className="text-[11px] text-slate-500 group-hover:text-white dark:text-slate-400">
                            {infra.subtext}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-[#B5D4F4] bg-white p-4 md:p-5 dark:border-blue-900 dark:bg-slate-900">
                  <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#185FA5] uppercase dark:text-blue-400">
                    <Wifi className="h-3.5 w-3.5 text-[#378ADD]" />{" "}
                    Communications
                  </div>
                  <div className="flex flex-col gap-[9px]">
                    {cityData.infrastructure.communications.map((comm, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-[#378ADD]"></div>
                        <div className="text-[13px] text-slate-900 dark:text-slate-100">
                          {comm
                            .split(/(\d+[^ ]*)/)
                            .map((part, i) =>
                              /^\d+/.test(part) ? (
                                <strong key={i}>{part}</strong>
                              ) : (
                                part
                              ),
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ),
          }}
        />

        <ReferencesFooter
          references={cityData.references}
          disclaimer="Figures from the city's Quick Facts and Socio-Economic Profile are as published by the City Government (the profile cites 2010 census and 2014 projections, so some counts may be outdated). The city profile and PSA-based sources report different land areas; both are shown."
        />
      </Section>
    </main>
  );
}
