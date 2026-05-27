import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import cashImg from "@/assets/cash.png";

export const MoneyRain = () => {
  const [coins, setCoins] = useState<
    Array<{ id: number; x: number; y: number; rot: number }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) =>
        [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: -50,
            rot: Math.random() * 360,
          },
        ].slice(-50),
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute w-8 h-8 opacity-30 drop-shadow-2xl" // ✅ اندازه + shadow
          style={{
            left: `${coin.x}%`,
            transform: `rotate(${coin.rot}deg)`, // ✅ چرخش
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: "120vh",
            opacity: [0, 0.8, 0.3, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <img
            src={cashImg}
            alt="cash"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </motion.div>
      ))}
    </div>
  );
};
