"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkeletonWrapper({
  children,
  skeleton,
  delay = 400,
}: {
  children: React.ReactNode;
  skeleton: React.ReactNode;
  delay?: number;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative">
      <AnimatePresence>
        {!ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
