/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8f1ff",
          100: "#c6dcff",
          200: "#9fc2ff",
          300: "#71a1ff",
          400: "#457fff",
          500: "#245fff",
          600: "#1648db",
          700: "#1339ac",
          800: "#162f83",
          900: "#182b68",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(96,165,250,0.18), 0 20px 50px rgba(15,23,42,0.65)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Manrope"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
