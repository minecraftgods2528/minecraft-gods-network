import { motion } from "framer-motion";
import {
  Pickaxe,
  Coins,
  Shield,
  PackageOpen,
  CalendarClock,
  Coffee,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Pickaxe className="w-8 h-8 text-purple-400" />,
      title: "Survival SMP",
      desc: "Pure survival multiplayer with a tight-knit community.",
    },
    {
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      title: "Economy & Trading",
      desc: "Player-driven economy with shops and trading.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Land Claims",
      desc: "Protect your builds and claim your territory.",
    },
    {
      icon: <PackageOpen className="w-8 h-8 text-orange-400" />,
      title: "Crates",
      desc: "Exciting loot crates with rare rewards.",
    },
    {
      icon: <CalendarClock className="w-8 h-8 text-pink-400" />,
      title: "Community Events",
      desc: "Regular events bringing the community together.",
      badge: "Coming Soon",
    },
    {
      icon: <Coffee className="w-8 h-8 text-green-400" />,
      title: "Java Edition",
      desc: "Full Java Edition support for the best Minecraft experience.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0a0a0f] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Server Features
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all backdrop-blur-sm overflow-hidden"
              data-testid={`card-feature-${i}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="relative z-10">
                <div className="bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{f.title}</h3>
                  {f.badge && (
                    <span className="text-xs font-semibold bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                      {f.badge}
                    </span>
                  )}
                </div>

                <p className="text-gray-400">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
