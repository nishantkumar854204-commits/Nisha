import React, { useState } from 'react';
import { Show } from '../types';
import { Play, Plus, Check, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeroBannerProps {
  show: Show;
  onPlay: (show: Show) => void;
  onToggleWatchlist: (showId: string) => void;
  isInWatchlist: boolean;
  onSelectShow: (show: Show) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  show,
  onPlay,
  onToggleWatchlist,
  isInWatchlist,
  onSelectShow,
}) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  if (!show) return null;

  const toggleSoundPreview = () => {
    if (isPlayingPreview) {
      audioEngine.stopAll();
      setIsPlayingPreview(false);
    } else {
      const firstEp = show.episodes?.[0];
      audioEngine.playAmbiance(firstEp?.audioAmbiance || 'drama');
      if (firstEp?.dialogueScript && firstEp.dialogueScript.length > 0) {
        const firstLine = firstEp.dialogueScript[0];
        audioEngine.speakDialogue(
          `${show.titleHindi || ''}. ${firstLine.speaker}: ${firstLine.text}`,
          1.0,
          () => setIsPlayingPreview(false)
        );
      }
      setIsPlayingPreview(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#090a0d] border-b border-white/[0.06]">
      {/* Cinematic Dynamic Background with Lighting Scrim */}
      <div className="relative h-[440px] md:h-[500px] w-full">
        {/* Dynamic Canvas / Texture */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${show.coverGradient} opacity-80`}
        />

        {/* Ambient Glow Orbs */}
        <div
          className="absolute -top-24 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: show.coverAccent }}
        />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl bg-red-600/20 pointer-events-none" />

        {/* Atmospheric Graphic Grid and Subtle Spotlight Line */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="hero-grid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090c] via-[#08090c]/70 to-transparent hidden md:block" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 z-20">
          <div className="max-w-2xl">
            {/* Super Header / Kicker */}
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-red-500 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SK TV NEW LAUNCH</span>
              </span>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <span className="text-amber-400 font-bold">#1 TRENDING IN INDIA</span>
            </div>

            {/* Hindi Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight drop-shadow-md text-balance">
              {show.titleHindi}
            </h1>

            {/* English Title & Tagline */}
            <p className="text-sm sm:text-base font-medium text-neutral-300 mt-1 line-clamp-1">
              <span className="text-white font-semibold">{show.title}</span> — {show.tagline}
            </p>

            {/* Zero-Pill Metadata Discipline */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-400 mt-3 font-normal">
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                ★ {show.rating} ({show.ratingCount})
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300 font-medium">{show.episodeCount} Episodes</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">{show.viewsCount} Views</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">{show.language}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300 flex items-center gap-1">
                <Film className="w-3 h-3 text-red-400" /> Micro-Drama
              </span>
            </div>

            {/* Synopsis Preview */}
            <p className="text-xs sm:text-sm text-neutral-300/90 mt-3 line-clamp-2 leading-relaxed max-w-xl">
              {show.synopsis}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => onPlay(show)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-600/30 min-h-[44px]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Ep 1 Free</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(show.id)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-medium text-sm rounded-xl flex items-center gap-2 transition-colors border border-white/15 min-h-[44px]"
              >
                {isInWatchlist ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>In My List</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Watchlist</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleSoundPreview}
                className="p-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-200 hover:text-white rounded-xl transition-colors border border-white/15 min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={isPlayingPreview ? 'Mute teaser preview' : 'Listen audio teaser'}
                aria-label={isPlayingPreview ? 'Mute teaser preview' : 'Listen audio teaser'}
              >
                {isPlayingPreview ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => onSelectShow(show)}
                className="hidden sm:inline-flex text-xs font-semibold text-neutral-400 hover:text-white px-2 py-2 transition-colors ml-1"
              >
                Details & Episodes →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
