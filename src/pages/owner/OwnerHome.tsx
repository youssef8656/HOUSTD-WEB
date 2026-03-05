import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';
import OwnerHomeFragment from './OwnerHomeFragment';
import RequestsFragment from './RequestsFragment';
import AddApartmentFragment from './AddApartmentFragment';
import MoreFragment from '../../components/MoreFragment';
import { Home, Inbox, PlusCircle, MoreHorizontal } from 'lucide-react';

export default function OwnerHome() {
  const [tab, setTab] = useState('home');
  const { currentUser } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={22} /> },
    { id: 'requests', label: 'Requests', icon: <Inbox size={22} /> },
    { id: 'add', label: 'Add New', icon: <PlusCircle size={22} /> },
    { id: 'more', label: 'More', icon: <MoreHorizontal size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {tab === 'home' && <OwnerHomeFragment />}
      {tab === 'requests' && <RequestsFragment ownerId={currentUser?.id || ''} />}
      {tab === 'add' && <AddApartmentFragment onSuccess={() => setTab('home')} />}
      {tab === 'more' && <MoreFragment />}
      <BottomNav items={navItems} active={tab} onChange={setTab} />
    </div>
  );
}
