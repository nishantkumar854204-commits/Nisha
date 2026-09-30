import React, { useState, useEffect, useRef } from 'react';
import { Show, Episode, Comment } from '../types';
import {
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  MessageCircle,
  Share2,
  List,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Coins,
  ChevronDown,
  Send,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface VerticalDramaPlayerProps {
  show: Show;
  initialEpisodeId?: string;
  onClose: () => void;
  unlockedEpisodes: string[];
  onUnlockEpisode: (episodeId: string, coinsNeeded: number) => boolean;
  coins: number;
  isVip: boolean;
  onOpenCoinsModal: () => void;
}

export const VerticalDramaPlayer: React.FC<VerticalDramaPlayerProps> = ({
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
  const [duration, setDuration] = useState(episode.durationSec || 120);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1280);
  const [showComments, setShowComments] = useState(false);
  const [showEpisodesList, setShowEpisodesList] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>(show?.comments || []);
  const [activeSubtitle, setActiveSubtitle] = useState<string>('');
  const [activeSpeaker, setActiveSpeaker] = useState<string>('');
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [lockPrompt, setLockPrompt] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update duration when episode changes
  useEffect(() => {
    setDuration(episode.durationSec || 120);
    setCurrentTime(0);
    setIsLiked(false);
    setLikeCount(Math.floor(Math.random() * 2000) + 500);

    if (!isUnlocked) {
      setIsPlaying(false);
      setLockPrompt(true);
      audioEngine.stopAll();
    } else {
      setLockPrompt(false);
      setIsPlaying(true);
      startAudioAndDialogue();
    }

    return () => {
      audioEngine.stopAll();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentEpIndex, isUnlocked]);

  // Audio Ambiance & Vocal dialogue trigger
  const startAudioAndDialogue = () => {
    if (!isMuted) {
      audioEngine.playAmbiance(episode.audioAmbiance || 'drama');
      if (episode.dialogueScript && episode.dialogueScript.length > 0) {
        const firstLine = episode.dialogueScript[0];
        setActiveSubtitle(firstLine.text);
        setActiveSpeaker(firstLine.speaker);
        audioEngine.speakDialogue(`${firstLine.speaker}: ${firstLine.text}`, playbackSpeed);
      }
    }
  };

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying && isUnlocked) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= duration) {
            handleEpisodeComplete();
            return duration;
          }

          // Check if any dialogue matches current time
          if (episode.dialogueScript) {
            const match = episode.dialogueScript.find(
              (d) => Math.abs(d.time - next) <= 1
            );
            if (match) {
              setActiveSubtitle(match.text);
              setActiveSpeaker(match.speaker);
              if (!isMuted) {
                audioEngine.speakDialogue(`${match.speaker}: ${match.text}`, playbackSpeed);
              }
            }
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isUnlocked, duration, playbackSpeed, episode, isMuted]);

  const handleEpisodeComplete = () => {
    if (autoPlayNext && currentEpIndex < safeEpisodes.length - 1) {
      setCurrentEpIndex(currentEpIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!isUnlocked) {
      setLockPrompt(true);
      return;
    }
    if (isPlaying) {
      audioEngine.stopAll();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (!isMuted) {
        audioEngine.playAmbiance(episode.audioAmbiance || 'drama');
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.playAmbiance(episode.audioAmbiance || 'drama');
    } else {
      setIsMuted(true);
      audioEngine.stopAll();
    }
  };

  const handleNextEp = () => {
    if (currentEpIndex < safeEpisodes.length - 1) {
      setCurrentEpIndex(currentEpIndex + 1);
    }
  };

  const handlePrevEp = () => {
    if (currentEpIndex > 0) {
      setCurrentEpIndex(currentEpIndex - 1);
    }
  };

  const handleUnlockAttempt = () => {
    const success = onUnlockEpisode(episode.id, episode.coinsRequired || 10);
    if (success) {
      setLockPrompt(false);
      setIsPlaying(true);
    } else {
      onOpenCoinsModal();
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      userName: 'Aap (User)',
      userAvatarBg: 'bg-red-600',
      comment: newCommentText.trim(),
      timeAgo: 'Just now',
      likes: 1,
    };
    setCommentsList([newComment, ...commentsList]);
    setNewCommentText('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-md">
      {/* Container: Vertical 9:16 mobile canvas on desktop, full height */}
      <div className="relative w-full max-w-[440px] h-full sm:h-[94vh] sm:rounded-2xl overflow-hidden bg-[#0c0d12] border border-white/10 flex flex-col justify-between shadow-2xl">
        
        {/* Top Floating App Bar */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between">
          <button
            onClick={() => {
              audioEngine.stopAll();
              onClose();
            }}
            className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            title="Close player"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center px-2 flex-1 truncate">
            <h4 className="text-xs font-semibold text-white truncate drop-shadow">
              {show.titleHindi}
            </h4>
            <p className="text-[11px] text-neutral-300 font-medium">
              Ep {episode.episodeNumber} / {safeEpisodes.length}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className="p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                const speeds = [1.0, 1.25, 1.5, 2.0];
                const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                setPlaybackSpeed(speeds[nextIdx]);
              }}
              className="px-2.5 py-1 text-xs font-bold text-neutral-200 bg-black/40 hover:bg-black/70 rounded-lg backdrop-blur-md min-h-[40px] flex items-center tabular-nums"
              title="Change speed"
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>

        {/* Video Canvas Visual Representation (Dynamic Cinema Background) */}
        <div
          onClick={togglePlay}
          className="relative flex-1 w-full overflow-hidden flex items-center justify-center cursor-pointer select-none"
        >
          {/* Background Atmospheric Visuals */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${show.coverGradient} transition-opacity duration-700`}
          />

          {/* Animated Video Scene Visualizer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none">
            {/* Dramatic Scene Aura */}
            <div
              className={`w-48 h-48 rounded-full blur-3xl transition-transform duration-1000 ${
                isPlaying ? 'scale-125 opacity-40 animate-pulse' : 'scale-90 opacity-20'
              }`}
              style={{ backgroundColor: show.coverAccent }}
            />

            {/* Scene Illustration Graphic */}
            <div className="relative z-10 mb-6">
              <div
                className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center shadow-2xl border border-white/20 bg-black/40 backdrop-blur-md"
              >
                <span className="text-4xl">🎬</span>
              </div>
              <div className="mt-3">
                <span className="text-[11px] font-bold tracking-widest text-red-400 uppercase bg-red-950/60 border border-red-800/40 px-3 py-1 rounded-full">
                  SK TV 1080p HD DRAMA
                </span>
              </div>
            </div>

            {/* Episode Title & Synopsis */}
            <div className="max-w-xs space-y-1">
              <h2 className="text-xl font-bold font-display text-white drop-shadow-md">
                {episode.title}
              </h2>
              <p className="text-xs text-neutral-300 drop-shadow line-clamp-2">
                {episode.synopsis}
              </p>
            </div>

            {/* Live Synchronized Subtitles (Hindi / English dialogue) */}
            {activeSubtitle && isUnlocked && (
              <div className="mt-8 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 max-w-xs shadow-2xl transition-all">
                {activeSpeaker && (
                  <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
                    {activeSpeaker}
                  </span>
                )}
                <p className="text-sm font-semibold text-white leading-snug">
                  "{activeSubtitle}"
                </p>
              </div>
            )}
          </div>

          {/* Locked Episode Overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-20 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 font-display">
                Episode {episode.episodeNumber} is Locked
              </h3>
              <p className="text-xs text-neutral-400 mb-5 max-w-xs">
                Unlock with {episode.coinsRequired || 10} Coins or get an SK TV VIP Pass for unlimited access!
              </p>

              <div className="space-y-2.5 w-full max-w-xs">
                <button
                  onClick={handleUnlockAttempt}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock for {episode.coinsRequired || 10} Coins (Balance: {coins})</span>
                </button>

                <button
                  onClick={onOpenCoinsModal}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get VIP Pass (No Coins Needed)</span>
                </button>
              </div>
            </div>
          )}

          {/* Pause Indicator overlay */}
          {!isPlaying && isUnlocked && (
            <div className="absolute inset-0 z-15 bg-black/40 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Right Floating Reels Action Strip (Like, Comment, Episode list, Share) */}
        <div className="absolute right-3 bottom-24 z-30 flex flex-col items-center gap-4">
          {/* Like */}
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            }}
            className="flex flex-col items-center group focus:outline-none min-h-[44px]"
            title="Like episode"
          >
            <div className={`p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-125 ${
              isLiked ? 'bg-red-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
            }`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[10px] font-semibold text-white mt-1 tabular-nums drop-shadow">
              {likeCount}
            </span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowComments(true)}
            className="flex flex-col items-center group focus:outline-none min-h-[44px]"
            title="Comments"
          >
            <div className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-white mt-1 tabular-nums drop-shadow">
              {(commentsList || []).length}
            </span>
          </button>

          {/* Episodes List Drawer */}
          <button
            onClick={() => setShowEpisodesList(true)}
            className="flex flex-col items-center group focus:outline-none min-h-[44px]"
            title="All Episodes"
          >
            <div className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md">
              <List className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-white mt-1 drop-shadow">
              Episodes
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${show.titleHindi} on SK TV`,
                  text: `Watch ${show.title} on SK TV!`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex flex-col items-center group focus:outline-none min-h-[44px]"
            title="Share"
          >
            <div className="p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-white mt-1 drop-shadow">
              Share
            </span>
          </button>
        </div>

        {/* Bottom Media Controls Bar */}
        <div className="relative z-30 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
          {/* Progress Timeline Scrubber */}
          <div className="flex items-center gap-2 mb-2 text-[11px] text-neutral-400 font-mono tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-150"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevEp}
                disabled={currentEpIndex === 0}
                className="p-2 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Previous Episode"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg shadow-red-600/30"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleNextEp}
                disabled={currentEpIndex === safeEpisodes.length - 1}
                className="p-2 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Next Episode"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Auto Play Next Toggle */}
            <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoPlayNext}
                onChange={(e) => setAutoPlayNext(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-red-600 cursor-pointer"
              />
              <span className="text-[11px]">Auto-next</span>
            </label>
          </div>
        </div>

        {/* EPISODES DRAWER SHEET */}
        {showEpisodesList && (
          <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-lg flex flex-col justify-end">
            <div className="h-[75%] bg-[#12131a] rounded-t-3xl border-t border-white/10 flex flex-col p-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    All Episodes ({safeEpisodes.length})
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Ep 1-3 Free · Coins needed for locked episodes
                  </p>
                </div>
                <button
                  onClick={() => setShowEpisodesList(false)}
                  className="p-2 text-neutral-400 hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Episode Items List */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-2">
                {safeEpisodes.map((ep, idx) => {
                  const unlocked = isVip || ep.isFree || unlockedEpisodes.includes(ep.id);
                  const isCurrent = idx === currentEpIndex;

                  return (
                    <div
                      key={ep.id}
                      onClick={() => {
                        setCurrentEpIndex(idx);
                        setShowEpisodesList(false);
                      }}
                      className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors border ${
                        isCurrent
                          ? 'bg-red-600/15 border-red-500/50'
                          : 'bg-white/5 hover:bg-white/10 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold w-6 tabular-nums ${isCurrent ? 'text-red-400' : 'text-neutral-400'}`}>
                          #{ep.episodeNumber}
                        </span>
                        <div>
                          <h4 className={`text-xs font-semibold ${isCurrent ? 'text-white' : 'text-neutral-200'}`}>
                            {ep.title}
                          </h4>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {ep.duration}
                          </span>
                        </div>
                      </div>

                      <div>
                        {unlocked ? (
                          <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                            <Unlock className="w-3 h-3" />
                            <span>Free</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded">
                            <Lock className="w-3 h-3" />
                            <span>{ep.coinsRequired || 10} 🪙</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* COMMENTS DRAWER SHEET */}
        {showComments && (
          <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-lg flex flex-col justify-end">
            <div className="h-[75%] bg-[#12131a] rounded-t-3xl border-t border-white/10 flex flex-col p-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white font-display">
                  Comments ({(commentsList || []).length})
                </h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="p-2 text-neutral-400 hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comments Feed */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-3">
                {(commentsList || []).map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${c.userAvatarBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {c.userName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-neutral-200">{c.userName}</span>
                        <span className="text-[10px] text-neutral-500">{c.timeAgo}</span>
                      </div>
                      <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{c.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="pt-2 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Apna comment likhein..."
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="p-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white rounded-xl min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
