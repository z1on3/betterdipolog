import { Metadata } from "next";
import { safeJsonLd } from "@/lib/utils";
import { allDepartments } from "@/data/government/departments";
import DepartmentClient from "./DepartmentClient";

// 1. STATIC METADATA (Server Side)
export const metadata: Metadata = {
  title: "Dipolog City Departments Directory",
  description:
    "Contact directory of Dipolog City local government departments and offices — department heads, phone numbers, and emails.",
};

// 2. MAIN PAGE COMPONENT (Server Side)
export default function CityDepartmentsPage() {
  // Generate Schema.org JSON-LD specifically for a Directory/Collection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dipolog City Departments Directory",
    description:
      "Directory of local government departments, administrative offices, and public services under the Dipolog City Local Government Unit (LGU).",
    url: "https://betterdipolog.org/government/departments",
    about: {
      "@type": "GovernmentOrganization",
      name: "City Government of Dipolog",
      alternateName: "Dipolog City Hall",
      location: {
        "@type": "City",
        name: "Dipolog City",
      },
    },
  };

  return (
    <>
      {/* Inject the invisible SEO script into the HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Render your interactive Client UI */}
      <DepartmentClient allDepartments={allDepartments} />
    </>
  );
}
