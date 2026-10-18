import React from 'react';
import { 
  Compass, 
  Volume2, 
  BookOpen, 
  Trophy, 
  ShoppingBag, 
  Award,
  Sparkles,
  Info,
  Mic
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'learn', label: 'Apprendre', icon: Compass, color: 'text-emerald-500' },
    { id: 'sounds', label: 'Sons & Tons', icon: Volume2, color: 'text-blue-500' },
    { id: 'dict', label: 'Dictionnaire', icon: BookOpen, color: 'text-purple-500' },
    { id: 'leaderboard', label: 'Classement', icon: Trophy, color: 'text-amber-500' },
    { id: 'shop', label: 'Boutique', icon: ShoppingBag, color: 'text-rose-500' },
    { id: 'studio', label: 'Studio Voix', icon: Mic, color: 'text-rose-600' },
  ];

  const handleSelect = (id) => {
    audioSynth.playPop();
    setActiveTab(id);
  };

  return (
    <aside className="w-64 border-r-2 border-slate-200 bg-white min-h-screen p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4 cursor-pointer" onClick={() => handleSelect('learn')}>
          <div className="w-11 h-11 bg-gradient-to-tr from-emerald-600 to-green-500 rounded-2xl flex items-center justify-center shadow-duo-green text-2xl">
            🐆
          </div>
          <div>
            <h1 className="font-display text-2xl font-black text-emerald-600 tracking-tight leading-none">
              KÚ DƆ́
            </h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Fɔngbè du Bénin
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-500 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mascot Card Banner */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200 rounded-3xl p-4 text-center relative overflow-hidden">
        <div className="text-4xl mb-1 animate-soft-bounce">🐆</div>
        <h4 className="font-display font-bold text-slate-800 text-sm">
          Agassou vous encourage !
        </h4>
        <p className="text-xs text-slate-600 mt-1 italic">
          « Alǒgbledonu wɛ nɔ gblɔn gbè » (C'est par la pratique qu'on maîtrise la langue).
        </p>
        <div className="mt-3">
          <span className="inline-block bg-white text-emerald-700 font-black text-[11px] px-3 py-1 rounded-full border border-emerald-300 shadow-xs">
            Bénin Culture
          </span>
        </div>
      </div>
    </aside>
  );
}
