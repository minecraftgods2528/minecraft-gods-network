const { requestJson } = require("../_request");

module.exports = async function handler(req, res) {
  const token = process.env.MGN_API_TOKEN;
  const { username } = req.query;
  if (!token) return res.status(500).json({ error: "Missing MGN_API_TOKEN" });
  if (!username) return res.status(400).json({ error: "Missing username" });

  try {
    const result = await requestJson(`/api/player/${encodeURIComponent(username)}`, token);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(502).json({ error: "Minecraft API unavailable" });
  }
};
