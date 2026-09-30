import React from 'react';
import { Show } from '../types';
import { Play, Pause, X, Maximize2 } from 'lucide-react';
import { ShowPosterVisual } from './ShowPosterVisual';

interface MiniPlayerBarProps {
  show: Show;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export const MiniPlayerBar: React.FC<MiniPlayerBarProps> = ({
  show,
  isPlaying,
  onTogglePlay,
  onMaximize,
  onClose,
}) => {
  return (
    <div className="fixed bottom-16 md:bottom-4 inset-x-3 md:left-auto md:right-6 md:w-96 z-30 bg-[#12141c]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-2.5 flex items-center justify-between transition-all">
      <div
        onClick={onMaximize}
        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
          <ShowPosterVisual show={show} aspect="portrait" showOverlayInfo={false} className="w-full h-full" />
        </div>

        <div className="truncate">
          <h4 className="text-xs font-bold text-white truncate font-display">
            {show.titleHindi}
          </h4>
          <p className="text-[10px] text-neutral-400 truncate">
            {show.title} · Now Playing
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        <button
          onClick={onTogglePlay}
          className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        <button
          onClick={onMaximize}
          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5"
          title="Open Player"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <button
          onClick={onClose}
          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5"
          title="Close Mini Player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
