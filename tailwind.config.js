/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#d4af37",
        "divine-gold": "#d4af37",
        "cinema-dark": "#0A0A0A",
      },
      fontFamily: {
        "display": ["Newsreader", "serif"],
        "sans": ["Poppins", "Inter", "sans-serif"],
        "hindi": ["Mukta", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
