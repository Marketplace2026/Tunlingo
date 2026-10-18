import React from 'react';
import { Compass, Volume2, BookOpen, Trophy, ShoppingBag, Mic } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'learn', label: 'Apprendre', icon: Compass },
    { id: 'sounds', label: 'Sons', icon: Volume2 },
    { id: 'dict', label: 'Dico', icon: BookOpen },
    { id: 'leaderboard', label: 'Ligues', icon: Trophy },
    { id: 'shop', label: 'Boutique', icon: ShoppingBag },
    { id: 'studio', label: 'Studio', icon: Mic },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 py-2 px-3 flex justify-around items-center z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              audioSynth.playPop();
              setActiveTab(item.id);
            }}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-emerald-600 font-extrabold scale-105' : 'text-slate-400 font-bold'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
