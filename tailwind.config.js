/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        newsreader: ['Newsreader', 'serif'],
        'alte-haas': ['Alte Haas Grotesk', 'sans-serif'],
        'davinci': ['TRJN DaVinci', 'serif']
      },
      letterSpacing: {
        '-2p': '-0.02em', // Custom tracking value for -2%
      }
    },
  },
  plugins: [],
}