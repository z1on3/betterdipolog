import * as z from "zod";

// 1. Define the reusable sub-schemas
const RequirementSchema = z.object({
  groupName: z.string(),
  items: z.array(z.string()),
});

const ProcedureSchema = z.object({
  stepNumber: z.number(),
  clientAction: z.string(),
  providerAction: z.string(),
  duration: z.string(),
  personInCharge: z.string(),
  fee: z.string(),
});

// Where to go / whom to call for a service. All optional: only fill in what an
// official source (e.g. the city's Executive directory) actually states.
const OfficeContactSchema = z.object({
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

// The official document a service's requirements/steps/fees were taken from.
const SourceReferenceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

const ContactPersonSchema = z.object({
  name: z.string(),
  contactNumber: z.string().optional(),
  facebookUrl: z.string().url().optional(),
  messengerUrl: z.string().url().optional(),
});

// 2. Define the base fields that EVERY service must have
const BaseServiceSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),

  // Dimension 1: The Trust Level
  source: z.enum(["official", "community", "unverified"]),

  // Dimension 2: Physical vs Digital Availability
  isWalkIn: z.boolean(),
  isOnline: z.boolean(),
});

export const CustomLinkServiceSchema = BaseServiceSchema.extend({
  type: z.literal("custom_link"),
  href: z.string(),
});

// Used when BetterDipolog hosts the step-by-step guide
const StandardServiceSchema = BaseServiceSchema.extend({
  slug: z.string(),
  department: z.string(),
  type: z.literal("standard"),
  schedule: z.string(),
  whoMayAvail: z.string(),
  requirements: z.array(RequirementSchema),
  procedures: z.array(ProcedureSchema),
  contact: OfficeContactSchema.optional(),
  notes: z.array(z.string()).optional(),
  reference: SourceReferenceSchema.optional(),
});

// Used when we just want to redirect them to another portal
const ExternalServiceSchema = BaseServiceSchema.extend({
  department: z.string(),
  type: z.literal("external"),
  externalUrl: z.string(),
  reference: SourceReferenceSchema.optional(),
});

export const CommunityProfileSchema = BaseServiceSchema.extend({
  slug: z.string(),
  type: z.literal("internal"),
  bannerUrl: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  locationUrl: z.string().url().optional(),

  internalUrl: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  facebookUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),

  representative: ContactPersonSchema.optional(),

  offeredServices: z.array(z.string()).optional(),
});

// Combine them using a Discriminated Union on "type" (NOT "source")
export const ServiceSchema = z.discriminatedUnion("type", [
  StandardServiceSchema,
  ExternalServiceSchema,
  CommunityProfileSchema,
  CustomLinkServiceSchema,
]);

export const ServicesArraySchema = z.array(ServiceSchema);

// Infer the TypeScript types
export type StandardService = z.infer<typeof StandardServiceSchema>;
export type ExternalService = z.infer<typeof ExternalServiceSchema>;
export type CustomLinkService = z.infer<typeof CustomLinkServiceSchema>;
export type CommunityProfile = z.infer<typeof CommunityProfileSchema>;
export type AllService = z.infer<typeof ServiceSchema>;
