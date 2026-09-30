import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  Smartphone,
  ShieldCheck,
  Building2,
  QrCode,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import QRCode from 'qrcode';
import { UpiTransaction } from '../types';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  type: 'vip_monthly' | 'vip_annual' | 'coins_pack';
  coinsToAdd?: number;
  userUpiId: string;
  userBankName: string;
  accountHolderName: string;
  onPaymentSuccess: (transaction: UpiTransaction, coinsToAdd?: number) => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  isOpen,
  onClose,
  title,
  amount,
  type,
  coinsToAdd,
  userUpiId,
  userBankName,
  accountHolderName,
  onPaymentSuccess,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string>('any');

  // Real standard UPI Intent URL
  const payeeName = accountHolderName || 'Nishant Kumar';
  const upiIntentString = `upi://pay?pa=${encodeURIComponent(userUpiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(`SK TV - ${title}`)}`;

  // Generate QR Code on mount or amount/upi change
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(
      upiIntentString,
      {
        width: 260,
        margin: 1.5,
        color: {
          dark: '#0a0a0c',
          light: '#ffffff',
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrCodeUrl(url);
        }
      }
    );
  }, [isOpen, upiIntentString]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(userUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);

    // Simulate real-time Bank of Baroda payment verification
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);

      const generatedUtr = utrNumber.trim() || `BOB${Date.now().toString().slice(-8)}`;
      const newTransaction: UpiTransaction = {
        id: `tx-${Date.now()}`,
        amount,
        type,
        title,
        utr: generatedUtr,
        date: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        status: 'SUCCESS',
        upiId: userUpiId,
        bankName: userBankName || 'Bank of Baroda',
      };

      setTimeout(() => {
        onPaymentSuccess(newTransaction, coinsToAdd);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0d0f16] rounded-3xl border border-white/15 p-6 shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Ambient Glow */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white font-display">
                  Bank of Baroda UPI Payment
                </h3>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                A/C Holder: <span className="text-white font-semibold">{payeeName}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen after confirmation */}
        {verificationSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white font-display">
                ₹{amount} Payment Successful!
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Bank of Baroda UPI confirmed. Your {title} is now active!
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 max-w-xs mx-auto text-xs text-neutral-300 space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-500">Bank:</span>
                <span className="text-orange-400 font-semibold">{userBankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">UPI ID:</span>
                <span className="font-mono text-neutral-200">{userUpiId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Amount:</span>
                <span className="text-white font-bold">₹{amount}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
            
            {/* Amount Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-neutral-900 to-black border border-orange-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 font-medium">Payment for:</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{title}</h4>
                {coinsToAdd && (
                  <span className="text-[11px] text-amber-400 font-semibold">
                    +{coinsToAdd} Coins credited immediately
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-display">₹{amount}</span>
                <span className="text-[10px] text-emerald-400 block font-semibold">
                  Zero Extra Convenience Fee
                </span>
              </div>
            </div>

            {/* Live QR Code Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-3">
                <QrCode className="w-4 h-4 text-orange-400" />
                <span>Scan QR with any UPI App</span>
              </div>

              {/* QR Image with subtle Bank of Baroda badge container */}
              <div className="relative p-2.5 bg-white rounded-2xl shadow-xl">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Bank of Baroda UPI QR Code"
                    className="w-48 h-48 rounded-lg select-none"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-black font-bold text-xs">
                    Generating BOB UPI QR...
                  </div>
                )}
                {/* Center Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="px-2 py-0.5 bg-[#f35b04] text-white text-[9px] font-extrabold rounded shadow-md border border-white">
                    BOB UPI
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 mt-3">
                Google Pay · PhonePe · Paytm · BOB World · BHIM UPI
              </p>
            </div>

            {/* Direct UPI Apps Trigger Buttons */}
            <div>
              <span className="text-xs font-semibold text-neutral-300 block mb-2">
                Or Tap to Pay Directly:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={upiIntentString}
                  onClick={() => setSelectedApp('gpay')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-all group min-h-[44px]"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition-colors">
                      Google Pay
                    </span>
                    <span className="text-[10px] text-neutral-400">Direct Pay</span>
                  </div>
                </a>

                <a
                  href={upiIntentString}
                  onClick={() => setSelectedApp('phonepe')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-all group min-h-[44px]"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    Pe
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block group-hover:text-purple-400 transition-colors">
                      PhonePe
                    </span>
                    <span className="text-[10px] text-neutral-400">Direct Pay</span>
                  </div>
                </a>

                <a
                  href={upiIntentString}
                  onClick={() => setSelectedApp('paytm')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-all group min-h-[44px]"
                >
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block group-hover:text-sky-400 transition-colors">
                      Paytm
                    </span>
                    <span className="text-[10px] text-neutral-400">Direct Pay</span>
                  </div>
                </a>

                <a
                  href={upiIntentString}
                  onClick={() => setSelectedApp('bob')}
                  className="p-3 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 flex items-center gap-2.5 transition-all group min-h-[44px]"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                    BOB
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-orange-300 block">
                      BOB World
                    </span>
                    <span className="text-[10px] text-orange-400/80">Baroda Pay</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Copy UPI ID Box */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="truncate mr-2">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                  Bank of Baroda UPI ID:
                </span>
                <span className="text-xs font-mono font-bold text-white select-all">
                  {userUpiId}
                </span>
              </div>
              <button
                onClick={handleCopyUpi}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shrink-0 min-h-[38px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy UPI</span>
                  </>
                )}
              </button>
            </div>

            {/* UTR Reference / Payment Verification Box */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <label className="text-xs text-neutral-300 font-medium block">
                After paying, enter UPI Ref / UTR No. (Optional):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 428901234567 or Leave blank"
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={handleConfirmPayment}
                  disabled={isVerifying}
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 shrink-0 min-h-[44px]"
                >
                  {isVerifying ? (
                    <span>Verifying with BOB...</span>
                  ) : (
                    <>
                      <span>I Have Paid ₹{amount}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 text-center">
                Instant activation: Once you confirm payment, your VIP Pass or Coins are activated right away.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
