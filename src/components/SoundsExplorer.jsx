import React, { useState } from 'react';
import { Volume2, Sparkles, Activity, Info } from 'lucide-react';
import { FON_SPECIAL_LETTERS, FON_TONES, FON_NASAL_VOWELS } from '../data/alphabetData';
import { audioSynth } from '../utils/audioSynth';

export default function SoundsExplorer() {
  const [activeTone, setActiveTone] = useState('high');

  const handlePlayTone = (tone) => {
    setActiveTone(tone.id);
    audioSynth.playTone(tone.pitchType);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-28 md:pb-12">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 font-extrabold uppercase tracking-wider text-xs mb-1">
          <Activity className="w-4 h-4" />
          <span>Laboratoire Phonétique Béninois</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
          Sons & Tons du Fɔngbè
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Le Fon est une langue tonale : la hauteur de la voix détermine le sens d'un mot. Écoutez, pratiquez et apprivoisez les sons spécifiques de l'Alphabet National ALNb.
        </p>
      </div>

      {/* SECTION 1: LE SIMULATEUR DE TONS */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎶</span>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Le Simulateur de Hauteur des Tons
            </h3>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
            Interactif Web Audio
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-6">
          Cliquez sur chaque ton pour écouter la modulation de fréquence acoustique correspondante.
        </p>

        {/* Tone Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {FON_TONES.map((tone) => {
            const isSelected = activeTone === tone.id;
            return (
              <button
                key={tone.id}
                type="button"
                onClick={() => handlePlayTone(tone)}
                className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm ring-2 ring-blue-300'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-sm text-slate-800">
                      {tone.name}
                    </span>
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs text-slate-500 font-semibold block mt-1">
                    {tone.freqDesc}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <span className="text-[11px] text-slate-400 uppercase font-bold block">Exemple</span>
                  <span className="text-sm font-bold text-slate-800 font-display">{tone.example}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{tone.meaning}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Famous Tone Contrast Box: dɔ vs dɔ́ vs dò */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-900 text-sm">Le classique béninois : Le mot « DO »</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Regardez comment une simple modulation tonale transforme complètement la phrase :
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioSynth.playTone('high');
                audioSynth.speak('dɔ́');
              }}
              className="px-3 py-1.5 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 shadow-xs flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>dɔ́ (dire)</span>
            </button>
            <button
              onClick={() => {
                audioSynth.playTone('mid');
                audioSynth.speak('dɔ');
              }}
              className="px-3 py-1.5 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 shadow-xs flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>dɔ (dormir)</span>
            </button>
            <button
              onClick={() => {
                audioSynth.playTone('low');
                audioSynth.speak('dò');
              }}
              className="px-3 py-1.5 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 shadow-xs flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>dò (trou)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: CONSONNES & VOYELLES SPECIALES */}
      <div className="mb-10">
        <h3 className="font-display font-black text-xl text-slate-800 mb-4 flex items-center gap-2">
          <span>Lettres & Digraphes Spéciaux (ALNb)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {FON_SPECIAL_LETTERS.map((item) => (
            <div
              key={item.char}
              className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-emerald-400 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-display font-black text-emerald-600">
                    {item.char}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      audioSynth.playTone(item.audioPitch);
                      audioSynth.speak(item.example);
                    }}
                    className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors"
                    title="Écouter"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="font-bold text-xs text-slate-800">{item.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">{item.ipa}</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {item.example}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: VOYELLES NASALES */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm">
        <h3 className="font-display font-bold text-lg text-slate-800 mb-3">
          Les Voyelles Nasales du Fɔn
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          En Fon, l'air s'échappe simultanément par la bouche et le nez pour ces voyelles écrites avec un 'n' :
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {FON_NASAL_VOWELS.map((item) => (
            <div
              key={item.pair}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center"
            >
              <div className="font-display font-black text-lg text-slate-800">{item.pair}</div>
              <div className="text-[11px] text-slate-500 font-medium">son : « {item.sound} »</div>
              <div className="text-xs font-bold text-emerald-600 mt-1">{item.example}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
