import { Crown, Package, Sword } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Store() {
  const [, navigate] = useLocation();
  const categories = [
    {
      icon: <Crown className="w-10 h-10 text-yellow-400" />,
      title: "VIP Ranks",
      desc: "Exclusive perks, cosmetics, and in-game privileges to stand out from the crowd.",
      color: "from-yellow-600/20 to-yellow-900/20",
      border: "border-yellow-500/20",
    },
    {
      icon: <Package className="w-10 h-10 text-purple-400" />,
      title: "Crates",
      desc: "Unlock rare items, exclusive cosmetics, and legendary gear from our special crates.",
      color: "from-purple-600/20 to-purple-900/20",
      border: "border-purple-500/20",
    },
    {
      icon: <Sword className="w-10 h-10 text-blue-400" />,
      title: "Kits",
      desc: "Start strong with powerful gear and essential resources to accelerate your journey.",
      color: "from-blue-600/20 to-blue-900/20",
      border: "border-blue-500/20",
    },
  ];

  return (
    <section
      id="store"
      className="py-24 bg-[#0a0a0f] relative z-10 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Server Store
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Support the network and unlock exclusive rewards. Your contributions
            help keep the server running smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`bg-gradient-to-b ${cat.color} border ${cat.border} rounded-2xl p-8 backdrop-blur-sm text-center group hover:-translate-y-2 transition-all duration-300 flex flex-col`}
              data-testid={`store-category-${i}`}
            >
              <div className="bg-black/50 w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {cat.title}
              </h3>
              <p className="text-gray-400 mb-8 flex-grow">{cat.desc}</p>

              {cat.title === "Kits" ? (
                <button
                  onClick={() => navigate("/kits")}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 border border-blue-500/50 rounded-lg text-white font-semibold transition-all uppercase tracking-wider text-sm shadow-lg hover:shadow-blue-500/30"
                  data-testid={`button-store-view-kits`}
                >
                  View All Kits →
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-gray-500 font-medium cursor-not-allowed uppercase tracking-wider text-sm"
                  data-testid={`button-store-coming-soon-${i}`}
                >
                  Coming Soon
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
