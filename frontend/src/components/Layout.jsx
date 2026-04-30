import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, List, PlusSquare, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-900">Tool-24</h1>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/audits" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <List size={20} />
            <span>Audits</span>
          </Link>
          <Link to="/audits/new" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
            <PlusSquare size={20} />
            <span>New Audit</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-700 rounded-lg hover:bg-gray-100">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800">Audit Report Generator</h2>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
