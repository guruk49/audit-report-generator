import { useEffect, useState } from 'react';
import { getStats } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: null,
    completed: null,
    pending: null,
    avgScore: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const response = await getStats();
        if (isMounted) {
          setStats({
            total: response.data.total ?? 0,
            completed: response.data.completed ?? 0,
            pending: response.data.pending ?? 0,
            avgScore: response.data.avgScore ?? 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Audits</div>
          <div className="text-3xl font-bold text-gray-900">{stats.total ?? '—'}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Completed</div>
          <div className="text-3xl font-bold text-green-600">{stats.completed ?? '—'}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">{stats.pending ?? '—'}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Avg Score</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats.avgScore ?? '—'}{stats.avgScore !== null ? '%' : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
