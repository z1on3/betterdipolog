import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SubpageNav from "@/components/ui/SubpageNav";
import SubpageHero from "@/components/ui/SubpageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for BetterDipolog.org detailing how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans dark:bg-slate-950">
      <SubpageNav href="/" text="Go Home" />
      <SubpageHero>
        <SubpageHero.Badges>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back to About
          </Link>
        </SubpageHero.Badges>
        <SubpageHero.Title>Privacy Policy</SubpageHero.Title>
        <SubpageHero.Description>
          Last updated: October 25, 2026
        </SubpageHero.Description>
      </SubpageHero>

      <div className="mx-auto max-w-[800px] px-4 py-12 md:px-6">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-600 shadow-sm md:p-10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <p className="text-lg">
            This Privacy Policy describes how BetterDipolog.org (&quot;we&quot;)
            collects, uses, and protects your data on our website{" "}
            <a
              href="https://betterdipolog.org/"
              className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              https://betterdipolog.org/
            </a>
            , in line with the Data Privacy Act of 2012 (Republic Act No. 10173)
            of the Philippines. BetterDipolog.org is a volunteer-run community
            project based in Dipolog City, Zamboanga del Norte. It is not an
            official website of the City Government of Dipolog.
          </p>

          <section>
            <h2 className="mb-3 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              1. Data We Collect
            </h2>
            <p className="mb-4">
              You can browse the site without creating an account. We only
              collect information you choose to submit, plus minimal technical
              data needed to keep the site running:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Suggestions and issue reports:</strong> the details you
                type in, and an optional email address if you want a reply.
              </li>
              <li>
                <strong>Bangon Dipolog submissions</strong> (hazard reports,
                relief requests, community board messages): the details you
                provide, such as barangay, landmark, description, an optional
                name, and a contact number where the form asks for one.
              </li>
              <li>
                <strong>Technical data:</strong> your IP address is used briefly
                for rate limiting and spam prevention, and forms may be
                protected by Google reCAPTCHA. Moderators who sign in receive a
                session cookie.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              2. Use of Data
            </h2>
            <p>
              Submitted information is used only to review and improve the
              site&apos;s content, to coordinate community relief during an
              active emergency, and to prevent abuse. Public posts (such as
              approved community board messages) are shown on the site; contact
              numbers are not published.
            </p>
          </section>

          <section>
            <h2 className="mb-3 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              3. Data Protection
            </h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect your data, including access-restricted moderation tools
              and encrypted (HTTPS) connections.
            </p>
          </section>

          <section>
            <h2 className="mb-3 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              4. Sharing Data with Third Parties
            </h2>
            <p>
              We do not sell your data. Submissions are processed through the
              service providers that run this site (such as Cloudflare for
              hosting and storage, Discord for routing suggestions to our
              volunteers, and Google reCAPTCHA for spam protection). We do not
              otherwise share your data with third parties, except as required
              by law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              5. Your Rights
            </h2>
            <p>
              Under the Data Privacy Act of 2012 (RA 10173), you may request
              access, correction, or deletion of your data by contacting us at:{" "}
              <a
                href="mailto:reports@betterdipolog.org"
                className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                reports@betterdipolog.org
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 border-b border-slate-100 pb-2 text-xl font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
              6. Contact Us
            </h2>
            <p>
              If you have any questions, please contact us at:{" "}
              <a
                href="mailto:reports@betterdipolog.org"
                className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                reports@betterdipolog.org
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
