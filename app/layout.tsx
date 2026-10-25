import type { Metadata } from "next";
import { kapwaSans, kapwaMono } from "./fonts";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import Header from "@/components/layout/Header";
import TopBanner from "@/components/layout/TopBanner";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://betterdipolog.org"),
  title: {
    default: "BetterDipolog.org",
    template: "%s | BetterDipolog.org",
  },
  description:
    "A modernized, volunteer-driven portal to access government services, public data, and resources for the people of Dipolog City, Zamboanga del Norte.",
  keywords: [
    "Dipolog",
    "Dipolog City",
    "Zamboanga del Norte",
    "Dipolognon",
    "BetterDipolog",
    "civic tech",
    "government services",
    "open data",
    "Philippines",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "BetterDipolog",
    locale: "en_PH",
    type: "website",
    url: "https://betterdipolog.org",
  },
  twitter: {
    card: "summary_large_image",
  },
  // TODO(owner): upstream's Facebook App ID (fb:app_id) was removed. Add
  // BetterDipolog's own `facebook: { appId }` here once one exists.
  other: {
    "og:logo": "https://betterdipolog.org/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kapwaSans.variable} ${kapwaMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TopBanner />
        <Header />
        <ScrollToTop />
        <main className="flex grow flex-col">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          containerClassName="max-sm:!items-center max-sm:!justify-start"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "12px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
