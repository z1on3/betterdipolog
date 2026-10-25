import { Metadata } from "next";
import {
  Zap,
  Droplets,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Facebook,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";
import ReferencesFooter from "@/components/ui/ReferencesFooter";

export const metadata: Metadata = {
  title: "Utilities — Power & Water in Dipolog City",
  description:
    "Contact information for Dipolog City's power distributor, ZANECO (Zamboanga del Norte Electric Cooperative), and water provider, Dipolog City Water District.",
};

interface Contact {
  label: string;
  value: string;
}

interface Utility {
  id: string;
  name: string;
  shortName: string;
  service: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  address: string;
  phones: Contact[];
  emails: string[];
  hours?: string;
  websiteUrl: string;
  facebookUrl?: string;
  notes: string[];
}

const UTILITIES: Utility[] = [
  {
    id: "zaneco",
    name: "Zamboanga del Norte Electric Cooperative, Inc.",
    shortName: "ZANECO",
    service: "Electricity",
    description:
      "ZANECO is the electric cooperative that distributes power in Dipolog City and Zamboanga del Norte. Its Dipolog Main Office is on General Luna Street.",
    Icon: Zap,
    accent: "bg-amber-50 text-amber-600",
    address: "General Luna St., Brgy. Central, Dipolog City",
    phones: [
      { label: "Hotline (Smart)", value: "0999-883-8636" },
      { label: "Hotline (Globe)", value: "0935-021-3939" },
    ],
    emails: [],
    hours: "8:00 AM – 5:00 PM, Monday to Saturday and holidays",
    websiteUrl: "https://zaneco.ph/",
    notes: [
      "Power interruption notices, monthly generation charge breakdowns, and unbundled rates are posted on the ZANECO website.",
      "ZANECO advises that its meter readers and disconnection personnel are not allowed to accept any form of payment. Pay only at official ZANECO offices or authorized payment centers.",
    ],
  },
  {
    id: "dcwd",
    name: "Dipolog City Water District",
    shortName: "DipCWD",
    service: "Water",
    description:
      "Dipolog City Water District provides the city's Level III (piped, household connection) water supply. Some areas are also served by Level II government-installed systems.",
    Icon: Droplets,
    accent: "bg-sky-50 text-sky-600",
    address: "National Highway, Minaog, Dipolog City, 7100",
    phones: [
      { label: "General inquiries", value: "(065) 212-2574" },
      { label: "Office of the General Manager", value: "(065) 908-0154" },
      { label: "General Services Division", value: "(065) 212-6742" },
    ],
    emails: ["dipologcitywd@gmail.com"],
    websiteUrl: "https://dipologwater.gov.ph/",
    facebookUrl: "https://www.facebook.com/OfficialDipCWD/",
    notes: [
      "Service applications, billing questions, and complaints are handled by the Customer Service Division at the main office.",
    ],
  },
];

const references = [
  {
    title: "ZANECO — official website (address, hotlines, office hours)",
    url: "https://zaneco.ph/",
  },
  {
    title: "Dipolog City Water District — Contact Us",
    url: "https://dipologwater.gov.ph/contact-us/",
  },
  {
    title:
      "dipologcity.gov.ph — Socio-Economic Profile (power: ZANECO; water: Level III DCWD and Level II government-installed)",
    url: "https://dipologcity.gov.ph/socio-economic-profile/",
  },
];

export default function UtilitiesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      <SubpageNav />
      <SubpageHero>
        <SubpageHero.Badges>
          <span className="rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-bold tracking-wider text-amber-700 uppercase">
            Public Utilities
          </span>
        </SubpageHero.Badges>
        <SubpageHero.Title>Power & Water</SubpageHero.Title>
        <SubpageHero.Description>
          Who to call for electricity and water service in Dipolog City — the
          Zamboanga del Norte Electric Cooperative (ZANECO) and the Dipolog City
          Water District.
        </SubpageHero.Description>
      </SubpageHero>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:px-6">
        {UTILITIES.map((utility) => (
          <section
            key={utility.id}
            id={utility.id}
            className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-5 flex items-start gap-4">
              <div className={`shrink-0 rounded-xl p-3 ${utility.accent}`}>
                <utility.Icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  {utility.service}
                </p>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  {utility.shortName}
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  {utility.name}
                </p>
              </div>
            </div>

            <p className="mb-6 leading-relaxed text-slate-600">
              {utility.description}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${utility.name}, ${utility.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <span className="text-blue-600 underline">
                    {utility.address}
                  </span>
                </a>
                {utility.hours && (
                  <p className="flex items-start gap-2 text-sm text-slate-600">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    {utility.hours}
                  </p>
                )}
                {utility.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-start gap-2 text-sm text-slate-600 hover:text-blue-600"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    {email}
                  </a>
                ))}
                <div className="flex gap-2 pt-1">
                  <a
                    href={utility.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    <Globe className="h-3.5 w-3.5" /> Official website
                  </a>
                  {utility.facebookUrl && (
                    <a
                      href={utility.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100"
                    >
                      <Facebook className="h-3.5 w-3.5" /> Facebook
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Contact numbers
                </p>
                <ul className="space-y-2.5">
                  {utility.phones.map((phone) => (
                    <li key={phone.value} className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <div>
                        <a
                          href={`tel:${phone.value.replace(/[^0-9+]/g, "")}`}
                          className="text-sm font-semibold text-blue-600 hover:underline"
                        >
                          {phone.value}
                        </a>
                        <p className="text-xs text-slate-500">{phone.label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {utility.notes.length > 0 && (
              <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                {utility.notes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <ReferencesFooter
          references={references}
          disclaimer="Contact details are taken from each provider's official website. Current electricity and water rates change regularly — check the providers' websites for the latest rates. Spotted outdated information? Let us know."
        />
      </div>
    </main>
  );
}
