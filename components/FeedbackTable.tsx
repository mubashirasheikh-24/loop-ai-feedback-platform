type Feedback = {
  customer: string;
  sentiment: string;
  rating: number;
  date: string;
};

const feedbackData: Feedback[] = [
  {
    customer: "Ali Khan",
    sentiment: "Positive",
    rating: 5,
    date: "08 Jul 2026",
  },
  {
    customer: "Sara Ahmed",
    sentiment: "Neutral",
    rating: 3,
    date: "07 Jul 2026",
  },
  {
    customer: "Usman Ali",
    sentiment: "Negative",
    rating: 1,
    date: "06 Jul 2026",
  },
];

export default function FeedbackTable() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Recent Feedback
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Customer</th>
            <th className="text-left py-3">Sentiment</th>
            <th className="text-left py-3">Rating</th>
            <th className="text-left py-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {feedbackData.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3">{item.customer}</td>
              <td className="py-3">{item.sentiment}</td>
              <td className="py-3">{item.rating}/5</td>
              <td className="py-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}