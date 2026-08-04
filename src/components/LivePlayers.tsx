import { useState, useEffect } from "react";
import { Users, ChevronRight, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { api, avatarUrl, type PlayerStats } from "@/lib/api";

const REFRESH_INTERVAL = 20;

export default function LivePlayers() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const [, navigate] = useLocation();

  const fetchPlayers = async () => {
    try {
      const data = await api.players();
      setPlayers(data.players);
      setCount(data.count);
      setServerOnline(true);
    } catch {
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, []);

  const preview = players.slice(0, 6);

  return (
    <section className="py-24 bg-[#0a0a0f] relative z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Live Players
          </h2>
          <p className="text-gray-400">See who's online right now</p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600" />

          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/10 rounded w-1/4" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-10 bg-white/5 rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Count row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${serverOnline ? "bg-green-500" : "bg-red-500"}`} />
                    {serverOnline && (
                      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                    )}
                  </div>
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-white font-bold text-xl">
                    {count} Player{count !== 1 ? "s" : ""} Online
                  </span>
                </div>
                <button
                  onClick={fetchPlayers}
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Preview */}
              {count === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  No players online right now. Be the first to join!
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {preview.map((player) => (
                    <button
                      key={player.uuid}
                      onClick={() => navigate(`/player/${encodeURIComponent(player.username)}`)}
                      className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-2 hover:bg-white/10 hover:border-white/10 transition-all"
                    >
                      <img
                        src={avatarUrl(player, 24)}
                        alt={player.username}
                        className="w-6 h-6 rounded"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://mc-heads.net/avatar/steve/24";
                        }}
                      />
                      <span className="text-sm text-gray-200 font-medium truncate">{player.username}</span>
                    </button>
                  ))}
                  {players.length > 6 && (
                    <div className="flex items-center justify-center bg-white/5 border border-white/5 rounded-xl px-3 py-2">
                      <span className="text-sm text-gray-400">+{players.length - 6} more</span>
                    </div>
                  )}
                </div>
              )}

              {/* View all button */}
              <button
                onClick={() => navigate("/players")}
                className="w-full flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400 hover:text-green-300 py-3 rounded-xl font-semibold transition-all"
              >
                View Live Players
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
