"use client";

import { motion } from "framer-motion";

export function Loader({ text = "Fetching comments..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-12 w-12 border-4 border-accent border-t-transparent neon-glow"
        />
        <motion.div
           animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-4 w-4 rounded-full bg-accent"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-slate-500 font-medium tracking-wide"
      >
        {text}
      </motion.p>
    </div>
  );
}
