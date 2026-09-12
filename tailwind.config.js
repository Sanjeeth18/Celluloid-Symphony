/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        inter:  ["Inter", "sans-serif"],
      },
      colors: {
        cinema: {
          bg:       "#0D0F1A",
          card:     "#161B2E",
          elevated: "#1E2540",
          gold:     "#F5C518",
          gold2:    "#E5A800",
          indigo:   "#6C63FF",
          purple:   "#9B8FFF",
          muted:    "#94A3B8",
          border:   "rgba(245,197,24,0.15)",
        },
      },
      boxShadow: {
        "gold-glow":   "0 0 30px rgba(245, 197, 24, 0.15)",
        "indigo-glow": "0 0 30px rgba(108, 99, 255, 0.25)",
        "card-hover":  "0 20px 60px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-cinema": "linear-gradient(135deg, #F5C518 0%, #6C63FF 50%, #9B8FFF 100%)",
        "gradient-gold":   "linear-gradient(135deg, #F5C518, #E5A800, #FFD700)",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,197,24,0.2)" },
          "50%":       { boxShadow: "0 0 40px rgba(245,197,24,0.5)" },
        },
      },
      animation: {
        shimmer:     "shimmer 1.6s infinite ease-in-out",
        "fade-up":   "fade-up 0.5s ease forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
