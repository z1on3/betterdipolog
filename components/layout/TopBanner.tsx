"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Cloud, CloudRain, Sun, CloudLightning, Phone } from "lucide-react";
import { HIDDEN_HEADER_PATHS } from "@/utils/variables";

const DIPOLOG_LAT = 8.5883;
const DIPOLOG_LNG = 123.3409;
const CURRENCIES = ["USD", "EUR", "JPY", "GBP", "AUD", "SGD", "KRW", "CNY"];

type ClassName = { className?: string };

export default function TopBanner({ className }: ClassName) {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(
    null,
  );
  const [rates, setRates] = useState<Record<string, number>>({});
  const [currIdx, setCurrIdx] = useState(0);
  const pathname = usePathname();
  const hideHeader = HIDDEN_HEADER_PATHS.includes(pathname);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${DIPOLOG_LAT}&longitude=${DIPOLOG_LNG}&current=temperature_2m,weather_code`,
    )
      .then(
        (r) =>
          r.json() as Promise<{
            current?: { temperature_2m: number; weather_code: number };
          }>,
      )
      .then((data) => {
        if (!data.current) return;
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
        });
      })
      .catch(() => {});

    fetch("https://api.exchangerate-api.com/v4/latest/PHP")
      .then((r) => r.json() as Promise<{ rates?: Record<string, number> }>)
      .then((data) => setRates(data.rates || {}))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIdx((i) => (i + 1) % CURRENCIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const weatherIcon = (code: number) => {
    if (code === 0) return <Sun className="h-3 w-3 text-amber-500" />;
    if (code <= 3) return <Cloud className="h-3 w-3 text-slate-400" />;
    if (code <= 67) return <CloudRain className="h-3 w-3 text-sky-500" />;
    return <CloudLightning className="h-3 w-3 text-violet-500" />;
  };

  const curr = CURRENCIES[currIdx];
  const rate = rates[curr] ? (1 / rates[curr]).toFixed(2) : null;

  return (
    <div
      className={`${className} ${hideHeader && "hidden"} border-b border-slate-200 bg-slate-50 font-sans text-[10px] sm:text-xs dark:border-slate-800 dark:bg-slate-950`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-1 sm:justify-end sm:gap-4 sm:py-2">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <span className="text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString("en-PH", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          {weather && (
            <span className="inline-flex items-center gap-1">
              {weatherIcon(weather.code)} {weather.temp}°C
            </span>
          )}
          {rate && (
            <span
              key={curr}
              className="animate-fade-in font-medium text-emerald-600 dark:text-emerald-400"
            >
              {curr} ₱{rate}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-slate-600 sm:border-l sm:border-slate-300 sm:pl-4 dark:text-slate-400 dark:sm:border-slate-700">
          <Phone className="h-3 w-3 text-red-500" />
          <a
            href="tel:911"
            className="font-semibold text-red-600 hover:underline dark:text-red-400"
          >
            911
          </a>
          <span className="mx-1 hidden text-slate-300 sm:inline">·</span>
          <a
            href="tel:+63652121506"
            className="hover:text-primary-600 dark:hover:text-primary-400 hidden text-slate-600 sm:inline dark:text-slate-400"
          >
            CDRRMO Dipolog
          </a>
        </div>
      </div>
    </div>
  );
}
