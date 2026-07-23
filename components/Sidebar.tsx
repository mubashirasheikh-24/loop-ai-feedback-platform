"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-lg transition ${
      pathname === path
        ? "bg-white text-blue-700 font-semibold"
        : "hover:bg-blue-600"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        LOOP
      </h1>

      <nav className="space-y-3">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          📊 Dashboard
        </Link>

        <Link href="/feedback" className={linkClass("/feedback")}>
          💬 Feedback
        </Link>

        <Link href="/analytics" className={linkClass("/analytics")}>
          📈 Analytics
        </Link>

        <Link href="/reports" className={linkClass("/reports")}>
          📄 Reports
        </Link>

        <Link href="/settings" className={linkClass("/settings")}>
          ⚙️ Settings
        </Link>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="w-full text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition mt-8"
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}