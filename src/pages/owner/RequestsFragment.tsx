import { useData } from '../../context/DataContext';
import { Inbox, Clock, CheckCircle2, XCircle, User, Mail, MessageSquare } from 'lucide-react';

interface Props {
  ownerId: string;
}

export default function RequestsFragment({ ownerId }: Props) {
  const { requests, apartments, updateRequestStatus } = useData();
  const myApartmentIds = apartments.filter(a => a.ownerId === ownerId).map(a => a.id);
  const myRequests = requests.filter(r => myApartmentIds.includes(r.apartmentId));

  const statusIcon = (status: string) => {
    if (status === 'Approved') return <CheckCircle2 size={16} className="text-emerald-500" />;
    if (status === 'Rejected') return <XCircle size={16} className="text-red-500" />;
    return <Clock size={16} className="text-amber-500" />;
  };

  const statusBg = (status: string) => {
    if (status === 'Approved') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Rejected') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Student Requests</h1>
      <p className="text-gray-500 text-sm mb-6">Manage applications to your listings</p>

      {myRequests.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-500">No requests yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myRequests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{req.apartmentTitle}</h3>
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                    <User size={14} />
                    <span>{req.studentName}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-sm text-gray-400">
                    <Mail size={14} />
                    <span>{req.studentEmail}</span>
                  </div>
                </div>
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusBg(req.status)}`}>
                  {statusIcon(req.status)} {req.status}
                </span>
              </div>

              {req.message && (
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                    <MessageSquare size={12} /> Message
                  </div>
                  <p className="text-sm text-gray-600">{req.message}</p>
                </div>
              )}

              {req.status === 'Pending' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateRequestStatus(req.id, 'Approved')}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition">
                    Accept
                  </button>
                  <button onClick={() => updateRequestStatus(req.id, 'Rejected')}
                    className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition border border-red-200">
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
