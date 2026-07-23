"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

type Props = {
  positive: number;
  neutral: number;
  negative: number;
};

export default function FeedbackChart({
  positive,
  neutral,
  negative,
}: Props) {
  const pieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [positive, neutral, negative],
        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#ef4444",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Feedback Count",
        data: [positive, neutral, negative],
        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Sentiment Distribution
        </h2>

       <Pie
  data={pieData}
  options={{
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }}
/>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Feedback Overview
        </h2>

        <Bar
  data={barData}
  options={{
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }}
/>
      </div>
    </div>
  );
}