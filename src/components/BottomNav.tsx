import type { ReactNode } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface Props {
  items: NavItem[];
  active: string;
  onChange: (id: string) => void;
}

export default function BottomNav({ items, active, onChange }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {items.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onChange(item.id)}
              className={`flex flex-col items-center py-2.5 px-3 min-w-[64px] transition-all ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-indigo-50' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[11px] mt-0.5 font-medium ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
