/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050404",
        surface: "#060908",
        card: "#060908",
        border: "#0e1211",
        borderHover: "#0e1211",
        text: "#f1f5f9",
        textSoft: "#cbd5e1",
        textMuted: "#abb894",
        textFaint: "#7d8b64",
        blue: "#beff3e",
        purple: "#55f2bd",
        pink: "#b8d681",
        cyan: "#8cd406",
        green: "#10b981",
        orange: "#a3f50b",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};