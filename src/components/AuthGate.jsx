import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FiFilm, FiLock, FiLoader } from "react-icons/fi";

function AuthGate({ children }) {
  const { user, loading, loginWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0D0F1A] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="p-4 rounded-full border-2 border-cyan-400 border-t-transparent text-cyan-400 mb-4"
        >
          <FiLoader size={32} />
        </motion.div>
        <p className="text-sm font-semibold tracking-wider text-cyan-300 animate-pulse">
          VERIFYING AUTHENTICATION...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden bg-[#0A0915]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-sm p-8 rounded-3xl overflow-hidden shadow-2xl text-center"
          style={{
            background: "linear-gradient(145deg, rgba(20, 18, 38, 0.95), rgba(10, 9, 21, 0.98))",
            border: "1px solid rgba(0, 240, 255, 0.25)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-[#0D0F1A] shadow-xl"
            style={{ background: "var(--color-accent-gold)" }}
          >
            <FiFilm size={32} />
          </motion.div>

          <h1
            className="text-3xl font-black tracking-tight mb-3"
            style={{
              background: "linear-gradient(135deg, #FFFFFF, var(--color-accent-gold))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Celluloid Symphony
          </h1>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-8">
            <FiLock size={13} /> Sign in to continue
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={loginWithGoogle}
            className="w-full py-3.5 px-6 rounded-2xl text-sm font-extrabold bg-white text-black hover:bg-gray-100 transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return children;
}

export default AuthGate;
