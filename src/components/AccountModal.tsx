import React, { useState } from 'react';
import {
  X,
  User,
  Building2,
  ShieldCheck,
  CreditCard,
  Edit2,
  Check,
  Coins,
  Crown,
  History,
  Sparkles,
  QrCode
} from 'lucide-react';
import { UserState, UpiTransaction } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onUpdateUpiDetails: (name: string, bank: string, upiId: string) => void;
  onInitiateUpiPayment: (item: {
    title: string;
    amount: number;
    type: 'vip_monthly' | 'vip_annual' | 'coins_pack';
    coinsToAdd?: number;
  }) => void;
  onOpenAdminPanel: () => void;
}

const COIN_PACKS = [
  { id: 'coins_100', name: '100 Coins Pack', coins: 100, price: 29, badge: 'STARTER' },
  { id: 'coins_300', name: '300 Coins Pack', coins: 300, price: 69, popular: true, badge: 'MOST POPULAR' },
  { id: 'coins_1000', name: '1000 Coins Mega Pack', coins: 1000, price: 199, badge: 'BEST VALUE' },
];

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  userState,
  onUpdateUpiDetails,
  onInitiateUpiPayment,
  onOpenAdminPanel,
}) => {
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [accountName, setAccountName] = useState(userState.accountName || 'Nishant Kumar');
  const [bankName, setBankName] = useState(userState.bankName || 'Bank of Baroda');
  const [upiId, setUpiId] = useState(userState.upiId || 'nishantkumar854204@barodampay');
  const [activeTab, setActiveTab] = useState<'profile' | 'coins' | 'transactions'>('profile');

  if (!isOpen) return null;

  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUpiDetails(accountName.trim(), bankName.trim(), upiId.trim());
    setIsEditingUpi(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0e1017] rounded-3xl border border-white/15 p-6 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Glow Effects */}
        <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-base shadow-lg">
              {accountName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                {accountName}
              </h2>
              <p className="text-xs text-neutral-400">
                {userState.email} · <span className="text-orange-400 font-semibold">{userState.bankName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* OFFICIAL OWNER BANNER */}
        <div className="relative z-10 mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-950/70 via-red-950/60 to-neutral-900 border border-amber-500/50 shadow-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-black font-extrabold shadow-lg shrink-0">
                <Crown className="w-6 h-6 fill-black" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                    👑 OFFICIAL APP OWNER
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    SUPER ADMIN
                  </span>
                </div>
                <h3 className="text-sm font-black text-white font-display mt-0.5">
                  Nishant Kumar — Founder of SK TV
                </h3>
                <p className="text-[11px] text-neutral-300">
                  Full owner permissions enabled. All platform earnings linked to your Bank of Baroda account.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenAdminPanel();
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>Open Admin Panel →</span>
            </button>
          </div>
        </div>

        {/* Segmented Navigation */}
        <div className="relative z-10 flex items-center gap-1.5 p-1 bg-white/5 rounded-xl my-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[38px] ${
              activeTab === 'profile' ? 'bg-orange-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Bank of Baroda UPI</span>
          </button>

          <button
            onClick={() => setActiveTab('coins')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[38px] ${
              activeTab === 'coins' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Buy Coins</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[38px] ${
              activeTab === 'transactions' ? 'bg-red-600 text-white shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History ({(userState?.transactions || []).length})</span>
          </button>
        </div>

        {/* TAB 1: BANK OF BARODA UPI PROFILE */}
        {activeTab === 'profile' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar space-y-4">
            
            {/* Bank of Baroda Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/50 via-neutral-900 to-black border border-orange-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-extrabold text-xs">
                    BOB
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">
                      {userState.bankName} (BOB)
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified UPI Account
                    </span>
                  </div>
                </div>

                {!isEditingUpi && (
                  <button
                    onClick={() => setIsEditingUpi(true)}
                    className="p-1.5 text-xs text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {/* Edit UPI Form or View Details */}
              {isEditingUpi ? (
                <form onSubmit={handleSaveUpi} className="mt-4 space-y-3 pt-3 border-t border-white/10">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">
                      Bank of Baroda UPI ID (e.g. nishantkumar854204@barodampay)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingUpi(false)}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-neutral-300 text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Account Holder:</span>
                    <span className="text-white font-semibold">{userState.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Linked Email:</span>
                    <span className="text-neutral-300 font-mono text-[11px]">{userState.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">BOB UPI ID:</span>
                    <span className="text-orange-400 font-mono font-bold bg-black/40 px-2 py-0.5 rounded border border-orange-500/30">
                      {userState.upiId}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Balance Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-neutral-400 block">Coins Balance</span>
                <span className="text-xl font-black text-amber-400 tabular-nums font-display mt-0.5 block">
                  {userState.coins} 🪙
                </span>
                <button
                  onClick={() => setActiveTab('coins')}
                  className="mt-2 text-[10px] font-bold text-amber-400 hover:underline"
                >
                  + Add More Coins →
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-neutral-400 block">VIP Status</span>
                <span className="text-sm font-extrabold text-white mt-1 block">
                  {userState.isVip ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Crown className="w-4 h-4 fill-emerald-400" /> Active Member
                    </span>
                  ) : (
                    <span className="text-neutral-400">Free Tier</span>
                  )}
                </span>
                {!userState.isVip && (
                  <button
                    onClick={() => {
                      onClose();
                      onInitiateUpiPayment({
                        title: '1 Month VIP Pass',
                        amount: 99,
                        type: 'vip_monthly',
                      });
                    }}
                    className="mt-2 text-[10px] font-bold text-red-400 hover:underline"
                  >
                    Upgrade to VIP (₹99) →
                  </button>
                )}
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2.5 text-xs text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Protected by UPI 2.0 & NPCI guidelines. Real-time payments directly linked to Bank of Baroda.
              </span>
            </div>

          </div>
        )}

        {/* TAB 2: BUY COINS VIA BANK OF BARODA UPI */}
        {activeTab === 'coins' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar space-y-3">
            <p className="text-xs text-neutral-300">
              Select a coin pack to recharge using Bank of Baroda UPI:
            </p>

            {COIN_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  pack.popular
                    ? 'bg-gradient-to-r from-amber-950/40 via-neutral-900 to-black border-amber-500/60 shadow-lg'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white font-display">
                      {pack.name}
                    </span>
                    <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded">
                      {pack.badge}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 mt-0.5 block">
                    Instantly unlock {Math.floor(pack.coins / 10)} full drama episodes
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-white font-display block">
                    ₹{pack.price}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onInitiateUpiPayment({
                        title: pack.name,
                        amount: pack.price,
                        type: 'coins_pack',
                        coinsToAdd: pack.coins,
                      });
                    }}
                    className="mt-1 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Pay via BOB UPI
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TRANSACTION RECEIPTS */}
        {activeTab === 'transactions' && (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar space-y-2.5">
            {(!userState?.transactions || userState.transactions.length === 0) ? (
              <div className="text-center py-12 text-neutral-500 text-xs">
                No past UPI transactions recorded yet.
              </div>
            ) : (
              (userState.transactions || []).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{tx.title}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {tx.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      UTR: <span className="font-mono text-neutral-300">{tx.utr}</span> · {tx.date}
                    </p>
                    <p className="text-[10px] text-orange-400/90 font-medium">
                      Via {tx.bankName} ({tx.upiId})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-white font-display">
                      ₹{tx.amount}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
