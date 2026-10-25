import { ServicesArraySchema } from "@/validations/serviceSchema";

import business from "./business.json";
import certificates from "./certificates.json";
import socialWelfare from "./social-welfare.json";
import taxes from "./taxes.json";
import infrastructure from "./infrastructure.json";
import transport from "./transport.json";
import animals from "./animals.json";
import disasters from "./disaster.json";
import education from "./education.json";

import betterdipologservices from "./betterdipolog-services.json";

const rawServices = [
  ...business,
  ...certificates,
  ...socialWelfare,
  ...taxes,
  ...infrastructure,
  ...transport,
  ...animals,
  ...disasters,
  ...education,

  ...betterdipologservices,
];

export const allServices = ServicesArraySchema.parse(rawServices);
