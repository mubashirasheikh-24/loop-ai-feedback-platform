"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EditFeedbackModal from "@/components/EditFeedbackModal";

type Feedback = {
  id: string;
  customer: string;
  message: string;
  sentiment: string;
  rating: number;
  createdAt: string;
};

export default function FeedbackTable() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCustomer, setEditedCustomer] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editedSentiment, setEditedSentiment] = useState("Positive");
  const [editedRating, setEditedRating] = useState(5);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();

      if (Array.isArray(data)) {
        setFeedback(data);
      } else {
        setFeedback([]);
      }
    } catch (error) {
      console.error(error);
      setFeedback([]);
      toast.error("Failed to load feedback.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/feedback", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback((prev) =>
          prev.filter((item) => item.id !== id)
        );

        toast.success("Feedback deleted successfully!");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      const response = await fetch("/api/feedback", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          customer: editedCustomer,
          message: editedMessage,
          sentiment: editedSentiment,
          rating: editedRating,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update feedback.");
        return;
      }

      const updated = await response.json();

      setFeedback((prev) =>
        prev.map((item) =>
          item.id === updated.id ? updated : item
        )
      );

      setEditingId(null);

      toast.success("Feedback updated successfully!");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch = item.customer
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      item.sentiment === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Recent Feedback
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg p-3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="All">All</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Message</th>
              <th className="text-left p-3">Sentiment</th>
              <th className="text-left p-3">Rating</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-3">{item.customer}</td>

                  <td className="p-3 max-w-sm">
                    {item.message}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.sentiment === "Positive"
                          ? "bg-green-100 text-green-700"
                          : item.sentiment === "Negative"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.sentiment}
                    </span>
                  </td>

                  <td className="p-3">
                    {"⭐".repeat(item.rating)}
                  </td>

                  <td className="p-3">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditedCustomer(item.customer);
                        setEditedMessage(item.message);
                        setEditedSentiment(item.sentiment);
                        setEditedRating(item.rating);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  No feedback found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingId && (
        <EditFeedbackModal
          customer={editedCustomer}
          message={editedMessage}
          sentiment={editedSentiment}
          rating={editedRating}
          setCustomer={setEditedCustomer}
          setMessage={setEditedMessage}
          setSentiment={setEditedSentiment}
          setRating={setEditedRating}
          onCancel={() => setEditingId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}