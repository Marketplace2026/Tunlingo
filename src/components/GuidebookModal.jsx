import React from 'react';
import { X, BookOpen, Volume2, Sparkles } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function GuidebookModal({ unit, onClose }) {
  if (!unit) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${unit.color} text-white relative`}>
          <button
            onClick={() => {
              audioSynth.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-wider text-xs mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Unité {unit.unitNumber} • Cahier de Vocabulaire</span>
          </div>
          <h2 className="text-2xl font-black font-display">{unit.title}</h2>
          <p className="text-white/90 text-sm mt-1">{unit.subtitle}</p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 leading-relaxed text-sm">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Guide officiel d'apprentissage</h4>
              <p className="text-emerald-700 text-xs mt-0.5">
                Révisez les expressions clés et les particularités des tons avant de lancer la leçon.
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            {unit.guidebook.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={idx} className="font-display text-lg font-bold text-slate-800 mt-4 mb-2">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith('*')) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={idx} className="space-y-2 my-2">
                    {items.map((it, itemIdx) => {
                      const cleanText = it.replace('*', '').trim();
                      return (
                        <li key={itemIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <button
                            type="button"
                            onClick={() => {
                              const word = cleanText.split(':')[0].trim();
                              audioSynth.speak(word);
                            }}
                            className="p-1 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shrink-0 transition-colors"
                            title="Écouter la prononciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs text-slate-700 font-medium">
                            {cleanText}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-xs text-slate-600 my-2">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              audioSynth.playPop();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-2xl shadow-duo-green transition-all uppercase tracking-wider text-xs"
          >
            J'ai compris, commençons !
          </button>
        </div>
      </div>
    </div>
  );
}
