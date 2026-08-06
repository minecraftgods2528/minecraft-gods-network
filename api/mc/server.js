const STATUS_URL = "https://api.mcstatus.io/v2/status/java/in3a.wammuhost.com:25571";

module.exports = async function handler(req, res) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(STATUS_URL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`mcstatus.io returned ${response.status}`);
    }

    const result = await response.json();
    if (!result.online) {
      return res.status(503).json({ error: "Minecraft server is offline", online: false });
    }

    return res.status(200).json({
      onlinePlayers: result.players?.online ?? 0,
      maxPlayers: result.players?.max ?? 0,
      version: result.version?.name_clean ?? result.version?.name_raw ?? "Unknown",
      bukkitVersion: result.version?.name_clean,
      tps: { "1m": 0, "5m": 0, "15m": 0 },
      worlds: [],
      memory: { usedMb: 0, maxMb: 0 },
      uptimeSeconds: 0,
      lastUpdated: Date.now(),
      latencyMs: result.debug?.ping ?? 0,
      motd: result.motd?.clean ?? "",
    });
  } catch (error) {
    console.error("[v0] Minecraft status check failed:", error?.message || error);
    return res.status(503).json({ error: "Minecraft server is unreachable", online: false });
  } finally {
    clearTimeout(timeout);
  }
};
