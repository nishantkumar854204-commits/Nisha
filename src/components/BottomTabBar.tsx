import React from 'react';
import { Home, Film, Headphones, Flame, Bookmark } from 'lucide-react';

interface BottomTabBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'micro_dramas', label: 'Shorts', icon: Film },
    { id: 'audio_stories', label: 'Audio', icon: Headphones },
    { id: 'top_10', label: 'Top 10', icon: Flame },
    { id: 'library', label: 'Library', icon: Bookmark },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0b0e]/95 backdrop-blur-xl border-t border-white/[0.08] px-2">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center h-full group focus:outline-none transition-transform active:scale-95"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-red-500 stroke-[2.5]' : 'text-neutral-400 group-hover:text-neutral-200'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-red-500 font-bold' : 'text-neutral-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
