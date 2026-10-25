import { z } from "zod";

// --- Shared Reusable Schemas ---
export const KeyValueRowSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export const GridStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  subtext: z.string().optional(), // Optional since revenue/assets don't always have it
  href: z.string().optional(),
});

export const KeyFigureSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const SummaryCardSchema = z.object({
  value: z.string(),
  subtext: z.string(),
  rows: z.array(KeyValueRowSchema),
});

export const ReferenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

export const FacilityIconSchema = z.enum([
  "GraduationCap",
  "Stethoscope",
  "Zap",
  "Droplets",
  "Plane",
  "Anchor",
  "Route",
]);

export const FacilityStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  subtext: z.string(),
  icon: FacilityIconSchema,
  href: z.string().optional(),
});

export const QuickStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  subtext: z.string(),
});

// --- Main Category Schemas ---
export const CityHeaderSchema = z.object({
  classification: z.string(),
  location: z.string(),
  foundedBadge: z.string(),
  name: z.string(),
  description: z.string(),
  highlight: z.string(),
  descriptionEnd: z.string(),
});

export const DemographicsDataSchema = z.object({
  grid: z.array(GridStatSchema),
  generalInfo: z.array(KeyValueRowSchema),
});

export const GovernmentDataSchema = z.object({
  local: z.array(KeyValueRowSchema),
  history: z.array(KeyValueRowSchema),
});

export const EconomyDataSchema = z.object({
  grid: z.array(GridStatSchema),
  commerce: z.array(KeyValueRowSchema),
});

export const EnvironmentDataSchema = z.object({
  landUse: z.array(KeyValueRowSchema),
  geography: z.array(KeyValueRowSchema),
});

export const InfrastructureDataSchema = z.object({
  facilities: z.array(FacilityStatSchema),
  communications: z.array(z.string()),
});

// --- The Root Schema ---
export const CityProfileSchema = z.object({
  header: CityHeaderSchema,
  quickStats: z.array(QuickStatSchema),
  summary: z.object({
    population: SummaryCardSchema,
    economy: SummaryCardSchema,
  }),
  keyFigures: z.array(KeyFigureSchema),
  demographics: DemographicsDataSchema,
  government: GovernmentDataSchema,
  economy: EconomyDataSchema,
  environment: EnvironmentDataSchema,
  infrastructure: InfrastructureDataSchema,
  references: z.array(ReferenceSchema),
});

// --- Extract TypeScript Types ---
// This automatically generates standard TS interfaces from the Zod schemas above!
export type CityProfileData = z.infer<typeof CityProfileSchema>;
export type FacilityStat = z.infer<typeof FacilityStatSchema>;
export type FacilityIcon = z.infer<typeof FacilityIconSchema>;
export type KeyValueRow = z.infer<typeof KeyValueRowSchema>;
