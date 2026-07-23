"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackChart from "@/components/FeedbackChart";

type DashboardStats = {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
};

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
}
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Feedback"
              value={stats.total}
            />

            <StatCard
              title="Positive Feedback"
              value={stats.positive}
            />

            <StatCard
              title="Neutral Feedback"
              value={stats.neutral}
            />

            <StatCard
              title="Negative Feedback"
              value={stats.negative}
            />
          </div>

          <FeedbackTable />

          <FeedbackChart
            positive={stats.positive}
            neutral={stats.neutral}
            negative={stats.negative}
          />
        </main>
      </div>
    </div>
  );
}