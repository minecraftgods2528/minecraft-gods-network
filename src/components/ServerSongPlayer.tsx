import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function ServerSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed left-3 top-3 z-50 sm:left-5 sm:top-5">
      <audio ref={audioRef} src="/server-song.mp4" preload="metadata" onEnded={() => setIsPlaying(false)} />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Stop server song' : 'Play server song'}
        title={isPlaying ? 'Stop server song' : 'Play server song'}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-black/85 focus:outline-none focus:ring-2 focus:ring-white/60 sm:h-11 sm:w-11"
      >
        {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
      </button>
    </div>
  );
}
