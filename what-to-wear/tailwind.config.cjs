/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/App.vue",
    "./src/**/*.{html,js,ts,jsx,vue}"
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}