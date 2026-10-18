import React, { useState, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  FolderDown, 
  Sparkles,
  Info,
  Volume2
} from 'lucide-react';
import { RECORDING_ITEMS } from '../data/recordingList';
import { audioSynth } from '../utils/audioSynth';

export default function AudioStudio() {
  const [recordings, setRecordings] = useState({}); // { [id]: { blob, url, duration } }
  const [activeRecordingId, setActiveRecordingId] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingId, setPlayingId] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // Start recording
  const startRecording = async (item) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings(prev => ({
          ...prev,
          [item.id]: { blob: audioBlob, url: audioUrl }
        }));
        // Stop stream tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setActiveRecordingId(item.id);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } catch (err) {
      alert("Accès au microphone requis : Veuillez autoriser le microphone dans votre navigateur.");
      console.error("Mic error:", err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerIntervalRef.current);
    setActiveRecordingId(null);
    audioSynth.playPop();
  };

  // Playback recorded audio
  const playRecordedAudio = (itemId, url) => {
    setPlayingId(itemId);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => setPlayingId(null);
  };

  // Download recorded file with the exact required name
  const downloadAudioFile = (item) => {
    const record = recordings[item.id];
    if (!record) return;

    const a = document.createElement('a');
    a.href = record.url;
    a.download = item.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    audioSynth.playSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-28 md:pb-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-rose-600 font-extrabold uppercase tracking-wider text-xs mb-1">
          <Mic className="w-4 h-4" />
          <span>Studio Locuteurs Natifs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
          Enregistrement des Voix Fɔn Officielles
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          Donnez la parole aux locuteurs natifs ! Enregistrez chaque mot avec l'intonation juste, écoutez le résultat puis téléchargez le fichier audio prêt à intégrer.
        </p>
      </div>

      {/* Guide Box */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-3xl p-6 shadow-md mb-8 border-2 border-white/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0">
            🎙️
          </div>
          <div>
            <h3 className="font-display font-black text-lg">
              Comment fonctionne le protocole d'enregistrement ?
            </h3>
            <ol className="text-xs sm:text-sm text-white/90 space-y-1.5 mt-2 list-decimal list-inside font-medium">
              <li>Demandez au locuteur natif de prononcer clairement le mot avec son ton naturel.</li>
              <li>Cliquez sur <strong className="text-white">« Enregistrer »</strong>, prononcez le mot, puis cliquez sur <strong className="text-white">« Stop »</strong>.</li>
              <li>Cliquez sur <strong className="text-white">« Écouter »</strong> pour valider avec le locuteur.</li>
              <li>Cliquez sur <strong className="text-white">« Télécharger »</strong> : le fichier est automatiquement nommé (ex: <code className="bg-black/20 px-1 rounded">ku_do.mp3</code>).</li>
              <li>Déplacez simplement les fichiers téléchargés dans le dossier : <code className="bg-black/30 px-1.5 py-0.5 rounded font-mono text-xs">public/audio/</code>. L'application les jouera automatiquement !</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Recording Items List */}
      <div className="space-y-4">
        {RECORDING_ITEMS.map((item) => {
          const isRecording = activeRecordingId === item.id;
          const hasRecording = Boolean(recordings[item.id]);
          const isPlaying = playingId === item.id;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all shadow-sm ${
                isRecording 
                  ? 'border-rose-500 bg-rose-50/40 ring-4 ring-rose-100' 
                  : hasRecording
                  ? 'border-emerald-300'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Word info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      Fichier : {item.filename}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <h3 className="text-2xl font-display font-black text-slate-900">
                      {item.fon}
                    </h3>
                    <span className="text-sm font-bold text-slate-500">
                      ({item.fr})
                    </span>
                  </div>

                  <div className="text-xs text-amber-700 font-semibold mt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Conseil de ton : {item.toneTip}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {/* Record Button */}
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={() => startRecording(item)}
                      className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold rounded-xl shadow-duo-red active:translate-y-0.5 flex items-center gap-1.5 text-xs uppercase tracking-wider transition-all"
                    >
                      <Mic className="w-4 h-4" />
                      <span>{hasRecording ? 'Ré-enregistrer' : 'Enregistrer'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-sm active:translate-y-0.5 flex items-center gap-2 text-xs uppercase tracking-wider animate-pulse transition-all"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      <span>Arrêter ({recordingSeconds}s)</span>
                    </button>
                  )}

                  {/* Playback preview */}
                  {hasRecording && (
                    <button
                      type="button"
                      disabled={isRecording}
                      onClick={() => playRecordedAudio(item.id, recordings[item.id].url)}
                      className="w-10 h-10 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-300 flex items-center justify-center transition-all shadow-xs"
                      title="Écouter l'enregistrement"
                    >
                      <Play className={`w-4 h-4 ${isPlaying ? 'fill-emerald-700' : ''}`} />
                    </button>
                  )}

                  {/* Download Audio file */}
                  {hasRecording && (
                    <button
                      type="button"
                      onClick={() => downloadAudioFile(item)}
                      className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-duo-blue active:translate-y-0.5 flex items-center gap-1.5 text-xs uppercase tracking-wider transition-all"
                      title="Télécharger le fichier MP3"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Télécharger</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
