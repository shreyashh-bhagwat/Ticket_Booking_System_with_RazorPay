/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#4f46e5',
        customHover: '#4338ca',
        customDark: '#1e293b',
      },
    },
  },
  plugins: [],
}