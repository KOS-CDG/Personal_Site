import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../App';

export default function MusicPlayer() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [attemptedAutoplay, setAttemptedAutoplay] = useState(false);

  // Visible in all modes — each mode has its own audio indicator style
  const visible = true;

  useEffect(() => {
    const audio = new Audio('/music.mp4');
    audio.loop = true;
    audio.volume = 0.22;
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setReady(true));
    audio.load();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Attempt autoplay when navy mode activates
  useEffect(() => {
    if (!visible || !ready || attemptedAutoplay) return;
    setAttemptedAutoplay(true);

    const tryPlay = async () => {
      try {
        await audioRef.current?.play();
        setPlaying(true);
      } catch {
        // Browser blocked autoplay — user must click to start
        setPlaying(false);
      }
    };

    // Small delay to let page settle
    const timer = setTimeout(tryPlay, 800);
    return () => clearTimeout(timer);
  }, [visible, ready, attemptedAutoplay]);

  // Pause audio when leaving navy mode
  useEffect(() => {
    if (!visible && playing) {
      audioRef.current?.pause();
      setPlaying(false);
      setAttemptedAutoplay(false);
    }
  }, [visible, playing]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`music-player${!visible ? ' music-player--hidden' : ''}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="region"
          aria-label="Background music controls"
        >
          {/* Play/Pause button */}
          <button
            className="music-player__btn"
            onClick={toggle}
            aria-label={playing ? 'Pause music' : 'Play music'}
            title={playing ? 'Pause' : 'Play ambient music'}
          >
            {playing ? (
              // Pause icon
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="2.5" y="1.5" width="3" height="9" rx="1" fill="currentColor"/>
                <rect x="6.5" y="1.5" width="3" height="9" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              // Play icon
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 1.5L10.5 6 3 10.5V1.5Z" fill="currentColor"/>
              </svg>
            )}
          </button>

          {/* Track info */}
          <div className="music-player__info">
            <span className="music-player__label">Ambient</span>
            <span className="music-player__track">Background Score</span>
          </div>

          {/* Equalizer bars */}
          <div className={`music-player__eq${!playing ? ' music-player__eq--paused' : ''}`} aria-hidden="true">
            <span className="music-player__eq-bar" />
            <span className="music-player__eq-bar" />
            <span className="music-player__eq-bar" />
            <span className="music-player__eq-bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
