import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

export default function GlobalLoader({ children }) {
  const location = useLocation();
  const { isNavigating } = useApp();
  const [loading, setLoading] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Don't show the navigation loader on the very first render
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    setLoading(true);
    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // 600ms loader animation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const showLoader = loading || isNavigating;

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            style={{ background: "rgba(10, 9, 21, 0.8)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex gap-3 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-4 h-4 rounded-full"
                  style={{ background: "var(--color-accent-gold)", boxShadow: "var(--shadow-gold-glow)" }}
                />
              ))}
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Loading
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 
        Render children normally. The loader sits on top as an overlay during navigation.
      */}
      {children}
    </>
  );
}
