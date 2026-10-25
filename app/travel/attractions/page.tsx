import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import { attractions } from "@/data/travel";
import AttractionsClient from "./AttractionsClient";

export const metadata: Metadata = {
  title: "Attractions",
  description:
    "Things to see in Dipolog City — Linabo Peak's 3,003 steps, Dipolog Boulevard, the Rizal-linked Cathedral, Sungkilaw Falls and more — with locations, photos, and directions.",
};

export default function AttractionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Attractions in Dipolog City",
    description:
      "Community-maintained directory of landmarks, heritage sites, and nature spots in Dipolog City, Zamboanga del Norte.",
    url: "https://betterdipolog.org/travel/attractions",
    itemListElement: attractions.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        ...(a.lat !== undefined && a.lon !== undefined
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: a.lat,
                longitude: a.lon,
              },
            }
          : {}),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <AttractionsClient attractions={attractions} />
    </>
  );
}
