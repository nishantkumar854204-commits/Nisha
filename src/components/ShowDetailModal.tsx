import React, { useState } from 'react';
import { Show } from '../types';
import {
  X,
  Play,
  Plus,
  Check,
  Share2,
  Lock,
  Unlock,
  Film,
  Headphones,
  Sparkles,
  Heart
} from 'lucide-react';
import { ShowPosterVisual } from './ShowPosterVisual';

interface ShowDetailModalProps {
  show: Show | null;
  onClose: () => void;
  onPlayEpisode: (show: Show, episodeId?: string) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (showId: string) => void;
  unlockedEpisodes: string[];
  isVip: boolean;
}

export const ShowDetailModal: React.FC<ShowDetailModalProps> = ({
  show,
  onClose,
  onPlayEpisode,
  isInWatchlist,
  onToggleWatchlist,
  unlockedEpisodes,
  isVip,
}) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'reviews'>('episodes');

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e1017] rounded-3xl border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Area */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-b from-neutral-900/90 to-[#0e1017] border-b border-white/10 flex flex-col sm:flex-row gap-6">
          <div className="w-36 sm:w-44 aspect-[3/4.2] rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/15 mx-auto sm:mx-0">
            <ShowPosterVisual show={show} aspect="portrait" showOverlayInfo={false} className="w-full h-full" />
          </div>

          <div className="flex-1 flex flex-col justify-end text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2 text-xs font-semibold">
              <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-wide flex items-center gap-1">
                {show.format === 'micro_drama' ? (
                  <>
                    <Film className="w-3 h-3" /> Micro Drama
                  </>
                ) : (
                  <>
                    <Headphones className="w-3 h-3" /> Audio Novel
                  </>
                )}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-amber-400 font-semibold tabular-nums">★ {show.rating} ({show.ratingCount})</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300 font-medium">{show.episodeCount} Episodes</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {show.titleHindi}
            </h2>
            <h3 className="text-sm font-semibold text-neutral-300 mt-0.5">
              {show.title}
            </h3>

            <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
              {show.synopsis}
            </p>

            <div className="mt-2 text-xs text-neutral-400">
              <span className="text-neutral-300 font-semibold">Cast / Narrator:</span> {show.narratorOrCast}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
              <button
                onClick={() => onPlayEpisode(show, show.episodes[0]?.id)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/30 active:scale-95 transition-all min-h-[44px]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Ep 1 Free</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(show.id)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-colors border border-white/10 min-h-[44px]"
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: show.titleHindi,
                      text: `Watch ${show.title} on SK TV!`,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Show link copied to clipboard!');
                  }
                }}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white rounded-xl transition-colors border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Header (Episodes vs Reviews) */}
        <div className="flex items-center gap-6 px-6 sm:px-8 border-b border-white/10 bg-black/40">
          <button
            onClick={() => setActiveTab('episodes')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'episodes'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Episodes ({(show.episodes || []).length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-red-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Audience Reviews ({(show.comments || []).length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-8">
          {activeTab === 'episodes' ? (
            <div className="space-y-2.5">
              {(show.episodes || []).map((ep) => {
                const isUnlocked = isVip || ep.isFree || (unlockedEpisodes || []).includes(ep.id);

                return (
                  <div
                    key={ep.id}
                    onClick={() => onPlayEpisode(show, ep.id)}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-red-500/30 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-xs font-bold text-neutral-300 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                        {ep.episodeNumber}
                      </div>

                      <div className="truncate">
                        <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                          {ep.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {ep.synopsis}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {ep.duration}
                      </span>

                      {isUnlocked ? (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded">
                          <Unlock className="w-3 h-3" /> Free
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Lock className="w-3 h-3" /> {ep.coinsRequired || 10} 🪙
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {(show.comments || []).map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full ${c.userAvatarBg} flex items-center justify-center text-xs font-bold text-white`}>
                        {c.userName.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-white">{c.userName}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">{c.timeAgo}</span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {c.comment}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-neutral-400">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span className="tabular-nums">{c.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
