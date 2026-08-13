/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0A0A0A",
        card: "#111111",
        border: "#1A1A1A",
        borderHover: "#2A2A2A",
        text: "#F1F5F9",
        textSoft: "#CBD5E1",
        textMuted: "#94A3B8",
        textFaint: "#64748B",
        blue: "#0066FF",
        purple: "#8B5CF6",
        pink: "#EC4899",
        cyan: "#06B6D4",
        green: "#10B981",
        orange: "#F59E0B",
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