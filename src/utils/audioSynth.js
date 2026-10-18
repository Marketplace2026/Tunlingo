// Audio Synthesizer & Native Audio Player with fallback
const NATIVE_AUDIO_MAP = {
  "kú dɔ́": "/audio/ku_do.mp3",
  "kú àbɔ̀": "/audio/ku_abo.mp3",
  "kú hwè": "/audio/ku_hwe.mp3",
  "kú gbàɖá": "/audio/ku_gbada.mp3",
  "à ɖe gangji à ?": "/audio/ade_gangji_a.mp3",
  "à ɖe gangji à": "/audio/ade_gangji_a.mp3",
  "un ɖe gangji": "/audio/un_de_gangji.mp3",
  "wá": "/audio/wa.mp3",
  "gangji": "/audio/gangji.mp3",
  "un nyí": "/audio/un_nyi.mp3",
  "a ɖɔ nǔ": "/audio/a_do_nu.mp3",
  "mǐ ná mɔ mǐɖée": "/audio/mi_na_mo_midee.mp3",
  "sin": "/audio/sin.mp3",
  "wɔ̌": "/audio/wo.mp3",
  "làn": "/audio/lan.mp3",
  "hwevǐ": "/audio/hwevi.mp3",
  "ná mì sin": "/audio/na_mi_sin.mp3",
  "wá nǔɖu": "/audio/wa_nudu.mp3",
  "ɖokpó": "/audio/dopo.mp3",
  "wè": "/audio/we.mp3",
  "atɔn": "/audio/aton.mp3",
  "ɛnɛ": "/audio/ene.mp3",
  "atɔ́ɔ́n": "/audio/atoon.mp3",
  "ɖe kpò ná mì": "/audio/de_kpo_na_mi.mp3",
  "dɔ́": "/audio/do_dire.mp3",
  "dɔ": "/audio/do_dormir.mp3",
  "dò": "/audio/do_trou.mp3"
};

class AudioPlayer {
  constructor() {
    this.ctx = null;
    this.currentAudio = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play Duolingo-like success chime
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.08);
      osc1.frequency.setValueAtTime(783.99, now + 0.16);
      osc1.frequency.setValueAtTime(1046.50, now + 0.24);

      osc2.frequency.setValueAtTime(1046.50, now + 0.24);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.24);
      osc1.stop(now + 0.7);
      osc2.stop(now + 0.7);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  // Play Duolingo-like error buzzer
  playError() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(140, now + 0.15);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  // Play click / pop sound
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  // Play victory fanfare
  playVictory() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const notes = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.15 },
        { f: 783.99, d: 0.15, t: 0.30 },
        { f: 1046.50, d: 0.50, t: 0.45 },
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.25, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  // Play specific linguistic tone
  playTone(toneType) {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      gain.gain.setValueAtTime(0.2, now);

      if (toneType === 'high') {
        osc.frequency.setValueAtTime(440, now);
      } else if (toneType === 'low') {
        osc.frequency.setValueAtTime(240, now);
      } else if (toneType === 'rising') {
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      } else if (toneType === 'falling') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.4);
      } else {
        osc.frequency.setValueAtTime(330, now);
      }

      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  // Smart Speech / Playback: Tries Native Human Audio first, then synthetic fallback
  speak(text, explicitFile = null) {
    this.playPop();

    const normalized = text ? text.trim().toLowerCase() : '';
    const audioSrc = explicitFile || NATIVE_AUDIO_MAP[normalized];

    if (audioSrc) {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }

      const audio = new Audio(audioSrc);
      this.currentAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Native audio played successfully!
          })
          .catch(() => {
            // File not yet recorded or not found in /public/audio, use synthetic fallback
            this.fallbackSpeech(text);
          });
        return;
      }
    }

    this.fallbackSpeech(text);
  }

  fallbackSpeech(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const audioSynth = new AudioPlayer();
