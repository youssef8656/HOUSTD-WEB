import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ApartmentCard from '../../components/ApartmentCard';
import { Building2 } from 'lucide-react';

export default function OwnerHomeFragment() {
  const { currentUser } = useAuth();
  const { apartments, deleteApartment } = useData();

  const myApartments = apartments.filter(a => a.ownerId === currentUser?.id);

  return (
    <div className="px-4 pt-6">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Welcome back,</p>
        <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name} 👋</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-4 text-white">
          <p className="text-2xl font-bold">{myApartments.length}</p>
          <p className="text-indigo-100 text-xs mt-1">Total Listings</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white">
          <p className="text-2xl font-bold">{myApartments.filter(a => a.status === 'Approved').length}</p>
          <p className="text-emerald-100 text-xs mt-1">Approved</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 text-white">
          <p className="text-2xl font-bold">{myApartments.filter(a => a.status === 'Pending').length}</p>
          <p className="text-amber-100 text-xs mt-1">Pending</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Building2 size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Your Apartments</h2>
      </div>

      {myApartments.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-500">No apartments yet</p>
          <p className="text-gray-400 text-sm mt-1">Add your first listing!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {myApartments.map(apt => (
            <ApartmentCard key={apt.id} apartment={apt} variant="owner" onDelete={() => deleteApartment(apt.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
