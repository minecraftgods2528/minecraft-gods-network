const VALID = ["kills", "deaths", "money", "kd", "playtime", "claimblocks", "mobkills"];
const { requestJson } = require("../_request");

module.exports = async function handler(req, res) {
  const token = process.env.MGN_API_TOKEN;
  const { metric } = req.query;
  if (!VALID.includes(metric)) return res.status(400).json({ error: `Invalid metric. Use: ${VALID.join(", ")}` });
  if (!token) return res.status(500).json({ error: "Missing MGN_API_TOKEN" });

  try {
    const result = await requestJson(`/api/leaderboard/${metric}`, token);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(502).json({ error: "Minecraft API unavailable" });
  }
};
