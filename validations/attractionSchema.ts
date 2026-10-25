import * as z from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD");

// A freely-licensed photo (Wikimedia Commons) with per-image credit + license
// so the attribution line is preserved wherever it is shown.
export const TravelPhotoSchema = z.object({
  // Remote (Wikimedia) URL or a bundled local path under /public.
  url: z
    .string()
    .refine(
      (v) => v.startsWith("/") || v.startsWith("http"),
      "must be a URL or local path",
    ),
  credit: z.string(),
  license: z.string(),
  source: z.string().url(),
});

// A point of interest in the Dipolog attractions directory. Coordinates are
// optional: they are only included when sourced (OpenStreetMap / Wikipedia),
// never guessed. `sources` backs the description text.
export const AttractionSchema = z
  .object({
    name: z.string(),
    category: z.enum(["Nature", "Heritage", "Faith", "Landmark", "Park"]),
    area: z.string().optional(),
    description: z.string(),
    note: z.string().optional(),
    lat: z.number().gte(-90).lte(90).optional(),
    lon: z.number().gte(-180).lte(180).optional(),
    // Where the coordinates came from (provenance), e.g. an OSM element.
    coordSource: z.string().url().optional(),
    photo: TravelPhotoSchema.optional(),
    sources: z.array(z.string().url()).min(1),
    verifiedAt: isoDate,
  })
  .refine(
    (a) => (a.lat === undefined) === (a.lon === undefined),
    "lat and lon must be provided together",
  )
  .refine(
    (a) => a.lat === undefined || a.coordSource !== undefined,
    "coordinates require a coordSource",
  );

export const AttractionsArraySchema = z.array(AttractionSchema).min(1);

export type TravelPhoto = z.infer<typeof TravelPhotoSchema>;
export type Attraction = z.infer<typeof AttractionSchema>;
export type MappedAttraction = Attraction & { lat: number; lon: number };

// A recurring festival / event on Dipolog's civic calendar. `schedule` is the
// officially published timing (e.g. "4th Saturday of January"), not a
// specific year's date, since exact dates are announced yearly.
export const FestivalSchema = z.object({
  name: z.string(),
  schedule: z.string(),
  // 1-12, the month the event starts in — used for ordering only.
  month: z.number().int().min(1).max(12),
  // Overrides the month badge for movable feasts (e.g. "Mar–Apr").
  monthLabel: z.string().optional(),
  description: z.string(),
  note: z.string().optional(),
  sources: z.array(z.string().url()).min(1),
  verifiedAt: isoDate,
});

export const FestivalsArraySchema = z.array(FestivalSchema).min(1);

export type Festival = z.infer<typeof FestivalSchema>;
