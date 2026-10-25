"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import FilterGrid from "@/components/ui/FilterGrid";
import ResolutionCard from "@/components/ResolutionCard";
import { ResolutionsData } from "@/validations/resolutionSchema";

type TypeFilter = "all" | "resolution" | "ordinance";

const PAGE_SIZE = 60;

interface ResolutionsInteractiveProps {
  data: ResolutionsData;
}

export default function ResolutionsInteractive({
  data,
}: ResolutionsInteractiveProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<TypeFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(data.entries.map((r) => r.category)));
    return ["All", ...unique.sort()];
  }, [data]);

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.entries.filter((r) => {
      const matchesCategory =
        selectedCategory === "All" || r.category === selectedCategory;
      const matchesType = selectedType === "all" || r.type === selectedType;
      const matchesSearch =
        r.title.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.number.includes(query);
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [selectedCategory, selectedType, searchQuery, data]);

  // Start from the first page again whenever the filters change.
  const [lastFilterKey, setLastFilterKey] = useState("");
  const filterKey = `${selectedCategory}|${selectedType}|${searchQuery}`;
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <div className="container mx-auto px-4 pt-6 md:px-6">
        <div className="group relative mx-auto mb-2 max-w-2xl">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600" />
          <input
            type="text"
            placeholder="Search by title or resolution/ordinance number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-4 pr-4 pl-12 text-base text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
          />
        </div>

        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
            {(["all", "resolution", "ordinance"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold capitalize transition-colors ${selectedType === t ? "bg-emerald-700 text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                {t === "all" ? "All Types" : `${t}s`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <FilterGrid className="py-0! md:py-0!">
        <FilterGrid.Sidebar
          title="Categories"
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <FilterGrid.Content
          title={selectedCategory}
          itemCount={filtered.length}
          columns={2}
        >
          {filtered.length > 0 ? (
            <>
              {filtered.slice(0, visibleCount).map((r, idx) => (
                <ResolutionCard
                  key={`${r.type}-${r.number}-${idx}`}
                  resolution={r}
                />
              ))}
              {filtered.length > visibleCount && (
                <div className="col-span-full flex justify-center">
                  <button
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Show more ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <div className="mb-4 rounded-full bg-slate-50 p-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                No ordinances or resolutions found
              </h3>
              <p className="mx-auto max-w-sm text-sm text-slate-500">
                Try a different search term or category.
              </p>
            </div>
          )}
        </FilterGrid.Content>
      </FilterGrid>
    </>
  );
}
