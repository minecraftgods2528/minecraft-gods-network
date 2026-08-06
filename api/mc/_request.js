const http = require("node:http");

const API_BASE = "http://in3a.wammuhost.com:26020";

function requestJson(path, token) {
  return new Promise((resolve, reject) => {
    const target = new URL(`${API_BASE}${path}`);
    const request = http.request(
      target,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        timeout: 8000,
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          let data;
          try {
            data = JSON.parse(body);
          } catch {
            data = { error: body || "Invalid API response" };
          }
          resolve({ status: response.statusCode || 502, data });
        });
      },
    );

    request.on("timeout", () => request.destroy(new Error("Plugin API timeout")));
    request.on("error", reject);
    request.end();
  });
}

module.exports = { API_BASE, requestJson };
