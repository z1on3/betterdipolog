import { Metadata } from "next";

import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import FilterGrid from "@/components/ui/FilterGrid";
import navigation from "@/data/navigation.json";

const section = navigation.find((item) => item.name === "Government")!;

export const metadata: Metadata = {
  title: "Government & Departments | BetterDipolog",
  description:
    "Access government directories, departmental profiles, public services, and contact information for the Dipolog City local government unit.",
};

export default function GovernmentDirectories() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/" text="Go Home" />
      <SubpageHero>
        <SubpageHero.Title>Government Directory</SubpageHero.Title>
        <SubpageHero.Description>
          Access a comprehensive list of government offices, departments, and
          national agencies serving Dipolog City.
        </SubpageHero.Description>
      </SubpageHero>

      <FilterGrid>
        <FilterGrid.Content
          title="Directories"
          itemCount={section.dropdown.length - 1}
          columns={2}
          hasSidebar={false}
        >
          {section.dropdown.map(
            (item, index) =>
              index != 0 && (
                <Link
                  key={index}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
                >
                  {/* Icon Container (Matching the reference image style) */}
                  <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/40 dark:text-blue-400">
                    <Landmark className="h-6 w-6" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300">
                      {item.name}
                    </h3>
                    {/* Only render description if it exists in your JSON */}
                    {item.description && (
                      <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow Icon (Matching reference image) */}
                  <div className="mt-1 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              ),
          )}
        </FilterGrid.Content>
      </FilterGrid>
    </main>
  );
}
