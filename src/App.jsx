import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import LearningPath from './components/LearningPath';
import SoundsExplorer from './components/SoundsExplorer';
import DictionaryView from './components/DictionaryView';
import LeaderboardView from './components/LeaderboardView';
import ShopView from './components/ShopView';
import LessonEngine from './components/LessonEngine';
import GuidebookModal from './components/GuidebookModal';
import AudioStudio from './components/AudioStudio';

export default function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeGuidebook, setActiveGuidebook] = useState(null);

  // User Gamification Stats (loaded from localStorage with safe defaults)
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('fonlinguo_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      hearts: 5,
      streak: 3,
      cauris: 450,
      xp: 85,
      completedLessons: ['u1-l1'] // First lesson completed to show initial progress
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('fonlinguo_stats', JSON.stringify(stats));
  }, [stats]);

  // Handle lesson start
  const handleStartLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  // Handle lesson completion
  const handleCompleteLesson = (earnedXp) => {
    setStats((prev) => {
      const isAlreadyCompleted = prev.completedLessons.includes(activeLesson.id);
      return {
        ...prev,
        xp: prev.xp + earnedXp,
        cauris: prev.cauris + 30, // reward 30 cauris per completed lesson
        streak: isAlreadyCompleted ? prev.streak : prev.streak + 1,
        completedLessons: isAlreadyCompleted
          ? prev.completedLessons
          : [...prev.completedLessons, activeLesson.id]
      };
    });
  };

  // Handle losing a heart
  const handleLoseHeart = () => {
    setStats((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  // Shop actions
  const handleRefillHearts = (cost) => {
    setStats((prev) => ({
      ...prev,
      hearts: 5,
      cauris: Math.max(0, prev.cauris - cost)
    }));
  };

  const handleBuyItem = (cost) => {
    setStats((prev) => ({
      ...prev,
      cauris: Math.max(0, prev.cauris - cost)
    }));
  };

  return (
    <div className="min-h-screen flex bg-[#f7f7f7] font-sans antialiased text-slate-800">
      {/* Left Sidebar (Desktop) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header with Stats */}
        <Header 
          stats={stats} 
          onOpenShop={() => setActiveTab('shop')} 
        />

        {/* Tab Views */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'learn' && (
            <LearningPath
              onStartLesson={handleStartLesson}
              onOpenGuidebook={(unit) => setActiveGuidebook(unit)}
              completedLessons={stats.completedLessons}
            />
          )}

          {activeTab === 'sounds' && <SoundsExplorer />}

          {activeTab === 'dict' && <DictionaryView />}

          {activeTab === 'leaderboard' && (
            <LeaderboardView userXp={stats.xp} />
          )}

          {activeTab === 'shop' && (
            <ShopView
              stats={stats}
              onRefillHearts={handleRefillHearts}
              onBuyItem={handleBuyItem}
            />
          )}

          {activeTab === 'studio' && <AudioStudio />}
        </div>

        {/* Bottom Nav (Mobile) */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Fullscreen Interactive Lesson Engine Modal */}
      {activeLesson && (
        <LessonEngine
          lesson={activeLesson}
          hearts={stats.hearts}
          onClose={() => setActiveLesson(null)}
          onComplete={handleCompleteLesson}
          onLoseHeart={handleLoseHeart}
        />
      )}

      {/* Guidebook Modal */}
      {activeGuidebook && (
        <GuidebookModal
          unit={activeGuidebook}
          onClose={() => setActiveGuidebook(null)}
        />
      )}
    </div>
  );
}
