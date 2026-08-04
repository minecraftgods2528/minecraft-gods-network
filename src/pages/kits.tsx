import { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Ticket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DISCORD_URL = 'https://discord.gg/tdDmk5UqbY';

const kits = [
  {
    id: 'elite',
    name: 'Elite Kit',
    price: '₹30',
    image: '/kits/kit_elite.png',
    color: 'from-cyan-500/20 to-blue-900/20',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  },
  {
    id: 'titan',
    name: 'Titan Kit',
    price: '₹70',
    image: '/kits/kit_titan.png',
    color: 'from-yellow-500/20 to-yellow-900/20',
    border: 'border-yellow-500/30',
    glow: 'shadow-yellow-500/20',
    badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
  {
    id: 'immortal',
    name: 'Immortal Kit',
    price: '₹120',
    image: '/kits/kit_immortal.png',
    color: 'from-purple-500/20 to-purple-900/20',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'god',
    name: 'God Kit',
    price: '₹200',
    image: '/kits/kit_god.png',
    color: 'from-red-500/20 to-red-900/20',
    border: 'border-red-500/30',
    glow: 'shadow-red-500/20',
    badge: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  {
    id: 'divine',
    name: 'Divine Kit',
    price: '₹250',
    image: '/kits/kit_divine.png',
    color: 'from-amber-400/20 to-yellow-900/20',
    border: 'border-amber-400/30',
    glow: 'shadow-amber-400/20',
    badge: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
  },
];

export default function KitsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-foreground font-sans">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              ⚔ Kits Store
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Choose your kit and dominate the server. All purchases are processed through our Discord ticket system.
            </p>
          </div>

          {/* How to purchase info box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-14 bg-blue-900/20 border border-blue-500/30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-2xl mx-auto"
          >
            <div className="bg-blue-500/20 p-3 rounded-xl flex-shrink-0">
              <Ticket className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold mb-1">How to Purchase</p>
              <p className="text-gray-400 text-sm">
                Click <span className="text-blue-400 font-medium">"Purchase on Discord"</span> → Join our server → Open a ticket in <span className="text-blue-400 font-medium">#tickets</span> → Mention the kit name and complete payment.
              </p>
            </div>
          </motion.div>

          {/* Kits grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {kits.map((kit, i) => (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-b ${kit.color} border ${kit.border} rounded-2xl overflow-hidden shadow-xl ${kit.glow} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                {/* Kit image */}
                <div className="relative">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Card footer */}
                <div className="p-5 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <h2 className="text-white font-bold text-lg">{kit.name}</h2>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${kit.badge}`}>
                      {kit.price}
                    </span>
                  </div>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-500/30 whitespace-nowrap flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Purchase on Discord
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-gray-500 text-sm mb-4">Need help choosing a kit?</p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-medium transition-all"
            >
              Ask in Discord
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
