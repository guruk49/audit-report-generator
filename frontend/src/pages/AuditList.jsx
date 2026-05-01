import { useState, useEffect } from 'react';
import { getAudits } from '../services/api';
import { Search, Filter, MoreVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuditList() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination and Sorting State
  const [page, setPage] = useState(0);
  const [size] = useState(2); // Using small size to demonstrate pagination with mock data
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchAudits = async () => {
      setLoading(true);
      try {
        const response = await getAudits(page, size, sortBy, sortDir);
        setAudits(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      } catch (error) {
        console.error('Failed to fetch audits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudits();
  }, [page, size, sortBy, sortDir]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortDir === 'asc' ? <ChevronUp size={16} className="inline ml-1" /> : <ChevronDown size={16} className="inline ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Audit Reports</h1>
        <Link to="/audits/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          Create New Audit
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search audits..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 select-none">
              <tr>
                <th className="px-6 py-4 font-medium">
                  <button type="button" className="flex w-full items-center gap-1 text-left hover:bg-gray-100 cursor-pointer" onClick={() => handleSort('id')}>
                    ID {renderSortIcon('id')}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button type="button" className="flex w-full items-center gap-1 text-left hover:bg-gray-100 cursor-pointer" onClick={() => handleSort('title')}>
                    Title {renderSortIcon('title')}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button type="button" className="flex w-full items-center gap-1 text-left hover:bg-gray-100 cursor-pointer" onClick={() => handleSort('category')}>
                    Category {renderSortIcon('category')}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button type="button" className="flex w-full items-center gap-1 text-left hover:bg-gray-100 cursor-pointer" onClick={() => handleSort('status')}>
                    Status {renderSortIcon('status')}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button type="button" className="flex w-full items-center gap-1 text-left hover:bg-gray-100 cursor-pointer" onClick={() => handleSort('date')}>
                    Date {renderSortIcon('date')}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">
                  <button type="button" className="flex w-full items-center gap-1 text-left hover:bg-gray-100 cursor-pointer" onClick={() => handleSort('score')}>
                    Score {renderSortIcon('score')}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                Array(size).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : audits.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No audits found.
                  </td>
                </tr>
              ) : (
                audits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">#{audit.id}</td>
                    <td className="px-6 py-4 font-medium text-blue-600 hover:underline cursor-pointer">
                      {audit.title}
                    </td>
                    <td className="px-6 py-4">{audit.category}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        audit.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{audit.date}</td>
                    <td className="px-6 py-4">{audit.score !== null ? audit.score : '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        aria-label={`More actions for audit #${audit.id}`}
                      >
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing {audits.length > 0 ? page * size + 1 : 0} to {Math.min((page + 1) * size, totalElements)} of {totalElements} entries
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent" 
            >
              Previous
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1 || loading}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent" 
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
