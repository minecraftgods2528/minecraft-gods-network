module.exports = async function handler(req, res) {
  const configuredBase = process.env.MGN_API_BASE_URL;
  const base = configuredBase?.replace(/^https:\/\//, "http://").replace(/\/$/, "");
  const token = process.env.MGN_API_TOKEN;
  if (!base || !token) return res.status(500).json({ error: "Missing env vars" });
  try {
    const r = await fetch(`${base}/server`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
};
