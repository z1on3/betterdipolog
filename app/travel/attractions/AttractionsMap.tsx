"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { MappedAttraction } from "@/validations/attractionSchema";

const PIN_COLOR = "#0891b2";
// Dipolog City Hall — fallback centre before bounds are fitted.
const DIPOLOG_CENTER: [number, number] = [8.5883, 123.3409];

function pinIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))">
            <path d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 21 13 21s13-11.25 13-21C26 5.82 20.18 0 13 0z" fill="${PIN_COLOR}"/>
            <circle cx="13" cy="13" r="5" fill="#ffffff"/>
        </svg>`,
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -32],
  });
}

function FitToPlaces({ places }: { places: MappedAttraction[] }) {
  const map = useMap();
  useEffect(() => {
    if (places.length === 0) return;
    map.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lon])), {
      padding: [45, 45],
      maxZoom: 14,
    });
  }, [places, map]);
  return null;
}

function FixResize() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 150);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

export default function AttractionsMap({
  places,
}: {
  places: MappedAttraction[];
}) {
  return (
    <MapContainer
      center={DIPOLOG_CENTER}
      zoom={13}
      className="z-30 h-full w-full"
      scrollWheelZoom={false}
    >
      <FixResize />
      <FitToPlaces places={places} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_2cjc_1_7bf841ba32475572565a719f"
      />
      {places.map((p) => (
        <Marker key={p.name} position={[p.lat, p.lon]} icon={pinIcon()}>
          <Popup>
            <div className="min-w-[11rem]">
              {p.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.photo.url}
                  alt={p.name}
                  className="mb-1.5 h-24 w-full rounded object-cover"
                />
              )}
              <p className="font-bold text-slate-900">{p.name}</p>
              {p.area && <p className="text-xs text-slate-500">{p.area}</p>}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat}%2C${p.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block text-xs font-bold text-cyan-700 underline"
              >
                Directions →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
