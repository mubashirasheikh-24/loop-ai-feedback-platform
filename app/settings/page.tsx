"use client";

import { signOut, useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Settings
          </h1>

          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">
              Account Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-semibold">
                  {session?.user?.name || "User"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">
                  {session?.user?.email || "No email"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Application</p>
                <p className="font-semibold">
                  LOOP AI Customer Feedback Intelligence Platform
                </p>
              </div>

              <div>
                <p className="text-gray-500">Version</p>
                <p className="font-semibold">1.0.0</p>
              </div>
            </div>

            <button
              onClick={() =>
                signOut({ callbackUrl: "/login" })
              }
              className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}