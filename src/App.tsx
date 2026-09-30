/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Show, Language, UserState } from './types';
import { SHOWS_DATA, CATEGORIES } from './data/mockShows';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ShowCard } from './components/ShowCard';
import { VerticalDramaPlayer } from './components/VerticalDramaPlayer';
import { AudioDramaPlayer } from './components/AudioDramaPlayer';
import { ShowDetailModal } from './components/ShowDetailModal';
import { VipModal } from './components/VipModal';
import { SearchModal } from './components/SearchModal';
import { LanguageModal } from './components/LanguageModal';
import { MiniPlayerBar } from './components/MiniPlayerBar';
import { BottomTabBar } from './components/BottomTabBar';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { AccountModal } from './components/AccountModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { audioEngine } from './utils/audioEngine';
import {
  Film,
  Headphones,
  Flame,
  Sparkles,
  Bookmark,
  History,
  Crown,
  Play,
  RotateCcw,
  Gift,
  Building2,
  ShieldCheck,
  Check
} from 'lucide-react';
import { UpiTransaction } from './types';

const STORAGE_KEY = 'sktv_user_state_v1';

const INITIAL_USER_STATE: UserState = {
  accountName: 'Nishant Kumar',
  email: 'nishantkumar854204@gmail.com',
  bankName: 'Bank of Baroda',
  upiId: 'nishantkumar854204@barodampay',
  isOwner: true,
  role: 'owner',
  coins: 500,
  isVip: true,
  watchlist: ['show-1', 'show-3'],
  likedShows: ['show-1'],
  unlockedEpisodes: ['ep-1-1', 'ep-1-2', 'ep-1-3', 'ep-2-1', 'ep-2-2', 'ep-3-1', 'ep-3-2'],
  history: [
    { showId: 'show-1', episodeId: 'ep-1-2', progressSec: 45, updatedAt: Date.now() - 3600000 },
    { showId: 'show-2', episodeId: 'ep-2-1', progressSec: 320, updatedAt: Date.now() - 86400000 },
  ],
  claimedDays: [1, 2, 3],
  language: 'hi',
  transactions: [
    {
      id: 'tx-bob-1',
      amount: 29,
      type: 'coins_pack',
      title: '100 Coins Starter Pack',
      utr: 'BOB8542049182',
      date: 'Yesterday, 4:30 PM',
      status: 'SUCCESS',
      upiId: 'nishantkumar854204@barodampay',
      bankName: 'Bank of Baroda',
    }
  ],
};

