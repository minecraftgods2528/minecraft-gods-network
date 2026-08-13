import { Copy, ChevronDown, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { GAME_SERVER_ADDRESS, GAME_SERVER_PORT } from "@/config/server";

export default function Hero() {
  const { toast } = useToast();

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(GAME_SERVER_ADDRESS);
      toast({
        title: "IP Copied!",
        description: `${GAME_SERVER_ADDRESS} copied to clipboard.`,
        duration: 3000,
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: `Please copy the IP manually: ${GAME_SERVER_ADDRESS}`,
        duration: 4000,
      });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pt-28"
    >
      {/* Background Starfield/Particles */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0f] to-[#0a0a0f]"></div>
        {/* CSS Particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-sm bg-white/20 animate-pulse"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 3 + 2 + "s",
              animationDelay: Math.random() * 2 + "s",
            }}
          ></div>
        ))}
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Java Edition Server
            </span>
          </div>

          <h1 className="max-w-full text-[clamp(2.25rem,11vw,3.5rem)] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight mb-6 drop-shadow-2xl break-words">
            MINECRAFT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              GOD'S
            </span>{" "}
            NETWORK
          </h1>

          <p className="mb-9 text-lg font-medium tracking-wide text-gray-300 sm:mb-12 sm:text-xl md:text-2xl">
            Build • Trade • Fight • Conquer
          </p>

          <div className="flex w-full max-w-xl flex-col items-stretch justify-center gap-4 sm:gap-6 md:flex-row md:items-center">
            <div className="group relative w-full md:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={copyIp}
                className="relative flex min-h-16 w-full items-center justify-between gap-3 rounded-xl border border-white/15 bg-black/70 px-4 py-3 text-left text-base font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10 sm:px-6 sm:py-4 sm:text-lg"
                data-testid="button-copy-ip-hero"
              >
                <div className="text-left">
                  <div className="text-sm text-gray-400 font-normal">
                    Play Now
                  </div>
                  <div className="max-w-[calc(100vw-7rem)] truncate font-mono text-sm text-purple-300 sm:text-base">
                    {GAME_SERVER_ADDRESS}
                  </div>
                </div>
                <div className="w-px h-8 bg-white/20 mx-2"></div>
                <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            <a
              href="https://discord.gg/tdDmk5UqbY"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-16 w-full items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-blue-600/20 px-6 py-4 text-lg font-bold text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all hover:bg-blue-600/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] md:w-auto md:px-8"
              data-testid="button-join-discord-hero"
            >
              <Gamepad2 className="w-5 h-5" />
              Join Discord
            </a>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-400 sm:mt-8 sm:gap-6">
            <span>
              Port: <strong className="text-white">{GAME_SERVER_PORT}</strong>
            </span>
            <span>•</span>
            <span>
              Edition: <strong className="text-white">Java</strong>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#features"
          aria-label="Scroll to Features"
          className="text-gray-500 hover:text-white transition-colors"
          data-testid="link-scroll-down"
        >
          <ChevronDown className="w-8 h-8" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
