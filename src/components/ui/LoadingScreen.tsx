"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo / Animation placeholder */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="mb-8 h-24 w-24 rounded-full border-t-2 border-accent-blue opacity-80"
            />
            <div className="text-xl font-light tracking-widest text-white/70">
              INITIALIZING ENVIRONMENT
            </div>
            <div className="mt-4 w-64 h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-accent-blue"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-2 text-sm text-white/50">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
