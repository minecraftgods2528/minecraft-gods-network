import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Trophy, Skull, Swords, Clock, DollarSign, Pickaxe, Shield } from "lucide-react";
import { api, avatarUrl, formatPlaytime, formatMoney, type PlayerStats } from "@/lib/api";

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-purple-400",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
      <Icon className={`w-8 h-8 flex-shrink-0 ${color}`} />
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

export default function PlayerProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [, navigate] = useLocation();
  const [player, setPlayer] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!username) return;

    setLoading(true);
    setError(null);

    api
      .player(username)
      .then((data) => {
        setPlayer(data);
      })
      .catch((err) => {
        if (err.message?.includes("404") || err.message?.includes("not found")) {
          setError("Player not found");
        } else {
          setError("Failed to load player data");
        }
      })
      .finally(() => setLoading(false));
  }, [username]);

  const kd =
    player && player.deaths > 0
      ? (player.kills / player.deaths).toFixed(2)
      : player
      ? player.kills.toFixed(2)
      : "—";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/players")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Players
        </button>

        {loading && (
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl bg-white/10" />
              <div className="space-y-3 flex-1">
                <div className="h-8 bg-white/10 rounded w-1/3" />
                <div className="h-4 bg-white/5 rounded w-1/4" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-20 bg-white/5 rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">{error}</h2>
            <p className="text-gray-500">
              {error === "Player not found"
                ? `"${username}" hasn't joined the server yet.`
                : "Please try again in a moment."}
            </p>
          </div>
        )}

        {!loading && !error && player && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 flex items-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600" />
              <img
                src={avatarUrl(player, 96)}
                alt={player.username}
                className="w-24 h-24 rounded-xl shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://mc-heads.net/avatar/steve/96";
                }}
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{player.username}</h1>
                <p className="text-gray-400 text-sm mt-1">UUID: {player.uuid}</p>
                {player.online && (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Currently Online
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard icon={Swords} label="Kills" value={player.kills} color="text-red-400" />
              <StatCard icon={Skull} label="Deaths" value={player.deaths} color="text-gray-400" />
              <StatCard icon={Trophy} label="K/D Ratio" value={kd} color="text-yellow-400" />
              <StatCard
                icon={Clock}
                label="Playtime"
                value={formatPlaytime(player.totalPlaytimeSeconds)}
                color="text-blue-400"
              />
              <StatCard
                icon={DollarSign}
                label="Balance"
                value={formatMoney(player.money)}
                color="text-green-400"
              />
              <StatCard
                icon={Pickaxe}
                label="Mob Kills"
                value={player.mobKills}
                color="text-orange-400"
              />
              <StatCard
                icon={Shield}
                label="Claim Blocks"
                value={player.claimBlocks.toLocaleString()}
                color="text-cyan-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
