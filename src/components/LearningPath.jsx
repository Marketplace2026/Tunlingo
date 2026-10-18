import React from 'react';
import { 
  Star, 
  BookOpen, 
  Trophy, 
  Check, 
  Lock, 
  BookMarked,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { COURSE_UNITS } from '../data/courseData';
import { audioSynth } from '../utils/audioSynth';

export default function LearningPath({ onStartLesson, onOpenGuidebook, completedLessons }) {
  // Compute horizontal alignment offsets for the classic winding S-curve
  const getOffsetClass = (index) => {
    const cycle = index % 4;
    switch (cycle) {
      case 0: return 'translate-x-0';
      case 1: return 'translate-x-8 sm:translate-x-12';
      case 2: return 'translate-x-0';
      case 3: return '-translate-x-8 sm:-translate-x-12';
      default: return 'translate-x-0';
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 pb-28 md:pb-12">
      {COURSE_UNITS.map((unit, unitIdx) => {
        return (
          <div key={unit.id} className="mb-14">
            {/* Unit Header Banner */}
            <div className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-r ${unit.color} text-white shadow-lg mb-10 relative overflow-hidden border-2 border-white/20`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-widest mb-1">
                    <span>Unité {unit.unitNumber}</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                    {unit.title}
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm mt-0.5 max-w-md">
                    {unit.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    audioSynth.playPop();
                    onOpenGuidebook(unit);
                  }}
                  className="self-start sm:self-auto flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all border border-white/30 shadow-xs shrink-0"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>Cahier de cours</span>
                </button>
              </div>

              {/* Decorative subtle emblem */}
              <div className="absolute -right-4 -bottom-6 text-white/10 text-8xl font-black select-none pointer-events-none">
                0{unit.unitNumber}
              </div>
            </div>

            {/* Stepping Stones / Lesson Nodes Path */}
            <div className="flex flex-col items-center gap-7 relative">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                // First lesson is unlocked by default, or previous one is completed
                const isCurrent = !isCompleted && (
                  lessonIdx === 0 && unitIdx === 0 || 
                  (lessonIdx > 0 && completedLessons.includes(unit.lessons[lessonIdx - 1].id)) ||
                  (lessonIdx === 0 && unitIdx > 0 && completedLessons.includes(COURSE_UNITS[unitIdx - 1].lessons.slice(-1)[0].id))
                );
                const isLocked = !isCompleted && !isCurrent;
                const offsetClass = getOffsetClass(lessonIdx);

                return (
                  <div key={lesson.id} className={`flex flex-col items-center relative transition-transform ${offsetClass}`}>
                    {/* Speech bubble tooltip for the current next lesson */}
                    {isCurrent && (
                      <div className="absolute -top-11 bg-white text-emerald-600 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-2xl shadow-md border-2 border-emerald-500 animate-bounce flex items-center gap-1.5 z-20">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>COMMENCER !</span>
                        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-emerald-500" />
                      </div>
                    )}

                    {/* Circular Lesson Node */}
                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        audioSynth.playPop();
                        onStartLesson(lesson);
                      }}
                      className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-amber-400 hover:bg-amber-500 text-white shadow-duo-yellow hover:scale-105'
                          : isCurrent
                          ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-duo-green hover:scale-105 ring-4 ring-emerald-200'
                          : 'bg-slate-200 text-slate-400 shadow-duo-gray cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-9 h-9 stroke-[3]" />
                      ) : isCurrent ? (
                        <Star className="w-9 h-9 fill-white" />
                      ) : (
                        <Lock className="w-7 h-7" />
                      )}

                      {/* Small badge for XP */}
                      <span className="absolute -bottom-2 bg-white text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-200 shadow-xs">
                        +{lesson.totalXp} XP
                      </span>
                    </button>

                    {/* Lesson Label */}
                    <span className="text-xs font-bold text-slate-700 mt-3 text-center max-w-[140px]">
                      {lesson.title}
                    </span>
                  </div>
                );
              })}

              {/* Unit Trophy Chest checkpoint at the end of the unit */}
              <div className="mt-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm hover:scale-105 transition-transform cursor-pointer" title="Coffre de récompense">
                  🎁
                </div>
                <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider mt-1">
                  Coffre de Dantokpa
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
