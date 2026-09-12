import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiLinkedin, FiGithub, FiMapPin } from "react-icons/fi";

const SOCIAL_LINKS = [
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/sanjeeth-j-68a17a289", label: "LinkedIn" },
  { icon: FiGithub,   href: "https://github.com/Sanjeeth18",                     label: "GitHub"   },
];

const contactVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

function Footer({ enableAnimation = true }) {
  return (
    <footer style={{ background: "var(--color-bg-card)", borderTop: "1px solid var(--color-border)" }}>
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <motion.div
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-black gradient-text-gold mb-4">Celluloid Symphony</h2>
              <div className="h-0.5 w-16 rounded-full mb-4" style={{ background: "linear-gradient(90deg, var(--color-accent-gold), transparent)" }} />
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                A dynamic, responsive movie platform powered by React &amp; the TMDB API.
                Featuring Swiper carousels, real-time search, and a cinematic experience.
              </p>
            </motion.div>
          </motion.div>

          {/* Address */}
          <motion.div
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-bold text-base uppercase tracking-widest mb-4"
                style={{ color: "var(--color-accent-gold)" }}>
                Address
              </h3>
              <div className="flex items-start gap-3">
                <FiMapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-accent-gold)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  57, Periyar Nagar, MSK Palayam<br />
                  Coimbatore – 641015
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={contactVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-bold text-base uppercase tracking-widest mb-4"
                style={{ color: "var(--color-accent-gold)" }}>
                Contact
              </h3>
              <div className="space-y-3 mb-5">
                <a href="tel:+917548824694"
                  className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent-gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
                >
                  <div className="p-2 rounded-lg transition-colors group-hover:bg-opacity-20"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)" }}>
                    <FiPhone size={14} />
                  </div>
                  +91-7548824694
                </a>
                <a href="mailto:22pw33@psgtech.ac.in"
                  className="flex items-center gap-3 text-sm transition-colors group"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent-gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
                >
                  <div className="p-2 rounded-lg"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-accent-gold)" }}>
                    <FiMail size={14} />
                  </div>
                  22pw33@psgtech.ac.in
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl transition-colors"
                    style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-accent-gold)";
                      e.currentTarget.style.color = "#0D0F1A";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--color-bg-elevated)";
                      e.currentTarget.style.color = "var(--color-text-muted)";
                    }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 text-center text-xs" style={{ borderTop: "1px solid var(--color-border)", color: "var(--color-text-dim)" }}>
        © {new Date().getFullYear()} Celluloid Symphony · Built with React &amp; ❤️ by Sanjeeth J
      </div>
    </footer>
  );
}

export default Footer;
