import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ApartmentCard from '../../components/ApartmentCard';
import { Building2, Users, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboardFragment() {
  const { currentUser, allUsers } = useAuth();
  const { apartments, requests, updateApartmentStatus } = useData();

  const pending = apartments.filter(a => a.status === 'Pending');
  const approved = apartments.filter(a => a.status === 'Approved');
  const rejected = apartments.filter(a => a.status === 'Rejected');
  const students = allUsers.filter(u => u.role === 'student');
  const owners = allUsers.filter(u => u.role === 'owner');

  return (
    <div className="px-4 pt-6">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Admin Panel</p>
        <h1 className="text-2xl font-bold text-gray-900">Hello, {currentUser?.name?.split(' ')[0]} 👋</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Building2 size={16} className="text-indigo-600" />
            </div>
            <span className="text-xs text-gray-500">Total Listings</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{apartments.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock size={16} className="text-amber-600" />
            </div>
            <span className="text-xs text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-amber-600">{pending.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <span className="text-xs text-gray-500">Approved</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{approved.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle size={16} className="text-red-600" />
            </div>
            <span className="text-xs text-gray-500">Rejected</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{rejected.length}</p>
        </div>
      </div>

      {/* Additional stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-4 text-white text-center">
          <Users size={20} className="mx-auto mb-1" />
          <p className="text-xl font-bold">{students.length}</p>
          <p className="text-indigo-100 text-xs">Students</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white text-center">
          <Building2 size={20} className="mx-auto mb-1" />
          <p className="text-xl font-bold">{owners.length}</p>
          <p className="text-purple-100 text-xs">Owners</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white text-center">
          <TrendingUp size={20} className="mx-auto mb-1" />
          <p className="text-xl font-bold">{requests.length}</p>
          <p className="text-emerald-100 text-xs">Requests</p>
        </div>
      </div>

      {/* Pending listings */}
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-amber-500" />
        <h2 className="text-lg font-semibold text-gray-900">Pending Approval</h2>
        {pending.length > 0 && (
          <span className="ml-auto px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">{pending.length}</span>
        )}
      </div>

      {pending.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-3" />
          <p className="text-gray-500">All caught up! No pending listings.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {pending.map(apt => (
            <ApartmentCard
              key={apt.id}
              apartment={apt}
              variant="admin"
              onApprove={() => updateApartmentStatus(apt.id, 'Approved')}
              onReject={() => updateApartmentStatus(apt.id, 'Rejected')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
