import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="text-2xl font-serif font-bold text-white mb-4 block">
              ⚔ Minecraft God's Network
            </span>
            <p className="text-gray-400 max-w-sm mb-6">
              A premium Java Edition survival network. Build, trade, fight, and
              conquer with a dedicated community.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500 font-mono">
              <p>IP: minecraftgods.wammuhost.fun</p>
              <p>Port: 25571</p>
              <p>Edition: Java Edition</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#status"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href="#rules"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Rules
                </a>
              </li>
              <li>
                <a
                  href="#store"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Store
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Community
            </h4>
            <a
              href="https://discord.gg/tdDmk5UqbY"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30 border border-[#5865F2]/50 px-4 py-2 rounded-lg font-medium transition-colors"
              data-testid="link-footer-discord"
            >
              <Gamepad2 className="w-5 h-5" />
              Discord Server
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Minecraft God's Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
