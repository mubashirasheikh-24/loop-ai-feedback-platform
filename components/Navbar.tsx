"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow p-5 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome, {session?.user?.name || "User"} 👋
        </h2>

        <p className="text-gray-600">
          AI Customer Feedback Intelligence Platform
        </p>
      </div>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </header>
  );
}