import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ApartmentCard from '../../components/ApartmentCard';
import ApartmentDetailModal from '../../components/ApartmentDetailModal';
import ApplyModal from '../../components/ApplyModal';
import type { Apartment } from '../../types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function StudentHomeFragment() {
  const { currentUser } = useAuth();
  const { apartments, savedApartments, toggleSaved } = useData();
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [detailApt, setDetailApt] = useState<Apartment | null>(null);
  const [applyApt, setApplyApt] = useState<Apartment | null>(null);

  const approved = apartments.filter(a => a.status === 'Approved');

  const filtered = approved.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.address.toLowerCase().includes(search.toLowerCase());
    const matchPrice = maxPrice === '' || a.price <= maxPrice;
    const matchRating = minRating === '' || a.rating >= minRating;
    return matchSearch && matchPrice && matchRating;
  });

  return (
    <div className="px-4 pt-6">
      <div className="mb-5">
        <p className="text-gray-500 text-sm">Hello, {currentUser?.name?.split(' ')[0]} 👋</p>
        <h1 className="text-2xl font-bold text-gray-900">Find your perfect home</h1>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition text-sm"
            placeholder="Search apartments..." />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`px-4 rounded-xl border transition ${showFilters ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
            <button onClick={() => { setMaxPrice(''); setMinRating(''); }} className="text-xs text-indigo-600 hover:text-indigo-700">Clear all</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price ($/mo)</label>
              <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                placeholder="e.g. 500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Rating</label>
              <input type="number" value={minRating} onChange={e => setMinRating(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                placeholder="e.g. 4.0" min="0" max="5" step="0.1" />
            </div>
          </div>
        </div>
      )}

      {/* Active filters */}
      {(search || maxPrice !== '' || minRating !== '') && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-gray-500">Active filters:</span>
          {search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
              "{search}" <button onClick={() => setSearch('')}><X size={12} /></button>
            </span>
          )}
          {maxPrice !== '' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
              ≤${maxPrice}/mo <button onClick={() => setMaxPrice('')}><X size={12} /></button>
            </span>
          )}
          {minRating !== '' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
              ★≥{minRating} <button onClick={() => setMinRating('')}><X size={12} /></button>
            </span>
          )}
        </div>
      )}

      <p className="text-sm text-gray-400 mb-3">{filtered.length} apartment{filtered.length !== 1 ? 's' : ''} available</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(apt => (
          <ApartmentCard
            key={apt.id}
            apartment={apt}
            variant="student"
            isSaved={savedApartments.includes(apt.id)}
            onToggleSave={() => toggleSaved(apt.id)}
            onViewDetails={() => setDetailApt(apt)}
            onApply={() => setApplyApt(apt)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400">No apartments match your criteria</p>
        </div>
      )}

      {detailApt && <ApartmentDetailModal apartment={detailApt} onClose={() => setDetailApt(null)} onApply={() => { setApplyApt(detailApt); setDetailApt(null); }} />}
      {applyApt && <ApplyModal apartment={applyApt} onClose={() => setApplyApt(null)} />}
    </div>
  );
}
