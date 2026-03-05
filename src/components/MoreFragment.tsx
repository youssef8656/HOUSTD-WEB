import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, HelpCircle, Settings, MessageSquare, LogOut, Phone, ChevronRight, Shield } from 'lucide-react';

export default function MoreFragment() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <User size={20} />, label: 'My Profile', desc: 'View your account info', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <HelpCircle size={20} />, label: 'FAQs', desc: 'Frequently asked questions', color: 'bg-amber-100 text-amber-600' },
    { icon: <Settings size={20} />, label: 'Settings', desc: 'App preferences', color: 'bg-gray-100 text-gray-600' },
    { icon: <MessageSquare size={20} />, label: 'Feedback', desc: 'Send us your thoughts', color: 'bg-emerald-100 text-emerald-600' },
    { icon: <Phone size={20} />, label: 'Call Us', desc: '+1 (800) HOUSTD', color: 'bg-blue-100 text-blue-600' },
    { icon: <Shield size={20} />, label: 'Privacy Policy', desc: 'Your data privacy', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="px-4 pt-6">
      {/* Profile card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{currentUser?.name}</h2>
            <p className="text-indigo-100 text-sm">{currentUser?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-white/20 rounded-full text-xs capitalize">{currentUser?.role}</span>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item, i) => (
          <button key={i} className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:bg-gray-50 transition text-left">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{item.label}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition border border-red-100">
        <LogOut size={18} />
        Sign Out
      </button>

      <p className="text-center text-gray-300 text-xs mt-6">Houstd v1.0.0</p>
    </div>
  );
}
