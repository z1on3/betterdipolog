import { MetadataRoute } from "next";
import { allServices } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://betterdipolog.org";

  const routes = [
    { path: "", freq: "weekly", prio: 1 },
    { path: "/services", freq: "daily", prio: 0.9 },
    { path: "/disaster", freq: "weekly", prio: 0.9 },
    { path: "/bangon-dipolog", freq: "daily", prio: 0.9 },
    { path: "/dipolog", freq: "monthly", prio: 0.8 },
    { path: "/dipolog/city-stats", freq: "weekly", prio: 0.8 },
    { path: "/dipolog/utilities", freq: "monthly", prio: 0.8 },
    { path: "/dipolog/city-officials", freq: "monthly", prio: 0.8 },
    { path: "/dipolog/barangays", freq: "monthly", prio: 0.8 },
    { path: "/assistance", freq: "weekly", prio: 0.8 },
    { path: "/travel", freq: "monthly", prio: 0.8 },
    { path: "/travel/attractions", freq: "monthly", prio: 0.8 },
    { path: "/travel/festivals", freq: "monthly", prio: 0.8 },
    { path: "/travel/transportation", freq: "monthly", prio: 0.8 },
    { path: "/transparency", freq: "monthly", prio: 0.8 },
    { path: "/transparency/bids", freq: "weekly", prio: 0.8 },
    { path: "/transparency/budget", freq: "monthly", prio: 0.8 },
    { path: "/transparency/projects", freq: "monthly", prio: 0.8 },
    { path: "/transparency/resolutions", freq: "weekly", prio: 0.8 },
    { path: "/open-data", freq: "yearly", prio: 0.7 },
    { path: "/about", freq: "yearly", prio: 0.7 },
    { path: "/volunteer", freq: "yearly", prio: 0.7 },
    { path: "/contributors", freq: "monthly", prio: 0.6 },
    { path: "/privacy-policy", freq: "monthly", prio: 0.7 },
    { path: "/terms-of-service", freq: "monthly", prio: 0.7 },
    { path: "/government", freq: "yearly", prio: 0.7 },
    { path: "/government/directory", freq: "yearly", prio: 0.7 },
    { path: "/government/departments", freq: "yearly", prio: 0.7 },
  ] as const;

  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency:
      route.freq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route.prio,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = allServices
    .filter((service) => service.type === "standard")
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const communityRoutes: MetadataRoute.Sitemap = allServices
    .filter((service) => service.type === "internal")
    .map((community) => ({
      url: `${baseUrl}/community/${community.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...serviceRoutes, ...communityRoutes];
}
