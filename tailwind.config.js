/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "border-color": "#2b3139",
        "buy-color": "#0ECB81",
        "sell-color": "#F6465D"
      }
    },
  },
  plugins: [],
}