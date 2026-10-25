import * as z from "zod";

const AgencyCategories = z.enum([
  "National Agencies",
  "GOCCs",
  "Constitutional Commissions",
  "LGU Offices",
  "Programs & Associations",
]);
const DepartmentCategories = z.enum([
  "All Departments",
  "City Mayors Office",
  "Social Services",
  "Public Administration",
  "Infrastructure",
  "Fiscal Management",
  "Economic Enterprises",
]);

const Representative = z.object({
  name: z.string(),
  numbers: z.array(z.string()).optional(),
  emails: z.array(z.string()).optional(),
});

const BaseSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  websiteUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  logoUrl: z.string().optional(),
});

export const AgencySchema = BaseSchema.extend({
  category: AgencyCategories,
  numbers: z.array(z.string()).optional(),
  emails: z.array(z.string()).optional(),
  // Where the address/contact details were taken from (shown to users)
  sourceUrl: z.string().optional(),
});

export const DepartmentSchema = BaseSchema.extend({
  representative: Representative,
  category: DepartmentCategories,
});

export const AgencyArraySchema = z.array(AgencySchema);
export const DepartmentArraySchema = z.array(DepartmentSchema);

export type AgencyCategory = z.infer<typeof AgencyCategories>;
export type DepartmentCategory = z.infer<typeof DepartmentCategories>;

export type Agency = z.infer<typeof AgencySchema>;
export type Department = z.infer<typeof DepartmentSchema>;
