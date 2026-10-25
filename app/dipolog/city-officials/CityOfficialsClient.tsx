"use client";

import {
  Landmark,
  Gavel,
  User,
  Award,
  ShieldCheck,
  Users,
  ChevronDown,
} from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";

import officialsData from "@/data/dipolog/city-officials.json";

const cityOfficialsReferences = [
  {
    title:
      "dipologcity.gov.ph — 18th Sangguniang Panlungsod 2025–2028 (officers and committees)",
    url: "https://dipologcity.gov.ph/legislative/",
  },
  {
    title: "dipologcity.gov.ph — Executive (City Mayor's Office)",
    url: "https://dipologcity.gov.ph/executive/",
  },
  {
    title: "Rappler — Dipolog City, Zamboanga del Norte election results 2025",
    url: "https://ph.rappler.com/elections/2025/local-race/zamboanga-del-norte/dipolog-city",
  },
  {
    title: "Wikipedia — Dipolog City Council",
    url: "https://en.wikipedia.org/wiki/Dipolog_City_Council",
  },
];

export default function CityOfficialsClient() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <SubpageNav />
      <SubpageHero>
        <SubpageHero.Badges>
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold tracking-wider text-indigo-700 uppercase">
            Local Government · {officialsData.term}
          </span>
        </SubpageHero.Badges>
        <SubpageHero.Title>City Officials</SubpageHero.Title>
        <SubpageHero.Description>
          The elected leaders of Dipolog City comprising the Executive and
          Legislative branches for the {officialsData.term} term.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
        {/* --- EXECUTIVE BRANCH --- */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-700">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Executive Branch
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Office of the City Mayor · 4F City Hall, Rizal Ave. · (065)
                212-2484
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {officialsData.executive.map((official, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-bl-full bg-blue-50 transition-transform group-hover:scale-110"></div>

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-extrabold tracking-widest text-blue-600 uppercase">
                      {official.position}
                    </p>
                    <h3 className="text-2xl font-black text-slate-900">
                      Hon. {official.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- LEGISLATIVE BRANCH --- */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="shrink-0 rounded-lg bg-emerald-100 p-2 text-emerald-700">
              <Gavel className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Legislative Branch
              </h2>
              <p className="text-sm font-medium text-slate-500">
                {officialsData.council} (City Council)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {officialsData.legislative.map((official, idx) => {
              // Ex officio members (Liga / SK) get a slightly different icon
              const isExOfficio = official.position.startsWith("Ex officio");

              return (
                <div
                  key={idx}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      isExOfficio
                        ? "bg-amber-100 text-amber-600"
                        : "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                    } transition-colors`}
                  >
                    {isExOfficio ? (
                      <Award className="h-6 w-6" />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm leading-tight font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
                      Hon. {official.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      {official.position}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- COMMITTEES --- */}
        <section>
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="shrink-0 rounded-lg bg-violet-100 p-2 text-violet-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Committees
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Committee chairs and members of the {officialsData.council}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {officialsData.committees.map((committee, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-violet-200"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm leading-tight font-bold text-slate-900">
                      {committee.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        Chair:
                      </span>{" "}
                      Hon. {committee.chairperson}
                      {committee.viceChairperson && (
                        <>
                          {" · "}
                          <span className="font-semibold text-slate-700">
                            Vice:
                          </span>{" "}
                          Hon. {committee.viceChairperson}
                        </>
                      )}
                    </p>
                  </div>
                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                {committee.members.length > 0 && (
                  <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-xs text-slate-600">
                    {committee.members.map((member) => (
                      <li key={member}>Hon. {member}</li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        </section>

        <ReferencesFooter
          references={cityOfficialsReferences}
          disclaimer={`${officialsData.asOf}. Committee assignments are as published on the official Dipolog City website; name spellings were normalized where the source was inconsistent.`}
        />
      </div>
    </main>
  );
}
