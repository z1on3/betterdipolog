import { NextResponse } from "next/server";
import { ProjectsSchema } from "@/validations/projectSchema";
import rawProjectsData from "@/data/dipolog/projects.json";

const projectsData = ProjectsSchema.parse(rawProjectsData);

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      meta: {
        total: projectsData.projects.length,
        lastUpdated: new Date().toISOString(),
        source: "BetterDipolog Open Data API",
        description:
          "Infrastructure and social projects in Dipolog City from the DPWH transparency portal and the City Government of Dipolog's procurement monitoring reports, 2026 procurement plan and 2013-2014 project pages. Each project's status is as of its source's date (see sources[].asOf).",
      },
      data: projectsData,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
