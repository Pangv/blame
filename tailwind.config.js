/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b4989',
        secondary: '#c4d8f3',
        background: '#18181b',
      },
      fontFamily: {
        'merriweather': ['Merriweather', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

