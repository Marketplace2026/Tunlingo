import React from 'react';
import { Delete, Sparkles } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function FonKeyboard({ onInsert, onDelete }) {
  const specialKeys = [
    { label: 'ɖ', title: 'd rétroflexe' },
    { label: 'ɛ', title: 'e ouvert' },
    { label: 'ɔ', title: 'o ouvert' },
    { label: 'gb', title: 'labio-vélaire gb' },
    { label: 'kp', title: 'labio-vélaire kp' },
    { label: 'ny', title: 'nasale palatale' },
    { label: 'xw', title: 'fricative xw' },
    { label: 'hw', title: 'glottale hw' },
  ];

  const accentedVowels = [
    // Tons hauts
    'á', 'é', 'ɛ́', 'ó', 'ɔ́', 'ú',
    // Tons bas
    'à', 'è', 'ɛ̀', 'ò', 'ɔ̀', 'ù',
  ];

  const handleKeyClick = (char) => {
    audioSynth.playPop();
    onInsert(char);
  };

  return (
    <div className="bg-slate-100 p-3 rounded-2xl border-2 border-slate-200 mt-3 shadow-inner select-none">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-benin-yellow" />
          Clavier Fon Spécial
        </span>
        <span className="text-[11px] text-slate-400 font-normal">Alphabet national ALNb</span>
      </div>

      {/* Special letters row */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {specialKeys.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => handleKeyClick(item.label)}
            title={item.title}
            className="flex-1 min-w-[38px] h-11 bg-white hover:bg-emerald-50 active:translate-y-0.5 text-slate-800 font-bold rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-700 shadow-sm transition-all text-base flex items-center justify-center font-display"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Accented vowels row */}
      <div className="flex flex-wrap gap-1 mb-2">
        {accentedVowels.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => handleKeyClick(char)}
            className="flex-1 min-w-[32px] h-9 bg-white/90 hover:bg-amber-50 active:translate-y-0.5 text-slate-700 font-semibold rounded-lg border border-slate-200 hover:border-amber-400 hover:text-amber-800 shadow-xs text-sm flex items-center justify-center transition-all font-display"
          >
            {char}
          </button>
        ))}
        {/* Backspace button */}
        <button
          type="button"
          onClick={() => {
            audioSynth.playPop();
            onDelete();
          }}
          className="w-12 h-9 bg-rose-50 hover:bg-rose-100 text-rose-600 active:translate-y-0.5 rounded-lg border border-rose-200 flex items-center justify-center transition-all shadow-xs"
          title="Effacer"
        >
          <Delete className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
