import { useState, useEffect } from "react";
import { Users, Server, Clock, Zap, HardDrive, Globe } from "lucide-react";
import { api, type ServerInfo } from "@/lib/api";

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
  return `${h}h ${m}m`;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchStatus = async () => {
    try {
      const data = await api.server();
      setStatus(data);
      setLastUpdated(new Date());
    } catch {
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = status !== null;

  return (
    <section
      id="status"
      className="py-24 bg-[#0a0a0f] relative z-10 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Live Status
          </h2>
          <p className="text-gray-400">Real-time connection details</p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600" />

          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-1/3 mx-auto" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-24 bg-white/5 rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Status header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
                    {isOnline && (
                      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isOnline ? "Server is Online" : "Server is Offline"}
                  </h3>
                </div>

                {isOnline && status && (
                  <div className="bg-black/50 px-4 py-2 rounded border border-white/5 font-mono text-sm text-gray-300">
                    v{status.version?.split(" ")[0] ?? status.version}
                  </div>
                )}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <Users className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Players</div>
                    <div className="text-xl font-bold text-white" data-testid="text-players-count">
                      {isOnline ? `${status!.onlinePlayers} / ${status!.maxPlayers}` : "0 / 0"}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <Zap className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">TPS</div>
                    <div className="text-xl font-bold text-white" data-testid="text-server-tps">
                      {isOnline ? `${status!.tps["1m"].toFixed(1)}` : "—"}
                    </div>
                    {isOnline && (
                      <div className="text-xs text-gray-500">5m: {status!.tps["5m"].toFixed(1)}</div>
                    )}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <Server className="w-8 h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Uptime</div>
                    <div className="text-xl font-bold text-white" data-testid="text-server-version">
                      {isOnline ? formatUptime(status!.uptimeSeconds) : "—"}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <HardDrive className="w-8 h-8 text-green-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Memory</div>
                    <div className="text-xl font-bold text-white">
                      {isOnline ? `${status!.memory.usedMb}` : "—"}
                      {isOnline && <span className="text-gray-500 text-sm"> / {status!.memory.maxMb} MB</span>}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <Clock className="w-8 h-8 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-400">Last Checked</div>
                    <div className="text-sm font-bold text-white" data-testid="text-last-updated">
                      {lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {isOnline && status && (
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                    <Globe className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-400">Worlds</div>
                      <div className="text-sm font-bold text-white">
                        {status.worlds.filter(w => w.players > 0).map(w => `${w.name} (${w.players})`).join(", ") || "—"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
