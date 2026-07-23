"use client";

type Props = {
  customer: string;
  message: string;
  sentiment: string;
  rating: number;

  setCustomer: (value: string) => void;
  setMessage: (value: string) => void;
  setSentiment: (value: string) => void;
  setRating: (value: number) => void;

  onSave: () => void;
  onCancel: () => void;
};

export default function EditFeedbackModal({
  customer,
  message,
  sentiment,
  rating,
  setCustomer,
  setMessage,
  setSentiment,
  setRating,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] shadow-xl">
        <h2 className="text-2xl font-bold mb-5">
          Edit Feedback
        </h2>

        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          placeholder="Customer"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full border rounded-lg p-3 mb-4"
          rows={4}
        />

        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option>Positive</option>
          <option>Neutral</option>
          <option>Negative</option>
        </select>

        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded-lg p-3 mb-6"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}