export default function App() {
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_USER_STATE,
          ...parsed,
          isOwner: true,
          role: 'owner',
          transactions: Array.isArray(parsed.transactions) ? parsed.transactions : INITIAL_USER_STATE.transactions,
          watchlist: Array.isArray(parsed.watchlist) ? parsed.watchlist : INITIAL_USER_STATE.watchlist,
          likedShows: Array.isArray(parsed.likedShows) ? parsed.likedShows : INITIAL_USER_STATE.likedShows,
          unlockedEpisodes: Array.isArray(parsed.unlockedEpisodes) ? parsed.unlockedEpisodes : INITIAL_USER_STATE.unlockedEpisodes,
          history: Array.isArray(parsed.history) ? parsed.history : INITIAL_USER_STATE.history,
          claimedDays: Array.isArray(parsed.claimedDays) ? parsed.claimedDays : INITIAL_USER_STATE.claimedDays,
        };
      }
    } catch {
      // fallback
    }
    return INITIAL_USER_STATE;
  });

  const [showsList, setShowsList] = useState<Show[]>(SHOWS_DATA);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals & Active Players
  const [activePlayShow, setActivePlayShow] = useState<Show | null>(null);
  const [activePlayEpId, setActivePlayEpId] = useState<string | undefined>(undefined);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [inspectShow, setInspectShow] = useState<Show | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Active UPI Payment state
  const [pendingUpiPayment, setPendingUpiPayment] = useState<{
    title: string;
    amount: number;
    type: 'vip_monthly' | 'vip_annual' | 'coins_pack';
    coinsToAdd?: number;
  } | null>(null);

  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch {
      // ignore
    }
  }, [userState]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stopAll();
    };
  }, []);

  const handlePlayShow = (show: Show, episodeId?: string) => {
    setActivePlayShow(show);
    setActivePlayEpId(episodeId || show.episodes[0]?.id);
    setIsPlayerMinimized(false);
    setIsAudioPlaying(true);

    // Record to history
    setUserState((prev) => {
      const epId = episodeId || show.episodes[0]?.id || 'ep-1';
      const existing = prev.history.filter((h) => h.showId !== show.id);
      return {
        ...prev,
        history: [{ showId: show.id, episodeId: epId, progressSec: 10, updatedAt: Date.now() }, ...existing],
      };
    });
  };

  const handleToggleWatchlist = (showId: string) => {
    setUserState((prev) => {
      const inList = prev.watchlist.includes(showId);
      return {
        ...prev,
        watchlist: inList ? prev.watchlist.filter((id) => id !== showId) : [...prev.watchlist, showId],
      };
    });
  };

  const handleUnlockEpisode = (episodeId: string, coinsNeeded: number): boolean => {
    if (userState.isVip) return true;
    if (userState.coins < coinsNeeded) {
      return false;
    }
    setUserState((prev) => ({
      ...prev,
      coins: prev.coins - coinsNeeded,
      unlockedEpisodes: [...prev.unlockedEpisodes, episodeId],
    }));
    return true;
  };

  const handleClaimDaily = (day: number, coinAmount: number) => {
    setUserState((prev) => ({
      ...prev,
      coins: prev.coins + coinAmount,
      claimedDays: [...prev.claimedDays, day],
    }));
  };

  const handleUpgradeVip = () => {
    setUserState((prev) => ({
      ...prev,
      isVip: true,
      vipExpiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    }));
  };

  const handleInitiateUpiPayment = (item: {
    title: string;
    amount: number;
    type: 'vip_monthly' | 'vip_annual' | 'coins_pack';
    coinsToAdd?: number;
  }) => {
    setPendingUpiPayment(item);
  };

  const handlePaymentSuccess = (transaction: UpiTransaction, coinsToAdd?: number) => {
    setUserState((prev) => {
      const isVipUpgrade = transaction.type === 'vip_monthly' || transaction.type === 'vip_annual';
      const addedCoins = coinsToAdd || 0;

      return {
        ...prev,
        isVip: isVipUpgrade ? true : prev.isVip,
        vipExpiresAt: isVipUpgrade ? new Date(Date.now() + 30 * 86400000).toISOString() : prev.vipExpiresAt,
        coins: prev.coins + addedCoins,
        transactions: [transaction, ...prev.transactions],
      };
    });

    setPendingUpiPayment(null);
    setPaymentSuccessToast(`✅ Bank of Baroda UPI Payment of ₹${transaction.amount} Verified!`);
    setTimeout(() => {
      setPaymentSuccessToast(null);
    }, 4500);
  };

  const handleUpdateUpiDetails = (name: string, bank: string, upiId: string) => {
    setUserState((prev) => ({
      ...prev,
      accountName: name,
      bankName: bank,
      upiId: upiId,
    }));
    setPaymentSuccessToast(`✅ Bank of Baroda UPI details updated successfully!`);
    setTimeout(() => {
      setPaymentSuccessToast(null);
    }, 3500);
  };

  // Admin Panel Content Management Handlers
  const handleAddShow = (newShow: Show) => {
    setShowsList((prev) => [newShow, ...prev]);
    setPaymentSuccessToast(`🎉 Series "${newShow.titleHindi}" published to SK TV!`);
    setTimeout(() => {
      setPaymentSuccessToast(null);
    }, 4000);
  };

  const handleDeleteShow = (showId: string) => {
    setShowsList((prev) => prev.filter((s) => s.id !== showId));
    setPaymentSuccessToast(`🗑️ Show removed from catalog.`);
    setTimeout(() => {
      setPaymentSuccessToast(null);
    }, 3000);
  };

  const handleToggleTrending = (showId: string) => {
    setShowsList((prev) =>
      prev.map((s) => (s.id === showId ? { ...s, isTrending: !s.isTrending } : s))
    );
  };

  const handleAddCoinsToOwner = (amount: number) => {
    setUserState((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
    setPaymentSuccessToast(`🪙 +${amount} Owner testing coins added to wallet!`);
    setTimeout(() => {
      setPaymentSuccessToast(null);
    }, 3000);
  };

  const handleToggleOwnerVip = () => {
    setUserState((prev) => ({
      ...prev,
      isVip: !prev.isVip,
    }));
    setPaymentSuccessToast(`👑 Owner VIP status updated.`);
    setTimeout(() => {
      setPaymentSuccessToast(null);
    }, 3000);
  };

  // Filter shows based on category
  const filteredShows = showsList.filter((show) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'micro_drama') return show.format === 'micro_drama';
    if (selectedCategory === 'audio_story') return show.format === 'audio_story';
    return show.category === selectedCategory;
  });

  const featuredHeroShow = (showsList && showsList[0]) || SHOWS_DATA[0];
  const top10Shows = [...(showsList || SHOWS_DATA)].sort((a, b) => (a.isTop10 || 99) - (b.isTop10 || 99));
  const microDramaShows = (showsList || []).filter((s) => s.format === 'micro_drama');
  const audioStoryShows = (showsList || []).filter((s) => s.format === 'audio_story');

  const continueWatchingShows = (userState?.history || [])
    .map((h) => {
      const show = (showsList || []).find((s) => s.id === h.showId) || SHOWS_DATA.find((s) => s.id === h.showId);
      return show ? { show, episodeId: h.episodeId, progressSec: h.progressSec } : null;
    })
    .filter(Boolean) as Array<{ show: Show; episodeId: string; progressSec: number }>;

  const watchlistShows = (showsList || []).filter((s) => (userState?.watchlist || []).includes(s.id));

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f3f4f6] pb-24 md:pb-12 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Strict 3-zone Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        coins={userState.coins}
        isVip={userState.isVip}
        onOpenCoinsModal={() => setIsVipModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLanguage={() => setIsLanguageOpen(true)}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        currentLanguage={userState.language}
        accountName={userState.accountName}
        isOwner={userState.isOwner}
      />

      {/* Floating Bank of Baroda UPI Payment Toast */}
      {paymentSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm shadow-2xl border border-white/20 animate-bounce flex items-center gap-2">
          <span>{paymentSuccessToast}</span>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {/* TAB: HOME */}
        {currentTab === 'home' && (
          <div>
            {/* Cinematic Hero Spotlight */}
            <HeroBanner
              show={featuredHeroShow}
              onPlay={(s) => handlePlayShow(s)}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={(userState?.watchlist || []).includes(featuredHeroShow?.id || '')}
              onSelectShow={(s) => setInspectShow(s)}
            />

            {/* Quick Interactive Category Filter Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[38px] ${
                      selectedCategory === cat.id
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-6">
              {/* SECTION: CONTINUE WATCHING (if exists) */}
              {continueWatchingShows.length > 0 && selectedCategory === 'all' && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-red-500" />
                      <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                        Continue Watching
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {continueWatchingShows.map(({ show, episodeId }) => (
                      <div
                        key={show.id}
                        className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 p-2 cursor-pointer hover:border-red-500/50 transition-all"
                        onClick={() => handlePlayShow(show, episodeId)}
                      >
                        <div className="aspect-video w-full rounded-xl overflow-hidden relative">
                          <ShowCard
                            show={show}
                            aspect="landscape"
                            onSelect={() => handlePlayShow(show, episodeId)}
                            onPlay={() => handlePlayShow(show, episodeId)}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="font-semibold text-white truncate max-w-[70%]">
                            {show.titleHindi}
                          </span>
                          <span className="text-[10px] text-red-400 font-bold flex items-center gap-1">
                            <Play className="w-3 h-3 fill-current" /> Resume
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-red-600 rounded-full w-2/5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION: TOP 10 IN INDIA */}
              {selectedCategory === 'all' && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-500" />
                      <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                        Top 10 Shows in India Today
                      </h2>
                    </div>
                    <button
                      onClick={() => setCurrentTab('top_10')}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                    >
                      See All →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                    {top10Shows.slice(0, 5).map((show, idx) => (
                      <ShowCard
                        key={show.id}
                        show={show}
                        rank={idx + 1}
                        onSelect={(s) => setInspectShow(s)}
                        onPlay={(s) => handlePlayShow(s)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION: BINGE MICRO-DRAMAS (Vertical Shorts) */}
              {(selectedCategory === 'all' || selectedCategory === 'micro_drama') && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Film className="w-5 h-5 text-red-500" />
                        <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                          Trending Micro-Dramas (शॉर्ट वीडियो सीरीज)
                        </h2>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        1-2 minute gripping vertical episodes · Ep 1-3 100% Free
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('micro_dramas')}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
                    >
                      View All ({microDramaShows.length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5">
                    {microDramaShows.map((show) => (
                      <ShowCard
                        key={show.id}
                        show={show}
                        onSelect={(s) => setInspectShow(s)}
                        onPlay={(s) => handlePlayShow(s)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* SECTION: AUDIO STORIES LOUNGE */}
              {(selectedCategory === 'all' || selectedCategory === 'audio_story') && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                          Blockbuster Audio Series (3D ऑडियो उपन्यास)
                        </h2>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Immersive sound effects, midnight horror, suspense & romance
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('audio_stories')}
                      className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
                    >
                      Browse Audio →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
                    {audioStoryShows.map((show) => (
                      <ShowCard
                        key={show.id}
                        show={show}
                        onSelect={(s) => setInspectShow(s)}
                        onPlay={(s) => handlePlayShow(s)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* VIP PROMO BANNER */}
              <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-neutral-900 to-amber-950/70 border border-red-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                    <Crown className="w-3.5 h-3.5 fill-current" />
                    <span>SK TV VIP CLUB</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                    Unlimited Dramas & Audio Stories for just ₹99/month
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                    Skip coins completely. Watch in 4K Ultra HD with Dolby Atmos audio and download episodes for offline travel.
                  </p>
                </div>

                <button
                  onClick={() => setIsVipModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap min-h-[44px]"
                >
                  Join VIP Now (₹99)
                </button>
              </section>
            </div>
          </div>
        )}

        {/* TAB: MICRO DRAMAS */}
        {currentTab === 'micro_dramas' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Short Micro-Dramas (शॉर्ट वीडियो)
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Fast-paced vertical reel episodes designed for smartphone bingeing
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {microDramaShows.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  onSelect={(s) => setInspectShow(s)}
                  onPlay={(s) => handlePlayShow(s)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB: AUDIO STORIES */}
        {currentTab === 'audio_stories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Audio Series & Stories (3D ऑडियो शो)
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Listen with headphones for immersive 3D binaural sound experience
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {audioStoryShows.map((show) => (
                <ShowCard
                  key={show.id}
                  show={show}
                  onSelect={(s) => setInspectShow(s)}
                  onPlay={(s) => handlePlayShow(s)}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB: TOP 10 */}
        {currentTab === 'top_10' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-2">
                <Flame className="w-7 h-7 text-red-500" />
                <span>Today's Top 10 Leaderboard</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Most watched micro-dramas and audio series across India in the last 24 hours
              </p>
            </div>

            <div className="space-y-3">
              {top10Shows.map((show, idx) => (
                <div
                  key={show.id}
                  onClick={() => setInspectShow(show)}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/40 flex items-center gap-4 cursor-pointer transition-all"
                >
                  <span className="text-3xl sm:text-4xl font-black text-red-500 font-display w-10 text-center">
                    {idx + 1}
                  </span>

                  <div className="w-16 h-22 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <ShowCard
                      show={show}
                      aspect="portrait"
                      onSelect={(s) => setInspectShow(s)}
                      onPlay={(s) => handlePlayShow(s)}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-amber-400 tabular-nums">★ {show.rating}</span>
                      <span className="text-neutral-500">·</span>
                      <span className="text-xs text-neutral-400">{show.viewsCount} views</span>
                    </div>
                    <h3 className="text-base font-bold text-white truncate font-display">
                      {show.titleHindi} ({show.title})
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                      {show.synopsis}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayShow(show);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors shrink-0"
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MY LIBRARY */}
        {currentTab === 'library' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                My Library (मेरी लाइब्रेरी)
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Your saved watchlist, history, and unlocked episodes
              </p>
            </div>

            {/* OFFICIAL OWNER PROMINENT BANNER */}
            {userState.isOwner && (
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/70 via-red-950/60 to-neutral-900 border border-amber-500/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 p-0.5 shadow-xl shrink-0">
                    <div className="w-full h-full bg-[#0e1017] rounded-[14px] flex items-center justify-center text-amber-400">
                      <Crown className="w-8 h-8 fill-amber-400" />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider">
                        👑 SK TV APP OWNER & FOUNDER
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        VERIFIED CREATOR
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                      {userState.accountName}
                    </h2>

                    <p className="text-xs text-neutral-300 mt-0.5">
                      {userState.email} · Receiving UPI: <span className="text-orange-400 font-mono font-bold">{userState.upiId}</span> ({userState.bankName})
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 relative z-10 self-start md:self-center">
                  <button
                    onClick={() => setIsAdminPanelOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-600/20 flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap min-h-[44px]"
                  >
                    <Crown className="w-4 h-4 fill-black" />
                    <span>Open Admin Panel</span>
                  </button>

                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/15 transition-all whitespace-nowrap min-h-[44px]"
                  >
                    Manage BOB UPI
                  </button>
                </div>
              </div>
            )}

            {/* Watchlist Section */}
            <section>
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-red-500" />
                <span>Watchlist ({watchlistShows.length})</span>
              </h2>

              {watchlistShows.length === 0 ? (
                <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-xs text-neutral-400">Your watchlist is empty.</p>
                  <button
                    onClick={() => setCurrentTab('home')}
                    className="mt-3 px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl"
                  >
                    Explore Shows
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {watchlistShows.map((show) => (
                    <ShowCard
                      key={show.id}
                      show={show}
                      onSelect={(s) => setInspectShow(s)}
                      onPlay={(s) => handlePlayShow(s)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Bank of Baroda Linked Account & UPI Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-950/40 via-neutral-900 to-black border border-orange-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0">
                  BOB
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white font-display">
                      {userState.bankName} (BOB)
                    </h3>
                    <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified UPI
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 font-mono mt-0.5">
                    {userState.upiId}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    A/C Holder: <span className="text-white font-semibold">{userState.accountName}</span> ({userState.email})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  Manage Account & BOB UPI
                </button>
              </div>
            </div>

            {/* Quick Coin Balance Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-white/5 to-transparent border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-neutral-400">Available Wallet Balance</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl font-black text-amber-400 tabular-nums font-display">
                    {userState.coins} Coins
                  </span>
                  {userState.isVip && (
                    <span className="px-2 py-0.5 bg-red-600 text-[10px] font-bold text-white rounded">
                      VIP ACTIVE
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleInitiateUpiPayment({
                      title: '300 Coins Pack',
                      amount: 69,
                      type: 'coins_pack',
                      coinsToAdd: 300,
                    });
                  }}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95"
                >
                  Recharge 300 Coins (₹69 via BOB)
                </button>

                <button
                  onClick={() => setIsVipModalOpen(true)}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all"
                >
                  Free Rewards
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] mt-12 py-8 bg-[#07080a] text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-neutral-400 font-display text-sm">
            <span className="text-red-500">SK</span> TV · New Version
          </p>
          <p>
            India's Leading Micro-Drama & Audio Stories Streaming Experience
          </p>
          <div className="flex justify-center gap-4 text-[11px] text-neutral-400 pt-2">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Content Guidelines</span>
            <span>·</span>
            <span>Contact Support</span>
          </div>
        </div>
      </footer>

      {/* FULL SCREEN PLAYERS */}
      {/* 1. Vertical Micro-Drama Player */}
      {activePlayShow && activePlayShow.format === 'micro_drama' && !isPlayerMinimized && (
        <VerticalDramaPlayer
          show={activePlayShow}
          initialEpisodeId={activePlayEpId}
          onClose={() => {
            setIsPlayerMinimized(true);
          }}
          unlockedEpisodes={userState?.unlockedEpisodes || []}
          onUnlockEpisode={handleUnlockEpisode}
          coins={userState.coins}
          isVip={userState.isVip}
          onOpenCoinsModal={() => setIsVipModalOpen(true)}
        />
      )}

      {/* 2. Audio Drama Player */}
      {activePlayShow && activePlayShow.format === 'audio_story' && !isPlayerMinimized && (
        <AudioDramaPlayer
          show={activePlayShow}
          initialEpisodeId={activePlayEpId}
          onClose={() => {
            setIsPlayerMinimized(true);
          }}
          unlockedEpisodes={userState?.unlockedEpisodes || []}
          onUnlockEpisode={handleUnlockEpisode}
          coins={userState.coins}
          isVip={userState.isVip}
          onOpenCoinsModal={() => setIsVipModalOpen(true)}
        />
      )}

      {/* Minimized Player Bar */}
      {activePlayShow && isPlayerMinimized && (
        <MiniPlayerBar
          show={activePlayShow}
          isPlaying={isAudioPlaying}
          onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
          onMaximize={() => setIsPlayerMinimized(false)}
          onClose={() => {
            audioEngine.stopAll();
            setActivePlayShow(null);
            setIsPlayerMinimized(false);
          }}
        />
      )}

      {/* MODALS */}
      <ShowDetailModal
        show={inspectShow}
        onClose={() => setInspectShow(null)}
        onPlayEpisode={(s, epId) => {
          setInspectShow(null);
          handlePlayShow(s, epId);
        }}
        isInWatchlist={inspectShow ? (userState?.watchlist || []).includes(inspectShow.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
        unlockedEpisodes={userState?.unlockedEpisodes || []}
        isVip={userState.isVip}
      />

      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        coins={userState.coins}
        isVip={userState.isVip}
        claimedDays={userState?.claimedDays || []}
        onClaimDaily={handleClaimDaily}
        onUpgradeVip={handleUpgradeVip}
        onOpenUpiPayment={handleInitiateUpiPayment}
        bankName={userState.bankName}
        upiId={userState.upiId}
      />

      {/* Bank of Baroda UPI Payment Gateway Modal */}
      {pendingUpiPayment && (
        <UpiPaymentModal
          isOpen={true}
          onClose={() => setPendingUpiPayment(null)}
          title={pendingUpiPayment.title}
          amount={pendingUpiPayment.amount}
          type={pendingUpiPayment.type}
          coinsToAdd={pendingUpiPayment.coinsToAdd}
          userUpiId={userState.upiId}
          userBankName={userState.bankName}
          accountHolderName={userState.accountName}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Account & Bank of Baroda Settings Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        userState={userState}
        onUpdateUpiDetails={handleUpdateUpiDetails}
        onInitiateUpiPayment={handleInitiateUpiPayment}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* SK TV Creator & Owner Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        shows={showsList || []}
        onAddShow={handleAddShow}
        onDeleteShow={handleDeleteShow}
        onToggleTrending={handleToggleTrending}
        userState={userState}
        onUpdateMerchantUpi={handleUpdateUpiDetails}
        onAddCoinsToOwner={handleAddCoinsToOwner}
        onToggleOwnerVip={handleToggleOwnerVip}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectShow={(s) => setInspectShow(s)}
        onPlayShow={(s) => handlePlayShow(s)}
      />

      <LanguageModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
        currentLanguage={userState.language}
        onSelectLanguage={(lang) => setUserState((prev) => ({ ...prev, language: lang }))}
      />

      {/* Mobile Fixed Bottom Navigation Bar (Pattern 1) */}
      <BottomTabBar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
