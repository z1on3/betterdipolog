import { ExternalLink, FileText, Scale } from "lucide-react";
import {
  Resolution,
  resolutionSourceUrl,
} from "@/validations/resolutionSchema";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ResolutionCard({
  resolution,
}: {
  resolution: Resolution;
}) {
  const isOrdinance = resolution.type === "ordinance";
  const TypeIcon = isOrdinance ? Scale : FileText;

  return (
    <a
      href={resolutionSourceUrl(resolution)}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md md:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={`${isOrdinance ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"} shrink-0 rounded-xl p-3`}
          >
            <TypeIcon className="h-5 w-5" />
          </div>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-slate-600 uppercase">
            {isOrdinance ? "Ordinance" : "Resolution"} No. {resolution.number}
          </span>
        </div>

        <div className="flex-1">
          <p className="mb-1.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            {resolution.category}
          </p>
          <div className="group/title-tooltip relative mb-2 cursor-help">
            <h3 className="line-clamp-4 text-sm leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              {resolution.title}
            </h3>

            {/* Title Tooltip Overlay (Blue Theme) */}
            <div className="pointer-events-none invisible absolute bottom-full left-0 z-50 mb-2 max-h-80 w-64 overflow-hidden rounded-xl bg-blue-600 p-3 text-xs leading-relaxed font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover/title-tooltip:visible group-hover/title-tooltip:opacity-100 sm:w-80">
              {resolution.title}
              {/* Blue triangle arrow */}
              <div className="absolute top-full left-4 -mt-px border-[6px] border-transparent border-t-blue-600"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-500">
            {resolution.date
              ? `Listed: ${formatDate(resolution.date)}`
              : "No date listed"}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-blue-600 transition-all group-hover:gap-2">
            View in SP index <ExternalLink className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
