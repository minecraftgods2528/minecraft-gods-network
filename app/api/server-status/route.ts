import { NextResponse } from "next/server"

export async function GET() {
  const host = "minecraftgods.qd.je"
  const port = "25571"

  try {
    const started = Date.now()
    const response = await fetch(`https://api.mcsrvstat.us/3/${host}:${port}`, { cache: "no-store" })
    const pingMs = Date.now() - started
    if (!response.ok) return NextResponse.json({ online: false, error: "Status unavailable" }, { status: 502 })
    const data = await response.json()
    return NextResponse.json({
      online: Boolean(data.online),
      players: data.players?.online ?? 0,
      maxPlayers: data.players?.max ?? 0,
      names: data.players?.list ?? [],
      motd: data.motd?.clean?.join(" ") ?? "",
      version: data.version ?? "",
      pingMs,
    })
  } catch {
    return NextResponse.json({ online: false, error: "Status unavailable" }, { status: 502 })
  }
}

export const dynamic = "force-dynamic"
