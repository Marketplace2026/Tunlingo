import React from 'react';
import { Flame, Heart, Zap, Volume2, Shield } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function Header({ stats, onOpenShop }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 px-4 py-2.5 flex items-center justify-between">
      {/* Current language pill */}
      <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors px-3 py-1.5 rounded-2xl border border-slate-200">
        <span className="text-xl leading-none">🇧🇯</span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fɔngbè (Bénin)</span>
          <span className="text-[10px] text-slate-500 font-semibold">Niveau Débutant A1</span>
        </div>
      </div>

      {/* Gamification Stats */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Streak */}
        <div 
          title="Série de jours consécutifs"
          className="flex items-center gap-1.5 font-extrabold text-orange-500 hover:scale-105 transition-transform cursor-pointer"
        >
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-orange-500 text-orange-500 animate-pulse" />
          <span className="text-sm sm:text-base">{stats.streak}</span>
        </div>

        {/* Cauris / Gems */}
        <div 
          onClick={onOpenShop}
          title="Cauris (Kpévi) - Monnaie béninoise"
          className="flex items-center gap-1.5 font-extrabold text-blue-500 hover:scale-105 transition-transform cursor-pointer"
        >
          <span className="text-lg">🐚</span>
          <span className="text-sm sm:text-base">{stats.cauris}</span>
        </div>

        {/* Hearts */}
        <div 
          onClick={onOpenShop}
          title="Vies restantes"
          className="flex items-center gap-1.5 font-extrabold text-rose-500 hover:scale-105 transition-transform cursor-pointer"
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 text-rose-500" />
          <span className="text-sm sm:text-base">{stats.hearts}</span>
        </div>

        {/* Total XP */}
        <div 
          title="Points d'expérience cumulés"
          className="flex items-center gap-1.5 font-extrabold text-amber-500 hidden sm:flex"
        >
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-500" />
          <span className="text-sm sm:text-base">{stats.xp} XP</span>
        </div>
      </div>
    </header>
  );
}
