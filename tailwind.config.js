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
        'auth-wallpaper': "url('./img/wallpaper4jpg.jpg')"

      }
    },
  },
  plugins: [],
}