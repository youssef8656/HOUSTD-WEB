import { useState } from 'react';
import BottomNav from '../../components/BottomNav';
import AdminDashboardFragment from './AdminDashboardFragment';
import ManageUsersFragment from './ManageUsersFragment';
import AllListingsFragment from './AllListingsFragment';
import MoreFragment from '../../components/MoreFragment';
import { LayoutDashboard, Users, Building2, MoreHorizontal } from 'lucide-react';

export default function AdminHome() {
  const [tab, setTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'listings', label: 'Listings', icon: <Building2 size={22} /> },
    { id: 'users', label: 'Users', icon: <Users size={22} /> },
    { id: 'more', label: 'More', icon: <MoreHorizontal size={22} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {tab === 'dashboard' && <AdminDashboardFragment />}
      {tab === 'listings' && <AllListingsFragment />}
      {tab === 'users' && <ManageUsersFragment />}
      {tab === 'more' && <MoreFragment />}
      <BottomNav items={navItems} active={tab} onChange={setTab} />
    </div>
  );
}
