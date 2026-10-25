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
  completed:
    "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
  ongoing:
    "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
  awarded:
    "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  "under-procurement":
    "border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300",
  "for-procurement":
    "border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300",
  "not-yet-started":
    "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400",
  planned:
    "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300",
  "historical-completed":
    "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200",
  "historical-ongoing":
    "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200",
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
