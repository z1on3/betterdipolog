import { z } from "zod";

// Mirrors the Sangguniang Panlungsod of Dipolog City's Legislative Information
// System (spdipolog.net), which lists each ordinance/resolution with a number,
// title, committee-style category and a date. The LIS publishes no PDFs, so
// entries link back to the LIS search for that number.
export const ResolutionSchema = z.object({
  number: z.string(),
  type: z.enum(["resolution", "ordinance"]),
  title: z.string(),
  // Category exactly as labeled by the SP (case variants merged).
  category: z.string(),
  // The date shown in the SP index (ISO). For many older records this is the
  // date the record was encoded, not the enactment date.
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export const ResolutionsSchema = z.object({
  source: z.object({ title: z.string(), url: z.string().url() }),
  retrievedAt: z.string(),
  // Record counts shown in the SP index at retrieval time.
  totals: z.object({
    ordinances: z.number().int(),
    resolutions: z.number().int(),
  }),
  // Resolutions are included from this year onward; ordinances are complete.
  resolutionsFrom: z.number().int(),
  entries: z.array(ResolutionSchema),
});

export type Resolution = z.infer<typeof ResolutionSchema>;
export type ResolutionsData = z.infer<typeof ResolutionsSchema>;

const SP_BASE = "https://spdipolog.net";

export function resolutionSourceUrl(r: Resolution): string {
  const page = r.type === "ordinance" ? "ordinances.php" : "resolutions.php";
  return `${SP_BASE}/${page}?q=${encodeURIComponent(r.number)}`;
}
