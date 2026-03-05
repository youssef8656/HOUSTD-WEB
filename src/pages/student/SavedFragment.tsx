import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ApartmentCard from '../../components/ApartmentCard';
import ApartmentDetailModal from '../../components/ApartmentDetailModal';
import ApplyModal from '../../components/ApplyModal';
import type { Apartment } from '../../types';
import { Heart } from 'lucide-react';

export default function SavedFragment() {
  const { apartments, savedApartments, toggleSaved } = useData();
  const [detailApt, setDetailApt] = useState<Apartment | null>(null);
  const [applyApt, setApplyApt] = useState<Apartment | null>(null);

  const saved = apartments.filter(a => savedApartments.includes(a.id));

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Saved Apartments</h1>
      <p className="text-gray-500 text-sm mb-6">Your favorite listings</p>

      {saved.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-500">No saved apartments</p>
          <p className="text-gray-400 text-sm mt-1">Tap the heart icon to save listings</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {saved.map(apt => (
            <ApartmentCard
              key={apt.id}
              apartment={apt}
              variant="student"
              isSaved={true}
              onToggleSave={() => toggleSaved(apt.id)}
              onViewDetails={() => setDetailApt(apt)}
              onApply={() => setApplyApt(apt)}
            />
          ))}
        </div>
      )}

      {detailApt && <ApartmentDetailModal apartment={detailApt} onClose={() => setDetailApt(null)} onApply={() => { setApplyApt(detailApt); setDetailApt(null); }} />}
      {applyApt && <ApplyModal apartment={applyApt} onClose={() => setApplyApt(null)} />}
    </div>
  );
}
