import React from 'react';
import { Search, Coins, Globe, Crown } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  coins: number;
  isVip: boolean;
  onOpenCoinsModal: () => void;
  onOpenSearch: () => void;
  onOpenLanguage: () => void;
  onOpenAccountModal: () => void;
  onOpenAdminPanel: () => void;
  currentLanguage: Language;
  accountName: string;
  isOwner?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  coins,
  isVip,
  onOpenCoinsModal,
  onOpenSearch,
  onOpenLanguage,
  onOpenAccountModal,
  onOpenAdminPanel,
  currentLanguage,
  accountName,
  isOwner = true,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0b0e]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('home')}
          className="text-2xl font-black tracking-tight font-display text-white flex items-center gap-1 focus:outline-none"
        >
          <span className="text-red-500">SK</span>
          <span className="text-white">TV</span>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onTabChange('home')}
            className={`transition-colors hover:text-white whitespace-nowrap cursor-pointer ${
              currentTab === 'home' ? 'text-red-500 font-semibold border-b-2 border-red-500 py-1' : 'text-neutral-400'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onTabChange('micro_dramas')}
            className={`transition-colors hover:text-white whitespace-nowrap cursor-pointer ${
              currentTab === 'micro_dramas' ? 'text-red-500 font-semibold border-b-2 border-red-500 py-1' : 'text-neutral-400'
            }`}
          >
            Short Dramas
          </button>
          <button
            onClick={() => onTabChange('audio_stories')}
            className={`transition-colors hover:text-white whitespace-nowrap cursor-pointer ${
              currentTab === 'audio_stories' ? 'text-red-500 font-semibold border-b-2 border-red-500 py-1' : 'text-neutral-400'
            }`}
          >
            Audio Series
          </button>
          <button
            onClick={() => onTabChange('top_10')}
            className={`transition-colors hover:text-white whitespace-nowrap cursor-pointer ${
              currentTab === 'top_10' ? 'text-red-500 font-semibold border-b-2 border-red-500 py-1' : 'text-neutral-400'
            }`}
          >
            Top 10
          </button>
          <button
            onClick={() => onTabChange('library')}
            className={`transition-colors hover:text-white whitespace-nowrap cursor-pointer ${
              currentTab === 'library' ? 'text-red-500 font-semibold border-b-2 border-red-500 py-1' : 'text-neutral-400'
            }`}
          >
            My Library
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (Search, Coins balance, VIP badge) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Search shows"
            aria-label="Search shows"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenLanguage}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            title="Change language"
          >
            <Globe className="w-3.5 h-3.5 text-red-400" />
            <span className="font-medium uppercase">हिंदी</span>
          </button>

          {/* Coins / VIP Button */}
          <button
            onClick={onOpenCoinsModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 text-amber-300 border border-amber-500/40 transition-all shadow-sm active:scale-95 whitespace-nowrap min-h-[40px]"
          >
            {isVip ? (
              <>
                <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-amber-300 font-bold">VIP PASS</span>
              </>
            ) : (
              <>
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="tabular-nums font-bold">{coins}</span>
                <span className="text-[10px] text-amber-400/80 font-normal hidden xs:inline">+Free</span>
              </>
            )}
          </button>

          {/* User Account / Bank of Baroda UPI Avatar Button */}
          <button
            onClick={onOpenAccountModal}
            className="flex items-center gap-1.5 p-1 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors group min-h-[40px] px-2"
            title="My Account & Bank of Baroda UPI"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {accountName ? accountName.charAt(0) : 'N'}
            </div>
            <span className="text-xs font-semibold text-neutral-300 group-hover:text-white hidden lg:inline truncate max-w-[80px]">
              BOB UPI
            </span>
          </button>

          {/* Owner Admin Panel Button */}
          {isOwner && (
            <button
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-500/20 hover:from-red-600/40 hover:to-amber-500/30 text-amber-300 border border-amber-500/50 shadow-sm active:scale-95 transition-all text-xs font-extrabold min-h-[40px] whitespace-nowrap"
              title="SK TV Creator & Owner Admin Panel"
            >
              <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
