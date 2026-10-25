import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/bangonAuth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Bangon Dipolog — Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Already signed in → skip straight to the dashboard.
  if (await isAdmin()) redirect("/bangon-dipolog/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Moderator sign-in
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Bangon Dipolog command center
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
