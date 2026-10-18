import React, { useState } from 'react';
import { Search, Volume2, Sparkles, Filter, BookOpen } from 'lucide-react';
import { DICTIONARY_ENTRIES } from '../data/dictionaryData';
import { audioSynth } from '../utils/audioSynth';

export default function DictionaryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = ['Tous', 'Salutations', 'Famille', 'Nourriture', 'Quotidien', 'Culture'];

  const filteredEntries = DICTIONARY_ENTRIES.filter((entry) => {
    const matchesCategory = selectedCategory === 'Tous' || entry.category === selectedCategory;
    const matchesSearch = 
      entry.fon.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.example && entry.example.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-28 md:pb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-600 font-extrabold uppercase tracking-wider text-xs mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Lexique Bilingue Officiel</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
          Dictionnaire Fɔngbè - Français
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Recherchez un mot, écoutez sa prononciation audio et découvrez des exemples concrets du quotidien béninois.
        </p>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm mb-6 space-y-4">
        {/* Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher en fon ou en français (ex: bonjour, sin, wɔ̌)..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-purple-500 focus:bg-white rounded-2xl outline-hidden text-sm font-bold text-slate-800 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-duo-purple'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
        <span>{filteredEntries.length} mots trouvés</span>
        <span>Alphabet National ALNb</span>
      </div>

      {/* Dictionary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredEntries.map((entry, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-purple-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-display font-black text-xl text-slate-900">
                    {entry.fon}
                  </h4>
                  <p className="text-sm font-bold text-purple-700">
                    {entry.fr}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    audioSynth.playPop();
                    audioSynth.speak(entry.fon);
                  }}
                  className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors shrink-0 active:scale-95 shadow-xs"
                  title="Écouter la prononciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {entry.example && (
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                    Exemple en contexte
                  </span>
                  <p className="text-xs text-slate-700 font-medium italic">
                    « {entry.example} »
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold">
              <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                {entry.category}
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
                ton {entry.tone}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8">
          <div className="text-4xl mb-2">🔍</div>
          <h4 className="font-display font-bold text-slate-700 text-lg">Aucun mot trouvé</h4>
          <p className="text-xs text-slate-400 mt-1">
            Essayez de chercher avec un autre mot ou sélectionnez la catégorie "Tous".
          </p>
        </div>
      )}
    </div>
  );
}
