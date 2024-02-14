/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '360': '360deg',
      },
      spacing: {
        '84': '21rem',
      }, backgroundImage: {
        'auth-wallpaper': "url('./src/assets/wallpaper2.jpg')"

      }
    },
  },
  plugins: [],
}