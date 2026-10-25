import { Metadata } from "next";
import { MapPin } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import { disasterFacilities } from "@/data/disaster";
import DisasterMapView from "./DisasterMapView";

export const metadata: Metadata = {
  title: "Dipolog City Emergency Facilities Map",
  description:
    "Interactive map of hospitals, fire and police stations, utilities, and evacuation landmarks across Dipolog City.",
};

export default function DisasterMapPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <SubpageNav href="/disaster" text="Back to Disaster Hub" />

      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="mb-4">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <MapPin className="h-6 w-6 text-emerald-600" aria-hidden />
            Emergency Facilities Map
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tap a pin or list item for its number and directions. Pin locations
            are community-sourced from OpenStreetMap and are approximate —
            confirm official evacuation centers with the Dipolog City CDRRMO.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            For an official hazard assessment of a specific location, check{" "}
            <a
              href="https://hazardhunter.georisk.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 underline hover:text-emerald-800"
            >
              GeoRiskPH HazardHunter
            </a>{" "}
            or{" "}
            <a
              href="https://noah.up.edu.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 underline hover:text-emerald-800"
            >
              UP NOAH
            </a>
            .
          </p>
        </div>

        <DisasterMapView facilities={disasterFacilities} />
      </div>
    </main>
  );
}
