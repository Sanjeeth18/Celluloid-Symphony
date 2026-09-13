import React from "react";
import { motion } from "framer-motion";

import { FiCalendar, FiBook, FiMail } from "react-icons/fi";

const DETAILS = [
  { icon: FiCalendar, label: "Date of Birth", value: "16.07.2004" },
  { icon: FiBook, label: "College", value: "PSG College Of Technology" },
  { icon: FiMail, label: "Mail ID", value: "sanjeeth653@gmail.com", href: "mailto:sanjeeth653@gmail.com" },
];

function ContactDetails() {
  return (
    <div className=" py-20 px-4 mb-0" style={{ background: "var(--color-bg-primary)" }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold tracking-widest uppercase my-2"
          style={{ color: "var(--color-accent-gold)" }}>
          Get in Touch
        </p>
        <h1 className="text-5xl lg:text-7xl font-black gradient-text-cinema leading-tight">
          Contact Details
        </h1>
        <div className="mt-4 mx-auto h-1 w-24 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-indigo))" }} />
      </motion.div>

      {/* Card */}
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col md:flex-row gap-8 p-6 md:p-10 rounded-2xl"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}
        >


          {/* Info */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-black gradient-text-gold mb-2"
            >
              Sanjeeth J
            </motion.h2>
            <div className="h-0.5 w-16 rounded-full mb-6"
              style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }} />

            <div className="space-y-4">
              {DETAILS.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-4 py-3"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <div className="p-2 rounded-lg flex-shrink-0"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)" }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-0.5"
                      style={{ color: "var(--color-text-dim)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href}
                        className="text-sm font-medium transition-colors"
                        style={{ color: "var(--color-text-primary)" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent-gold)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-primary)"}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        {value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactDetails;
