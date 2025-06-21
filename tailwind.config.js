/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css", // Include index.css in the root
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
};