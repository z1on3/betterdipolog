import { FileText } from "lucide-react";
import { BidNotice, formatNoticeDate } from "@/validations/bidSchema";

export default function BidCard({ bid }: { bid: BidNotice }) {
  const heading = bid.date ? formatNoticeDate(bid.date) : (bid.note ?? "");
  const subLabel = bid.date ? bid.note : `Undated · ${bid.year}`;

  return (
    <a
      href={bid.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md md:px-6"
    >
      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-blue-700 uppercase">
            Bid Notice
          </span>
          {subLabel && (
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-slate-600 uppercase">
              {subLabel}
            </span>
          )}
        </div>
        <h3 className="text-base leading-snug font-bold text-slate-900 group-hover:text-blue-700">
          {heading}
        </h3>
      </div>
      <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-blue-600">
        <FileText className="h-4 w-4" />
        View PDF
      </span>
    </a>
  );
}
