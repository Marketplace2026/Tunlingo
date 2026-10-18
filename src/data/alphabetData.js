// Fongbe Alphabet and Tones Data
export const FON_SPECIAL_LETTERS = [
  {
    char: "ɖ",
    upper: "Ɖ",
    name: "d rétroflexe",
    ipa: "[ɖ]",
    example: "ɖù (manger)",
    audioPitch: "low",
    description: "Se prononce en pointant le bout de la langue vers le haut du palais."
  },
  {
    char: "ɛ",
    upper: "Ɛ",
    name: "e ouvert",
    ipa: "[ɛ]",
    example: "hɛ̌n (tenir)",
    audioPitch: "mid",
    description: "Comme le 'è' français dans 'père' ou 'mer'."
  },
  {
    char: "ɔ",
    upper: "Ɔ",
    name: "o ouvert",
    ipa: "[ɔ]",
    example: "tɔ́ (père / fleuve)",
    audioPitch: "high",
    description: "Comme le 'o' français dans 'porte' ou 'bol'."
  },
  {
    char: "gb",
    upper: "GB",
    name: "consonne labio-vélaire sonore",
    ipa: "[ɡ͡b]",
    example: "gbè (langue / voix / jour)",
    audioPitch: "low",
    description: "Prononcez 'g' et 'b' simultanément d'un seul mouvement des lèvres."
  },
  {
    char: "kp",
    upper: "KP",
    name: "consonne labio-vélaire sourde",
    ipa: "[k͡p]",
    example: "kpóɖó (avec)",
    audioPitch: "high",
    description: "Prononcez 'k' et 'p' simultanément, son percutant typique des langues béninoises."
  },
  {
    char: "ny",
    upper: "NY",
    name: "nasale palatale",
    ipa: "[ɲ]",
    example: "nyí (être / s'appeler)",
    audioPitch: "high",
    description: "Identique au 'gn' français dans 'montagne' ou 'gagner'."
  },
  {
    char: "xw",
    upper: "XW",
    name: "fricative labio-vélaire sourde",
    ipa: "[xʷ]",
    example: "xwé (maison)",
    audioPitch: "high",
    description: "Son guttural soufflé combiné à un léger arrondissement des lèvres."
  },
  {
    char: "hw",
    upper: "HW",
    name: "fricative glottale labialisée",
    ipa: "[ɣʷ]",
    example: "hwè (soleil / heure)",
    audioPitch: "low",
    description: "Un 'h' aspiré doux suivi d'un léger 'w'."
  }
];

export const FON_TONES = [
  {
    id: "high",
    name: "Ton Haut (´)",
    symbol: "á, é, ɛ́, ó, ɔ́, ú",
    pitchType: "high",
    freqDesc: "Aigu (440 Hz)",
    example: "dɔ́ (dire)",
    meaning: "dire / parler",
    color: "bg-red-500 text-white"
  },
  {
    id: "low",
    name: "Ton Bas (`)",
    symbol: "à, è, ɛ̀, ò, ɔ̀, ù",
    pitchType: "low",
    freqDesc: "Grave (240 Hz)",
    example: "dò (trou / fosse)",
    meaning: "trou, fosse",
    color: "bg-blue-500 text-white"
  },
  {
    id: "mid",
    name: "Ton Moyen (-)",
    symbol: "a, e, ɛ, o, ɔ, u",
    pitchType: "mid",
    freqDesc: "Neutre (330 Hz)",
    example: "dɔ (dormir)",
    meaning: "dormir, passer la nuit",
    color: "bg-emerald-500 text-white"
  },
  {
    id: "rising",
    name: "Ton Montant (ˇ)",
    symbol: "ǎ, ě, ɛ̌, ǒ, ɔ̌, ǔ",
    pitchType: "rising",
    freqDesc: "Grave vers Aigu (↗)",
    example: "bǔ (disparaître)",
    meaning: "se perdre / s'évaporer",
    color: "bg-purple-500 text-white"
  },
  {
    id: "falling",
    name: "Ton Descendant (ˆ)",
    symbol: "â, ê, ɛ̂, ô, ɔ̂, û",
    pitchType: "falling",
    freqDesc: "Aigu vers Grave (↘)",
    example: "bâ (lézard)",
    meaning: "lézard margouillat",
    color: "bg-amber-500 text-white"
  }
];

export const FON_NASAL_VOWELS = [
  { pair: "an", sound: "am", example: "làn (viande)" },
  { pair: "on / ɔn", sound: "on", example: "xɔ́ntɔn (ami)" },
  { pair: "in", sound: "in", example: "sin (eau)" },
  { pair: "ɛn", sound: "ein", example: "hɛ̌n (tenir)" },
  { pair: "un", sound: "oum", example: "kúndé (témoin)" }
];
