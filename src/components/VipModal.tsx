import React, { useState } from 'react';
import { X, Check, Crown, Sparkles, Coins, Gift, Flame, ShieldCheck, Building2 } from 'lucide-react';
import { DAILY_REWARDS, VIP_PLANS } from '../data/mockShows';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  isVip: boolean;
  claimedDays: number[];
  onClaimDaily: (day: number, coins: number) => void;
  onUpgradeVip: (planId: string) => void;
  onOpenUpiPayment: (item: {
    title: string;
    amount: number;
    type: 'vip_monthly' | 'vip_annual' | 'coins_pack';
  }) => void;
  bankName: string;
  upiId: string;
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  coins,
  isVip,
  claimedDays,
  onClaimDaily,
  onOpenUpiPayment,
  bankName,
  upiId,
}) => {
  const [activeTab, setActiveTab] = useState<'rewards' | 'vip'>('rewards');
  const [celebrationMsg, setCelebrationMsg] = useState<string | null>(null);

  const safeClaimedDays = claimedDays || [];

  if (!isOpen) return null;

  const handleClaim = (day: number, amount: number) => {
    onClaimDaily(day, amount);
    setCelebrationMsg(`🎉 Mubarak ho! +${amount} Free Coins added to your SK TV wallet!`);
    setTimeout(() => {
      setCelebrationMsg(null);
    }, 3500);
  };

  const handleSelectPlan = (plan: typeof VIP_PLANS[0]) => {
    onClose();
    onOpenUpiPayment({
      title: plan.name,
      amount: plan.price,
      type: plan.id === 'annual' ? 'vip_annual' : 'vip_monthly',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0e1017] rounded-3xl border border-white/15 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Glow Effects */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                SK TV Rewards & VIP Pass
              </h2>
              <p className="text-xs text-neutral-400">
                Your Coins Balance: <span className="text-amber-400 font-bold tabular-nums">{coins} 🪙</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Celebration Toast */}
        {celebrationMsg && (
          <div className="relative z-20 my-3 p-3 bg-gradient-to-r from-amber-500/20 to-red-600/20 border border-amber-500/40 rounded-xl text-center text-xs font-bold text-amber-300 animate-bounce">
            {celebrationMsg}
          </div>
        )}

        {/* Segmented Switcher */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 bg-white/5 rounded-xl my-4">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${
              activeTab === 'rewards'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Daily Free Coins</span>
          </button>

          <button
            onClick={() => setActiveTab('vip')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${
              activeTab === 'vip'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>VIP Subscription</span>
          </button>
        </div>

        {/* TAB 1: DAILY COIN REWARDS */}
        {activeTab === 'rewards' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-4 h-4" /> 7-Day Check-in Streak
                </span>
                <span className="text-[11px] text-neutral-400">
                  {safeClaimedDays.length} / 7 Days Claimed
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Check in daily to claim free coins and unlock drama episodes without paying!
              </p>
            </div>

            {/* Daily Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {DAILY_REWARDS.map((item) => {
                const isClaimed = safeClaimedDays.includes(item.day);
                const isNextToClaim = safeClaimedDays.length + 1 === item.day;

                return (
                  <div
                    key={item.day}
                    className={`p-2 rounded-xl flex flex-col items-center justify-between border text-center transition-all ${
                      isClaimed
                        ? 'bg-emerald-500/10 border-emerald-500/30 opacity-70'
                        : isNextToClaim
                        ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10 ring-1 ring-amber-500'
                        : 'bg-white/5 border-white/10 opacity-50'
                    }`}
                  >
                    <span className="text-[10px] text-neutral-400 font-medium">
                      Day {item.day}
                    </span>
                    <div className="my-1.5">
                      <Coins className={`w-5 h-5 mx-auto ${isClaimed ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <span className="text-xs font-bold text-white block mt-0.5 tabular-nums">
                        +{item.coins}
                      </span>
                    </div>

                    {isClaimed ? (
                      <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Done
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaim(item.day, item.coins)}
                        disabled={!isNextToClaim}
                        className={`w-full py-1 text-[10px] font-bold rounded min-h-[30px] transition-colors ${
                          isNextToClaim
                            ? 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer'
                            : 'bg-white/10 text-neutral-500 cursor-not-allowed'
                        }`}
                      >
                        Claim
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* How to use coins info */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-neutral-400 space-y-1">
              <span className="text-neutral-200 font-semibold block">Coins Usage Guide:</span>
              <p>• 1 Episode = 10 to 15 Coins</p>
              <p>• First 3 Episodes of all shows are 100% Free</p>
              <p>• Unlocked episodes stay permanently accessible in your account</p>
            </div>
          </div>
        )}

        {/* TAB 2: VIP PLANS */}
        {activeTab === 'vip' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar space-y-4">
            {isVip && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>You are an active SK TV VIP Member! All content is unlocked.</span>
              </div>
            )}

            <div className="space-y-3">
              {VIP_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-4 rounded-2xl border transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-950/40 via-neutral-900 to-black border-red-500/60 shadow-lg shadow-red-600/10'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-red-600 text-[10px] font-extrabold uppercase tracking-wider text-white rounded shadow-md">
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">{plan.name}</h4>
                      <p className="text-[11px] text-neutral-400">{plan.perDay}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-white">₹{plan.price}</span>
                        <span className="text-xs text-neutral-500 line-through">₹{plan.originalPrice}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {plan.discount}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1 text-xs text-neutral-300">
                    {plan.perks.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={isVip}
                    className="w-full mt-4 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    {isVip ? (
                      <span>Active VIP Plan</span>
                    ) : (
                      <>
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Pay ₹{plan.price} via {bankName} UPI</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
