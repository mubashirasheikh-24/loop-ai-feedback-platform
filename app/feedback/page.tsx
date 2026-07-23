"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FeedbackPage() {
  const { status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    customer: "",
    message: "",
    sentiment: "Positive",
    rating: 5,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "rating"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSubmitting(true);
    setResponseMessage("");

    try {
      // AI Sentiment Analysis
      const aiResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: formData.message,
        }),
      });

      const aiData = await aiResponse.json();

      const detectedSentiment =
        aiResponse.ok && aiData.sentiment
          ? aiData.sentiment
          : formData.sentiment;

      // Save Feedback
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sentiment: detectedSentiment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Feedback submitted successfully!");
        setFormData({
          customer: "",
          message: "",
          sentiment: "Positive",
          rating: 5,
        });
      } else {
        setResponseMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div className="flex-1">
      <Navbar />

      <main className="p-8 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[500px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Submit Feedback
        </h1>

        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={formData.customer}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-4"
          required
        />

        <textarea
          name="message"
          placeholder="Feedback Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-4"
          rows={4}
          required
        />

        <select
          name="sentiment"
          value={formData.sentiment}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-4"
        >
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>

        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={formData.rating}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-4"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>

        {responseMessage && (
          <p className="mt-4 text-center font-medium">
            {responseMessage}
          </p>
        )}
      </form>
    </main>
    </div>
    </div>
  );
}