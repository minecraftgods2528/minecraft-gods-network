import { Copy, ChevronDown, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Hero() {
  const { toast } = useToast();

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText("minecraftgods.wammuhost.fun:25571");
      toast({
        title: "IP Copied!",
        description: "minecraftgods.wammuhost.fun:25571 copied to clipboard.",
        duration: 3000,
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Please copy the IP manually: minecraftgods.wammuhost.fun:25571",
        duration: 4000,
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20"
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

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
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

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight mb-6 drop-shadow-2xl">
            MINECRAFT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              GOD'S
            </span>{" "}
            NETWORK
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-12 tracking-wide">
            Build • Trade • Fight • Conquer
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={copyIp}
                className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-lg text-lg font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
                data-testid="button-copy-ip-hero"
              >
                <div className="text-left">
                  <div className="text-sm text-gray-400 font-normal">
                    Play Now
                  </div>
                  <div className="font-mono text-purple-300">
                    minecraftgods.wammuhost.fun:25571
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
              className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 px-8 py-4 rounded-lg text-lg font-bold text-blue-100 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              data-testid="button-join-discord-hero"
            >
              <Gamepad2 className="w-5 h-5" />
              Join Discord
            </a>
          </div>

          <div className="mt-8 flex gap-6 text-sm text-gray-400 justify-center">
            <span>
              Port: <strong className="text-white">25571</strong>
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
