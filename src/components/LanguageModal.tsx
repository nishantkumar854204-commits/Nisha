import React from 'react';
import { X, Check } from 'lucide-react';
import { Language } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

const LANGUAGES: Array<{ code: Language; name: string; nativeName: string; region: string }> = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', region: 'All India / National' },
  { code: 'hinglish', name: 'Hinglish', nativeName: 'Hinglish (Urban)', region: 'Delhi, Mumbai, Bengaluru' },
  { code: 'bhojpuri', name: 'Bhojpuri', nativeName: 'भोजपुरी', region: 'Bihar, UP, Jharkhand' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab, Delhi, Haryana' },
  { code: 'en', name: 'English', nativeName: 'English', region: 'Global Edition' },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-[#10121a] rounded-3xl border border-white/15 p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white font-display">Select Content Language</h3>
            <p className="text-xs text-neutral-400">अपनी पसंदीदा भाषा चुनें</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-2">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl flex items-center justify-between border transition-all text-left ${
                  isSelected
                    ? 'bg-red-600/15 border-red-500/60 ring-1 ring-red-500/30'
                    : 'bg-white/5 hover:bg-white/10 border-white/5'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{lang.nativeName}</h4>
                  <p className="text-xs text-neutral-400">{lang.name} · {lang.region}</p>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
