/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8ff",
          100: "#e6f0ff",
          200: "#bfd7ff",
          300: "#99beff",
          400: "#72a6ff",
          500: "#4c8dff",
          600: "#1f6fff",
          700: "#1558d6",
          800: "#1044a6",
          900: "#0a2f75",
        },
      },
    },
  },
  plugins: [],
};
