import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Heart, 
  Volume2, 
  Check, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import FonKeyboard from './FonKeyboard';

export default function LessonEngine({ lesson, onClose, onComplete, onLoseHeart, hearts }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [wordBankSelected, setWordBankSelected] = useState([]);
  const [wordBankAvailable, setWordBankAvailable] = useState([]);
  
  // Matching pairs state
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedFonPair, setSelectedFonPair] = useState(null);
  const [selectedFrPair, setSelectedFrPair] = useState(null);

  // Verification state
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect'
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const currentQ = lesson.questions[currentIdx];
  const progressPercent = Math.round((currentIdx / lesson.questions.length) * 100);

  // Initialize question state
  useEffect(() => {
    setStatus('idle');
    setSelectedChoice(null);
    setTypedAnswer('');
    setSelectedFonPair(null);
    setSelectedFrPair(null);
    setMatchedPairs([]);

    if (currentQ?.type === 'wordbank') {
      // Shuffle available words
      const shuffled = [...currentQ.words].sort(() => Math.random() - 0.5);
      setWordBankAvailable(shuffled);
      setWordBankSelected([]);
    }

    if (currentQ?.audio) {
      audioSynth.speak(currentQ.audio);
    }
  }, [currentIdx, currentQ]);

  // Handle word bank interaction
  const handleWordBankSelect = (word, index) => {
    audioSynth.playPop();
    setWordBankSelected([...wordBankSelected, { word, originalIdx: index }]);
    setWordBankAvailable(wordBankAvailable.filter((_, i) => i !== index));
  };

  const handleWordBankDeselect = (selectedItem, selectedIdx) => {
    audioSynth.playPop();
    setWordBankSelected(wordBankSelected.filter((_, i) => i !== selectedIdx));
    setWordBankAvailable([...wordBankAvailable, selectedItem.word]);
  };

  // Handle Pairs Matching
  const handleFonPairClick = (fon) => {
    if (matchedPairs.some(p => p.fon === fon)) return;
    audioSynth.playPop();
    setSelectedFonPair(fon);
    if (selectedFrPair) {
      checkPair(fon, selectedFrPair);
    }
  };

  const handleFrPairClick = (fr) => {
    if (matchedPairs.some(p => p.fr === fr)) return;
    audioSynth.playPop();
    setSelectedFrPair(fr);
    if (selectedFonPair) {
      checkPair(selectedFonPair, fr);
    }
  };

  const checkPair = (fon, fr) => {
    const isMatch = currentQ.pairs.some(p => p.fon === fon && p.fr === fr);
    if (isMatch) {
      audioSynth.playSuccess();
      setMatchedPairs([...matchedPairs, { fon, fr }]);
      setSelectedFonPair(null);
      setSelectedFrPair(null);
    } else {
      audioSynth.playError();
      setSelectedFonPair(null);
      setSelectedFrPair(null);
    }
  };

  // Verify answer
  const handleVerify = () => {
    if (status !== 'idle') return;

    let isCorrect = false;

    if (currentQ.type === 'choice') {
      const selected = currentQ.options.find(opt => opt.text === selectedChoice);
      isCorrect = selected?.correct || false;
    } else if (currentQ.type === 'pairs') {
      isCorrect = matchedPairs.length === currentQ.pairs.length;
    } else if (currentQ.type === 'wordbank') {
      const constructed = wordBankSelected.map(w => w.word);
      isCorrect = JSON.stringify(constructed) === JSON.stringify(currentQ.correctOrder);
    } else if (currentQ.type === 'listen_type') {
      const cleanUser = typedAnswer.trim().toLowerCase();
      isCorrect = currentQ.acceptedAnswers.some(ans => ans.toLowerCase() === cleanUser);
    }

    if (isCorrect) {
      audioSynth.playSuccess();
      setStatus('correct');
      setEarnedXp(prev => prev + Math.round(lesson.totalXp / lesson.questions.length));
    } else {
      audioSynth.playError();
      setStatus('incorrect');
      setMistakes(prev => prev + 1);
      onLoseHeart();
    }
  };

  // Advance to next question or complete
  const handleContinue = () => {
    if (status === 'incorrect' && hearts <= 0) {
      return; // Handled by out of hearts screen
    }

    if (currentIdx + 1 < lesson.questions.length) {
      setCurrentIdx(prev => prev + 1);
      setStatus('idle');
    } else {
      // Victory!
      setIsCompleted(true);
      audioSynth.playVictory();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      onComplete(lesson.totalXp);
    }
  };

  // Keyboard shortcut for Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (status === 'idle') {
          handleVerify();
        } else {
          handleContinue();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, selectedChoice, typedAnswer, wordBankSelected, matchedPairs]);

  // Out of hearts modal
  if (hearts <= 0 && status === 'incorrect') {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
        <div className="text-6xl mb-4 animate-bounce">💔</div>
        <h2 className="text-3xl font-display font-black text-rose-500 mb-2">
          Plus de vies !
        </h2>
        <p className="text-slate-600 max-w-md text-sm mb-6">
          Prenez une pause pour que vos cœurs se rechargent, ou faites un tour dans la boutique pour obtenir des vies avec vos cauris.
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold rounded-2xl shadow-duo-gray uppercase tracking-wider text-sm"
        >
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  // Victory celebration screen
  if (isCompleted) {
    const accuracy = Math.max(50, Math.round(((lesson.questions.length - mistakes) / lesson.questions.length) * 100));
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-md my-auto text-center">
          <div className="text-8xl mb-4 animate-bounce">👑</div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-amber-500 mb-2">
            Leçon Terminée !
          </h1>
          <p className="text-slate-500 font-bold mb-8">
            « Kú dɔ́ ! » Vous maîtrisez de nouveaux mots en Fon !
          </p>

          {/* Stats summary cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 flex flex-col items-center shadow-sm">
              <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">Total XP</span>
              <div className="flex items-center gap-1.5 text-2xl font-black text-amber-500 mt-1">
                <Zap className="w-6 h-6 fill-amber-400" />
                <span>+{lesson.totalXp}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-4 flex flex-col items-center shadow-sm">
              <span className="text-xs uppercase font-extrabold text-emerald-600 tracking-wider">Précision</span>
              <div className="flex items-center gap-1 text-2xl font-black text-emerald-600 mt-1">
                <Sparkles className="w-6 h-6" />
                <span>{accuracy}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <button
            onClick={onClose}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 active:translate-y-1 text-white font-black rounded-2xl shadow-duo-green transition-all uppercase tracking-wider text-base"
          >
            Continuer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between">
      {/* Top Header bar */}
      <div className="px-4 py-3 sm:py-4 border-b border-slate-100 flex items-center gap-4 max-w-4xl mx-auto w-full">
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-xl transition-colors"
          title="Quitter la leçon"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 bg-slate-200 h-4 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts indicator */}
        <div className="flex items-center gap-1.5 text-rose-500 font-black text-base">
          <Heart className="w-6 h-6 fill-rose-500" />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Exercise Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full flex flex-col justify-center">
        {/* Instruction Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-800">
            {currentQ.instruction}
          </h2>
          {currentQ.fonSentence && (
            <div className="flex items-center gap-3 mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => audioSynth.speak(currentQ.fonSentence)}
                className="w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-duo-green shrink-0 transition-transform active:scale-95"
                title="Écouter"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <div className="text-xl font-bold font-display text-slate-900">
                {currentQ.fonSentence}
              </div>
            </div>
          )}
        </div>

        {/* Question Type: Matching Pairs */}
        {currentQ.type === 'pairs' && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto">
            {/* Fon Column */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fɔngbè</span>
              {currentQ.pairs.map((p) => {
                const isMatched = matchedPairs.some(mp => mp.fon === p.fon);
                const isSelected = selectedFonPair === p.fon;
                return (
                  <button
                    key={p.fon}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleFonPairClick(p.fon)}
                    className={`w-full p-4 rounded-2xl border-2 font-display text-base font-bold transition-all text-left flex items-center justify-between ${
                      isMatched
                        ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-duo-card hover:translate-y-[-2px]'
                    }`}
                  >
                    <span>{p.fon}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        audioSynth.speak(p.fon);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-emerald-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </button>
                );
              })}
            </div>

            {/* French Column */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Français</span>
              {currentQ.pairs.map((p) => {
                const isMatched = matchedPairs.some(mp => mp.fr === p.fr);
                const isSelected = selectedFrPair === p.fr;
                return (
                  <button
                    key={p.fr}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleFrPairClick(p.fr)}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all text-left ${
                      isMatched
                        ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-duo-card hover:translate-y-[-2px]'
                    }`}
                  >
                    {p.fr}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Question Type: Multiple Choice */}
        {currentQ.type === 'choice' && (
          <div className="space-y-3 my-auto">
            {currentQ.options.map((option) => {
              const isSelected = selectedChoice === option.text;
              return (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => {
                    audioSynth.playPop();
                    setSelectedChoice(option.text);
                    if (option.audio) audioSynth.speak(option.audio);
                  }}
                  className={`w-full p-4 sm:p-5 rounded-2xl border-2 font-bold text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-duo-card hover:translate-y-[-2px]'
                  }`}
                >
                  <span className="text-base sm:text-lg font-display">{option.text}</span>
                  {option.audio && (
                    <Volume2 className="w-5 h-5 text-slate-400 hover:text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Question Type: Word Bank */}
        {currentQ.type === 'wordbank' && (
          <div className="my-auto space-y-6">
            {/* Selected words line */}
            <div className="min-h-[64px] border-b-2 border-slate-300 p-2 flex flex-wrap gap-2 items-center">
              {wordBankSelected.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleWordBankDeselect(item, idx)}
                  className="bg-white border-2 border-emerald-400 text-emerald-800 font-bold px-4 py-2 rounded-xl shadow-xs hover:bg-emerald-50 text-base"
                >
                  {item.word}
                </button>
              ))}
            </div>

            {/* Available words pool */}
            <div className="flex flex-wrap gap-2.5 justify-center pt-4">
              {wordBankAvailable.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleWordBankSelect(word, idx)}
                  className="bg-white border-2 border-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-2xl shadow-duo-card hover:border-slate-300 active:translate-y-1 text-base transition-all"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question Type: Listen & Type */}
        {currentQ.type === 'listen_type' && (
          <div className="my-auto space-y-4">
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={() => audioSynth.speak(currentQ.audioPrompt)}
                className="w-20 h-20 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-duo-blue active:scale-95 transition-transform"
                title="Écouter le mot"
              >
                <Volume2 className="w-10 h-10" />
              </button>
            </div>

            <div className="text-center text-xs font-semibold text-slate-400">
              Astuce : « {currentQ.translation} » ({currentQ.phonetic})
            </div>

            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Écrivez ce que vous entendez en Fon..."
              className="w-full text-center text-xl font-display font-bold p-4 bg-slate-50 border-2 border-slate-300 focus:border-emerald-500 focus:bg-white rounded-2xl outline-hidden transition-all shadow-inner"
            />

            {/* Virtual Fon Keyboard */}
            <FonKeyboard
              onInsert={(char) => setTypedAnswer(prev => prev + char)}
              onDelete={() => setTypedAnswer(prev => prev.slice(0, -1))}
            />
          </div>
        )}
      </main>

      {/* Bottom Sheet Action Bar */}
      <footer className={`p-4 border-t-2 transition-colors ${
        status === 'correct' 
          ? 'bg-emerald-100 border-emerald-300' 
          : status === 'incorrect' 
          ? 'bg-rose-100 border-rose-300' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Message */}
          <div className="w-full sm:w-auto">
            {status === 'correct' && (
              <div className="flex items-center gap-3 text-emerald-800">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg">C'est exact ! Bravo !</h4>
                  {currentQ.explanation && (
                    <p className="text-xs text-emerald-700 mt-0.5">{currentQ.explanation}</p>
                  )}
                </div>
              </div>
            )}

            {status === 'incorrect' && (
              <div className="flex items-center gap-3 text-rose-800">
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg">Oups, ce n'est pas tout à fait ça !</h4>
                  <p className="text-xs text-rose-700 mt-0.5">
                    {currentQ.explanation || 'Faites attention aux intonations et aux lettres spécifiques du Fon.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto">
            {status === 'idle' ? (
              <button
                type="button"
                onClick={handleVerify}
                className="w-full sm:w-48 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:translate-y-0.5 text-white font-extrabold rounded-2xl shadow-duo-green transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
              >
                <span>Vérifier</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                className={`w-full sm:w-48 py-3.5 text-white font-extrabold rounded-2xl transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2 ${
                  status === 'correct'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-duo-green'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-duo-red'
                }`}
              >
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
