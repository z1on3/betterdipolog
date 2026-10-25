import { z } from "zod";

// Infrastructure and social projects in Dipolog City, compiled from DPWH's
// transparency portal, the city's Procurement Monitoring Reports (PMR), its
// 2026 Annual Procurement Plan (APP) and its old (2013–2014) project pages.
// Every record carries its own source link; status is only ever "as of" the
// source's date (see `sources[].asOf`), never inferred as current.

export const BARANGAYS = [
  "Barra",
  "Biasong",
  "Central",
  "Cogon",
  "Dicayas",
  "Diwan",
  "Estaka",
  "Galas",
  "Gulayon",
  "Lugdungan",
  "Minaog",
  "Miputak",
  "Olingan",
  "Punta",
  "San Jose",
  "Sangkol",
  "Sta. Filomena",
  "Sta. Isabel",
  "Sicayab",
  "Sinaman",
  "Turno",
] as const;

export const PROJECT_CATEGORIES = [
  "roads",
  "bridges",
  "flood-control-drainage",
  "buildings",
  "schools",
  "health",
  "water-sanitation",
  "ports",
  "other",
] as const;

export const PROJECT_STATUSES = [
  "completed",
  "ongoing",
  "awarded",
  "under-procurement",
  "for-procurement",
  "not-yet-started",
  "planned",
  "historical-completed",
  "historical-ongoing",
] as const;

export const SOURCE_IDS = [
  "dpwh",
  "pmr-2026-1",
  "pmr-2022-1",
  "pmr-2022-2",
  "app-2026",
  "city-2014-completed",
  "city-2014-ongoing",
] as const;

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Expected YYYY-MM or YYYY-MM-DD");

export const ProjectSourceSchema = z.object({
  id: z.enum(SOURCE_IDS),
  title: z.string(),
  publisher: z.string(),
  url: z.string().url(),
  asOf: isoDate,
  asOfLabel: z.string(),
  note: z.string().optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  // Contract ID (DPWH) or procurement reference code (city PMR).
  referenceNo: z.string().optional(),
  // Title exactly as written in the source.
  title: z.string(),
  description: z.string().optional(),
  category: z.enum(PROJECT_CATEGORIES),
  // Barangays named in the source text (not inferred from coordinates).
  barangays: z.array(z.enum(BARANGAYS)),
  locationNote: z.string().optional(),
  implementer: z.string().optional(),
  office: z.string().optional(),
  fundSource: z.string().optional(),
  procurementMode: z.string().optional(),
  contractor: z.string().optional(),
  amount: z
    .object({
      value: z.number().nonnegative(),
      // contract-cost: awarded contract amount; abc: approved budget for the
      // contract; planned-budget: APP estimate; project-cost: as stated on
      // the city's 2014 pages.
      basis: z.enum(["contract-cost", "abc", "planned-budget", "project-cost"]),
    })
    .optional(),
  abc: z.number().nonnegative().optional(),
  status: z.enum(PROJECT_STATUSES),
  statusLabel: z.string(),
  progress: z.number().min(0).max(100).optional(),
  dates: z.array(z.object({ label: z.string(), date: isoDate })),
  year: z.number().int(),
  sourceId: z.enum(SOURCE_IDS),
  sourceUrl: z.string().url(),
  sourcePage: z.number().int().positive().optional(),
  note: z.string().optional(),
});

export const ProjectsSchema = z
  .object({
    retrievedAt: isoDate,
    currency: z.literal("PHP"),
    sources: z.array(ProjectSourceSchema),
    projects: z.array(ProjectSchema),
  })
  .superRefine((data, ctx) => {
    const sourceIds = new Set(data.sources.map((s) => s.id));
    const seen = new Set<string>();
    data.projects.forEach((p, i) => {
      if (!sourceIds.has(p.sourceId)) {
        ctx.addIssue({
          code: "custom",
          path: ["projects", i, "sourceId"],
          message: `Unknown source ${p.sourceId}`,
        });
      }
      if (seen.has(p.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["projects", i, "id"],
          message: `Duplicate id ${p.id}`,
        });
      }
      seen.add(p.id);
    });
  });

export type ProjectSource = z.infer<typeof ProjectSourceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectsData = z.infer<typeof ProjectsSchema>;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
