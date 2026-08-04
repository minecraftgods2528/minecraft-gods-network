// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServerInfo {
  onlinePlayers: number;
  maxPlayers: number;
  version: string;
  bukkitVersion?: string;
  tps: { "1m": number; "5m": number; "15m": number };
  worlds: { name: string; players: number; time: number; weather: string }[];
  memory: { usedMb: number; maxMb: number };
  uptimeSeconds: number;
  lastUpdated: number;
}

export interface PlayerStats {
  uuid: string;
  username: string;
  online: boolean;
  nickname: string;
  afk: boolean;
  money: number;
  economyBalance: number;
  rank: string;
  prefix: string;
  suffix: string | null;
  claimBlocks: number;
  bonusClaimBlocks: number;
  remainingClaimBlocks: number;
  claimsOwned: number;
  totalPlaytimeSeconds: number;
  kills: number;
  deaths: number;
  mobKills: number;
  kdRatio: number;
  firstJoin: number;
  lastSeen: number;
  totalJoins: number;
  health: number;
  maxHealth: number;
  hunger: number;
  xpLevel: number;
  gamemode: string;
  world: string;
  ping: number;
  currentSessionSeconds: number;
  achievements: string[];
}

export interface PlayersResponse {
  count: number;
  players: PlayerStats[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  uuid: string;
  value: number;
}

export interface LeaderboardResponse {
  metric: string;
  entries: LeaderboardEntry[];
}

export type LeaderboardMetric =
  | "money"
  | "kills"
  | "deaths"
  | "kd"
  | "playtime"
  | "claimblocks"
  | "mobkills";

// ─── API Error ────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Fetch helper ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, timeoutMs = 8000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // Try backend API first (production), then direct API (dev)
    const backendUrl = `/api/mc${path}`;
    const directUrl = `${import.meta.env.VITE_API_BASE_URL || process.env.MGN_API_BASE_URL}${path}`;
    const token = import.meta.env.VITE_API_TOKEN || process.env.MGN_API_TOKEN;
    
    // Use direct API call with token in development/production
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const res = await fetch(directUrl, { 
      signal: controller.signal,
      headers,
      mode: 'cors'
    }).catch(() => 
      // Fallback to backend proxy
      fetch(backendUrl, { signal: controller.signal })
    );
    
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new ApiError(res.status, (body as { error?: string }).error ?? `HTTP ${res.status}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(503, "Connection failed");
  } finally {
    clearTimeout(timer);
  }
}

// ─── API object (replace only these calls when switching backend) ─────────────

export const api = {
  server: () => apiFetch<ServerInfo>("/server"),
  players: () => apiFetch<PlayersResponse>("/players"),
  player: (username: string) =>
    apiFetch<PlayerStats>(`/player/${encodeURIComponent(username)}`),
  leaderboard: (metric: LeaderboardMetric) =>
    apiFetch<LeaderboardResponse>(`/leaderboard/${metric}`),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function isBedrockPlayer(player: { uuid?: string; username?: string }): boolean {
  return (
    player.uuid?.startsWith("00000000-0000-0000-0009") === true ||
    player.username?.startsWith(".") === true
  );
}

export function avatarUrl(player: { uuid: string; username: string }, size = 56): string {
  if (isBedrockPlayer(player)) {
    return `https://mc-heads.net/avatar/${encodeURIComponent(player.username.replace(/^\./, ""))  }/${size}`;
  }
  return `https://crafatar.com/avatars/${player.uuid}?size=${size}&overlay`;
}

export function formatPlaytime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remMin = minutes % 60;
  if (hours < 24) return `${hours}h ${remMin}m`;
  const days = Math.floor(hours / 24);
  const remH = hours % 24;
  return `${days}d ${remH}h`;
}

export function formatMoney(amount: number): string {
  return "₹" + Math.floor(amount).toLocaleString("en-IN");
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(timestamp);
}

export function formatLeaderboardValue(metric: LeaderboardMetric, value: number): string {
  switch (metric) {
    case "money":
      return formatMoney(value);
    case "kd":
      return value.toFixed(2);
    case "playtime":
      return formatPlaytime(value);
    default:
      return value.toLocaleString("en-IN");
  }
}

export const LEADERBOARD_TABS: {
  metric: LeaderboardMetric;
  label: string;
  icon: string;
}[] = [
  { metric: "money", label: "Richest", icon: "💰" },
  { metric: "kills", label: "Kills", icon: "⚔️" },
  { metric: "deaths", label: "Deaths", icon: "💀" },
  { metric: "kd", label: "K/D", icon: "🎯" },
  { metric: "mobkills", label: "Mob Kills", icon: "🐉" },
  { metric: "playtime", label: "Playtime", icon: "⏱️" },
  { metric: "claimblocks", label: "Claims", icon: "🏠" },
];
