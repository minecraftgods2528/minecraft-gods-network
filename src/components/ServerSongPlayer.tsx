import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function ServerSongPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const songPath = `${import.meta.env.BASE_URL}server-song.mp4`;

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
    <div className="fixed left-4 top-4 z-[100]">
      <audio ref={audioRef} src={songPath} preload="metadata" onEnded={() => setIsPlaying(false)} />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause server song' : 'Play server song'}
        title={isPlaying ? 'Pause server song' : 'Play server song'}
        className="flex h-11 items-center gap-2 rounded-full border border-white/25 bg-black/90 px-4 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-black focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
        <span>{isPlaying ? 'Pause song' : 'Play song'}</span>
      </button>
    </div>
  );
}
