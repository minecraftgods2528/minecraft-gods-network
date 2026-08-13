import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Status", href: "#status" },
    { name: "Rules", href: "#rules" },
    { name: "Store", href: "#store" },
    { name: "Kits", href: "/kits" },
    { name: "Players", href: "/players" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07070c]/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <div className="flex-shrink-0 flex items-center gap-2 min-w-0">
            <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-blue-300 bg-clip-text font-serif text-lg font-bold tracking-tight text-transparent sm:text-xl md:text-2xl">
              <span className="hidden sm:inline">⚔ Minecraft God's Network</span>
              <span className="sm:hidden">⚔ MGN</span>
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-8 flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://discord.gg/tdDmk5UqbY"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.35)] transition-all hover:bg-blue-500 hover:shadow-[0_0_28px_rgba(59,130,246,0.55)]"
                data-testid="link-nav-discord"
              >
                Join Discord
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/60"
              data-testid="button-mobile-menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07070c]/95 px-2 pb-3 pt-2 shadow-2xl backdrop-blur-xl">
          <div className="space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block min-h-12 rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://discord.gg/tdDmk5UqbY"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block min-h-12 rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-base font-semibold text-blue-300 transition hover:bg-blue-500/20 hover:text-blue-200"
              data-testid="link-mobile-nav-discord"
            >
              Join Discord
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
