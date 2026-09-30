import React from 'react';
import { Show } from '../types';
import { Film, Headphones, Crown, Flame, Ghost, ShieldAlert, Sparkles } from 'lucide-react';

interface ShowPosterVisualProps {
  show: Show;
  aspect?: 'portrait' | 'landscape' | 'banner';
  className?: string;
  showOverlayInfo?: boolean;
}

export const ShowPosterVisual: React.FC<ShowPosterVisualProps> = ({
  show,
  aspect = 'portrait',
  className = '',
  showOverlayInfo = true,
}) => {
  if (!show) {
    return <div className={`relative overflow-hidden bg-neutral-900 ${className}`} />;
  }

  // Symbolic icon based on genre
  const getGenreIcon = () => {
    switch (show.category) {
      case 'desi_mafia':
        return <Flame className="w-6 h-6 text-amber-400" />;
      case 'horror':
        return <Ghost className="w-6 h-6 text-purple-400" />;
      case 'royal':
        return <Crown className="w-6 h-6 text-amber-300" />;
      case 'thriller':
        return <ShieldAlert className="w-6 h-6 text-cyan-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-rose-400" />;
    }
  };

  const isLandscape = aspect === 'landscape' || aspect === 'banner';

  return (
    <div
      className={`relative overflow-hidden select-none bg-gradient-to-b ${show.coverGradient} ${className}`}
      style={{
        boxShadow: `0 10px 30px -10px ${show.coverAccent}33`,
      }}
    >
      {/* Background Graphic Patterns & Cinema Textures */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`rad-${show.id}`} cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor={show.coverAccent} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`beam-${show.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={show.coverAccent} stopOpacity="0.4" />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#rad-${show.id})`} />
          <path d="M0 0 L400 600 M200 0 L600 600" stroke={`url(#beam-${show.id})`} strokeWidth="3" opacity="0.4" />
        </svg>
      </div>

      {/* Dramatic Cinematic Art Centerpiece */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        {/* Glow halo */}
        <div
          className="w-32 h-32 rounded-full blur-2xl opacity-40 -mt-10"
          style={{ backgroundColor: show.coverAccent }}
        />

        {/* Motif Illustration */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-2xl transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              border: `1px solid ${show.coverAccent}55`,
            }}
          >
            {getGenreIcon()}
          </div>

          {/* Hindi Title on Poster */}
          <div className="px-2">
            <h4
              className="text-lg md:text-xl font-bold font-display tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-1"
              style={{ textShadow: `0 0 16px ${show.coverAccent}66` }}
            >
              {show.titleHindi}
            </h4>
            <p className="text-[11px] md:text-xs text-neutral-300 font-medium tracking-wide mt-0.5 uppercase opacity-90 drop-shadow line-clamp-1">
              {show.title}
            </p>
          </div>
        </div>
      </div>

      {/* Format & Top Badges (Zero pill discipline: clean subtle indicators) */}
      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
        {show.isTop10 && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded shadow-md">
            TOP {show.isTop10}
          </span>
        )}
        {show.badge && !show.isTop10 && (
          <span
            className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded text-white shadow"
            style={{ backgroundColor: `${show.coverAccent}cc` }}
          >
            {show.badge}
          </span>
        )}
      </div>

      <div className="absolute top-2.5 right-2.5 z-20">
        <span className="flex items-center gap-1 text-[10px] font-semibold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-neutral-200 border border-white/10">
          {show.format === 'micro_drama' ? (
            <>
              <Film className="w-3 h-3 text-red-400" />
              <span>DRAMA</span>
            </>
          ) : (
            <>
              <Headphones className="w-3 h-3 text-emerald-400" />
              <span>AUDIO</span>
            </>
          )}
        </span>
      </div>

      {/* Bottom Gradient Scrim */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* Bottom Info overlay */}
      {showOverlayInfo && (
        <div className="absolute inset-x-0 bottom-0 p-3 z-20 flex flex-col justify-end">
          <div className="flex items-center justify-between text-[11px] text-neutral-300">
            <span className="font-semibold text-white truncate max-w-[70%]">
              {show.episodeCount} Episodes
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold tabular-nums">
              ★ {show.rating}
            </span>
          </div>

          {isLandscape && (
            <p className="text-[12px] text-neutral-400 line-clamp-1 mt-1">
              {show.tagline}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
