# 🇧🇯 KÚ DƆ́ - Plateforme d'Apprentissage du Fon (Fɔngbè)

Une application web interactive et gamifiée conçue sur le modèle de **Duolingo**, spécialement adaptée à la **langue Fon du Bénin** et à son alphabet national officiel (ALNb).

---

## 🌟 Fonctionnalités Implémentées

1. **Arbre d'Apprentissage (Learning Path façon Duolingo)** :
   - Parcours par paliers avec nœuds circulaires animés (Validé 🥇, En cours ⭐, Verrouillé 🔒).
   - Coffres de récompenses et bannières d'unités culturelles béninoises.
   - **Cahier de cours** pour chaque unité détaillant les règles de grammaire et les civilités.
   - Mascotte nationale : **Agassou la panthère royale**.

2. **Moteur d'Exercices Interactifs (`LessonEngine`)** :
   - **Association de paires** (Fɔngbè ↔ Français) avec audio.
   - **QCM immersif** avec synthèse vocale et explications culturelles.
   - **Banque de mots** (Word Bank) : assemblage dynamique de phrases en glisser/cliquer.
   - **Dictée & Clavier virtuel Fon in-app** intégrant les caractères spéciaux de l'ALNb (`ɖ`, `ɛ`, `ɔ`, `gb`, `kp`, `ny`, `xw`, `hw`, et les accents tonals).
   - **Retour immédiat (Bottom Sheet)** : validation avec son de succès / buzzer d'erreur.
   - **Écran de victoire avec pluie de confettis**, calcul de précision, gain d'XP et mise à jour de la série.

3. **Laboratoire des Sons & Tons (`SoundsExplorer`)** :
   - Simulateur interactif de hauteur des tons (Ton Haut, Ton Bas, Ton Moyen, Ton Montant, Ton Descendant) via l'API Web Audio (synthétiseur de fréquences en temps réel).
   - Découverte des consonnes labio-vélaires (`gb`, `kp`) et voyelles nasales (`an`, `on`, `in`, `ɛn`, `un`).

4. **Dictionnaire Bilingue Fon - Français (`DictionaryView`)** :
   - Recherche textuelle instantanée.
   - Filtres par thèmes : Salutations, Famille, Nourriture, Quotidien, Culture.
   - Bouton d'écoute audio et exemples en contexte.

5. **Ligues & Classements Béninois (`LeaderboardView`)** :
   - Ligue Royale d'Abomey, Ligue Porto-Novo, Ligue Ouidah.
   - Podium animé (Top 3) et zone de promotion.

6. **Boutique aux Cauris (`ShopView`)** :
   - Monnaie traditionnelle : Les **Cauris (Kpévi)**.
   - Recharge de vies (❤️), Gel de série (❄️), et costumes royaux pour Agassou.

---

## 🚀 Lancement en Local

Le serveur de développement est actuellement en ligne :
👉 **http://localhost:3000**

Pour relancer l'application manuellement à tout moment :
```bash
# 1. Accéder au dossier
cd c:\Users\hp\Desktop\LANGUE

# 2. Lancer le serveur Vite
npm run dev
```

---

## 🏗️ Architecture du Projet

```
LANGUE/
├── index.html                   # Entrée HTML avec polices Nunito/Fredoka et styles
├── package.json                 # Dépendances (React, Lucide, Canvas-Confetti, Vite)
├── vite.config.js               # Configuration du bundler Vite
├── src/
│   ├── main.jsx                 # Point de montage React
│   ├── App.jsx                  # Orchestrateur d'état & navigation
│   ├── components/
│   │   ├── Header.jsx           # Barre de statistiques (Flammes, Cauris, Vies, XP)
│   │   ├── Sidebar.jsx          # Menu latéral façon Duolingo (Desktop)
│   │   ├── BottomNav.jsx        # Navigation mobile réactive
│   │   ├── LearningPath.jsx     # Arbre de compétences sinueux
│   │   ├── LessonEngine.jsx     # Moteur complet d'exercices & confettis
│   │   ├── FonKeyboard.jsx      # Clavier virtuel ALNb (ɖ, ɛ, ɔ, gb, kp, tons)
│   │   ├── GuidebookModal.jsx   # Cahier de cours de chaque unité
│   │   ├── SoundsExplorer.jsx   # Laboratoire phonétique & simulateur de tons
│   │   ├── DictionaryView.jsx   # Dictionnaire bilingue interactif avec audio
│   │   ├── LeaderboardView.jsx  # Classements & Ligues de la semaine
│   │   └── ShopView.jsx         # Marché aux cauris & personnalisation
│   ├── data/
│   │   ├── courseData.js        # Cursus pédagogique, questions & unités
│   │   ├── alphabetData.js      # Alphabet ALNb, tons et voyelles nasales
│   │   └── dictionaryData.js    # Base lexicale Fon-Français
│   └── utils/
│       └── audioSynth.js        # Synthétiseur sonore (effets sonores & tons)
```
