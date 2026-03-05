import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ApartmentCard from '../../components/ApartmentCard';
import type { ApartmentStatus } from '../../types';
import { Building2 } from 'lucide-react';

export default function AllListingsFragment() {
  const { apartments, updateApartmentStatus, deleteApartment } = useData();
  const [filter, setFilter] = useState<ApartmentStatus | 'All'>('All');

  const filtered = filter === 'All' ? apartments : apartments.filter(a => a.status === filter);

  const tabs: (ApartmentStatus | 'All')[] = ['All', 'Pending', 'Approved', 'Rejected'];

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-2 mb-1">
        <Building2 size={22} className="text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">All Listings</h1>
      </div>
      <p className="text-gray-500 text-sm mb-5">{apartments.length} total listings</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === t
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {t} {t !== 'All' && `(${apartments.filter(a => a.status === t).length})`}
            {t === 'All' && ` (${apartments.length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400">No listings found</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(apt => (
            <ApartmentCard
              key={apt.id}
              apartment={apt}
              variant="admin"
              onApprove={() => updateApartmentStatus(apt.id, 'Approved')}
              onReject={() => updateApartmentStatus(apt.id, 'Rejected')}
              onDelete={() => deleteApartment(apt.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
