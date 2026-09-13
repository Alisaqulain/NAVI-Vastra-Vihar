import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A4A",
          light: "#2A3F6B",
          dark: "#0F1A2E",
        },
        emerald: {
          DEFAULT: "#1F6B5C",
          light: "#2D8A78",
          dark: "#154A40",
        },
        gold: {
          DEFAULT: "#C9A962",
          light: "#D4BC7E",
          dark: "#A88B4A",
        },
        cream: {
          DEFAULT: "#F7F3EB",
          dark: "#EDE6D8",
          light: "#FDFBF7",
        },
        beige: {
          DEFAULT: "#E8DFD0",
          light: "#F0E9DE",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
