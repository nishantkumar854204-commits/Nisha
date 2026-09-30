import React, { useState, useMemo } from 'react';
import { X, Search, TrendingUp, Film, Headphones } from 'lucide-react';
import { Show } from '../types';
import { SHOWS_DATA } from '../data/mockShows';
import { ShowPosterVisual } from './ShowPosterVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShow: (show: Show) => void;
  onPlayShow: (show: Show) => void;
}

const TRENDING_KEYWORDS = [
  'अरबपति',
  'Billionaire',
  'हवेली',
  'माफिया दामाद',
  'Horror',
  'Romance',
  '3D Audio',
  'College',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectShow,
  onPlayShow,
}) => {
  const [query, setQuery] = useState('');

  const filteredShows = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SHOWS_DATA.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.titleHindi.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.synopsis.toLowerCase().includes(q) ||
        s.narratorOrCast.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="relative w-full max-w-2xl bg-[#0f1118] rounded-3xl border border-white/15 p-6 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search micro dramas, audio series, actors, topics..."
            className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Trending Suggestions */}
        {!query && (
          <div className="py-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 mb-3">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span>Trending Searches on SK TV</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_KEYWORDS.map((k) => (
                <button
                  key={k}
                  onClick={() => setQuery(k)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium rounded-lg border border-white/10 transition-colors"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-2 mt-2">
          {query && filteredShows.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-sm">
              No shows found for "{query}". Try searching for "Romance", "Billionaire", or "Horror".
            </div>
          ) : (
            filteredShows.map((show) => (
              <div
                key={show.id}
                onClick={() => {
                  onSelectShow(show);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3.5 cursor-pointer transition-colors group"
              >
                <div className="w-14 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <ShowPosterVisual show={show} aspect="portrait" showOverlayInfo={false} className="w-full h-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-red-400 uppercase flex items-center gap-1">
                      {show.format === 'micro_drama' ? (
                        <>
                          <Film className="w-3 h-3" /> Drama
                        </>
                      ) : (
                        <>
                          <Headphones className="w-3 h-3" /> Audio
                        </>
                      )}
                    </span>
                    <span className="text-neutral-500 text-[10px]">·</span>
                    <span className="text-[10px] text-amber-400 font-semibold tabular-nums">★ {show.rating}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {show.titleHindi} ({show.title})
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    {show.tagline}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {show.episodeCount} Episodes · {show.viewsCount} Views
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayShow(show);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors shrink-0"
                >
                  Play
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
