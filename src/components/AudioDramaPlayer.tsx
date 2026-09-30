import React, { useState, useEffect, useRef } from 'react';
import { Show, Episode } from '../types';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Moon,
  Volume2,
  VolumeX,
  List,
  Lock,
  Unlock,
  Sparkles,
  Download,
  Check
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { ShowPosterVisual } from './ShowPosterVisual';

interface AudioDramaPlayerProps {
  show: Show;
  initialEpisodeId?: string;
  onClose: () => void;
  unlockedEpisodes: string[];
  onUnlockEpisode: (episodeId: string, coinsNeeded: number) => boolean;
  coins: number;
  isVip: boolean;
  onOpenCoinsModal: () => void;
}

export const AudioDramaPlayer: React.FC<AudioDramaPlayerProps> = ({
  show,
  initialEpisodeId,
  onClose,
  unlockedEpisodes,
  onUnlockEpisode,
  coins,
  isVip,
  onOpenCoinsModal,
}) => {
  const safeEpisodes = show?.episodes || [];

  const [currentEpIndex, setCurrentEpIndex] = useState(() => {
    if (!initialEpisodeId) return 0;
    const idx = safeEpisodes.findIndex((e) => e.id === initialEpisodeId);
    return idx >= 0 ? idx : 0;
  });

  const episode: Episode = safeEpisodes[currentEpIndex] || safeEpisodes[0] || ({} as Episode);
  const isUnlocked = isVip || episode.isFree || (unlockedEpisodes || []).includes(episode.id);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(episode.durationSec || 600);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [showEpisodesList, setShowEpisodesList] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDuration(episode.durationSec || 600);
    setCurrentTime(0);

    if (isUnlocked) {
      setIsPlaying(true);
      if (!isMuted) {
        audioEngine.playAmbiance(episode.audioAmbiance || 'horror');
        if (episode.dialogueScript?.[0]) {
          audioEngine.speakDialogue(`${episode.dialogueScript[0].speaker}: ${episode.dialogueScript[0].text}`, playbackSpeed);
        }
      }
    } else {
      setIsPlaying(false);
      audioEngine.stopAll();
    }

    return () => {
      audioEngine.stopAll();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentEpIndex, isUnlocked]);

  // Audio timer ticking
  useEffect(() => {
    if (isPlaying && isUnlocked) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNextEp();
            return duration;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isUnlocked, duration, playbackSpeed]);

  const handleNextEp = () => {
    if (currentEpIndex < safeEpisodes.length - 1) {
      setCurrentEpIndex(currentEpIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevEp = () => {
    if (currentEpIndex > 0) {
      setCurrentEpIndex(currentEpIndex - 1);
    }
  };

  const togglePlay = () => {
    if (!isUnlocked) return;
    if (isPlaying) {
      audioEngine.stopAll();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (!isMuted) {
        audioEngine.playAmbiance(episode.audioAmbiance || 'horror');
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#0f1016] rounded-3xl border border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
        
        {/* Ambient backdrop glow */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: show.coverAccent }}
        />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={() => {
              audioEngine.stopAll();
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
              3D AUDIO STORY
            </span>
            <span className="text-xs font-semibold text-neutral-300">
              Episode {episode.episodeNumber} of {safeEpisodes.length}
            </span>
          </div>

          <button
            onClick={() => setShowEpisodesList(true)}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Episode tracklist"
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Center Artwork & Visualizer */}
        <div className="relative z-10 my-6 flex flex-col items-center">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/15 relative">
            <ShowPosterVisual show={show} aspect="portrait" showOverlayInfo={false} className="w-full h-full" />
          </div>

          {/* Titles */}
          <div className="text-center mt-5 max-w-sm">
            <h2 className="text-lg font-bold text-white font-display">
              {episode.title}
            </h2>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
              {show.titleHindi} ({show.title})
            </p>
            <p className="text-[11px] text-amber-400/90 font-medium mt-0.5">
              Narrator: {show.narratorOrCast}
            </p>
          </div>

          {/* Animated Waveform Equalizer */}
          <div className="flex items-center gap-1 mt-6 h-8">
            {[40, 75, 55, 90, 60, 85, 30, 95, 65, 80, 45, 70, 85, 40].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(15, (h * Math.sin((currentTime + i) * 0.8) + h) / 2)}%` : '20%',
                  opacity: isPlaying ? 0.9 : 0.4
                }}
              />
            ))}
          </div>
        </div>

        {/* Lock Notice if Locked */}
        {!isUnlocked && (
          <div className="relative z-10 mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
            <Lock className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-white">This Episode is Locked</h4>
            <p className="text-[11px] text-neutral-400 mt-0.5 mb-3">
              Unlock using {episode.coinsRequired || 15} Coins or SK TV VIP Pass.
            </p>
            <button
              onClick={() => {
                const ok = onUnlockEpisode(episode.id, episode.coinsRequired || 15);
                if (!ok) onOpenCoinsModal();
              }}
              className="px-4 py-2 bg-amber-500 text-black font-bold text-xs rounded-xl shadow-md active:scale-95"
            >
              Unlock Episode ({episode.coinsRequired || 15} Coins)
            </button>
          </div>
        )}

        {/* Progress Bar & Timers */}
        <div className="relative z-10">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono tabular-nums mb-1.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = clickX / rect.width;
              setCurrentTime(Math.floor(newPct * duration));
            }}
            className="w-full h-1.5 bg-white/10 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all"
          >
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="p-2 text-neutral-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Rewind 10s"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrevEp}
              disabled={currentEpIndex === 0}
              className="text-neutral-400 hover:text-white disabled:opacity-30 min-h-[40px] min-w-[40px] flex items-center justify-center font-bold text-xs"
            >
              Prev
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform min-h-[44px] min-w-[44px]"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-0.5" />}
            </button>

            <button
              onClick={handleNextEp}
              disabled={currentEpIndex === safeEpisodes.length - 1}
              className="text-neutral-400 hover:text-white disabled:opacity-30 min-h-[40px] min-w-[40px] flex items-center justify-center font-bold text-xs"
            >
              Next
            </button>

            <button
              onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
              className="p-2 text-neutral-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Fast Forward 10s"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          {/* Secondary Utilities Row */}
          <div className="flex items-center justify-around pt-5 border-t border-white/10 mt-4 text-xs text-neutral-400">
            <button
              onClick={() => {
                const speeds = [0.75, 1.0, 1.25, 1.5];
                const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                setPlaybackSpeed(speeds[nextIdx]);
              }}
              className="hover:text-white font-medium py-1 px-2 rounded hover:bg-white/5"
            >
              Speed: <span className="text-white font-semibold">{playbackSpeed}x</span>
            </button>

            <button
              onClick={() => setShowSleepMenu(!showSleepMenu)}
              className="flex items-center gap-1 hover:text-white font-medium py-1 px-2 rounded hover:bg-white/5"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>{sleepTimerMinutes ? `${sleepTimerMinutes}m` : 'Sleep'}</span>
            </button>

            <button
              onClick={() => setIsDownloaded(!isDownloaded)}
              className="flex items-center gap-1 hover:text-white font-medium py-1 px-2 rounded hover:bg-white/5"
            >
              {isDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sleep Timer Picker Menu */}
        {showSleepMenu && (
          <div className="absolute inset-x-6 bottom-20 z-30 p-3 bg-neutral-900 border border-white/15 rounded-2xl shadow-2xl flex items-center justify-between gap-1">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setSleepTimerMinutes(mins);
                  setShowSleepMenu(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  sleepTimerMinutes === mins ? 'bg-indigo-600 text-white' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {mins}m
              </button>
            ))}
            <button
              onClick={() => {
                setSleepTimerMinutes(null);
                setShowSleepMenu(false);
              }}
              className="px-2 py-1.5 text-xs text-red-400 hover:text-red-300 font-medium"
            >
              Off
            </button>
          </div>
        )}

        {/* Episodes Drawer Sheet */}
        {showEpisodesList && (
          <div className="absolute inset-0 z-40 bg-black/95 rounded-3xl p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white font-display">Audio Chapters</h3>
              <button onClick={() => setShowEpisodesList(false)} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-2">
              {show.episodes.map((ep, idx) => {
                const unlocked = isVip || ep.isFree || unlockedEpisodes.includes(ep.id);
                return (
                  <div
                    key={ep.id}
                    onClick={() => {
                      setCurrentEpIndex(idx);
                      setShowEpisodesList(false);
                    }}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer border ${
                      idx === currentEpIndex ? 'bg-emerald-500/15 border-emerald-500/50' : 'bg-white/5 border-transparent'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-white">Ch {ep.episodeNumber}: {ep.title}</h4>
                      <span className="text-[10px] text-neutral-400 font-mono">{ep.duration}</span>
                    </div>
                    {unlocked ? (
                      <span className="text-[10px] text-emerald-400 font-semibold">Ready</span>
                    ) : (
                      <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                        <Lock className="w-3 h-3" /> {ep.coinsRequired || 15} 🪙
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
