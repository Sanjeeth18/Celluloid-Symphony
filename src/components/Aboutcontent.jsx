import React from "react";
import { motion } from "framer-motion";

const paragraphs = [
  {
    content: (
      <>
        <span className="gradient-text-gold font-semibold">Celluloid Symphony</span>{" "}
        is a dynamic and responsive web application built with modern React features and styled using{" "}
        <span className="font-semibold" style={{ color: "var(--color-accent-indigo)" }}>TailwindCSS</span>.
        It offers a seamless user experience across devices by integrating{" "}
        <code className="px-2 py-0.5 rounded-md text-sm" style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)" }}>
          useMediaQuery
        </code>{" "}
        to adapt layouts based on screen size.
      </>
    ),
  },
  {
    content: (
      <>
        The application utilizes{" "}
        <span className="font-semibold" style={{ color: "var(--color-accent-gold)" }}>React Router</span>{" "}
        for smooth navigation and features modular components for maintainability and scalability. Real-time API
        calls powered by{" "}
        <span className="font-semibold" style={{ color: "var(--color-accent-gold)" }}>React Query</span>{" "}
        dynamically fetch and cache movie data, reducing latency on repeat visits. Key hooks like{" "}
        {["useState", "useEffect", "useLocation", "useNavigate"].map((hook, i, arr) => (
          <span key={hook}>
            <code className="px-2 py-0.5 rounded-md text-sm mx-0.5"
              style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)" }}>
              {hook}
            </code>
            {i < arr.length - 1 ? ", " : " "}
          </span>
        ))}
        streamline state management and navigation.
      </>
    ),
  },
  {
    content: (
      <>
        The app supports interactive{" "}
        <span className="font-semibold" style={{ color: "var(--color-accent-gold)" }}>Swiper carousels</span>{" "}
        with the coverflow effect, animated with{" "}
        <span className="font-semibold" style={{ color: "var(--color-accent-indigo)" }}>Framer Motion</span>{" "}
        for premium micro-animations — including spring physics, staggered children, and whileInView scroll triggers.
        TailwindCSS accelerates styling with clean, utility-first classes ensuring mobile-first responsiveness.
      </>
    ),
  },
  {
    content: (
      <>
        By combining a cinematic design system, real-time API integration, and context-driven architecture,{" "}
        <span className="gradient-text-gold font-semibold">Celluloid Symphony</span>{" "}
        delivers a modern, portfolio-ready platform. Its layered architecture (services, context, hooks,
        UI components) ensures the codebase is scalable, reusable, and easy to maintain.
      </>
    ),
  },
];

const techBadges = [
  "React 18", "Framer Motion", "React Query", "TailwindCSS", "Swiper.js", "TMDB API", "React Router v6",
];

function Aboutcontent() {
  return (
    <div className="py-20" style={{ background: "var(--color-bg-primary)" }}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "var(--color-accent-gold)" }}>
            The Project
          </p>
          <h2 className="text-5xl md:text-6xl font-black gradient-text-cinema leading-tight">
            About
          </h2>
          <div className="mt-4 mx-auto h-1 w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-indigo))" }} />
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {techBadges.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="text-xs font-bold px-3 py-1.5 rounded-full cursor-default"
              style={{
                background: "var(--color-bg-elevated)",
                color: i % 2 === 0 ? "var(--color-accent-gold)" : "var(--color-accent-purple)",
                border: `1px solid ${i % 2 === 0 ? "rgba(0,240,255,0.3)" : "rgba(255,0,229,0.3)"}`,
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Paragraphs */}
        <div className="max-w-3xl mx-auto space-y-6">
          {paragraphs.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="text-base lg:text-lg leading-relaxed p-5 rounded-2xl"
              style={{
                color: "var(--color-text-muted)",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
            >
              {para.content}
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 mx-auto h-1 w-40 rounded-full origin-center"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-gold), var(--color-accent-indigo), transparent)" }}
        />
      </div>
    </div>
  );
}

export default Aboutcontent;
