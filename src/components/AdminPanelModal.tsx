import React, { useState } from 'react';
import {
  X,
  Crown,
  ShieldAlert,
  Film,
  Headphones,
  Coins,
  TrendingUp,
  Building2,
  Plus,
  Trash2,
  Check,
  Search,
  Sparkles,
  Users,
  Eye,
  ArrowUpRight,
  Settings,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { Show, UserState, UpiTransaction } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  shows: Show[];
  onAddShow: (newShow: Show) => void;
  onDeleteShow: (showId: string) => void;
  onToggleTrending: (showId: string) => void;
  userState: UserState;
  onUpdateMerchantUpi: (name: string, bank: string, upiId: string) => void;
  onAddCoinsToOwner: (amount: number) => void;
  onToggleOwnerVip: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  shows,
  onAddShow,
  onDeleteShow,
  onToggleTrending,
  userState,
  onUpdateMerchantUpi,
  onAddCoinsToOwner,
  onToggleOwnerVip,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'shows' | 'upi' | 'transactions' | 'powers'>('overview');
  
  // New Show Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitleHindi, setNewTitleHindi] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newCategory, setNewCategory] = useState<Show['category']>('desi_mafia');
  const [newFormat, setNewFormat] = useState<Show['format']>('micro_drama');
  const [newEpisodesCount, setNewEpisodesCount] = useState(30);

  // BOB UPI Settings
  const [merchantName, setMerchantName] = useState(userState.accountName);
  const [merchantBank, setMerchantBank] = useState(userState.bankName);
  const [merchantUpi, setMerchantUpi] = useState(userState.upiId);
  const [saveUpiSuccess, setSaveUpiSuccess] = useState(false);

  // Search in shows
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleSaveMerchant = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMerchantUpi(merchantName.trim(), merchantBank.trim(), merchantUpi.trim());
    setSaveUpiSuccess(true);
    setTimeout(() => setSaveUpiSuccess(false), 3000);
  };

  const handleCreateShow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleHindi.trim() || !newTitle.trim()) return;

    const createdShow: Show = {
      id: `show-${Date.now()}`,
      title: newTitle.trim(),
      titleHindi: newTitleHindi.trim(),
      tagline: newTagline.trim() || 'SK TV Exclusive Original',
      synopsis: newSynopsis.trim() || 'A high production drama streaming exclusively on SK TV.',
      category: newCategory,
      format: newFormat,
      rating: 4.9,
      ratingCount: '10K',
      viewsCount: '1.2M',
      episodeCount: Number(newEpisodesCount) || 20,
      language: 'Hindi & Bhojpuri',
      coverGradient:
        newCategory === 'horror'
          ? 'from-purple-950 via-slate-900 to-black'
          : newCategory === 'romance'
          ? 'from-rose-950 via-neutral-900 to-black'
          : 'from-amber-950 via-neutral-900 to-black',
      coverAccent: newCategory === 'horror' ? '#a855f7' : newCategory === 'romance' ? '#f43f5e' : '#f59e0b',
      badge: 'NEW LAUNCH',
      isTrending: true,
      narratorOrCast: 'Directed by SK TV Studios',
      comments: [
        {
          id: `c-${Date.now()}`,
          userName: 'SK TV Editor',
          userAvatarBg: 'bg-red-600',
          comment: 'Blockbuster release on SK TV! Enjoy the episodes.',
          timeAgo: 'Just now',
          likes: 24,
        },
      ],
      episodes: [
        {
          id: `ep-${Date.now()}-1`,
          episodeNumber: 1,
          title: `${newTitleHindi} - भाग 1`,
          duration: '1:50',
          durationSec: 110,
          isFree: true,
          coinsRequired: 0,
          synopsis: 'कहानी की धमाकेदार शुरुआत।',
          audioAmbiance: newCategory === 'horror' ? 'horror' : 'drama',
          dialogueScript: [
            { speaker: 'किरदार', text: 'ये कहानी अब शुरू हुई है, अंजाम अभी बाकी है!', time: 5 },
          ],
        },
        {
          id: `ep-${Date.now()}-2`,
          episodeNumber: 2,
          title: `${newTitleHindi} - भाग 2`,
          duration: '2:05',
          durationSec: 125,
          isFree: true,
          coinsRequired: 0,
          synopsis: 'रहस्य और गहराता जाता है।',
          audioAmbiance: 'thriller',
          dialogueScript: [
            { speaker: 'किरदार', text: 'कोई मेरा रास्ता नहीं रोक सकता!', time: 10 },
          ],
        },
        {
          id: `ep-${Date.now()}-3`,
          episodeNumber: 3,
          title: `${newTitleHindi} - भाग 3`,
          duration: '1:45',
          durationSec: 105,
          isFree: false,
          coinsRequired: 10,
          synopsis: 'असली राज़ का खुलासा।',
          audioAmbiance: 'drama',
        },
      ],
    };

    onAddShow(createdShow);
    setShowAddForm(false);
    setNewTitle('');
    setNewTitleHindi('');
    setNewTagline('');
    setNewSynopsis('');
  };

  const safeShows = shows || [];
  const filteredShowsList = safeShows.filter(
    (s) =>
      (s.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.titleHindi || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0b0d14] rounded-3xl border border-red-500/30 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />

        {/* OWNER BANNER HEADER */}
        <div className="relative z-10 p-5 sm:p-6 bg-gradient-to-r from-red-950/70 via-[#12141f] to-orange-950/60 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 p-0.5 shadow-xl">
              <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center text-amber-400">
                <Crown className="w-7 h-7 fill-amber-400" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-current" /> SK TV FOUNDER & OWNER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  SUPER ADMIN ACCESS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                {userState.accountName} (Owner Portal)
              </h2>
              <p className="text-xs text-neutral-400">
                {userState.email} · Receiving UPI: <span className="text-orange-400 font-mono font-semibold">{userState.upiId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-center p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Close Admin Panel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ADMIN SUB-NAV TABS */}
        <div className="relative z-10 flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-black/40 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-red-400" />
            <span>Overview & Revenue</span>
          </button>

          <button
            onClick={() => setActiveTab('shows')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'shows'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>Manage Shows ({safeShows.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upi'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Building2 className="w-4 h-4 text-orange-400" />
            <span>Bank of Baroda UPI Control</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'transactions'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>Customer Payments ({(userState?.transactions || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('powers')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'powers'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Owner Superpowers</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & PLATFORM METRICS */}
        {activeTab === 'overview' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-950/40 via-neutral-900 to-black border border-orange-500/30">
                <span className="text-xs text-neutral-400 font-medium">Bank of Baroda Revenue</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-display block mt-1">
                  ₹74,850
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +28% this week
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/40 via-neutral-900 to-black border border-red-500/30">
                <span className="text-xs text-neutral-400 font-medium">Total Active Shows</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-display block mt-1">
                  {safeShows.length}
                </span>
                <span className="text-[11px] text-red-400 font-semibold mt-1">
                  380+ Episodes Live
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-neutral-900 to-black border border-amber-500/30">
                <span className="text-xs text-neutral-400 font-medium">VIP Memberships Sold</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-display block mt-1">
                  482
                </span>
                <span className="text-[11px] text-amber-400 font-semibold mt-1">
                  ₹99 & ₹299 Packs
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-black border border-emerald-500/30">
                <span className="text-xs text-neutral-400 font-medium">Total Audience Views</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-display block mt-1">
                  84.5M+
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold mt-1">
                  Pan-India Streaming
                </span>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/50 via-neutral-900 to-neutral-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Publish a New Drama or Audio Novel
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Launch a new trending series directly to the SK TV homepage catalog
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('shows');
                  setShowAddForm(true);
                }}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/20 flex items-center gap-2 shrink-0 min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Show</span>
              </button>
            </div>

            {/* Platform Status */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-neutral-300 block">System Health & Services</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">CDN Video Streaming</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">BOB UPI Gateway</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Active
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-neutral-400">Web Audio 3D Engine</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHOWS MANAGER */}
        {activeTab === 'shows' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-6 space-y-5">
            {/* Top Bar with Add Button and Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search series by Hindi or English name..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddForm ? 'Close Form' : 'Create New Show'}</span>
              </button>
            </div>

            {/* ADD SHOW FORM */}
            {showAddForm && (
              <form onSubmit={handleCreateShow} className="p-5 rounded-2xl bg-white/5 border border-red-500/40 space-y-4">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-red-500" />
                  <span>Add New Drama Series / Audio Novel to SK TV</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Hindi Title (हिंदी नाम) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. दिल्ली का डॉन"
                      value={newTitleHindi}
                      onChange={(e) => setNewTitleHindi(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">English Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delhi Don: The Awakening"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Genre / Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as Show['category'])}
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="desi_mafia">Desi Mafia / बदला</option>
                      <option value="romance">Romance / इश्क</option>
                      <option value="thriller">Suspense Thriller / सस्पेंस</option>
                      <option value="horror">Horror / खौफ</option>
                      <option value="royal">Royal Haveli / शाही</option>
                      <option value="comedy">Comedy / कॉमेडी</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Format</label>
                    <select
                      value={newFormat}
                      onChange={(e) => setNewFormat(e.target.value as Show['format'])}
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="micro_drama">Micro Drama (Vertical Video)</option>
                      <option value="audio_story">Audio Story (3D Sound Novel)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Episodes Count</label>
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={newEpisodesCount}
                      onChange={(e) => setNewEpisodesCount(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Tagline (एक लाइन का डायलॉग)</label>
                  <input
                    type="text"
                    placeholder="e.g. जब वो लौटा तो पूरा शहर थर्रा उठा..."
                    value={newTagline}
                    onChange={(e) => setNewTagline(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Synopsis / Story Summary</label>
                  <textarea
                    rows={2}
                    placeholder="Describe the story briefly..."
                    value={newSynopsis}
                    onChange={(e) => setNewSynopsis(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-neutral-300 text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Publish to SK TV
                  </button>
                </div>
              </form>
            )}

            {/* SHOWS TABLE / LIST */}
            <div className="space-y-2.5">
              {filteredShowsList.map((show) => (
                <div
                  key={show.id}
                  className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 rounded-lg bg-neutral-900 overflow-hidden flex items-center justify-center shrink-0 border border-white/10">
                      {show.format === 'micro_drama' ? (
                        <Film className="w-5 h-5 text-red-400" />
                      ) : (
                        <Headphones className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white font-display">{show.titleHindi}</h4>
                        <span className="text-xs text-neutral-400">({show.title})</span>
                        {show.isTrending && (
                          <span className="px-1.5 py-0.2 bg-red-600/30 text-red-400 text-[10px] font-bold rounded">
                            TRENDING
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {show.episodeCount} Ep · {show.category} · {show.viewsCount} views · ★ {show.rating}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onToggleTrending(show.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        show.isTrending
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {show.isTrending ? '★ Trending' : 'Set Trending'}
                    </button>

                    <button
                      onClick={() => onDeleteShow(show.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Delete show"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BANK OF BARODA UPI CONTROL */}
        {activeTab === 'upi' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-6 space-y-5">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-950/40 via-neutral-900 to-black border border-orange-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                  BOB
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Bank of Baroda Receiving Account (Official)
                  </h3>
                  <p className="text-xs text-neutral-300">
                    All VIP Passes and Coin Pack purchases are routed directly to this Bank of Baroda account.
                  </p>
                </div>
              </div>
            </div>

            {saveUpiSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                <Check className="w-4 h-4" />
                <span>Bank of Baroda Merchant details saved and synced across all payment gateways!</span>
              </div>
            )}

            <form onSubmit={handleSaveMerchant} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white">Update Receiving Bank Details</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Account Holder / Payee Name</label>
                  <input
                    type="text"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={merchantBank}
                    onChange={(e) => setMerchantBank(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Bank of Baroda UPI ID</label>
                  <input
                    type="text"
                    value={merchantUpi}
                    onChange={(e) => setMerchantUpi(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Save Bank of Baroda UPI Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: TRANSACTIONS & AUDIT LOG */}
        {activeTab === 'transactions' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400">
                Incoming UPI Customer Payments
              </span>
              <span className="text-xs text-emerald-400 font-bold">
                Auto-Settlement Active
              </span>
            </div>

            {(!userState?.transactions || userState.transactions.length === 0) ? (
              <div className="text-center py-12 text-neutral-500 text-xs">
                No customer transactions recorded yet.
              </div>
            ) : (
              (userState.transactions || []).map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{tx.title}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded">
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      UTR Ref: <span className="font-mono text-neutral-300 font-bold">{tx.utr}</span> · Date: {tx.date}
                    </p>
                    <p className="text-[11px] text-orange-400/90 font-medium">
                      Received via {tx.bankName} ({tx.upiId})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black text-white font-display block">
                      +₹{tx.amount}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">Credited to BOB</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 5: OWNER SUPERPOWERS */}
        {activeTab === 'powers' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Owner VIP Privileges
                </span>
                <p className="text-xs text-neutral-400 mt-0.5">
                  As the platform founder, grant yourself lifetime VIP status and unlimited testing coins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Owner Coins Generator</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Instantly add coins to your wallet to test episode unlocking.
                  </p>
                  <span className="text-xl font-black text-amber-400 tabular-nums font-display block mt-2">
                    Current: {userState.coins} 🪙
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onAddCoinsToOwner(500)}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                  >
                    +500 Coins
                  </button>
                  <button
                    onClick={() => onAddCoinsToOwner(2000)}
                    className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                  >
                    +2,000 Coins
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Lifetime VIP Pass Switch</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Toggle your account VIP state (allows watching all micro-dramas without coins).
                  </p>
                  <span className="text-sm font-bold text-emerald-400 block mt-2">
                    Status: {userState.isVip ? 'VIP ACTIVE (Lifetime)' : 'Inactive'}
                  </span>
                </div>

                <button
                  onClick={onToggleOwnerVip}
                  className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  {userState.isVip ? 'Deactivate VIP' : 'Activate Lifetime VIP'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
