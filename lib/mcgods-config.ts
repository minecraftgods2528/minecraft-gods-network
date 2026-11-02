export const serverConfig = {
  name: "MCGODS",
  fullName: "Minecraft God's Network",
  tagline: "India's Survival Network",
  ip: "minecraftgods.qd.je",
  port: "19188",
  javaAddress: "minecraftgods.qd.je:19188",
  javaIp: "minecraftgods.qd.je",
  javaPort: "19188",
  bedrockIp: "minecraftgods.qd.je",
  bedrockPort: "19152",
  discord: "https://discord.gg/tdDmk5UqbY",
  store: "https://mgsstore.vercel.app/",
} as const

export const features = [
  { title: "Survival Server", description: "A persistent survival world where every build and adventure is yours to shape.", icon: "sword" },
  { title: "Economy & Trading", description: "Trade resources, grow your wealth, and make your mark in a player-driven economy.", icon: "coins" },
  { title: "Land Claims & Grief Protection", description: "Protect the places you build and keep your progress safe from unwanted damage.", icon: "shield" },
  { title: "Custom Kits & Rewards", description: "Jump into the action with custom kits and rewards built for the MCGODS experience.", icon: "gift" },
  { title: "PvP & Community Events", description: "Bring your best gear to server-wide battles and community events.", icon: "trophy" },
  { title: "Java & Bedrock Crossplay", description: "Play together across Java and Bedrock without leaving friends behind.", icon: "blocks" },
  { title: "Exploration and Survival Adventures", description: "Discover new places, hidden resources, and stories across a living survival world.", icon: "compass" },
] as const

export const faqs = [
  ["How do I join MCGODS?", `Java: ${serverConfig.javaAddress}. Bedrock: ${serverConfig.bedrockIp} with port ${serverConfig.bedrockPort}.`],
  ["Does MCGODS support Java and Bedrock?", "Yes, the server supports both Java and Bedrock editions."],
  ["What are the server addresses?", `Java: ${serverConfig.javaAddress} · Bedrock: ${serverConfig.bedrockIp}:${serverConfig.bedrockPort}`],
  ["What is the server port?", `Java: ${serverConfig.javaPort} · Bedrock: ${serverConfig.bedrockPort}`],
  ["Does the server have land claims?", "Yes, MCGODS supports land claims and grief protection."],
  ["Do voting rewards exist?", "Voting rewards will be announced once the final reward system is confirmed."],
  ["Where can I join the community?", `Join our Discord at ${serverConfig.discord}`],
  ["Where can I purchase kits?", `Visit the Store at ${serverConfig.store}`],
  ["Where can I read the rules?", "Visit the Rules page on this website."],
] as const

export const rules = [
  ["Respect Everyone", "Respect all players and staff members. Harassment, bullying, hate speech, and targeted abuse are not allowed."],
  ["No Cheats or Exploits", "Hacks, X-ray, unauthorized cheats, and abusing glitches or exploits are strictly prohibited."],
  ["PvP Is Allowed Everywhere", "PvP is allowed throughout the server. Players may attack or kill other players. Be prepared for combat while playing."],
  ["Respect the MCGODS Name", "Mocking, disrespecting, or deliberately insulting the MCGODS name and community is not allowed."],
  ["Keep the Server Beautiful", "Respect the server's environment and builds. Avoid unnecessary destruction and keep the world enjoyable for everyone."],
  ["No Chunk Loaders", "Chunk loaders are strictly prohibited. Violations may result in an immediate permanent ban. Server activity is monitored by the administration team."],
  ["No Scamming", "Scamming, trade fraud, and abusing the economy system are prohibited."],
  ["No Spam or Unauthorized Advertising", "Avoid spam, excessive capital letters, and unauthorized advertisements."],
  ["No Staff Impersonation or Punishment Evasion", "Do not impersonate staff members or attempt to evade punishments."],
  ["Report Bugs and Rule Violations", "Report bugs, exploits, and rule violations to the staff team instead of abusing them."],
  ["Punishments", "Depending on the severity of the violation, punishments may include warnings, mutes, temporary bans, or permanent bans."],
] as const

export const navItems = [
  ["Home", "home"], ["How to Join", "join"], ["Rules", "rules"], ["FAQ", "faq"], ["Server Features", "features"],
] as const

export type PageKey = "home" | "join" | "rules" | "faq" | "features"
