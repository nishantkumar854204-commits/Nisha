import React from 'react';
import { Show } from '../types';
import { Play } from 'lucide-react';
import { ShowPosterVisual } from './ShowPosterVisual';

interface ShowCardProps {
  show: Show;
  onSelect: (show: Show) => void;
  onPlay: (show: Show) => void;
  aspect?: 'portrait' | 'landscape';
  rank?: number;
}

export const ShowCard: React.FC<ShowCardProps> = ({
  show,
  onSelect,
  onPlay,
  aspect = 'portrait',
  rank,
}) => {
  if (!show) return null;

  return (
    <div className="group relative flex flex-col cursor-pointer transition-transform duration-200">
      {/* Poster Image Container */}
      <div
        onClick={() => onSelect(show)}
        className={`relative w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5 transition-all duration-300 group-hover:border-red-500/50 group-hover:shadow-lg group-hover:shadow-red-600/10 ${
          aspect === 'portrait' ? 'aspect-[3/4.2]' : 'aspect-video'
        }`}
      >
        <ShowPosterVisual
          show={show}
          aspect={aspect}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Play Hover Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(show);
            }}
            className="pointer-events-auto w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-all duration-200 min-h-[44px] min-w-[44px]"
            title={`Play ${show.title}`}
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </button>
        </div>

        {/* Rank Number for Top 10 Charts (Netflix / Kuku style large outline numeral) */}
        {rank !== undefined && (
          <div className="absolute bottom-1 -left-2 z-30 font-black text-6xl leading-none text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] select-none pointer-events-none font-display">
            <span className="text-red-500 opacity-90">{rank}</span>
          </div>
        )}
      </div>

      {/* Show Details (Anti-Pill metadata: clean text with dividers) */}
      <div className="mt-2.5 px-0.5" onClick={() => onSelect(show)}>
        <h3 className="text-sm font-semibold text-white tracking-tight line-clamp-1 group-hover:text-red-400 transition-colors">
          {show.titleHindi}
        </h3>
        <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
          {show.title}
        </p>

        {/* Clean unboxed metadata */}
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-1 font-medium">
          <span className="text-amber-400 font-semibold tabular-nums">★ {show.rating}</span>
          <span aria-hidden="true">·</span>
          <span>{show.episodeCount} Ep</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{show.viewsCount}</span>
        </div>
      </div>
    </div>
  );
};
