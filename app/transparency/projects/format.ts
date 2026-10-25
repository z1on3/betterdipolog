// Client-safe labels and formatters for the Projects page. Kept apart from
// validations/projectSchema.ts so the client bundle does not pull in zod.
import type {
  Project,
  ProjectCategory,
  ProjectStatus,
  ProjectSource,
} from "@/validations/projectSchema";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  roads: "Roads",
  bridges: "Bridges",
  "flood-control-drainage": "Flood control & drainage",
  buildings: "Buildings & facilities",
  schools: "Schools",
  health: "Health",
  "water-sanitation": "Water, sanitation & irrigation",
  ports: "Ports",
  other: "Other",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: "Completed",
  ongoing: "On-going",
  awarded: "Awarded",
  "under-procurement": "Under procurement",
  "for-procurement": "For procurement",
  "not-yet-started": "Not yet started",
  planned: "Planned",
  "historical-completed": "Historical: completed (2013)",
  "historical-ongoing": "Historical: on-going (2014)",
};

export const STATUS_STYLES: Record<ProjectStatus, string> = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ongoing: "border-blue-200 bg-blue-50 text-blue-700",
  awarded: "border-indigo-200 bg-indigo-50 text-indigo-700",
  "under-procurement": "border-violet-200 bg-violet-50 text-violet-700",
  "for-procurement": "border-violet-200 bg-violet-50 text-violet-700",
  "not-yet-started": "border-slate-200 bg-slate-50 text-slate-600",
  planned: "border-sky-200 bg-sky-50 text-sky-700",
  "historical-completed": "border-amber-200 bg-amber-50 text-amber-800",
  "historical-ongoing": "border-amber-200 bg-amber-50 text-amber-800",
};

export const AMOUNT_BASIS_LABELS: Record<
  NonNullable<Project["amount"]>["basis"],
  string
> = {
  "contract-cost": "Contract cost",
  abc: "Approved budget (ABC)",
  "planned-budget": "Planned budget (APP)",
  "project-cost": "Project cost (as stated)",
};

// Groups shown as the "Source" filter.
export const SOURCE_GROUPS: {
  key: string;
  label: string;
  ids: ProjectSource["id"][];
}[] = [
  { key: "dpwh", label: "DPWH (national)", ids: ["dpwh"] },
  {
    key: "pmr",
    label: "City procurement reports",
    ids: ["pmr-2026-1", "pmr-2022-1", "pmr-2022-2"],
  },
  { key: "app", label: "City 2026 procurement plan", ids: ["app-2026"] },
  {
    key: "historical",
    label: "City pages (2013–2014, historical)",
    ids: ["city-2014-completed", "city-2014-ongoing"],
  },
];

export function formatProjectDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d || 1)).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    ...(d ? { day: "numeric" } : {}),
    timeZone: "UTC",
  });
}

export function formatPeso(value: number): string {
  return `₱${value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
