/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "hoi4": ["Roboto Condensed", "Arial Black", "sans-serif"],
        "military": ["Courier New", "monospace"],
      },
      colors: {
        "metallic": "#3d3d3d",
        "rust": "#8b4513",
        "warred": "#8b0000",
        "militarygreen": "#1a1a1a",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s infinite",
        "slide-in": "slide-in 0.6s ease-out",
        "flicker": "flicker 0.15s infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 10px rgba(255, 215, 0, 0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
}
