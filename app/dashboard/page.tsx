import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import FeedbackTable from "@/components/FeedbackTable";


export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Feedback" value={0} />
            <StatCard title="Positive Feedback" value={0} />
            <StatCard title="Negative Feedback" value={0} />
          </div>

          <div className="mt-10 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
              <FeedbackTable />
            </h2>

            <p className="text-gray-500">
              No feedback available yet.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}