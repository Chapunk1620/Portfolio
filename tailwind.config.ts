import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0f0f1a",
          surface: "#1a1a2e",
          mid: "#16213e",
        },
        accent: {
          red: "#e94560",
          blue: "#0f3460",
        },
        text: {
          primary: "#e8e8e8",
          muted: "#888",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(233, 69, 96, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(233, 69, 96, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
