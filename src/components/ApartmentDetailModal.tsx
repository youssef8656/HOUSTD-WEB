import type { Apartment } from '../types';
import { X, MapPin, Bed, Star, User, DollarSign } from 'lucide-react';

interface Props {
  apartment: Apartment;
  onClose: () => void;
  onApply: () => void;
}

export default function ApartmentDetailModal({ apartment, onClose, onApply }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
          <X size={18} />
        </button>

        <img src={apartment.imageUrl} alt={apartment.title} className="w-full h-56 object-cover rounded-t-3xl sm:rounded-t-3xl"
          onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23e2e8f0"><rect width="600" height="400"/><text x="300" y="200" text-anchor="middle" fill="%2394a3b8" font-size="20">No Image</text></svg>'); }} />

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{apartment.title}</h2>

          <div className="flex items-center gap-1 text-gray-500 mb-4">
            <MapPin size={16} />
            <span className="text-sm">{apartment.address}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-indigo-50 rounded-xl p-3 text-center">
              <DollarSign size={18} className="text-indigo-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-indigo-900">${apartment.price}</p>
              <p className="text-xs text-gray-500">per month</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <Bed size={18} className="text-purple-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-900">{apartment.beds}</p>
              <p className="text-xs text-gray-500">{apartment.beds === 1 ? 'Bedroom' : 'Bedrooms'}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3 text-center">
              <Star size={18} className="text-amber-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-amber-900">{apartment.rating}</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
              <User size={14} /> <span>Listed by <strong className="text-gray-700">{apartment.ownerName}</strong></span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{apartment.description}</p>
          </div>

          <button onClick={onApply}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
            Apply for this Apartment
          </button>
        </div>
      </div>
    </div>
  );
}
