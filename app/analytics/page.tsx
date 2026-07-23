"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import FeedbackChart from "@/components/FeedbackChart";

type DashboardStats = {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const positivePercentage =
    stats.total === 0
      ? 0
      : ((stats.positive / stats.total) * 100).toFixed(1);

  const neutralPercentage =
    stats.total === 0
      ? 0
      : ((stats.neutral / stats.total) * 100).toFixed(1);

  const negativePercentage =
    stats.total === 0
      ? 0
      : ((stats.negative / stats.total) * 100).toFixed(1);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Analytics Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Feedback" value={stats.total} />
            <StatCard title="Positive" value={stats.positive} />
            <StatCard title="Neutral" value={stats.neutral} />
            <StatCard title="Negative" value={stats.negative} />
          </div>

          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h2 className="text-xl font-bold mb-6">
              Sentiment Distribution
            </h2>

            <FeedbackChart
              positive={stats.positive}
              neutral={stats.neutral}
              negative={stats.negative}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-100 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">
                Positive Feedback
              </h3>

              <p className="text-4xl font-bold text-green-700">
                {positivePercentage}%
              </p>
            </div>

            <div className="bg-yellow-100 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">
                Neutral Feedback
              </h3>

              <p className="text-4xl font-bold text-yellow-700">
                {neutralPercentage}%
              </p>
            </div>

            <div className="bg-red-100 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">
                Negative Feedback
              </h3>

              <p className="text-4xl font-bold text-red-700">
                {negativePercentage}%
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}