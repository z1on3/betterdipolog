import { DepartmentArraySchema } from "@/validations/agencySchema";

import dipologDepartments from "./departments.json";

export const allDepartments = DepartmentArraySchema.parse(
  dipologDepartments.sort((a, b) => a.name.localeCompare(b.name)),
);
