import {
  AlertTriangle,
  UserCheck,
  MessageSquareOff,
  Gavel,
  Ban,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Rules() {
  const rules = [
    {
      icon: <Ban className="w-6 h-6 text-red-400" />,
      title: "No Griefing",
      desc: "Respect others' builds. Griefing results in a permanent ban.",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
      title: "No Cheating",
      desc: "Hacking, exploiting, or using unfair advantages is strictly forbidden.",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-400" />,
      title: "Respect All Players",
      desc: "Harassment, hate speech, and toxicity are not tolerated.",
    },
    {
      icon: <MessageSquareOff className="w-6 h-6 text-blue-400" />,
      title: "No Spam or Abuse",
      desc: "Keep chat clean. No spam, flooding, or command abuse.",
    },
    {
      icon: <Gavel className="w-6 h-6 text-purple-400" />,
      title: "Staff Decisions Are Final",
      desc: "Disputes are handled by staff and their word is final.",
    },
  ];

  return (
    <section
      id="rules"
      className="py-24 bg-[#050508] relative z-10 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Server Rules
          </h2>
          <p className="text-gray-400">
            Keep the network fair and fun for everyone
          </p>
        </div>

        <div className="space-y-4">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-white/5 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors"
              data-testid={`rule-item-${i}`}
            >
              <div className="mt-1 bg-black/50 p-3 rounded-lg border border-white/5 flex-shrink-0">
                {rule.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {rule.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{rule.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
