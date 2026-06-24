import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "rgb(var(--color-bg-primary) / <alpha-value>)",
          surface: "rgb(var(--color-bg-surface) / <alpha-value>)",
          mid: "#16213e",
        },
        accent: {
          red: "rgb(var(--color-accent-red) / <alpha-value>)",
          blue: "#0f3460",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
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
        "pulse-skeleton": "pulseSkeleton 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulseSkeleton: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
