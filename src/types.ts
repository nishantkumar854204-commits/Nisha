export type Language = 'hi' | 'hinglish' | 'bhojpuri' | 'pa' | 'en';

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string; // e.g. "1:45" or "14:20"
  durationSec: number;
  isFree: boolean;
  coinsRequired: number;
  synopsis: string;
  videoUrl?: string;
  audioAmbiance?: 'thriller' | 'romance' | 'horror' | 'drama';
  dialogueScript?: Array<{ speaker: string; text: string; time: number }>;
}

export interface Comment {
  id: string;
  userName: string;
  userAvatarBg: string;
  comment: string;
  timeAgo: string;
  likes: number;
}

export interface Show {
  id: string;
  title: string;
  titleHindi: string;
  tagline: string;
  synopsis: string;
  category: 'romance' | 'thriller' | 'desi_mafia' | 'horror' | 'royal' | 'comedy';
  format: 'micro_drama' | 'audio_story'; // micro_drama = vertical video drama; audio_story = audio novel
  rating: number;
  ratingCount: string;
  viewsCount: string;
  episodeCount: number;
  language: string;
  coverGradient: string;
  coverAccent: string;
  badge?: string;
  isTrending?: boolean;
  isTop10?: number; // 1 to 10
  isExclusive?: boolean;
  narratorOrCast: string;
  episodes: Episode[];
  comments: Comment[];
}

export interface UpiTransaction {
  id: string;
  amount: number;
  type: 'vip_monthly' | 'vip_annual' | 'coins_pack';
  title: string;
  utr: string;
  date: string;
  status: 'SUCCESS' | 'PROCESSING';
  upiId: string;
  bankName: string;
}

export interface UserState {
  accountName: string;
  email: string;
  bankName: string;
  upiId: string;
  isOwner: boolean;
  role: 'owner' | 'admin' | 'user';
  coins: number;
  isVip: boolean;
  vipExpiresAt?: string;
  watchlist: string[]; // show IDs
  likedShows: string[]; // show IDs
  unlockedEpisodes: string[]; // episode IDs
  history: Array<{
    showId: string;
    episodeId: string;
    progressSec: number;
    updatedAt: number;
  }>;
  claimedDays: number[];
  language: Language;
  transactions: UpiTransaction[];
}
