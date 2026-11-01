import { NextResponse } from "next/server"

export async function GET() {
  const host = "minecraftgods.qd.je"
  const port = "19188"

  try {
    const started = Date.now()
    const address = `${host}:${port}`
    const endpoints = [
      `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(address)}?query=true`,
      `https://api.mcsrvstat.us/3/${address}`,
    ]
    let data: any = null
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { cache: "no-store", signal: AbortSignal.timeout(7000) })
        if (response.ok) {
          const candidate = await response.json()
          if (candidate.online) { data = candidate; break }
        }
      } catch {
        continue
      }
    }
    const pingMs = Date.now() - started
    if (!data) return NextResponse.json({ online: false, error: "Status unavailable" }, { status: 502 })
    const names = (data.players?.list?.map((player: any) => typeof player === "string" ? player : player.name) ?? data.players?.sample?.map((player: any) => player.name) ?? []).filter(Boolean)
    const motd = Array.isArray(data.motd?.clean) ? data.motd.clean.join(" ") : data.motd?.clean ?? data.motd?.raw ?? ""
    return NextResponse.json({
      online: true,
      players: data.players?.online ?? 0,
      maxPlayers: data.players?.max ?? 0,
      names,
      motd,
      version: data.version?.name_clean ?? data.version?.name ?? data.version ?? "",
      pingMs,
    })
  } catch {
    return NextResponse.json({ online: false, error: "Status unavailable" }, { status: 502 })
  }
}

export const dynamic = "force-dynamic"
