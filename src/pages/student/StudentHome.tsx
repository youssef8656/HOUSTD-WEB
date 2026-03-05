import { useState } from 'react';
import BottomNav from '../../components/BottomNav';
import StudentHomeFragment from './StudentHomeFragment';
import SavedFragment from './SavedFragment';
import MoreFragment from '../../components/MoreFragment';
import { Home, Heart, User } from 'lucide-react';

export default function StudentHome() {
  const [tab, setTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={22} /> },
    { id: 'saved', label: 'Saved', icon: <Heart size={22} /> },
    { id: 'profile', label: 'Profile', icon: <User size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {tab === 'home' && <StudentHomeFragment />}
      {tab === 'saved' && <SavedFragment />}
      {tab === 'profile' && <MoreFragment />}
      <BottomNav items={navItems} active={tab} onChange={setTab} />
    </div>
  );
}
