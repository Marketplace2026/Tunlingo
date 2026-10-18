// Fon Language Course Data (Curriculum)
export const COURSE_UNITS = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "Les Bases & Salutations",
    subtitle: "Apprenez les civilités et salutations fondamentales du Bénin",
    color: "from-emerald-500 to-green-600",
    badgeColor: "bg-emerald-600",
    accentColor: "#059669",
    guidebook: {
      title: "Cahier de cours : Les Salutations en Fon",
      content: `
### 👑 La Politesse au Bénin
En milieu fon, saluer n'est pas une simple formalité, c'est une marque profonde de respect et de bénédiction.

* **Kú dɔ́** : Bonjour (littéralement : *« Félicitations pour la nuit passée / le lever »*)
* **Kú àbɔ̀** : Bienvenue !
* **Kú hwè** : Bon après-midi (salutation du milieu de journée)
* **Kú gbàɖá** : Bonsoir (fin d'après-midi / tombée de la nuit)
* **À ɖe gangji à ?** : Comment vas-tu ? (Es-tu en bonne santé ?)
* **Un ɖe gangji** : Je vais bien !

### 💡 Règle de prononciation
* **ɖ** : Se prononce comme un "d" rétroflexe (langue pointée vers le palais).
* **ɔ** : Se prononce comme un "o" ouvert (comme dans le mot français *porte*).
* **gb** et **kp** : Sont des consonnes labio-vélaires prononcées d'un seul bloc sans séparer les lettres.
      `
    },
    lessons: [
      {
        id: "u1-l1",
        title: "Saluer quelqu'un",
        totalXp: 15,
        type: "star",
        questions: [
          {
            id: "q1",
            type: "pairs",
            instruction: "Associez les paires de mots",
            pairs: [
              { fon: "Kú dɔ́", fr: "Bonjour" },
              { fon: "Kú àbɔ̀", fr: "Bienvenue" },
              { fon: "Gangji", fr: "Bien / En paix" },
              { fon: "Wá", fr: "Viens" }
            ]
          },
          {
            id: "q2",
            type: "choice",
            instruction: "Comment dit-on « Bonjour » en Fon ?",
            fonPrompt: "Bonjour",
            options: [
              { text: "Kú dɔ́", correct: true, audio: "Kú dɔ́" },
              { text: "Kú gbàɖá", correct: false, audio: "Kú gbàɖá" },
              { text: "Nǔɖe", correct: false, audio: "Nǔɖe" },
              { text: "Ényí", correct: false, audio: "Ényí" }
            ],
            explanation: "« Kú dɔ́ » est la salutation matinale la plus courante pour dire bonjour."
          },
          {
            id: "q3",
            type: "wordbank",
            instruction: "Traduisez cette phrase en français",
            fonSentence: "À ɖe gangji à ?",
            translation: "Comment vas-tu ?",
            audio: "À ɖe gangji à ?",
            words: ["Comment", "vas-tu", "Bonjour", "très", "merci", "oui"],
            correctOrder: ["Comment", "vas-tu"]
          },
          {
            id: "q4",
            type: "listen_type",
            instruction: "Écoutez et écrivez en Fon (utilisez le clavier virtuel si besoin)",
            audioPrompt: "Kú àbɔ̀",
            phonetic: "Kou abɔ̀",
            acceptedAnswers: ["Kú àbɔ̀", "Ku abɔ", "Ku abɔ̀", "Kú abɔ̀", "Ku abo"],
            translation: "Bienvenue !"
          },
          {
            id: "q5",
            type: "choice",
            instruction: "Que répondez-vous à « À ɖe gangji à ? »",
            fonPrompt: "À ɖe gangji à ?",
            options: [
              { text: "Un ɖe gangji (Je vais bien)", correct: true, audio: "Un ɖe gangji" },
              { text: "Kú dɔ́ (Bonjour)", correct: false, audio: "Kú dɔ́" },
              { text: "Wá fǐ (Viens ici)", correct: false, audio: "Wá fǐ" }
            ],
            explanation: "« Un ɖe gangji » signifie littéralement « Je suis en paix / Je vais bien »."
          }
        ]
      },
      {
        id: "u1-l2",
        title: "Se présenter",
        totalXp: 15,
        type: "book",
        questions: [
          {
            id: "q2-1",
            type: "pairs",
            instruction: "Associez les mots correspondants",
            pairs: [
              { fon: "Un nyí", fr: "Je suis / Je m'appelle" },
              { fon: "Nyikɔ ce", fr: "Mon nom" },
              { fon: "Nyɛ", fr: "Moi" },
              { fon: "Hwɛ", fr: "Toi" }
            ]
          },
          {
            id: "q2-2",
            type: "wordbank",
            instruction: "Formez la phrase en Fon : « Je m'appelle Koffi »",
            fonSentence: "Un nyí Koffi",
            translation: "Je m'appelle Koffi",
            audio: "Un nyí Koffi",
            words: ["Un", "nyí", "Koffi", "Hwɛ", "gangji", "nyikɔ"],
            correctOrder: ["Un", "nyí", "Koffi"]
          },
          {
            id: "q2-3",
            type: "choice",
            instruction: "Que signifie « É nyí xɔ́ntɔn ce » ?",
            fonPrompt: "É nyí xɔ́ntɔn ce",
            options: [
              { text: "C'est mon ami(e)", correct: true, audio: "É nyí xɔ́ntɔn ce" },
              { text: "C'est mon père", correct: false, audio: "Tɔ́ ce wɛ" },
              { text: "Je pars au marché", correct: false, audio: "Un xwe axi mɛ" }
            ],
            explanation: "« Xɔ́ntɔn » signifie ami ou amie en Fon."
          }
        ]
      },
      {
        id: "u1-l3",
        title: "Remercier & Dire au revoir",
        totalXp: 20,
        type: "trophy",
        questions: [
          {
            id: "q3-1",
            type: "pairs",
            instruction: "Associez les formules de courtoisie",
            pairs: [
              { fon: "Ahouan", fr: "Non" },
              { fon: "Éɛ", fr: "Oui" },
              { fon: "A bɔnú", fr: "S'il te plaît" },
              { fon: "A ɖɔ nǔ", fr: "Merci (Tu as bien parlé)" }
            ]
          },
          {
            id: "q3-2",
            type: "choice",
            instruction: "Comment dit-on « À demain / À bientôt » ?",
            fonPrompt: "À demain / Au revoir",
            options: [
              { text: "Mǐ ná mɔ mǐɖée (On se reverra)", correct: true, audio: "Mǐ ná mɔ mǐɖée" },
              { text: "Kú dɔ́", correct: false, audio: "Kú dɔ́" },
              { text: "Wá nǔɖu", correct: false, audio: "Wá nǔɖu" }
            ],
            explanation: "« Mǐ ná mɔ mǐɖée » exprime l'espérance de se revoir très bientôt !"
          }
        ]
      }
    ]
  },
  {
    id: "unit-2",
    unitNumber: 2,
    title: "Mets & Boissons du Terroir",
    subtitle: "Dégustez la gastronomie béninoise et apprenez à commander",
    color: "from-amber-500 to-yellow-600",
    badgeColor: "bg-amber-600",
    accentColor: "#d97706",
    guidebook: {
      title: "Cahier de cours : La Table Béninoise",
      content: `
### 🍲 La Nourriture en Fon
Manger se dit **Nǔɖuɖu** (la nourriture) ou **ɖù nǔ** (manger quelque chose).

* **Sin** : Eau
* **Wɔ̌** : Pâte (pâte de maïs blanche ou amiwɔ)
* **Nǔsúnnú** : Sauce
* **Hwevǐ** : Poisson
* **Làn** : Viande
* **Àtásí** : Riz et haricots mélangés
* **Wá nǔɖu** : Viens manger ! (Invitation traditionnelle d'hospitalité)
      `
    },
    lessons: [
      {
        id: "u2-l1",
        title: "L'eau et la nourriture",
        totalXp: 15,
        type: "star",
        questions: [
          {
            id: "q21-1",
            type: "pairs",
            instruction: "Associez les mots alimentaires",
            pairs: [
              { fon: "Sin", fr: "Eau" },
              { fon: "Wɔ̌", fr: "Pâte de maïs" },
              { fon: "Làn", fr: "Viande" },
              { fon: "Hwevǐ", fr: "Poisson" }
            ]
          },
          {
            id: "q21-2",
            type: "choice",
            instruction: "Comment dit-on « Donne-moi de l'eau » ?",
            fonPrompt: "Donne-moi de l'eau",
            options: [
              { text: "Ná mì sin", correct: true, audio: "Ná mì sin" },
              { text: "Wá fǐ", correct: false, audio: "Wá fǐ" },
              { text: "Un ɖù nǔ", correct: false, audio: "Un ɖù nǔ" }
            ],
            explanation: "« Ná mì » signifie « donne-moi » et « sin » signifie « eau »."
          },
          {
            id: "q21-3",
            type: "wordbank",
            instruction: "Formez la phrase : « Viens manger »",
            fonSentence: "Wá nǔɖu",
            translation: "Viens manger",
            audio: "Wá nǔɖu",
            words: ["Wá", "nǔɖu", "sin", "ná", "gangji"],
            correctOrder: ["Wá", "nǔɖu"]
          }
        ]
      },
      {
        id: "u2-l2",
        title: "Avoir faim et soif",
        totalXp: 15,
        type: "book",
        questions: [
          {
            id: "q22-1",
            type: "choice",
            instruction: "Comment exprime-t-on « J'ai faim » en Fon ?",
            fonPrompt: "J'ai faim",
            options: [
              { text: "Hɔvɛ ɖò mì wù (La faim me tient)", correct: true, audio: "Hɔvɛ ɖò mì wù" },
              { text: "Un ɖò zɔ (Je suis loin)", correct: false, audio: "Un ɖò zɔ" },
              { text: "Kú dɔ́", correct: false, audio: "Kú dɔ́" }
            ],
            explanation: "« Hɔvɛ » est la faim, et l'expression idiomatique signifie « la faim est sur moi »."
          }
        ]
      }
    ]
  },
  {
    id: "unit-3",
    unitNumber: 3,
    title: "Au Grand Marché de Dantokpa",
    subtitle: "Compter l'argent, demander les prix et marchander",
    color: "from-red-500 to-rose-600",
    badgeColor: "bg-red-600",
    accentColor: "#e11d48",
    guidebook: {
      title: "Cahier de cours : Négocier en Fon",
      content: `
### 🪙 L'Argent et les Chiffres
* **Akpɔ́** : Argent
* **Nàbí wɛ ?** : C'est combien ?
* **Vɛ́ dǐn** : C'est trop cher !
* **Ðe kpò ná mì** : Diminue un peu pour moi !
* **Ðokpó** : 1
* **Wè** : 2
* **Atɔn** : 3
* **Ɛnɛ** : 4
* **Atɔ́ɔ́n** : 5
      `
    },
    lessons: [
      {
        id: "u3-l1",
        title: "Compter de 1 à 5",
        totalXp: 20,
        type: "star",
        questions: [
          {
            id: "q31-1",
            type: "pairs",
            instruction: "Associez les chiffres",
            pairs: [
              { fon: "Ðokpó", fr: "Un (1)" },
              { fon: "Wè", fr: "Deux (2)" },
              { fon: "Atɔn", fr: "Trois (3)" },
              { fon: "Atɔ́ɔ́n", fr: "Cinq (5)" }
            ]
          },
          {
            id: "q31-2",
            type: "choice",
            instruction: "Quelle est la phrase magique pour marchander ?",
            fonPrompt: "Diminue le prix pour moi !",
            options: [
              { text: "Ðe kpò ná mì", correct: true, audio: "Ðe kpò ná mì" },
              { text: "Kú dɔ́ kaka", correct: false, audio: "Kú dɔ́ kaka" },
              { text: "Un kɔ", correct: false, audio: "Un kɔ" }
            ],
            explanation: "« Ðe kpò ná mì » est la formule reine sur tous les marchés du Bénin."
          }
        ]
      }
    ]
  }
];
