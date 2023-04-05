/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-orange": "#f05100",
        "light-orange": "#f87e3a",
        "background-gray": "#fcfbf9",
        "light-gray": "#f6f5f2",
        "dark-gray": "#b9b8b8",
        "dark-graphite": "#949494",
        "light-green": "#318a31",
        "light-blue": "#1976d2",
      },
      backgroundImage: {
        my_bg_image: "url('../public/assets/bcg2.jpg')",
      },
      screens: {
        "3xl": "1700px",
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
  variants: {
    gridTemplateAreas: ["responsive"],
  },
};
