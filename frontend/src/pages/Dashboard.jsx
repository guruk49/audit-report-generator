export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Audits</div>
          <div className="text-3xl font-bold text-gray-900">124</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Completed</div>
          <div className="text-3xl font-bold text-green-600">89</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">23</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Avg Score</div>
          <div className="text-3xl font-bold text-blue-600">92%</div>
        </div>
      </div>
    </div>
  );
}
