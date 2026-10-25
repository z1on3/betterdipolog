import {
  AttractionsArraySchema,
  FestivalsArraySchema,
} from "@/validations/attractionSchema";
import rawAttractions from "./attractions.json";
import rawFestivals from "./festivals.json";

// Validated at import (server-only) so the browser bundle stays free of zod +
// raw JSON — pages pass the parsed arrays to client components as props.
export const attractions = AttractionsArraySchema.parse(rawAttractions);

export const festivals = FestivalsArraySchema.parse(rawFestivals).sort(
  (a, b) => a.month - b.month,
);
