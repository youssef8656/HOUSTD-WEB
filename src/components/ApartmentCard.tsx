import { Star, MapPin, Bed, Heart, Eye } from 'lucide-react';
import type { Apartment } from '../types';

interface Props {
  apartment: Apartment;
  variant: 'owner' | 'student' | 'admin';
  isSaved?: boolean;
  onToggleSave?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onApply?: () => void;
  onViewDetails?: () => void;
  onDelete?: () => void;
}

export default function ApartmentCard({ apartment, variant, isSaved, onToggleSave, onApprove, onReject, onApply, onViewDetails, onDelete }: Props) {
  const statusColor = apartment.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    : apartment.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30'
    : 'bg-amber-500/20 text-amber-400 border-amber-500/30';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img src={apartment.imageUrl} alt={apartment.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23e2e8f0"><rect width="600" height="400"/><text x="300" y="200" text-anchor="middle" fill="%2394a3b8" font-size="20">No Image</text></svg>'); }} />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
            {apartment.status}
          </span>
        </div>
        {variant === 'student' && onToggleSave && (
          <button onClick={onToggleSave} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition shadow-sm">
            <Heart size={18} className={isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>
        )}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm">
          <span className="text-lg font-bold text-indigo-900">${apartment.price}</span>
          <span className="text-gray-500 text-xs">/mo</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{apartment.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="truncate">{apartment.address}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Bed size={14} className="text-indigo-400" />
              <span>{apartment.beds} {apartment.beds === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-gray-600">{apartment.rating}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          {variant === 'student' && (
            <>
              {onViewDetails && (
                <button onClick={onViewDetails} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition">
                  <Eye size={15} /> Details
                </button>
              )}
              {onApply && (
                <button onClick={onApply} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition">
                  Apply Now
                </button>
              )}
            </>
          )}
          {variant === 'admin' && apartment.status === 'Pending' && (
            <>
              {onApprove && (
                <button onClick={onApprove} className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition">
                  Approve
                </button>
              )}
              {onReject && (
                <button onClick={onReject} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition">
                  Reject
                </button>
              )}
            </>
          )}
          {variant === 'owner' && onDelete && (
            <button onClick={onDelete} className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
