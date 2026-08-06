const STATUS_URL = "https://api.mcstatus.io/v2/status/java/in3a.wammuhost.com:25571";

function toPlayer(sample) {
  return {
    uuid: sample.uuid || sample.name_clean || sample.name_raw,
    username: sample.name_clean || sample.name_raw,
    online: true,
    nickname: sample.name_clean || sample.name_raw,
    afk: false,
    money: 0,
    economyBalance: 0,
    rank: "Player",
    prefix: "",
    suffix: null,
    claimBlocks: 0,
    bonusClaimBlocks: 0,
    remainingClaimBlocks: 0,
    claimsOwned: 0,
    totalPlaytimeSeconds: 0,
    kills: 0,
    deaths: 0,
    mobKills: 0,
    kdRatio: 0,
    firstJoin: 0,
    lastSeen: Date.now(),
    totalJoins: 0,
    health: 20,
    maxHealth: 20,
    hunger: 20,
    xpLevel: 0,
    gamemode: "survival",
    world: "",
    ping: 0,
    currentSessionSeconds: 0,
    achievements: [],
  };
}

module.exports = async function handler(req, res) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(STATUS_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`mcstatus.io returned ${response.status}`);

    const result = await response.json();
    if (!result.online) {
      return res.status(503).json({ error: "Minecraft server is offline", count: 0, players: [] });
    }

    const sample = Array.isArray(result.players?.list) ? result.players.list : [];
    return res.status(200).json({
      count: result.players?.online ?? sample.length,
      maxPlayers: result.players?.max ?? 0,
      players: sample.map(toPlayer),
      lastUpdated: Date.now(),
    });
  } catch (error) {
    console.error("[v0] Minecraft player check failed:", error?.message || error);
    return res.status(503).json({ error: "Minecraft server is unreachable", count: 0, players: [] });
  } finally {
    clearTimeout(timeout);
  }
};
