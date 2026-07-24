import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Lime Orb */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 size-96 rounded-full bg-lime-500/10 blur-[100px]"
      />

      {/* Floating Cyan Orb */}
      <motion.div
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 80, -50, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-32 size-96 rounded-full bg-cyan-500/10 blur-[110px]"
      />

      {/* Floating Fuchsia Orb */}
      <motion.div
        animate={{
          x: [0, 70, -70, 0],
          y: [0, -50, 70, 0],
          scale: [1, 1.25, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 left-1/3 size-[28rem] rounded-full bg-fuchsia-500/08 blur-[120px]"
      />

      {/* Floating Orange Orb */}
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, -70, 60, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-2/3 -left-20 size-80 rounded-full bg-orange-500/08 blur-[100px]"
      />
    </div>
  );
}
