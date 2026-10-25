import { disasterHotlines } from "@/data/disaster";
import type { Hotline } from "@/validations/disasterSchema";
import {
  Phone,
  Building2,
  LifeBuoy,
  Cross,
  Flame,
  Shield,
  Zap,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const CATEGORY_ORDER: Hotline["category"][] = [
  "government",
  "rescue",
  "medical",
  "fire",
  "police",
  "utility",
];

const CATEGORY_META: Record<
  Hotline["category"],
  { label: string; color: string; Icon: typeof Phone }
> = {
  government: {
    label: "Emergency & Government",
    color: "#4f46e5",
    Icon: Building2,
  },
  rescue: {
    label: "Rescue & Disaster Response",
    color: "#059669",
    Icon: LifeBuoy,
  },
  medical: { label: "Medical", color: "#dc2626", Icon: Cross },
  fire: { label: "Fire", color: "#ea580c", Icon: Flame },
  police: { label: "Police", color: "#2563eb", Icon: Shield },
  utility: { label: "Utilities", color: "#475569", Icon: Zap },
};

function telHref(display: string): string {
  const cleaned = display.replace(/[^+\d]/g, "");
  // LGU-published landlines are 7-digit local numbers; prepend the Dipolog
  // area code so tap-to-call routes from mobile phones.
  return `tel:${cleaned.length === 7 ? `065${cleaned}` : cleaned}`;
}

export default function HotlinesSection() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    entries: disasterHotlines.filter((h) => h.category === category),
  })).filter((g) => g.entries.length > 0);

  return (
    <section aria-labelledby="hotlines-heading">
      <h2
        id="hotlines-heading"
        className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100"
      >
        Emergency Hotlines
      </h2>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Tap any number to call. Landlines use the Dipolog area code (065); from
        a mobile phone, dial the full number including the area code.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {grouped.map(({ category, entries }) => {
          const { label, color, Icon } = CATEGORY_META[category];
          return (
            <div
              key={category}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-slate-900"
            >
              <h3 className="mb-4 flex items-center gap-2.5 text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-slate-100">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}1a` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} aria-hidden />
                </span>
                {label}
              </h3>
              <ul className="space-y-4">
                {entries.map((hotline) => (
                  <li key={hotline.name}>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {hotline.name}
                      {hotline.hours && (
                        <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-normal text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                          {hotline.hours}
                        </span>
                      )}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {hotline.numbers.map((number) => (
                        <a
                          key={number}
                          href={telHref(number)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-4 py-2.5 text-base font-bold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-950/40 dark:text-blue-300"
                        >
                          <Phone className="h-4 w-4" aria-hidden />
                          {number}
                        </a>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Source:{" "}
                      <a
                        href={hotline.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-slate-600 dark:hover:text-slate-400"
                      >
                        link
                      </a>{" "}
                      · verified {hotline.verifiedAt}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Curated, maintained nationwide directory from the BetterGov project. */}
      <a
        href="https://hotlines.bettergov.ph/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-slate-900 dark:hover:border-gray-700"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40">
          <ExternalLink
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            aria-hidden
          />
        </span>
        <span className="flex-1">
          <span className="block font-bold text-slate-900 dark:text-slate-100">
            See the full hotline directory
          </span>
          <span className="block text-sm text-slate-500 dark:text-slate-400">
            A regularly-maintained nationwide emergency directory, curated by
            BetterGov.ph.
          </span>
        </span>
        <ArrowRight
          className="h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
          aria-hidden
        />
      </a>
    </section>
  );
}
