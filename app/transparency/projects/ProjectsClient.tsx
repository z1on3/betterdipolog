"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CalendarDays,
  ExternalLink,
  History,
  MapPin,
  Search,
  Wallet,
} from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import FilterGrid from "@/components/ui/FilterGrid";
import ReferencesFooter from "@/components/ui/ReferencesFooter";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type {
  Project,
  ProjectCategory,
  ProjectSource,
  ProjectStatus,
  ProjectsData,
} from "@/validations/projectSchema";
import {
  AMOUNT_BASIS_LABELS,
  CATEGORY_LABELS,
  SOURCE_GROUPS,
  STATUS_LABELS,
  STATUS_STYLES,
  formatPeso,
  formatProjectDate,
} from "./format";

const PAGE_SIZE = 24;
const ALL = "All";

const selectClass =
  "w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none";

export default function ProjectsClient({ data }: { data: ProjectsData }) {
  const sourcesById = useMemo(
    () =>
      Object.fromEntries(data.sources.map((s) => [s.id, s])) as Record<
        ProjectSource["id"],
        ProjectSource
      >,
    [data.sources],
  );

  const categoryOptions = useMemo(() => {
    const present = new Set(data.projects.map((p) => p.category));
    return (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter((c) =>
      present.has(c),
    );
  }, [data.projects]);

  const statusOptions = useMemo(() => {
    const present = new Set(data.projects.map((p) => p.status));
    return (Object.keys(STATUS_LABELS) as ProjectStatus[]).filter((s) =>
      present.has(s),
    );
  }, [data.projects]);

  const barangayOptions = useMemo(
    () => Array.from(new Set(data.projects.flatMap((p) => p.barangays))).sort(),
    [data.projects],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [sourceGroup, setSourceGroup] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);
  const [barangay, setBarangay] = useState<string>(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const groupIds =
      sourceGroup === ALL
        ? null
        : new Set(SOURCE_GROUPS.find((g) => g.key === sourceGroup)?.ids);
    return data.projects
      .filter((p) => {
        if (category !== ALL && CATEGORY_LABELS[p.category] !== category)
          return false;
        if (groupIds && !groupIds.has(p.sourceId)) return false;
        if (status !== ALL && p.status !== status) return false;
        if (barangay !== ALL && !p.barangays.includes(barangay as never))
          return false;
        if (q === "") return true;
        const haystack = [
          p.title,
          p.description,
          p.referenceNo,
          p.contractor,
          p.implementer,
          p.office,
          p.fundSource,
          p.barangays.join(" "),
          String(p.year),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.year - a.year);
  }, [data.projects, query, category, sourceGroup, status, barangay]);

  const resetPaging = () => setVisible(PAGE_SIZE);

  const references = data.sources.map((s) => ({
    title: `${s.title} — ${s.asOfLabel}`,
    url: s.url,
  }));

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/transparency" text="Back to Transparency" />
      <SubpageHero>
        <SubpageHero.Title>Projects</SubpageHero.Title>
        <SubpageHero.Description>
          Infrastructure and social projects in Dipolog City from the DPWH
          transparency portal and the City Government of Dipolog&apos;s own
          procurement reports, procurement plan and older project pages. Each
          status is only as current as its source, so check the as-of date on
          every entry.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="container mx-auto px-4 pt-6 md:px-6">
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {SOURCE_GROUPS.map((g) => {
            const count = data.projects.filter((p) =>
              g.ids.includes(p.sourceId),
            ).length;
            const asOf = g.ids
              .map((id) => sourcesById[id]?.asOfLabel)
              .filter(Boolean)
              .join(" · ");
            return (
              <div
                key={g.key}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  {g.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {count}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {asOf}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Statuses are copied from each source on its own date and are not
            live. The city&apos;s 2014 pages are shown as historical only;
            planned items from the 2026 procurement plan are plans, not proof
            that work has started.
          </p>
        </div>

        <div className="group relative mx-auto mt-6 max-w-2xl">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400" />
          <input
            type="text"
            placeholder="Search by name, barangay, contractor, contract ID..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPaging();
            }}
            className="w-full rounded-xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-base text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Source
            <select
              className={cn(selectClass, "mt-1")}
              value={sourceGroup}
              onChange={(e) => {
                setSourceGroup(e.target.value);
                resetPaging();
              }}
            >
              <option value={ALL}>All sources</option>
              {SOURCE_GROUPS.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Status (as of source date)
            <select
              className={cn(selectClass, "mt-1")}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                resetPaging();
              }}
            >
              <option value={ALL}>All statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Barangay (named in source)
            <select
              className={cn(selectClass, "mt-1")}
              value={barangay}
              onChange={(e) => {
                setBarangay(e.target.value);
                resetPaging();
              }}
            >
              <option value={ALL}>All barangays</option>
              {barangayOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <FilterGrid>
        <FilterGrid.Sidebar
          title="Filter by Type"
          categories={[ALL, ...categoryOptions.map((c) => CATEGORY_LABELS[c])]}
          activeCategory={category}
          onCategoryChange={(c) => {
            setCategory(c);
            resetPaging();
          }}
        />
        <FilterGrid.Content
          title="Projects"
          itemCount={filtered.length}
          columns={1}
        >
          {filtered.length > 0 ? (
            <>
              {filtered.slice(0, visible).map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  source={sourcesById[p.sourceId]}
                />
              ))}
              {visible < filtered.length && (
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="col-span-full mx-auto rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:text-blue-300"
                >
                  Show more ({filtered.length - visible} remaining)
                </button>
              )}
            </>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 rounded-full bg-slate-50 p-4 dark:bg-slate-950">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                No projects found
              </h3>
              <p className="mx-auto max-w-sm text-sm text-slate-500 dark:text-slate-400">
                Try a different search term or clear a filter.
              </p>
            </div>
          )}
        </FilterGrid.Content>
      </FilterGrid>

      <div className="container mx-auto px-4 md:px-6">
        <ReferencesFooter
          references={references}
          disclaimer={`Compiled ${formatProjectDate(data.retrievedAt)}. DPWH entries are projects whose DPWH description names Dipolog City or its barangays; national-road segments that only name a road were left out. City entries were transcribed from scanned PDFs and keep the wording, amounts and dates exactly as written there. Barangays are listed only when the source names them. Amounts are in Philippine pesos.`}
        />
      </div>
    </main>
  );
}

function ProjectCard({
  project: p,
  source,
}: {
  project: Project;
  source: ProjectSource | undefined;
}) {
  const historical =
    p.status === "historical-completed" || p.status === "historical-ongoing";
  return (
    <Card className="col-span-full rounded-2xl border-slate-200 dark:border-slate-800">
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold",
              STATUS_STYLES[p.status],
            )}
          >
            {historical && <History className="h-3.5 w-3.5" />}
            {p.statusLabel}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {CATEGORY_LABELS[p.category]}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {p.year}
          </span>
          {p.referenceNo && (
            <span className="font-mono text-xs text-slate-400">
              {p.referenceNo}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base leading-snug font-bold text-slate-900 dark:text-slate-100">
            {p.title}
          </h3>
          {p.description && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {p.description}
            </p>
          )}
        </div>

        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <dt className="text-xs font-semibold text-slate-400">Location</dt>
              <dd className="text-slate-700 dark:text-slate-300">
                {p.barangays.length > 0
                  ? p.barangays.join(", ")
                  : "Dipolog City (barangay not stated)"}
                {p.locationNote && (
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {p.locationNote}
                  </span>
                )}
              </dd>
            </div>
          </div>
          <div className="flex gap-2">
            <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <dt className="text-xs font-semibold text-slate-400">
                Implementer / office
              </dt>
              <dd className="text-slate-700 dark:text-slate-300">
                {[p.implementer, p.office].filter(Boolean).join(" · ") ||
                  "Not stated (listed by the City Government of Dipolog)"}
                {p.contractor && (
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Contractor: {p.contractor}
                  </span>
                )}
              </dd>
            </div>
          </div>
          <div className="flex gap-2">
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div>
              <dt className="text-xs font-semibold text-slate-400">
                {p.amount ? AMOUNT_BASIS_LABELS[p.amount.basis] : "Amount"}
              </dt>
              <dd className="text-slate-700 dark:text-slate-300">
                {p.amount ? formatPeso(p.amount.value) : "Not stated"}
                {p.abc !== undefined && (
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Approved budget (ABC): {formatPeso(p.abc)}
                  </span>
                )}
                {p.fundSource && (
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Fund source: {p.fundSource}
                  </span>
                )}
                {p.procurementMode && (
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Mode: {p.procurementMode}
                  </span>
                )}
              </dd>
            </div>
          </div>
          {p.dates.length > 0 && (
            <div className="flex gap-2">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <dt className="text-xs font-semibold text-slate-400">Dates</dt>
                <dd>
                  <ul className="text-slate-700 dark:text-slate-300">
                    {p.dates.map((d) => (
                      <li key={`${d.label}-${d.date}`}>
                        <span className="text-slate-500 dark:text-slate-400">
                          {d.label}:
                        </span>{" "}
                        {formatProjectDate(d.date)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </div>
          )}
        </dl>

        {p.note && (
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-950 dark:text-slate-400">
            {p.note}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-1 border-slate-100 bg-slate-50/60 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between md:py-3 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
        <span>
          Source: {source?.title}
          {p.sourcePage ? `, page ${p.sourcePage}` : ""} · {source?.asOfLabel}
        </span>
        <a
          href={p.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-blue-700 hover:underline dark:text-blue-300"
        >
          View source <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </CardFooter>
    </Card>
  );
}
