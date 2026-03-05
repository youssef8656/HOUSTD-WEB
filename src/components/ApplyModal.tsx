import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import type { Apartment } from '../types';
import { X, CheckCircle, Send } from 'lucide-react';

interface Props {
  apartment: Apartment;
  onClose: () => void;
}

export default function ApplyModal({ apartment, onClose }: Props) {
  const { currentUser } = useAuth();
  const { addRequest, requests } = useData();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const alreadyApplied = requests.some(r => r.studentId === currentUser?.id && r.apartmentId === apartment.id);

  const handleSubmit = () => {
    if (!currentUser) return;
    addRequest({
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      apartmentId: apartment.id,
      apartmentTitle: apartment.title,
      status: 'Pending',
      message,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <X size={18} />
        </button>

        {alreadyApplied ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Already Applied</h3>
            <p className="text-gray-500 mt-2 text-sm">You've already submitted an application for this apartment.</p>
          </div>
        ) : submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Application Sent!</h3>
            <p className="text-gray-500 mt-2 text-sm">The owner will review your application.</p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Apply for Apartment</h3>
            <p className="text-gray-500 text-sm mb-4">{apartment.title}</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Message (optional)</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition resize-none text-sm"
                placeholder="Introduce yourself to the owner..." />
            </div>

            <button onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
              <Send size={16} /> Send Application
            </button>
          </>
        )}
      </div>
    </div>
  );
}
