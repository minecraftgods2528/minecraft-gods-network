import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";

interface PlayerSearchBoxProps {
  className?: string;
  autoFocus?: boolean;
  initialValue?: string;
}

export default function PlayerSearchBox({
  className = "",
  autoFocus = false,
  initialValue = "",
}: PlayerSearchBoxProps) {
  const [username, setUsername] = useState(initialValue);
  const [, navigate] = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    // Send the exact username to API — including leading dot for Bedrock players
    navigate(`/player/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Minecraft username…"
            autoFocus={autoFocus}
            autoComplete="off"
            spellCheck={false}
            className="
              w-full pl-12 pr-4 py-4
              bg-black/40 border border-white/10
              text-white placeholder-gray-500
              rounded-xl text-base font-medium
              focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20
              transition-all
            "
          />
        </div>
        <button
          type="submit"
          disabled={!username.trim()}
          className="
            px-6 py-4
            bg-purple-600 hover:bg-purple-500 disabled:bg-white/10 disabled:text-gray-600
            text-white font-semibold rounded-xl
            transition-all shadow-lg hover:shadow-purple-500/30
            whitespace-nowrap
          "
        >
          Search Player
        </button>
      </form>

      {/* Bedrock note */}
      <p className="mt-3 text-xs text-gray-500 flex items-start gap-1.5">
        <span className="text-amber-400 flex-shrink-0">📱</span>
        <span>
          <span className="text-amber-400 font-medium">Bedrock players:</span>{" "}
          Add{" "}
          <span className="text-white font-mono bg-white/5 px-1 rounded">.&nbsp;</span>{" "}
          (dot) before your username to search.{" "}
          <span className="text-gray-400">Example: .Player1246</span>
        </span>
      </p>
    </div>
  );
}
