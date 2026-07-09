export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        LOOP
      </h1>

      <nav className="space-y-4">
        <a href="/dashboard" className="block hover:text-gray-300">
          Dashboard
        </a>

        <a href="#" className="block hover:text-gray-300">
          Feedback
        </a>

        <a href="#" className="block hover:text-gray-300">
          Analytics
        </a>

        <a href="#" className="block hover:text-gray-300">
          Reports
        </a>

        <a href="#" className="block hover:text-gray-300">
          Settings
        </a>

        <a href="/login" className="block text-red-300 hover:text-red-100">
          Logout
        </a>
      </nav>
    </aside>
  );
}