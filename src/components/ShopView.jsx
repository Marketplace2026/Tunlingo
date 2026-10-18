import React, { useState } from 'react';
import { ShoppingBag, Heart, Shield, Sparkles, Check, AlertCircle } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function ShopView({ stats, onRefillHearts, onBuyItem }) {
  const [notification, setNotification] = useState(null);

  const shopItems = [
    {
      id: 'hearts_refill',
      title: 'Recharge Complète de Vies',
      description: 'Récupérez instantanément vos 5 cœurs pour continuer à vous exercer sans attendre.',
      icon: '❤️',
      price: 300,
      action: () => {
        if (stats.cauris >= 300) {
          onRefillHearts(300);
          audioSynth.playSuccess();
          showNotification('Vos 5 vies ont été rechargées avec succès !', 'success');
        } else {
          audioSynth.playError();
          showNotification('Vous n\'avez pas assez de Cauris pour cet achat.', 'error');
        }
      }
    },
    {
      id: 'streak_freeze',
      title: 'Gel de Série (Bouclier)',
      description: 'Protège votre série de flammes 🔥 si vous manquez un jour d\'apprentissage.',
      icon: '❄️',
      price: 200,
      action: () => {
        if (stats.cauris >= 200) {
          onBuyItem(200);
          audioSynth.playSuccess();
          showNotification('Bouclier de série activé pour 48 heures !', 'success');
        } else {
          audioSynth.playError();
          showNotification('Pas assez de Cauris.', 'error');
        }
      }
    },
    {
      id: 'royal_tunic',
      title: 'Tunique Royale d\'Abomey',
      description: 'Habillez Agassou de la prestigieuse tenue royale en tissu traditionnel Kanvo.',
      icon: '👑',
      price: 500,
      action: () => {
        if (stats.cauris >= 500) {
          onBuyItem(500);
          audioSynth.playVictory();
          showNotification('Tenue Royale débloquée pour la mascotte Agassou !', 'success');
        } else {
          audioSynth.playError();
          showNotification('Pas assez de Cauris.', 'error');
        }
      }
    },
    {
      id: 'offline_pack',
      title: 'Pack Audio Hors-ligne Bénin',
      description: 'Téléchargez les voix des locuteurs natifs pour pratiquer même sans connexion internet.',
      icon: '📦',
      price: 150,
      action: () => {
        if (stats.cauris >= 150) {
          onBuyItem(150);
          audioSynth.playSuccess();
          showNotification('Pack hors-ligne téléchargé avec succès dans le cache !', 'success');
        } else {
          audioSynth.playError();
          showNotification('Pas assez de Cauris.', 'error');
        }
      }
    }
  ];

  const showNotification = (msg, type) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 pb-28 md:pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden border-2 border-white/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl border border-white/30 shadow-md">
              🐚
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black">
                Marché aux Cauris (Boutique)
              </h2>
              <p className="text-white/90 text-xs sm:text-sm mt-0.5">
                Dépensez vos coquillages gagnés lors des leçons pour débloquer des bonus utiles.
              </p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xs px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/30 shrink-0">
            <span className="text-xl">🐚</span>
            <span className="font-display font-black text-lg">{stats.cauris} Cauris</span>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl mb-6 flex items-center gap-3 transition-all animate-in fade-in ${
          notification.type === 'success' 
            ? 'bg-emerald-100 border border-emerald-300 text-emerald-800' 
            : 'bg-rose-100 border border-rose-300 text-rose-800'
        }`}>
          {notification.type === 'success' ? (
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-bold">{notification.msg}</span>
        </div>
      )}

      {/* Shop Items List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-rose-300 transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{item.icon}</span>
                <span className="flex items-center gap-1 font-display font-black text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  <span>🐚</span>
                  <span>{item.price}</span>
                </span>
              </div>

              <h4 className="font-display font-black text-lg text-slate-800">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={item.action}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 active:translate-y-0.5 text-white font-extrabold rounded-xl transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Acheter avec Cauris</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
