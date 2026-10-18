import React from 'react';
import { Trophy, Medal, Sparkles, TrendingUp, Clock, Shield } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function LeaderboardView({ userXp }) {
  // Mock leaderboard ranking with Beninese flair
  const learners = [
    { rank: 1, name: "Sèna Dossou", avatar: "👩🏾‍🎓", xp: 480, league: "Ligue Royale d'Abomey", isUser: false },
    { rank: 2, name: "Mahugnon Bio", avatar: "👨🏾‍💼", xp: 420, league: "Ligue Royale d'Abomey", isUser: false },
    { rank: 3, name: "Ayaba Koudjo", avatar: "👩🏾‍🎨", xp: 395, league: "Ligue Royale d'Abomey", isUser: false },
    { rank: 4, name: "Vous (Apprenant)", avatar: "🐆", xp: Math.max(120, userXp), league: "Ligue Royale d'Abomey", isUser: true },
    { rank: 5, name: "Fagnon Houngbédji", avatar: "👨🏾‍💻", xp: 290, league: "Ligue Royale d'Abomey", isUser: false },
    { rank: 6, name: "Roland Agbidinoukoun", avatar: "🧑🏾‍🦱", xp: 245, league: "Ligue Royale d'Abomey", isUser: false },
    { rank: 7, name: "Blandine Adanlété", avatar: "👩🏾‍⚕️", xp: 210, league: "Ligue Royale d'Abomey", isUser: false },
    { rank: 8, name: "Koffi Mensah", avatar: "👨🏾‍🎓", xp: 180, league: "Ligue Royale d'Abomey", isUser: false },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 pb-28 md:pb-12">
      {/* League Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden border-2 border-white/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl border border-white/30 shadow-md">
              👑
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-white/80 font-extrabold text-xs uppercase tracking-widest mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Division Suprême</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black">
                Ligue Royale d'Abomey
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-0.5">
                Le top 3 accède au Panthéon des Orateurs du Danxomè !
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3.5 py-2 rounded-2xl text-xs font-bold border border-white/10 shrink-0">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Fin dans 2 j 14 h</span>
          </div>
        </div>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 items-end max-w-lg mx-auto text-center">
        {/* 2nd place */}
        {learners[1] && (
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">{learners[1].avatar}</span>
            <span className="text-xs font-bold text-slate-700 truncate max-w-[90px]">{learners[1].name}</span>
            <span className="text-[11px] font-black text-slate-500">{learners[1].xp} XP</span>
            <div className="w-full bg-slate-200 h-24 rounded-t-2xl flex items-center justify-center text-slate-500 font-black text-xl shadow-inner mt-2">
              🥈 2
            </div>
          </div>
        )}

        {/* 1st place */}
        {learners[0] && (
          <div className="flex flex-col items-center">
            <div className="relative">
              <span className="text-4xl">{learners[0].avatar}</span>
              <span className="absolute -top-3 -right-2 text-xl">👑</span>
            </div>
            <span className="text-xs font-black text-amber-700 truncate max-w-[100px] mt-1">{learners[0].name}</span>
            <span className="text-xs font-black text-amber-600">{learners[0].xp} XP</span>
            <div className="w-full bg-gradient-to-t from-amber-400 to-yellow-300 h-32 rounded-t-2xl flex items-center justify-center text-white font-black text-2xl shadow-duo-yellow mt-2">
              🥇 1
            </div>
          </div>
        )}

        {/* 3rd place */}
        {learners[2] && (
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">{learners[2].avatar}</span>
            <span className="text-xs font-bold text-slate-700 truncate max-w-[90px]">{learners[2].name}</span>
            <span className="text-[11px] font-black text-slate-500">{learners[2].xp} XP</span>
            <div className="w-full bg-amber-100 h-20 rounded-t-2xl flex items-center justify-center text-amber-700 font-black text-xl shadow-inner mt-2">
              🥉 3
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2 text-xs font-bold text-emerald-800">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Zone de Promotion : Les 3 premiers progressent en division supérieure !</span>
        </div>

        <div className="divide-y divide-slate-100">
          {learners.map((learner) => {
            const isTop3 = learner.rank <= 3;
            return (
              <div
                key={learner.rank}
                className={`p-4 flex items-center justify-between transition-colors ${
                  learner.isUser
                    ? 'bg-emerald-50/80 font-bold border-l-4 border-emerald-500'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Rank Badge */}
                  <span className={`w-8 text-center font-display font-black text-sm sm:text-base ${
                    learner.rank === 1 ? 'text-amber-500' :
                    learner.rank === 2 ? 'text-slate-400' :
                    learner.rank === 3 ? 'text-amber-700' : 'text-slate-400'
                  }`}>
                    {learner.rank}
                  </span>

                  {/* Avatar */}
                  <span className="text-2xl sm:text-3xl">{learner.avatar}</span>

                  {/* Learner Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm sm:text-base font-bold ${
                        learner.isUser ? 'text-emerald-800 font-black' : 'text-slate-800'
                      }`}>
                        {learner.name}
                      </span>
                      {learner.isUser && (
                        <span className="bg-emerald-200 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                          Vous
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold block">
                      Bénin • Apprenant régulier
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <span className="font-display font-black text-sm sm:text-base text-slate-800">
                    {learner.xp}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 block">XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
