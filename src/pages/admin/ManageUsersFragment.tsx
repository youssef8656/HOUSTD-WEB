import { useAuth } from '../../context/AuthContext';
import { Users, Mail, Shield, Trash2, Building2, GraduationCap } from 'lucide-react';

export default function ManageUsersFragment() {
  const { allUsers, deleteUser, currentUser } = useAuth();

  const roleIcon = (role: string) => {
    if (role === 'admin') return <Shield size={14} className="text-purple-500" />;
    if (role === 'owner') return <Building2 size={14} className="text-indigo-500" />;
    return <GraduationCap size={14} className="text-emerald-500" />;
  };

  const roleBg = (role: string) => {
    if (role === 'admin') return 'bg-purple-50 text-purple-700 border-purple-200';
    if (role === 'owner') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  const avatarBg = (role: string) => {
    if (role === 'admin') return 'bg-gradient-to-br from-purple-400 to-purple-600';
    if (role === 'owner') return 'bg-gradient-to-br from-indigo-400 to-indigo-600';
    return 'bg-gradient-to-br from-emerald-400 to-emerald-600';
  };

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-2 mb-1">
        <Users size={22} className="text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{allUsers.length} registered users</p>

      <div className="space-y-3">
        {allUsers.map(user => (
          <div key={user.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${avatarBg(user.role)}`}>
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{user.name}</h3>
              <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                <Mail size={12} />
                <span className="truncate">{user.email}</span>
              </div>
              <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${roleBg(user.role)}`}>
                {roleIcon(user.role)} <span className="capitalize">{user.role}</span>
              </span>
            </div>
            {user.id !== currentUser?.id && (
              <button onClick={() => deleteUser(user.id)}
                className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
