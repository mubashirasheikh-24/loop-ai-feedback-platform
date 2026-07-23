"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import FeedbackTable from "@/components/FeedbackTable";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Feedback Reports
          </h1>

          <p className="text-gray-600 mb-6">
            View, search, edit and manage all customer feedback.
          </p>

          <FeedbackTable />
        </main>
      </div>
    </div>
  );
}