import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMusic, FiPlay, FiPause, FiVolume2, FiVolumeX, FiX, FiSkipForward } from "react-icons/fi";

const tracks = [
  {
    title: "Coding Focus",
    artist: "Lo-Fi Beats",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
  {
    title: "Deep Work",
    artist: "Ambient",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_0e21b8b6f6.mp3",
  },
];

const MusicPlayer = () => {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  // Keep the element and the button in sync: the previous version flipped
  // `playing` even when the browser blocked playback, and a track change
  // silently stopped the audio instead of continuing it.
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  // Track the playing flag in a ref so the track-change effect below can resume
  // playback without depending on (and re-running for) the playing state.
  const playingRef = useRef(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    if (playingRef.current) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [currentTrack]);

  const nextTrack = () => setCurrentTrack((i) => (i + 1) % tracks.length);

  const toggleMute = () => {
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        loop={false}
        preload="none"
        onEnded={nextTrack}
        onError={() => setPlaying(false)}
      />

      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-8 z-40 w-12 h-12 rounded-full bg-[#060908] border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue hover:border-blue/50 transition-all shadow-2xl hover-trigger"
        whileTap={{ scale: 0.9 }}
      >
        <FiMusic size={16} />
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Player Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 right-8 z-40 w-72 bg-[#060908]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FiMusic size={12} className="text-blue" />
                <span className="text-slate-500 text-[10px] font-mono tracking-wider uppercase">Now Playing</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors hover-trigger">
                <FiX size={14} />
              </button>
            </div>

            {/* Track Info */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue to-purple flex items-center justify-center flex-shrink-0">
                  <motion.div
                    animate={playing ? { rotate: 360 } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <FiMusic size={20} className="text-white" />
                  </motion.div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{tracks[currentTrack].title}</p>
                  <p className="text-slate-500 text-xs truncate">{tracks[currentTrack].artist}</p>
                </div>
              </div>

              {/* Playing Animation Bars */}
              {playing && (
                <div className="flex items-end gap-1 h-6">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-blue rounded-full"
                      animate={{
                        height: [
                          `${20 + Math.random() * 40}%`,
                          `${20 + Math.random() * 80}%`,
                          `${20 + Math.random() * 40}%`,
                        ],
                      }}
                      transition={{
                        duration: 0.8 + Math.random() * 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full text-slate-400 hover:text-white transition-colors hover-trigger flex items-center justify-center"
              >
                {muted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-blue text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover-trigger"
              >
                {playing ? <FiPause size={18} /> : <FiPlay size={18} className="ml-0.5" />}
              </button>

              <button
                onClick={nextTrack}
                className="w-9 h-9 rounded-full text-slate-400 hover:text-white transition-colors hover-trigger flex items-center justify-center"
              >
                <FiSkipForward size={16} />
              </button>
            </div>

            {/* Track List */}
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-slate-500 text-[10px] font-mono tracking-wider mb-2 uppercase">Playlist</p>
              {tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTrack(i)}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors hover-trigger ${
                    i === currentTrack ? "text-blue" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {i + 1}. {track.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
