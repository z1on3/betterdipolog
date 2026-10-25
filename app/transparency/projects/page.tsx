import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { ProjectsSchema } from "@/validations/projectSchema";
import rawProjectsData from "@/data/dipolog/projects.json";

export const dynamic = "force-static";

// Parsed on the server at build time; the client only receives plain props.
const projectsData = ProjectsSchema.parse(rawProjectsData);

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Infrastructure and social projects in Dipolog City from the DPWH transparency portal and the City Government of Dipolog's procurement reports and plans, each with its source and as-of date.",
};

export default function ProjectsPage() {
  return <ProjectsClient data={projectsData} />;
}
