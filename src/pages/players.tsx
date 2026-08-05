import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Users, Wifi, WifiOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerSearchBox from "@/components/PlayerSearchBox";
import {
  api, avatarUrl, formatLeaderboardValue, LEADERBOARD_TABS,
  type PlayerStats, type LeaderboardMetric, type LeaderboardResponse,
} from "@/lib/api";

const REFRESH_INTERVAL = 20;

// ─── Leaderboard ──────────────────────────────────────────────────────────────

function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState<LeaderboardMetric>("money");
  const [cache, setCache] = useState<Partial<Record<LeaderboardMetric, LeaderboardResponse>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTab = useCallback(async (metric: LeaderboardMetric) => {
    if (cache[metric]) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.leaderboard(metric);
      setCache((prev) => ({ ...prev, [metric]: data }));
    } catch {
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  }, [cache]);

  useEffect(() => { fetchTab(activeTab); }, [activeTab]); // eslint-disable-line

  const current = cache[activeTab];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">🏆 Leaderboards</h2>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {LEADERBOARD_TABS.map(({ metric, label, icon }) => (
          <button
            key={metric}
            onClick={() => setActiveTab(metric)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === metric
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600" />

        {loading && !current && (
          <div className="divide-y divide-white/5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
                <div className="w-6 h-4 bg-white/10 rounded" />
                <div className="w-8 h-8 bg-white/10 rounded-lg" />
                <div className="h-4 bg-white/10 rounded w-32" />
                <div className="ml-auto h-4 bg-white/10 rounded w-20" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-gray-500">{error}</div>
        )}

        {current && (
          <div className="divide-y divide-white/5">
            {current.entries.slice(0, 10).map((entry) => (
              <LeaderboardRow
                key={entry.uuid}
                entry={entry}
                metric={activeTab}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LeaderboardRow({
  entry,
  metric,
}: {
  entry: { rank: number; username: string; uuid: string; value: number };
  metric: LeaderboardMetric;
}) {
  const [, navigate] = useLocation();
  const isBedrockUUID = entry.uuid?.startsWith("00000000-0000-0000-0009");
  const avatarSrc = isBedrockUUID
    ? `https://mc-heads.net/avatar/${entry.username.replace(/^\./, "")}/32`
    : `https://crafatar.com/avatars/${entry.uuid}?size=32&overlay`;

  const rankColor =
    entry.rank === 1 ? "text-yellow-400" :
    entry.rank === 2 ? "text-gray-300" :
    entry.rank === 3 ? "text-amber-600" :
    "text-gray-500";

  return (
    <button
      onClick={() => navigate(`/player/${encodeURIComponent(entry.username)}`)}
      className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors text-left group"
    >
      <span className={`text-sm font-bold w-6 text-center flex-shrink-0 ${rankColor}`}>
        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
      </span>
      <img
        src={avatarSrc}
        alt={entry.username}
        className="w-8 h-8 rounded-lg flex-shrink-0"
        onError={(e) => { (e.target as HTMLImageElement).src = "https://mc-heads.net/avatar/steve/32"; }}
      />
      <span className="text-gray-200 group-hover:text-white font-medium transition-colors truncate">
        {entry.username}
      </span>
      <span className="ml-auto text-purple-400 font-semibold text-sm flex-shrink-0">
        {formatLeaderboardValue(metric, entry.value)}
      </span>
    </button>
  );
}

// ─── Player Card ──────────────────────────────────────────────────────────────

function PlayerCard({ player }: { player: PlayerStats }) {
  const [, navigate] = useLocation();
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={() => navigate(`/player/${encodeURIComponent(player.username)}`)}
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-green-500/30 hover:bg-green-900/10 transition-all group cursor-pointer w-full"
    >
      <div className="relative">
        <img
          src={avatarUrl(player, 56)}
          alt={player.username}
          className="w-14 h-14 rounded-xl shadow-lg"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://mc-heads.net/avatar/steve/56"; }}
        />
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0a0f] ${player.afk ? "bg-yellow-400" : "bg-green-500"}`} />
      </div>
      <span className="text-sm text-gray-300 group-hover:text-white font-medium text-center break-all transition-colors leading-tight">
        {player.username}
      </span>
      {player.afk && (
        <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full -mt-1">AFK</span>
      )}
    </motion.button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PlayersPage() {
  const [data, setData] = useState<{ count: number; players: PlayerStats[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fetchPlayers = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const json = await api.players();
      setData(json);
      setServerOnline(true);
      setLastUpdated(new Date());
      setCountdown(REFRESH_INTERVAL);
    } catch {
      setServerOnline(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
    const iv = setInterval(fetchPlayers, REFRESH_INTERVAL * 1000);
    return () => clearInterval(iv);
  }, [fetchPlayers]);

  useEffect(() => {
    const t = setInterval(() => setCountdown((p) => (p <= 1 ? REFRESH_INTERVAL : p - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const players = data?.players ?? [];
  const playerCount = data?.count ?? 0;

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-foreground font-sans">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Players</h1>
            <p className="text-gray-400">Search players, watch who's online, explore leaderboards</p>
          </div>

          {/* Search box */}
          <div className="mb-12">
            <PlayerSearchBox autoFocus={false} />
          </div>

          {/* ── Live Players ── */}
          <h2 className="text-2xl font-serif font-bold text-white mb-5">🟢 Online Now</h2>

          {/* Stats bar */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${serverOnline ? "bg-green-500" : "bg-red-500"}`} />
                  {serverOnline && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />}
                </div>
                {serverOnline !== false ? (
                  <Wifi className="w-5 h-5 text-green-400" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <span className="text-white font-bold text-2xl">{playerCount}</span>
                  <span className="text-gray-400 text-sm ml-1">players online</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {lastUpdated && (
                  <span className="text-gray-500 text-xs hidden sm:block">
                    Updated {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <circle
                      cx="10" cy="10" r="8" fill="none" stroke="#22c55e" strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 8}`}
                      strokeDashoffset={`${2 * Math.PI * 8 * (1 - countdown / REFRESH_INTERVAL)}`}
                      strokeLinecap="round" className="transition-all duration-1000"
                    />
                  </svg>
                  <span className="text-gray-400 text-xs">{countdown}s</span>
                </div>
                <button
                  onClick={() => fetchPlayers(true)}
                  disabled={refreshing}
                  className="text-gray-500 hover:text-white transition-colors disabled:opacity-40"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Player grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3">
                  <div className="w-14 h-14 bg-white/10 rounded-xl" />
                  <div className="h-3 bg-white/10 rounded w-16" />
                </div>
              ))}
            </div>
          ) : players.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400">No players online right now</p>
              <p className="text-gray-600 text-sm mt-1">Be the first — join <span className="font-mono text-white">minecraftgods.wammuhost.fun:26089</span></p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {players.map((p) => <PlayerCard key={p.uuid} player={p} />)}
              </div>
            </AnimatePresence>
          )}

          {/* Leaderboards */}
          <LeaderboardSection />

        </div>
      </main>

      <Footer />
    </div>
  );
}
